-- ============================================================
-- 020_UPDATE_ADMIN_EMAIL.sql — Hapus email admin lama
-- ============================================================
-- Email admin@grahitas.co.id sudah terlanjur terinsert.
-- Cukup hapus admin lama saja.
-- ============================================================

DELETE FROM admin_users WHERE email = 'admin@grahitaadhisasmita.com';
SELECT * FROM admin_users ORDER BY created_at DESC;