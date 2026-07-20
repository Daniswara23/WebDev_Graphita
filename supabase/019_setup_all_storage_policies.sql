-- ============================================================
-- SETUP STORAGE POLICIES LENGKAP UNTUK SEMUA BUCKET
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- 1. Artikel / Publikasi PDF
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('articles', 'articles', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_articles" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_upload_articles" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_delete_articles" ON storage.objects;

CREATE POLICY "public_read_articles" ON storage.objects
  FOR SELECT USING (bucket_id = 'articles');

CREATE POLICY "authenticated_upload_articles" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'articles'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "authenticated_delete_articles" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'articles'
    AND auth.role() = 'authenticated'
  );

-- 2. Laporan Riset PDF
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('research-reports', 'research-reports', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_research_reports" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_upload_research_reports" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_delete_research_reports" ON storage.objects;

CREATE POLICY "public_read_research_reports" ON storage.objects
  FOR SELECT USING (bucket_id = 'research-reports');

CREATE POLICY "authenticated_upload_research_reports" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'research-reports'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "authenticated_delete_research_reports" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'research-reports'
    AND auth.role() = 'authenticated'
  );

-- 3. Foto Produk
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_upload_product_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_delete_product_images" ON storage.objects;

CREATE POLICY "public_read_product_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "authenticated_upload_product_images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "authenticated_delete_product_images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );
