-- ============================================================
-- 009_case_videos.sql
-- Tabel baru: case_videos
-- Digunakan untuk carousel video di section "Sekilas Tentang Kami"
-- Video disimpan sebagai link eksternal (YouTube, Vimeo, dll)
-- sehingga tidak membebani storage Supabase.
-- Jalankan di Supabase SQL Editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS case_videos (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,                 -- judul untuk admin / alt
  video_url   text        NOT NULL,                 -- URL YouTube / Vimeo / embed link
  sort_order  int         NOT NULL DEFAULT 0,       -- urutan tampil di carousel
  is_active   boolean     NOT NULL DEFAULT true,    -- toggle tampil/sembunyi
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE case_videos ENABLE ROW LEVEL SECURITY;

-- Publik (anon) hanya boleh baca video yang aktif
CREATE POLICY "anon_read_case_videos" ON case_videos
  FOR SELECT USING (is_active = true);

-- Admin (authenticated) — CRUD penuh
CREATE POLICY "admin_select_case_videos" ON case_videos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "admin_insert_case_videos" ON case_videos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_case_videos" ON case_videos
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_case_videos" ON case_videos
  FOR DELETE USING (auth.role() = 'authenticated');


-- ============================================================
-- GRANTS (cocokkan dengan 006_GRANT_PRIVILEGES.sql)
-- ============================================================
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_videos TO authenticated;
GRANT SELECT ON public.case_videos TO anon;
