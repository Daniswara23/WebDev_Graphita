/*
  src/lib/supabase/fileUpload.ts — Shared helper untuk upload file ke Supabase Storage.
  Consolidate semua upload logic yang sebelumnya redundant di actions files.
  NOTE: Gunakan service_role key untuk bypass RLS di Storage (server-side only).
        Aman karena fungsi ini hanya dipanggil dari Server Actions.
*/

import { createClient } from "@supabase/supabase-js";

const BUCKETS = {
  pdf: "articles",
  image: "product-images",
  research: "research-reports",
} as const;

type BucketName = keyof typeof BUCKETS;

// Buat client khusus storage dengan service_role key (bypass RLS)
function getStorageClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File | null,
  allowedTypes: string[],
  maxSizeMB: number
): void {
  if (!file || file.size === 0) {
    throw new Error("File tidak valid.");
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Tipe file tidak diizinkan. Diizinkan: ${allowedTypes.join(", ")}.`);
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`Ukuran file maksimal ${maxSizeMB} MB.`);
  }
}

/**
 * Upload file ke Supabase Storage
 */
export async function uploadFile(
  bucket: BucketName,
  file: File,
  path?: string
): Promise<string> {
  const supabase = getStorageClient();
  const bucketName = BUCKETS[bucket];
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error("Gagal upload file: " + uploadError.message);
  }

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Delete file dari Supabase Storage
 */
export async function deleteFile(
  bucket: BucketName,
  fileUrl: string
): Promise<void> {
  try {
    const supabase = getStorageClient();
    const bucketName = BUCKETS[bucket];
    const urlParts = fileUrl.split(`/${bucketName}/`);
    
    if (urlParts.length > 1) {
      const filePath = `${bucketName}/${urlParts[1]}`;
      await supabase.storage.from(bucketName).remove([filePath]);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

/**
 * Upload PDF file (validasi tipe + size 10MB)
 */
export async function uploadPdf(file: File): Promise<string> {
  validateFile(file, ["application/pdf"], 10);
  return uploadFile("pdf", file, "articles");
}

/**
 * Upload Research PDF (validasi tipe + size 10MB)
 */
export async function uploadResearchPdf(file: File): Promise<string> {
  validateFile(file, ["application/pdf"], 10);
  return uploadFile("research", file, "research-reports");
}

/**
 * Upload Image file (validasi tipe + size 5MB)
 */
export async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    validateFile(file, ["image/jpeg", "image/png", "image/webp", "image/jpg"], 5);
    return uploadFile("image", file, "product-images");
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
}