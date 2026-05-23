-- ============================================================
-- 001_PORTAL_ADMIN.SQL — Setup database untuk portal admin
-- Jalankan file ini di Supabase SQL Editor (dashboard)
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. DROP redundant tables (dulu untuk portal mitra)
-- ─────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS project_documents CASCADE;
DROP TABLE IF EXISTS project_milestones CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS mitra_profiles CASCADE;

-- ─────────────────────────────────────────────────────────────
-- 2. CREATE admin_users table (whitelist email admin)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        UNIQUE NOT NULL,
  full_name  text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Hanya admin yang sudah login bisa membaca tabel admin_users
CREATE POLICY "admin_read_admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 3. RLS POLICIES untuk admin CRUD (authenticated users)
-- ─────────────────────────────────────────────────────────────

-- Articles
CREATE POLICY "admin_insert_articles" ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_articles" ON articles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_articles" ON articles FOR DELETE USING (auth.role() = 'authenticated');

-- Research reports
CREATE POLICY "admin_insert_research_reports" ON research_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_research_reports" ON research_reports FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_research_reports" ON research_reports FOR DELETE USING (auth.role() = 'authenticated');

-- Products
CREATE POLICY "admin_insert_products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_products" ON products FOR DELETE USING (auth.role() = 'authenticated');
-- Override anon SELECT biar admin bisa lihat product inactive
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

-- Contact submissions: admin bisa SELECT semua
CREATE POLICY "admin_read_contact_submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- Stats
CREATE POLICY "admin_insert_stats" ON stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_stats" ON stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_stats" ON stats FOR DELETE USING (auth.role() = 'authenticated');

-- Home services
CREATE POLICY "admin_insert_home_services" ON home_services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_home_services" ON home_services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_home_services" ON home_services FOR DELETE USING (auth.role() = 'authenticated');

-- Service details
CREATE POLICY "admin_insert_service_details" ON service_details FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_service_details" ON service_details FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_service_details" ON service_details FOR DELETE USING (auth.role() = 'authenticated');

-- Case studies
CREATE POLICY "admin_insert_case_studies" ON case_studies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_case_studies" ON case_studies FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_case_studies" ON case_studies FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Standards
CREATE POLICY "admin_insert_standards" ON standards FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin_update_standards" ON standards FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin_delete_standards" ON standards FOR DELETE USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- 4. INSERT admin pertama
--    Jalankan SETELAH akun dibuat di Authentication > Add User
-- ─────────────────────────────────────────────────────────────
INSERT INTO admin_users (email, full_name)
VALUES ('admin@grahitaadhisasmita.com', 'Admin Grahita');