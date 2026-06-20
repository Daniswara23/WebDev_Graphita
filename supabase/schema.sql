-- ============================================================
-- SCHEMA SUPABASE — PT Grahita Adhi Sasmita (GAS)
-- Schema lengkap untuk seluruh aplikasi
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─────────────────────────────────────────────────────────────
-- 1. STATS (StatsBar di homepage)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  number_text text        NOT NULL,
  label       text        NOT NULL,
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 2. HOME_SERVICES (kartu layanan di homepage)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS home_services (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  num         text        NOT NULL,
  title       text        NOT NULL,
  description text        NOT NULL,
  icon_key    text        NOT NULL DEFAULT 'default',
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 3. SERVICE_DETAILS (halaman /services)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS service_details (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  description text        NOT NULL,
  features    text[]      NOT NULL DEFAULT '{}',
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 4. CASE_STUDIES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS case_studies (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  client      text        NOT NULL,
  challenge   text        NOT NULL,
  solution    text        NOT NULL,
  result      text        NOT NULL,
  image_url   text,
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 5. PRODUCTS (Toko)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  description   text        NOT NULL,
  label         text,
  tokopedia_url text,
  shopee_url    text,
  image_url     text,
  is_active     boolean     NOT NULL DEFAULT true,
  sort_order    int         NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 6. ARTICLES (halaman /insights - Publikasi)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text        NOT NULL,
  slug         text        UNIQUE,
  excerpt      text        NOT NULL,
  content      text,
  category     text        NOT NULL,
  cover_image  text,
  file_url     text,
  external_url text,
  is_published boolean     NOT NULL DEFAULT true,
  published_at date,
  sort_order   int         NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at untuk articles
CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_articles_updated_at ON articles;
CREATE TRIGGER set_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_articles_updated_at();

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at);


-- ─────────────────────────────────────────────────────────────
-- 7. RESEARCH_REPORTS (halaman /insights - Riset)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS research_reports (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text        NOT NULL,
  subtitle   text        NOT NULL DEFAULT '',
  year       int         NOT NULL,
  category   text        NOT NULL,
  file_url   text,
  is_published boolean    NOT NULL DEFAULT true,
  sort_order int         NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 8. STANDARDS (Etos3T)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS standards (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  description text        NOT NULL,
  details     text        NOT NULL,
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 9. TESTIMONIALS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  quote      text        NOT NULL,
  author_name text       NOT NULL,
  author_title text,
  company    text,
  is_featured boolean    NOT NULL DEFAULT false,
  sort_order int         NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 10. ECOSYSTEM_PARTNERS (Kolaborasi Multipihak)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecosystem_partners (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  category    text        NOT NULL,
  name        text        NOT NULL,
  description text        NOT NULL,
  icon_svg    text        NOT NULL DEFAULT 'default',
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 11. ECOSYSTEM_CASE_STUDIES (studi kasus proyek)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecosystem_case_studies (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  client      text        NOT NULL,
  sector      text        NOT NULL,
  summary     text        NOT NULL,
  impact      text        NOT NULL,
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 12. CONTACT_SUBMISSIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text        NOT NULL,
  email            text        NOT NULL,
  organization     text,
  phone            text,
  service_interest text,
  message          text        NOT NULL,
  status           text        NOT NULL DEFAULT 'baru',
  created_at       timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 13. CASE_VIDEOS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS case_videos (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  video_url   text        NOT NULL,
  sort_order  int         NOT NULL DEFAULT 0,
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 14. PHOTO_GALLERIES (Dokumentasi Kegiatan)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS photo_galleries (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text        NOT NULL,
  slug          text        NOT NULL UNIQUE,
  description   text,
  location      text,
  event_date    date,
  is_published  boolean     DEFAULT false,
  sort_order    int         DEFAULT 0,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id    uuid        REFERENCES photo_galleries(id) ON DELETE CASCADE NOT NULL,
  image_url     text        NOT NULL,
  caption       text,
  sort_order    int         DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

-- Index untuk photo galleries
CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery_id ON gallery_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_photo_galleries_published_sort ON photo_galleries(is_published, sort_order);

-- Auto-update updated_at untuk photo_galleries
CREATE OR REPLACE FUNCTION update_photo_galleries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_photo_galleries_updated_at ON photo_galleries;
CREATE TRIGGER set_photo_galleries_updated_at
  BEFORE UPDATE ON photo_galleries
  FOR EACH ROW EXECUTE FUNCTION update_photo_galleries_updated_at();


-- ─────────────────────────────────────────────────────────────
-- 15. ADMIN_USERS (Whitelist admin untuk portal)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        UNIQUE NOT NULL,
  full_name  text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS pada semua tabel
ALTER TABLE stats               ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_details     ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products            ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports    ENABLE ROW LEVEL SECURITY;
ALTER TABLE standards           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials        ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_partners  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_videos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_galleries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images      ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users         ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────
-- PUBLIC/ANON POLICIES (Read-only untuk publik)
-- ─────────────────────────────────────────────────────────────

-- Stats
DROP POLICY IF EXISTS "anon_read_stats" ON stats;
CREATE POLICY "anon_read_stats" ON stats FOR SELECT USING (true);

-- Home Services
DROP POLICY IF EXISTS "anon_read_home_services" ON home_services;
CREATE POLICY "anon_read_home_services" ON home_services FOR SELECT USING (true);

-- Service Details
DROP POLICY IF EXISTS "anon_read_service_details" ON service_details;
CREATE POLICY "anon_read_service_details" ON service_details FOR SELECT USING (true);

-- Case Studies
DROP POLICY IF EXISTS "anon_read_case_studies" ON case_studies;
CREATE POLICY "anon_read_case_studies" ON case_studies FOR SELECT USING (true);

-- Products (hanya yang aktif)
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT USING (is_active = true);

-- Articles (hanya yang published)
DROP POLICY IF EXISTS "anon_read_articles" ON articles;
CREATE POLICY "anon_read_articles" ON articles FOR SELECT USING (is_published = true);

-- Research Reports (hanya yang published)
DROP POLICY IF EXISTS "anon_read_research_reports" ON research_reports;
CREATE POLICY "anon_read_research_reports" ON research_reports FOR SELECT USING (is_published = true);

-- Standards
DROP POLICY IF EXISTS "anon_read_standards" ON standards;
CREATE POLICY "anon_read_standards" ON standards FOR SELECT USING (true);

-- Testimonials
DROP POLICY IF EXISTS "anon_read_testimonials" ON testimonials;
CREATE POLICY "anon_read_testimonials" ON testimonials FOR SELECT USING (true);

-- Ecosystem Partners
DROP POLICY IF EXISTS "anon_read_ecosystem_partners" ON ecosystem_partners;
CREATE POLICY "anon_read_ecosystem_partners" ON ecosystem_partners FOR SELECT USING (true);

-- Ecosystem Case Studies
DROP POLICY IF EXISTS "anon_read_ecosystem_case_studies" ON ecosystem_case_studies;
CREATE POLICY "anon_read_ecosystem_case_studies" ON ecosystem_case_studies FOR SELECT USING (true);

-- Case Videos (hanya yang aktif)
DROP POLICY IF EXISTS "anon_read_case_videos" ON case_videos;
CREATE POLICY "anon_read_case_videos" ON case_videos FOR SELECT USING (is_active = true);

-- Photo Galleries (hanya yang published)
DROP POLICY IF EXISTS "anon_read_photo_galleries" ON photo_galleries;
CREATE POLICY "anon_read_photo_galleries" ON photo_galleries FOR SELECT USING (is_published = true);

-- Gallery Images (melalui photo_galleries yang published)
DROP POLICY IF EXISTS "anon_read_gallery_images" ON gallery_images;
CREATE POLICY "anon_read_gallery_images" ON gallery_images FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM photo_galleries
    WHERE photo_galleries.id = gallery_images.gallery_id
    AND photo_galleries.is_published = true
  )
);

-- Contact Submissions (hanya INSERT untuk publik)
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────
-- ADMIN POLICIES (CRUD penuh untuk authenticated users)
-- ─────────────────────────────────────────────────────────────

-- Admin bisa baca semua data
DROP POLICY IF EXISTS "admin_select_stats" ON stats;
CREATE POLICY "admin_select_stats" ON stats FOR SELECT USING (auth.role() = 'authenticated');

-- Articles - Full CRUD
DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
CREATE POLICY "admin_insert_articles" ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_articles" ON articles;
CREATE POLICY "admin_update_articles" ON articles FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
CREATE POLICY "admin_delete_articles" ON articles FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_articles" ON articles;
CREATE POLICY "admin_select_articles" ON articles FOR SELECT USING (auth.role() = 'authenticated');

-- Research Reports - Full CRUD
DROP POLICY IF EXISTS "admin_insert_research_reports" ON research_reports;
CREATE POLICY "admin_insert_research_reports" ON research_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_research_reports" ON research_reports;
CREATE POLICY "admin_update_research_reports" ON research_reports FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_research_reports" ON research_reports;
CREATE POLICY "admin_delete_research_reports" ON research_reports FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_research_reports" ON research_reports;
CREATE POLICY "admin_select_research_reports" ON research_reports FOR SELECT USING (auth.role() = 'authenticated');

-- Products - Full CRUD (admin bisa lihat inactive juga)
DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_products" ON products;
CREATE POLICY "admin_select_products" ON products FOR SELECT USING (auth.role() = 'authenticated');

-- Contact Submissions - Admin bisa baca semua
DROP POLICY IF EXISTS "admin_select_contact_submissions" ON contact_submissions;
CREATE POLICY "admin_select_contact_submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_contact_submissions" ON contact_submissions;
CREATE POLICY "admin_update_contact_submissions" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');

-- Stats - Full CRUD
DROP POLICY IF EXISTS "admin_insert_stats" ON stats;
CREATE POLICY "admin_insert_stats" ON stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_stats" ON stats;
CREATE POLICY "admin_update_stats" ON stats FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_stats" ON stats;
CREATE POLICY "admin_delete_stats" ON stats FOR DELETE USING (auth.role() = 'authenticated');

-- Home Services - Full CRUD
DROP POLICY IF EXISTS "admin_insert_home_services" ON home_services;
CREATE POLICY "admin_insert_home_services" ON home_services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_home_services" ON home_services;
CREATE POLICY "admin_update_home_services" ON home_services FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_home_services" ON home_services;
CREATE POLICY "admin_delete_home_services" ON home_services FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_home_services" ON home_services;
CREATE POLICY "admin_select_home_services" ON home_services FOR SELECT USING (auth.role() = 'authenticated');

-- Service Details - Full CRUD
DROP POLICY IF EXISTS "admin_insert_service_details" ON service_details;
CREATE POLICY "admin_insert_service_details" ON service_details FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_service_details" ON service_details;
CREATE POLICY "admin_update_service_details" ON service_details FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_service_details" ON service_details;
CREATE POLICY "admin_delete_service_details" ON service_details FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_service_details" ON service_details;
CREATE POLICY "admin_select_service_details" ON service_details FOR SELECT USING (auth.role() = 'authenticated');

-- Case Studies - Full CRUD
DROP POLICY IF EXISTS "admin_insert_case_studies" ON case_studies;
CREATE POLICY "admin_insert_case_studies" ON case_studies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_case_studies" ON case_studies;
CREATE POLICY "admin_update_case_studies" ON case_studies FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_case_studies" ON case_studies;
CREATE POLICY "admin_delete_case_studies" ON case_studies FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_case_studies" ON case_studies;
CREATE POLICY "admin_select_case_studies" ON case_studies FOR SELECT USING (auth.role() = 'authenticated');

-- Testimonials - Full CRUD
DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_testimonials" ON testimonials;
CREATE POLICY "admin_select_testimonials" ON testimonials FOR SELECT USING (auth.role() = 'authenticated');

-- Standards - Full CRUD
DROP POLICY IF EXISTS "admin_insert_standards" ON standards;
CREATE POLICY "admin_insert_standards" ON standards FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_standards" ON standards;
CREATE POLICY "admin_update_standards" ON standards FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_standards" ON standards;
CREATE POLICY "admin_delete_standards" ON standards FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_standards" ON standards;
CREATE POLICY "admin_select_standards" ON standards FOR SELECT USING (auth.role() = 'authenticated');

-- Ecosystem Partners - Full CRUD
DROP POLICY IF EXISTS "admin_insert_ecosystem_partners" ON ecosystem_partners;
CREATE POLICY "admin_insert_ecosystem_partners" ON ecosystem_partners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_ecosystem_partners" ON ecosystem_partners;
CREATE POLICY "admin_update_ecosystem_partners" ON ecosystem_partners FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_ecosystem_partners" ON ecosystem_partners;
CREATE POLICY "admin_delete_ecosystem_partners" ON ecosystem_partners FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_ecosystem_partners" ON ecosystem_partners;
CREATE POLICY "admin_select_ecosystem_partners" ON ecosystem_partners FOR SELECT USING (auth.role() = 'authenticated');

-- Ecosystem Case Studies - Full CRUD
DROP POLICY IF EXISTS "admin_insert_ecosystem_case_studies" ON ecosystem_case_studies;
CREATE POLICY "admin_insert_ecosystem_case_studies" ON ecosystem_case_studies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_ecosystem_case_studies" ON ecosystem_case_studies;
CREATE POLICY "admin_update_ecosystem_case_studies" ON ecosystem_case_studies FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_ecosystem_case_studies" ON ecosystem_case_studies;
CREATE POLICY "admin_delete_ecosystem_case_studies" ON ecosystem_case_studies FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_ecosystem_case_studies" ON ecosystem_case_studies;
CREATE POLICY "admin_select_ecosystem_case_studies" ON ecosystem_case_studies FOR SELECT USING (auth.role() = 'authenticated');

-- Case Videos - Full CRUD
DROP POLICY IF EXISTS "admin_insert_case_videos" ON case_videos;
CREATE POLICY "admin_insert_case_videos" ON case_videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_case_videos" ON case_videos;
CREATE POLICY "admin_update_case_videos" ON case_videos FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_case_videos" ON case_videos;
CREATE POLICY "admin_delete_case_videos" ON case_videos FOR DELETE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_select_case_videos" ON case_videos;
CREATE POLICY "admin_select_case_videos" ON case_videos FOR SELECT USING (auth.role() = 'authenticated');

-- Photo Galleries - Full CRUD untuk admin
DROP POLICY IF EXISTS "admin_select_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_select_photo_galleries" ON photo_galleries FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_insert_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_insert_photo_galleries" ON photo_galleries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_update_photo_galleries" ON photo_galleries FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_photo_galleries" ON photo_galleries;
CREATE POLICY "admin_delete_photo_galleries" ON photo_galleries FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery Images - Full CRUD untuk admin
DROP POLICY IF EXISTS "admin_select_gallery_images" ON gallery_images;
CREATE POLICY "admin_select_gallery_images" ON gallery_images FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_insert_gallery_images" ON gallery_images;
CREATE POLICY "admin_insert_gallery_images" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_update_gallery_images" ON gallery_images;
CREATE POLICY "admin_update_gallery_images" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "admin_delete_gallery_images" ON gallery_images;
CREATE POLICY "admin_delete_gallery_images" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

-- Admin Users - Hanya authenticated bisa baca
DROP POLICY IF EXISTS "admin_select_admin_users" ON admin_users;
CREATE POLICY "admin_select_admin_users" ON admin_users FOR SELECT USING (auth.role() = 'authenticated');