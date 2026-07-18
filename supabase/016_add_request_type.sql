-- ============================================================
-- 016_add_request_type.sql
-- Tambah kolom request_type ke tabel contact_submissions
-- ============================================================

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS request_type text NOT NULL DEFAULT 'umum';