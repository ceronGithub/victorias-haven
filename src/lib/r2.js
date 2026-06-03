/**
 * r2.js
 * Cloudflare R2 helper — generates public URLs for assets stored in R2.
 * R2 is used to serve gallery images and any uploaded media.
 * The public R2 bucket URL is loaded from environment variables.
 *
 * Usage:
 *   import { getR2Url } from '../lib/r2';
 *   const imageUrl = getR2Url('gallery/pool.jpg');
 */

const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

/**
 * getR2Url — builds a full public URL for an R2 object
 * @param {string} objectKey - the file path/key inside the R2 bucket
 * @returns {string} full public URL
 */
export function getR2Url(objectKey) {
  return `${R2_PUBLIC_URL}/${objectKey}`;
}
