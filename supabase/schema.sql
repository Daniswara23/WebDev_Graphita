-- ============================================================
-- SCHEMA SUPABASE — PT Grahita Adhi Sasmita (GAS)
-- Jalankan file ini di Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─────────────────────────────────────────────────────────────
-- 1. STATS (StatsBar di homepage)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  number_text text        NOT NULL,          -- contoh: "50+", "98%"
  label       text        NOT NULL,          -- contoh: "Portofolio visual"
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 2. HOME_SERVICES (6 kartu layanan di homepage)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS home_services (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  num         text        NOT NULL,          -- "01" s/d "06"
  title       text        NOT NULL,
  description text        NOT NULL,
  icon_key    text        NOT NULL DEFAULT 'default',  -- pemetaan ikon di frontend
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 3. SERVICE_DETAILS (halaman /services — 4 layanan detail)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS service_details (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  description text        NOT NULL,
  features    text[]      NOT NULL DEFAULT '{}',  -- array fitur bullet-point
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 4. CASE_STUDIES (section "Sekilas Tentang Kami" di homepage)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS case_studies (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  client      text        NOT NULL,          -- field "Pendirian"
  challenge   text        NOT NULL,          -- field "Deskripsi"
  solution    text        NOT NULL,          -- field "Komitmen SDGs"
  result      text        NOT NULL,          -- field "Dampak"
  image_url   text,                          -- path gambar, contoh: "/images/case1.jpg"
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 5. PRODUCTS (Toko — /toko dan StorePreview)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  description   text        NOT NULL,
  price         text        NOT NULL,        -- disimpan sebagai teks: "Rp 85.000/kg"
  label         text,                        -- "Best seller", "Terlaris", dst.
  tokopedia_url text,
  shopee_url    text,
  image_url     text,                        -- untuk gambar produk mendatang
  is_active     boolean     NOT NULL DEFAULT true,
  sort_order    int         NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 6. ARTICLES (halaman /insights — Blog & Artikel)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text        NOT NULL,
  excerpt      text        NOT NULL,
  category     text        NOT NULL,
  published_at date        NOT NULL,
  content      text,                         -- body artikel lengkap (untuk halaman detail nanti)
  is_published boolean     NOT NULL DEFAULT true,
  sort_order   int         NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 7. RESEARCH_REPORTS (halaman /insights — Laporan Riset)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS research_reports (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text        NOT NULL,
  subtitle   text        NOT NULL,
  year       int         NOT NULL,
  category   text        NOT NULL,
  file_url   text,                           -- link unduh PDF laporan
  sort_order int         NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 8. STANDARDS (Etos3T — "Cara kami bekerja", 3 kartu expandable)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS standards (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  description text        NOT NULL,          -- teks ringkas yang selalu terlihat
  details     text        NOT NULL,          -- teks panjang saat expand
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 9. TESTIMONIALS (modal popup dari tombol "Lihat testimoni mitra")
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  quote      text        NOT NULL,
  author     text        NOT NULL,
  company    text        NOT NULL,
  sort_order int         NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────────────────────
-- 10. CONTACT_SUBMISSIONS (kiriman formulir kontak)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL,
  company    text,
  message    text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE stats               ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_details     ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products            ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports    ENABLE ROW LEVEL SECURITY;
ALTER TABLE standards           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;


-- Tabel konten: boleh dibaca publik (anon)
CREATE POLICY "anon_read_stats"            ON stats            FOR SELECT USING (true);
CREATE POLICY "anon_read_home_services"    ON home_services    FOR SELECT USING (true);
CREATE POLICY "anon_read_service_details"  ON service_details  FOR SELECT USING (true);
CREATE POLICY "anon_read_case_studies"     ON case_studies     FOR SELECT USING (true);
CREATE POLICY "anon_read_products"         ON products         FOR SELECT USING (is_active = true);
CREATE POLICY "anon_read_articles"         ON articles         FOR SELECT USING (is_published = true);
CREATE POLICY "anon_read_research_reports" ON research_reports FOR SELECT USING (true);
CREATE POLICY "anon_read_standards"        ON standards        FOR SELECT USING (true);
CREATE POLICY "anon_read_testimonials"     ON testimonials     FOR SELECT USING (true);

-- Formulir kontak: publik hanya boleh INSERT, tidak bisa baca kiriman orang lain
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT WITH CHECK (true);
-- Untuk admin dashboard (opsional): aktifkan dengan service_role key
-- CREATE POLICY "service_read_contact" ON contact_submissions FOR SELECT USING (auth.role() = 'service_role');
