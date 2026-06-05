/*
  case-videos/embed-utils.ts
  Helper untuk konversi URL video menjadi URL embed.
  Dipisahkan dari actions.ts karena Server Action tidak boleh
  mengekspor fungsi non-async.
*/

/**
 * Konversi berbagai format URL YouTube / Vimeo menjadi URL embed.
 * Mendukung:
 *   - https://www.youtube.com/watch?v=XXXXX
 *   - https://youtu.be/XXXXX
 *   - https://www.youtube.com/shorts/XXXXX
 *   - https://www.youtube.com/embed/XXXXX
 *   - https://vimeo.com/XXXXX
 *   - URL embed lain yang sudah valid
 *
 * Return null jika tidak terdeteksi.
 */
export function toEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // YouTube watch
  const ytWatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // youtu.be
  const ytShort = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // YouTube shorts
  const ytShorts = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}`;

  // Sudah embed YouTube
  if (trimmed.includes("youtube.com/embed/")) return trimmed;

  // Vimeo
  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Sudah embed/iframe lain
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }

  return null;
}
