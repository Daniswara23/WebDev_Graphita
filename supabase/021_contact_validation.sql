-- ============================================================
-- 021_CONTACT_VALIDATION.sql
-- Validasi input form kontak di level database
-- ------------------------------------------------------------
-- 1. Helper function: fn_count_words
-- 2. Bersihkan data lama yang melanggar
-- 3. Tambah CHECK constraints
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. HELPER: Hitung jumlah kata
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION fn_count_words(input_text text)
RETURNS int
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(array_length(regexp_split_to_array(trim(input_text), '\s+'), 1), 0)
  WHERE trim(input_text) <> '';
$$;

-- ─────────────────────────────────────────────────────────────
-- 2. BERSIHKAN DATA LAMA YANG MELANGGAR
-- ─────────────────────────────────────────────────────────────
-- Hapus pesan yang melebihi 1000 kata (kemungkinan besar spam)
DELETE FROM contact_submissions
WHERE COALESCE(fn_count_words(message), 0) > 1000;

-- Hapus email yang formatnya tidak valid
DELETE FROM contact_submissions
WHERE email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
   OR char_length(email) > 254;

-- Hapus name yang kosong / hanya whitespace
DELETE FROM contact_submissions
WHERE name IS NULL
   OR trim(name) = '';

-- Hapus message yang kosong / hanya whitespace
DELETE FROM contact_submissions
WHERE message IS NULL
   OR trim(message) = '';

-- Potong name yang terlalu panjang (agar data tetap terbaca)
UPDATE contact_submissions
SET name = left(name, 100)
WHERE char_length(name) > 100;

-- Potong organization yang terlalu panjang
UPDATE contact_submissions
SET organization = left(organization, 200)
WHERE char_length(organization) > 200;

-- Normalisasi nilai request_type yang tidak dikenal
UPDATE contact_submissions
SET request_type = 'umum'
WHERE request_type NOT IN ('konsultasi', 'kolaborasi', 'umum');

-- Normalisasi nilai service_interest yang tidak dikenal
UPDATE contact_submissions
SET service_interest = ''
WHERE service_interest NOT IN ('', 'pemetaan', 'pendampingan', 'solusi_tekno', 'publikasi', 'lainnya');

-- ─────────────────────────────────────────────────────────────
-- 3. TAMBAH CHECK CONSTRAINTS
-- ─────────────────────────────────────────────────────────────

-- Pesan maksimal 1000 kata
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