-- ============================================================
-- 023_ADD_CONTACT_DELETE_POLICY.sql
-- Tambah RLS policy DELETE untuk admin di tabel contact_submissions.
-- ============================================================

DROP POLICY IF EXISTS "admin_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "admin_delete_contact_submissions"
  ON contact_submissions FOR DELETE
  USING (auth.role() = 'authenticated');