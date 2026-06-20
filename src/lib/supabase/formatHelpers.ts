/*
  src/lib/supabase/formatHelpers.ts — Shared formatting helpers.
  Consolidate slugify, validation, dan format functions yang redundant.
*/

/**
 * Generate URL-friendly slug from text
 * Implementation konsisten untuk semua tabel
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

/**
 * Validate external URL format
 */
export function validateExternalUrl(url: string): void {
  if (!url) {
    throw new Error("URL External wajib diisi.");
  }
  try {
    new URL(url);
  } catch {
    throw new Error("URL External tidak valid.");
  }
}

/**
 * Validate date string (YYYY-MM-DD format)
 */
export function validateDate(dateString: string): void {
  if (!dateString) return;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Format tanggal tidak valid.");
  }
}

/**
 * Parse sort order from form data
 */
export function parseSortOrder(value: unknown): number {
  const parsed = Number.parseInt(String(value ?? "0"), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Safely get string from FormData
 */
export function getFormString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "");
}

/**
 * Safely get trimmed string from FormData
 */
export function getFormTrimmedString(formData: FormData, key: string): string {
  return getFormString(formData, key).trim();
}

/**
 * Get checkbox value as boolean from FormData
 */
export function getFormBoolean(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

/**
 * Get file from FormData with type safety
 */
export function getFormFile(formData: FormData, key: string): File | null {
  const file = formData.get(key);
  return file instanceof File ? file : null;
}