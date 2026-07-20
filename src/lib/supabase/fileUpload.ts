/*
  src/lib/supabase/fileUpload.ts — Shared helper untuk upload file ke Supabase Storage.
  Consolidate semua upload logic yang sebelumnya redundant di actions files.
  
  NOTE: Gunakan service_role key untuk bypass RLS di Storage (server-side only).
        Aman karena fungsi ini hanya dipanggil dari Server Actions.
        Lalu gunakan Supabase client dengan service_role key untuk upload/delete.
*/

import { createClient } from "@supabase/supabase-js";

const BUCKETS = {
  pdf: "articles",
  image: "product-images",
  research: "research-reports",
} as const;

type BucketName = keyof typeof BUCKETS;

function getStorageClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase credentials. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  console.log("[Storage] Creating client with URL:", url, "Key present:", !!serviceKey);
  return createClient(url, serviceKey);
}

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

async function withRetry<T>(fn: () => Promise<T>, retries = 2, delayMs = 800): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Upload failed after retries.");
}

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

  const upload = async () => {
    console.log("[Storage] Upload attempt:", { bucket: bucketName, filePath, fileSize: file.size, fileType: file.type });
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("[Storage] Upload error:", uploadError);
      throw new Error("Gagal upload file: " + uploadError.message);
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  return withRetry(upload);
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
      const { error: removeError } = await supabase.storage.from(bucketName).remove([filePath]);

      if (removeError) {
        console.error("Storage delete error:", removeError);
      }
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