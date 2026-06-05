-- ============================================================
-- 007_ADD_EXTERNAL_URL.SQL
-- Tambah kolom external_url untuk artikel yang berupa link eksternal
-- ============================================================

-- Tambah kolom external_url
ALTER TABLE articles ADD COLUMN IF NOT EXISTS external_url TEXT;

-- ============================================================
-- VERIFIKASI:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'articles';
