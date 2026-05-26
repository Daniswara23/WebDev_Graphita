-- ============================================================
-- 006_GRANT_PRIVILEGES.SQL
-- Fix: permission denied for table — PostgreSQL GRANT privileges
-- Jalankan di Supabase SQL Editor.
-- ============================================================
-- RLS policies sudah ada, tapi role belum punya akses tabel.
-- File ini memberi GRANT yang diperlukan.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. AUTHENTICATED (admin) — akses penuh ke semua tabel
--    RLS policies tetap berlaku sebagai filter baris
-- ─────────────────────────────────────────────────────────────
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- ─────────────────────────────────────────────────────────────
-- 2. ANON (pengunjung publik) — read-only + insert kontak
--    RLS policies tetap berlaku (misal: hanya artikel published)
-- ─────────────────────────────────────────────────────────────
GRANT SELECT ON public.articles            TO anon;
GRANT SELECT ON public.research_reports    TO anon;
GRANT SELECT ON public.products            TO anon;
GRANT SELECT ON public.home_services       TO anon;
GRANT SELECT ON public.service_details     TO anon;
GRANT SELECT ON public.case_studies        TO anon;
GRANT SELECT ON public.testimonials        TO anon;
GRANT SELECT ON public.standards           TO anon;
GRANT SELECT ON public.stats               TO anon;
GRANT INSERT ON public.contact_submissions TO anon;
