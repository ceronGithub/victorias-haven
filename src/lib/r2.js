/**
 * r2.js
 * Cloudflare R2 helpers for Victoria's Haven.
 *
 * getR2Url(key)        — builds a public URL for a known R2 object key.
 * fetchR2Urls(prefix)  — calls /api/r2-list to dynamically list all images
 *                        under a folder prefix. Runs server-side on Vercel;
 *                        R2 credentials never reach the browser.
 *
 * Usage:
 *   import { getR2Url, fetchR2Urls } from '../lib/r2';
 *
 *   // Static known key
 *   const url = getR2Url('gallery/pool-1.jpg');
 *
 *   // Dynamic listing
 *   const urls = await fetchR2Urls('gallery/guests');
 */

const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

/**
 * getR2Url — builds a full public URL for a known R2 object key.
 * @param {string} objectKey - the file path/key inside the R2 bucket
 * @returns {string}
 */
export function getR2Url(objectKey) {
  return `${R2_PUBLIC_URL}/${objectKey}`;
}

/**
 * fetchR2Urls — dynamically lists all image files under a folder prefix.
 * Calls the Vercel serverless function at /api/r2-list.
 * Safe: secret R2 keys live only on the server.
 *
 * @param {string} prefix - folder prefix, e.g. "gallery" | "gallery/rooms"
 * @returns {Promise<string[]>} array of full public URLs
 */
export async function fetchR2Urls(prefix) {
  try {
    const res = await fetch(`/api/r2-list?prefix=${encodeURIComponent(prefix)}`);
    if (!res.ok) {
      console.error(`[r2] fetchR2Urls failed for prefix="${prefix}":`, res.status);
      return [];
    }
    const data = await res.json();
    return data.urls ?? [];
  } catch (err) {
    console.error(`[r2] fetchR2Urls error for prefix="${prefix}":`, err);
    return [];
  }
}
