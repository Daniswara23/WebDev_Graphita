-- ============================================================
-- 003_ARTICLES_RLS_POLICIES.SQL
-- Jalankan file ini di Supabase SQL Editor
-- ============================================================

-- Hapus dan buat ulang policy INSERT untuk admin
DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
CREATE POLICY "admin_insert_articles" ON articles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy SELECT untuk admin (bisa lihat semua termasuk unpublished)
DROP POLICY IF EXISTS "admin_select_articles" ON articles;
CREATE POLICY "admin_select_articles" ON articles
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy UPDATE untuk admin
DROP POLICY IF EXISTS "admin_update_articles" ON articles;
CREATE POLICY "admin_update_articles" ON articles
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy DELETE untuk admin
DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
CREATE POLICY "admin_delete_articles" ON articles
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- VERIFIKASI: Cek semua policy yang aktif di tabel articles
-- ============================================================
-- Jalankan query berikut untuk verifikasi:
-- SELECT * FROM pg_policies WHERE tablename = 'articles';