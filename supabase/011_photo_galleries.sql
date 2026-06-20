-- ============================================================
-- MIGRATION: Photo Galleries (Dokumentasi Kegiatan)
-- Tabel untuk menyimpan event/kegiatan beserta foto-fotonya
-- ============================================================

-- 1. Create photo_galleries table
CREATE TABLE IF NOT EXISTS photo_galleries (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  location      TEXT,
  event_date    DATE,
  is_published  BOOLEAN DEFAULT false,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- 2. Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id    UUID REFERENCES photo_galleries(id) ON DELETE CASCADE NOT NULL,
  image_url     TEXT NOT NULL,
  caption       TEXT,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 3. Index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery_id ON gallery_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_photo_galleries_published_sort ON photo_galleries(is_published, sort_order);

-- 4. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_photo_galleries_updated_at ON photo_galleries;
CREATE TRIGGER set_photo_galleries_updated_at
  BEFORE UPDATE ON photo_galleries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable RLS
ALTER TABLE photo_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies (drop existing first for idempotency)

-- Anon/public: bisa SELECT hanya yang published
DROP POLICY IF EXISTS "anon_read_photo_galleries" ON photo_galleries;
CREATE POLICY "anon_read_photo_galleries" ON photo_galleries
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "anon_read_gallery_images" ON gallery_images;
CREATE POLICY "anon_read_gallery_images" ON gallery_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM photo_galleries
      WHERE photo_galleries.id = gallery_images.gallery_id
      AND photo_galleries.is_published = true
    )
  );

-- Admin (authenticated) — CRUD penuh
DROP POLICY IF EXISTS "admin_select_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_select_photo_galleries" ON photo_galleries
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_insert_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_insert_photo_galleries" ON photo_galleries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_update_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_update_photo_galleries" ON photo_galleries
  FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_delete_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_delete_photo_galleries" ON photo_galleries
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admin CRUD for gallery_images
DROP POLICY IF EXISTS "admin_select_gallery_images" ON gallery_images;
CREATE POLICY "admin_select_gallery_images" ON gallery_images
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_insert_gallery_images" ON gallery_images;
CREATE POLICY "admin_insert_gallery_images" ON gallery_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_update_gallery_images" ON gallery_images;
CREATE POLICY "admin_update_gallery_images" ON gallery_images
  FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_delete_gallery_images" ON gallery_images;
CREATE POLICY "admin_delete_gallery_images" ON gallery_images
  FOR DELETE USING (auth.role() = 'authenticated');