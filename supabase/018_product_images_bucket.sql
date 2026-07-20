-- ============================================================
-- SETUP STORAGE BUCKET UNTUK PRODUCT IMAGES
-- Bucket: product-images (untuk foto produk di toko)
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- 1. Buat bucket "product-images" (public, max 5MB, image types)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- 2. RLS policies untuk storage.objects pada bucket product-images

-- Allow public read access
CREATE POLICY "public_read_product_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated upload
CREATE POLICY "authenticated_upload_product_images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated delete
CREATE POLICY "authenticated_delete_product_images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

-- ============================================================
-- VERIFIKASI: Jalankan query ini untuk cek bucket sudah ada
-- ============================================================
-- SELECT id, name, public, file_size_limit, allowed_mime_types FROM storage.buckets;