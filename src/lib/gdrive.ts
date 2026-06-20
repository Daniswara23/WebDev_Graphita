/*
  src/lib/gdrive.ts — Universal image URL helper
  Mendukung URL gambar dari berbagai sumber:
  - ImgBB (i.ibb.co)
  - Google Drive (via "Copy image address" → lh3.googleusercontent.com)
  - Cloudinary, Unsplash, atau URL gambar langsung apapun
  
  Fungsi ini HANYA melakukan trim + validasi sederhana,
  tidak mengubah URL kecuali yang jelas-jelas bukan URL gambar.
*/

export function prepareImageUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  // Kalau sudah berupa URL gambar langsung, return apa adanya
  if (isLikelyImageUrl(trimmed)) {
    return trimmed;
  }

  // Kalau cuma ID doang, return apa adanya (biar user yang tau formatnya)
  return trimmed;
}

// Alias untuk kompatibilitas dengan kode yang sebelumnya pakai toDirectImageUrl
export const toDirectImageUrl = prepareImageUrl;

function isLikelyImageUrl(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const trimmed = input.trim();
  
  // Match URL yang jelas merupakan CDN gambar
  const imageDomains = [
    "i.ibb.co",
    "lh3.googleusercontent.com",
    "lh4.googleusercontent.com",
    "lh5.googleusercontent.com",
    "lh6.googleusercontent.com",
    "googleusercontent.com",
    "cloudinary.com",
    "res.cloudinary.com",
    "unsplash.com",
    "images.unsplash.com",
    "i.imgur.com",
    "p3-juejin.byteimg.com",
  ];
  
  const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(trimmed);
  const isKnownImageDomain = imageDomains.some((domain) => trimmed.includes(domain));
  const isHttpUrl = /^https?:\/\//i.test(trimmed);
  
  return isHttpUrl && (hasImageExtension || isKnownImageDomain);
}

export function parseGoogleDriveId(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) return trimmed;
  
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  
  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch) return dMatch[1];
  
  return null;
}