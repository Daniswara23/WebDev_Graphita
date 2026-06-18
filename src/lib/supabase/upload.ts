/*
  src/lib/supabase/upload.ts — Shared helper untuk upload file ke Supabase Storage.
  Digunakan oleh publikasi (PDF), riset (PDF), dan toko (image).
*/

const BUCKETS: Record<string, string> = {
  pdf: "articles",
  image: "product-images",
};

export async function uploadFile(
  bucket: "pdf" | "image",
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const bucketName = BUCKETS[bucket];
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  // Import dinamis untuk menghindari circular dependency di server
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return null;
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
  return urlData.publicUrl;
}