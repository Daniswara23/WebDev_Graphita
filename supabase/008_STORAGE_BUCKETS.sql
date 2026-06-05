-- ============================================================
-- SETUP STORAGE BUCKETS UNTUK RISET DAN PUBLIKASI
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- 1. Buat bucket "research-reports" (untuk laporan riset)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('research-reports', 'research-reports', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- 2. Buat bucket "articles" (untuk artikel/publikasi PDF)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('articles', 'articles', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- 3. RLS policies untuk storage.objects

-- Allow public read access ke semua file
CREATE POLICY "Public read storage" ON storage.objects
  FOR SELECT USING (bucket_id IN ('research-reports', 'articles'));

-- Allow public upload access
CREATE POLICY "Public upload storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('research-reports', 'articles'));

-- Allow public delete access (untuk update/replace file)
CREATE POLICY "Public delete storage" ON storage.objects
  FOR DELETE USING (bucket_id IN ('research-reports', 'articles'));

-- Allow public update access (untuk replace file)
CREATE POLICY "Public update storage" ON storage.objects
  FOR UPDATE USING (bucket_id IN ('research-reports', 'articles'));

-- 4. Enable RLS pada storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- VERIFIKASI: Jalankan query ini untuk cek bucket sudah ada
-- ============================================================
-- SELECT id, name, public FROM storage.buckets;
