-- Fix: Hapus data duplikat di ecosystem_partners
-- Hanya simpan 1 record per (category, name), sisanya dihapus

-- 1. Buat tabel temporary berisi record unik yang akan disimpan
CREATE TEMP TABLE keep_partners AS
SELECT DISTINCT ON (category, name) id
FROM ecosystem_partners
ORDER BY category, name, sort_order;

-- 2. Hapus record duplikat yang TIDAK ada di keep_partners
DELETE FROM ecosystem_partners
WHERE id NOT IN (SELECT id FROM keep_partners);

-- 3. Reset sort_order agar berurutan 1,2,3... per kategori
WITH numbered AS (
  SELECT 
    id, 
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY sort_order) AS new_order
  FROM ecosystem_partners
)
UPDATE ecosystem_partners
SET sort_order = numbered.new_order
FROM numbered
WHERE ecosystem_partners.id = numbered.id;

-- 4. Verifikasi hasil
SELECT category, name, sort_order 
FROM ecosystem_partners 
ORDER BY category, sort_order;