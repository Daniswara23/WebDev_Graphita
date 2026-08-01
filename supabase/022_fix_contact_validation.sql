-- ============================================================
-- 022_FIX_CONTACT_VALIDATION.sql
-- Perbaikan validasi kontak di level database.
-- ------------------------------------------------------------
-- 1. Perbaiki fn_count_words — kembalikan 0 (bukan NULL)
--    untuk input kosong/NULL, gunakan btrim (potong tab/newline).
-- 2. Pastikan CHECK constraints aktif (idempotent).
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. HELPER: Hitung jumlah kata (diperbaiki)
-- ─────────────────────────────────────────────────────────────
-- Sebelumnya menggunakan `WHERE trim(input_text) <> ''` yang
-- membuat fungsi mengembalikan NULL untuk input kosong.
-- Sekarang selalu mengembalikan int (0 untuk kosong/NULL).
CREATE OR REPLACE FUNCTION fn_count_words(input_text text)
RETURNS int
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(array_length(regexp_split_to_array(btrim(input_text), '\s+'), 1), 0)
$$;

-- ─────────────────────────────────────────────────────────────
-- 2. PASTIKAN CHECK CONSTRAINTS (idempotent)
-- ─────────────────────────────────────────────────────────────

-- Pesan maksimal 1000 kata (1-1000 kata, tidak boleh kosong)
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_message_word_limit;
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_message_word_limit
  CHECK (COALESCE(fn_count_words(message), 0) BETWEEN 1 AND 1000);

-- Name: 1-100 karakter (tidak boleh kosong/whitespace)
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_name_length;
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_name_length
  CHECK (char_length(trim(name)) BETWEEN 1 AND 100);

-- Email: format valid, maksimal 254 karakter (standar RFC 5321)
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_email_valid;
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_email_valid
  CHECK (email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND char_length(email) <= 254);

-- Organization: maksimal 200 karakter
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_organization_length;
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_organization_length
  CHECK (organization IS NULL OR char_length(organization) <= 200);

-- Request type: hanya nilai yang diizinkan
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_request_type_valid;
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_request_type_valid
  CHECK (request_type IN ('konsultasi', 'kolaborasi', 'umum'));

-- Service interest: hanya nilai yang diizinkan
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_service_interest_valid;
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_service_interest_valid
  CHECK (service_interest IN ('', 'pemetaan', 'pendampingan', 'solusi_tekno', 'publikasi', 'lainnya'));