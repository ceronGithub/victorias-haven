// api/r2-list.js
// Vercel Serverless Function — lists objects in the R2 bucket by folder prefix.
// Runs server-side only. R2 credentials never reach the browser.
//
// Query params:
//   prefix — folder prefix to list, e.g. "gallery" | "gallery/rooms" | "gallery/pool"
//
// Returns:
//   { urls: string[] }  — array of full public URLs, sorted alphabetically
//
// Usage from client:
//   const res = await fetch('/api/r2-list?prefix=gallery')
//   const { urls } = await res.json()

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Allowed prefixes — prevents arbitrary bucket enumeration
const ALLOWED_PREFIXES = [
  "gallery",
  "gallery/rooms",
  "gallery/pool",
  "gallery/kitchen",
  "gallery/amenities",
  "gallery/guests",
];

// Lazy S3 client — initialized once per cold start
let s3 = null;

function getS3() {
  if (s3) return s3;
  const accountId = process.env.R2_ACCOUNT_ID;
  if (!accountId) throw new Error("R2_ACCOUNT_ID is not set");
  s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId:     process.env.R2_ACCESS_KEY_ID     ?? "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
    },
  });
  return s3;
}

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const prefix = req.query.prefix ?? "";

  // Validate prefix
  if (!ALLOWED_PREFIXES.includes(prefix)) {
    return res.status(400).json({
      error: `Invalid prefix. Allowed: ${ALLOWED_PREFIXES.join(", ")}`,
    });
  }

  const bucketName = process.env.R2_BUCKET_NAME;
  const publicBase = process.env.R2_PUBLIC_URL; // server-side, not VITE_ prefixed

  if (!bucketName || !publicBase) {
    return res.status(500).json({ error: "R2 environment variables not configured" });
  }

  try {
    const client = getS3();
    const urls = [];
    let continuationToken = undefined;

    // Paginate through all objects under the prefix
    do {
      const command = new ListObjectsV2Command({
        Bucket:            bucketName,
        Prefix:            prefix + "/",
        ContinuationToken: continuationToken,
        MaxKeys:           500,
      });

      const response = await client.send(command);

      for (const obj of response.Contents ?? []) {
        const key      = obj.Key ?? "";
        const filename = key.split("/").pop() ?? "";

        // Only include image files
        if (!/\.(jpg|jpeg|png|webp|gif|avif)$/i.test(filename)) continue;
        // Skip folder placeholder objects
        if (!filename) continue;

        urls.push(`${publicBase.replace(/\/$/, "")}/${key}`);
      }

      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;

    } while (continuationToken);

    urls.sort();

    // Cache for 5 minutes on Vercel edge, stale-while-revalidate 60s
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json({ urls });

  } catch (err) {
    console.error("[r2-list] error:", err);
    return res.status(502).json({ error: "Failed to list R2 objects" });
  }
}
