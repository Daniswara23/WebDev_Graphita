-- ============================================================
-- SETUP STORAGE BUCKETS UNTUK RISET DAN PUBLIKASI
-- VERSI FIXED — Hanya create bucket, tanpa alter storage.objects
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

-- 3. Verifikasi bucket sudah terbuat
-- SELECT id, name, public FROM storage.buckets;

-- ============================================================
-- SETELAH INI: Setup Storage Policies via Dashboard
-- Buka: Storage -> Buckets -> pilih bucket -> Policies
-- Buat policy untuk anon/public sesuai gambar di dashboard
-- ============================================================