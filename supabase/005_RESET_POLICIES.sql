-- ============================================================
-- 005_RESET_POLICIES.SQL
-- Jalankan file ini di Supabase SQL Editor.
-- Aman dijalankan ulang — semua pakai DROP IF EXISTS.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. PASTIKAN TABEL admin_users ADA & RLS AKTIF
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        UNIQUE NOT NULL,
  full_name  text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────
-- 2. RESET POLICY: admin_users
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_read_admin_users" ON admin_users;
CREATE POLICY "admin_read_admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 3. RESET POLICY: articles
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_articles"    ON articles;
DROP POLICY IF EXISTS "admin_select_articles" ON articles;
DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
DROP POLICY IF EXISTS "admin_update_articles" ON articles;
DROP POLICY IF EXISTS "admin_delete_articles" ON articles;

CREATE POLICY "anon_read_articles" ON articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "admin_select_articles" ON articles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "admin_insert_articles" ON articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_articles" ON articles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_articles" ON articles
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 4. RESET POLICY: research_reports
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_research_reports"    ON research_reports;
DROP POLICY IF EXISTS "admin_insert_research_reports" ON research_reports;
DROP POLICY IF EXISTS "admin_update_research_reports" ON research_reports;
DROP POLICY IF EXISTS "admin_delete_research_reports" ON research_reports;

CREATE POLICY "anon_read_research_reports" ON research_reports
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_research_reports" ON research_reports
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_research_reports" ON research_reports
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_research_reports" ON research_reports
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 5. RESET POLICY: products
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_products"    ON products;
DROP POLICY IF EXISTS "admin_insert_products" ON products;
DROP POLICY IF EXISTS "admin_update_products" ON products;
DROP POLICY IF EXISTS "admin_delete_products" ON products;

-- Anon hanya lihat produk aktif; admin lihat semua
CREATE POLICY "anon_read_products" ON products
  FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "admin_insert_products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 6. RESET POLICY: contact_submissions
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "admin_read_contact_submissions"  ON contact_submissions;

-- Pengunjung bisa kirim pesan; admin bisa baca semua
CREATE POLICY "anon_insert_contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admin_read_contact_submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 7. RESET POLICY: stats
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_stats"    ON stats;
DROP POLICY IF EXISTS "admin_insert_stats" ON stats;
DROP POLICY IF EXISTS "admin_update_stats" ON stats;
DROP POLICY IF EXISTS "admin_delete_stats" ON stats;

CREATE POLICY "anon_read_stats" ON stats
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_stats" ON stats
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_stats" ON stats
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_stats" ON stats
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 8. RESET POLICY: home_services
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_home_services"    ON home_services;
DROP POLICY IF EXISTS "admin_insert_home_services" ON home_services;
DROP POLICY IF EXISTS "admin_update_home_services" ON home_services;
DROP POLICY IF EXISTS "admin_delete_home_services" ON home_services;

CREATE POLICY "anon_read_home_services" ON home_services
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_home_services" ON home_services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_home_services" ON home_services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_home_services" ON home_services
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 9. RESET POLICY: service_details
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_service_details"    ON service_details;
DROP POLICY IF EXISTS "admin_insert_service_details" ON service_details;
DROP POLICY IF EXISTS "admin_update_service_details" ON service_details;
DROP POLICY IF EXISTS "admin_delete_service_details" ON service_details;

CREATE POLICY "anon_read_service_details" ON service_details
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_service_details" ON service_details
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_service_details" ON service_details
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_service_details" ON service_details
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 10. RESET POLICY: case_studies
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_case_studies"    ON case_studies;
DROP POLICY IF EXISTS "admin_insert_case_studies" ON case_studies;
DROP POLICY IF EXISTS "admin_update_case_studies" ON case_studies;
DROP POLICY IF EXISTS "admin_delete_case_studies" ON case_studies;

CREATE POLICY "anon_read_case_studies" ON case_studies
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_case_studies" ON case_studies
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_case_studies" ON case_studies
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_case_studies" ON case_studies
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 11. RESET POLICY: testimonials
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_testimonials"    ON testimonials;
DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;

CREATE POLICY "anon_read_testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 12. RESET POLICY: standards
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "anon_read_standards"    ON standards;
DROP POLICY IF EXISTS "admin_insert_standards" ON standards;
DROP POLICY IF EXISTS "admin_update_standards" ON standards;
DROP POLICY IF EXISTS "admin_delete_standards" ON standards;

CREATE POLICY "anon_read_standards" ON standards
  FOR SELECT USING (true);

CREATE POLICY "admin_insert_standards" ON standards
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_standards" ON standards
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_standards" ON standards
  FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 13. INSERT admin pertama (skip kalau sudah ada)
-- ─────────────────────────────────────────────────────────────
INSERT INTO admin_users (email, full_name)
VALUES ('admin@grahitaadhisasmita.com', 'Admin Grahita')
ON CONFLICT (email) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- VERIFIKASI — uncomment untuk cek hasilnya
-- ─────────────────────────────────────────────────────────────
-- SELECT tablename, policyname, cmd FROM pg_policies ORDER BY tablename, policyname;
-- SELECT * FROM admin_users;
