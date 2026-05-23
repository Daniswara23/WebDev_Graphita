-- ============================================================
-- 004_FIX_ALL.SQL — JALANKAN SEKALIGUS di Supabase SQL Editor
-- ============================================================
-- File ini menggabungkan semua perubahan yang diperlukan.
-- Jalankan seluruh file ini SEKALIGUS di SQL Editor.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. TAMBAH KOLOM slug & file_url di articles
-- ─────────────────────────────────────────────────────────────
ALTER TABLE articles ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS file_url TEXT;

-- Generate slug untuk data artikel yang sudah ada
UPDATE articles SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) WHERE slug IS NULL;

-- ─────────────────────────────────────────────────────────────
-- 2. HAPUS SEMUA POLICY LAMA & BUAT ULANG UNTUK articles
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
DROP POLICY IF EXISTS "admin_update_articles" ON articles;
DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
DROP POLICY IF EXISTS "admin_select_articles" ON articles;
DROP POLICY IF EXISTS "anon_read_articles" ON articles;

-- Anon/public: bisa SELECT hanya yang published
CREATE POLICY "anon_read_articles" ON articles
  FOR SELECT
  USING (is_published = true);

-- Authenticated (admin): bisa SELECT, INSERT, UPDATE, DELETE semua
CREATE POLICY "admin_insert_articles" ON articles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_select_articles" ON articles
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_articles" ON articles
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_articles" ON articles
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 3. VERIFIKASI
-- ─────────────────────────────────────────────────────────────
-- SELECT * FROM pg_policies WHERE tablename = 'articles';
-- SELECT slug, file_url, title FROM articles LIMIT 5;