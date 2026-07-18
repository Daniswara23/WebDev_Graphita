-- ============================================================
-- 014_fix_rls_grants_for_anon.sql
-- FIX: Grant SELECT on tables to anon role
-- Error 401 terjadi karena anon tidak punya grant meski policy sudah ada
-- ============================================================

-- Grant SELECT to anon for case_videos (video carousel di home)
GRANT SELECT ON public.case_videos TO anon;

-- Grant SELECT to anon for photo_galleries (dokumentasi)
GRANT SELECT ON public.photo_galleries TO anon;

-- Grant SELECT to anon for gallery_images (foto-foto dokumentasi)
GRANT SELECT ON public.gallery_images TO anon;

-- ============================================================
-- OPTIONAL: Verify policies exist
-- Run this query to check if policies are properly set:
-- SELECT * FROM pg_policies WHERE tablename IN ('case_videos', 'photo_galleries', 'gallery_images');
-- ============================================================