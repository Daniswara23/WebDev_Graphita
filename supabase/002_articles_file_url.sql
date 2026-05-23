-- Migration 002: add slug and file_url columns to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS file_url TEXT;

-- Generate slug untuk data artikel yang sudah ada (jika slug null)
UPDATE articles SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) WHERE slug IS NULL;

-- ============================================================
-- RLS POLICIES untuk admin CRUD articles
-- ============================================================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Admin (authenticated) bisa melakukan INSERT
DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
CREATE POLICY "admin_insert_articles" ON articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Admin (authenticated) bisa melakukan UPDATE
DROP POLICY IF EXISTS "admin_update_articles" ON articles;
CREATE POLICY "admin_update_articles" ON articles
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Admin (authenticated) bisa melakukan DELETE
DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
CREATE POLICY "admin_delete_articles" ON articles
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admin (authenticated) bisa SELECT semua articles (termasuk unpublished)
DROP POLICY IF EXISTS "admin_select_articles" ON articles;
CREATE POLICY "admin_select_articles" ON articles
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- INSTRUKSI SETUP STORAGE BUCKET articles + RLS POLICY
-- ============================================================
-- 1. Buka Supabase Dashboard → Storage
-- 2. Klik "New Bucket"
--    - Nama bucket: articles
--    - Public bucket: ✅ (centang)
--    - Klik "Create bucket"
--
-- 3. Setelah bucket dibuat, klik bucket "articles"
-- 4. Klik tab "Policies"
-- 5. Klik "New Policy" → "Custom policy for public access"
--    - Policy name: "Allow authenticated uploads"
--    - Allowed operations: INSERT, SELECT
--    - Target roles: authenticated
--    - USING expression: (bucket_id = 'articles'::text)
--    - WITH CHECK expression: (bucket_id = 'articles'::text)