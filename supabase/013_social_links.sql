-- ============================================================
-- 16. SOCIAL_LINKS — Link Media Sosial untuk halaman /contact
-- ============================================================

CREATE TABLE IF NOT EXISTS social_links (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  platform    text        NOT NULL,
  url         text        NOT NULL,
  icon_path   text        NOT NULL DEFAULT '/images/LinkedIn-logo.png',
  is_active   boolean     NOT NULL DEFAULT true,
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_social_links_platform ON social_links(platform);
CREATE INDEX IF NOT EXISTS idx_social_links_active_sort ON social_links(is_active, sort_order);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_social_links_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_social_links_updated_at ON social_links;
CREATE TRIGGER set_social_links_updated_at
  BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_social_links_updated_at();

-- Disable RLS for internal admin system (more permissive)
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;

-- Public read-only policy
DROP POLICY IF EXISTS "anon_read_social_links" ON social_links;
CREATE POLICY "anon_read_social_links" ON social_links FOR SELECT USING (is_active = true);

-- Admin full CRUD policies (permissive for internal admin system)
DROP POLICY IF EXISTS "admin_select_social_links" ON social_links;
CREATE POLICY "admin_select_social_links" ON social_links FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin_insert_social_links" ON social_links;
CREATE POLICY "admin_insert_social_links" ON social_links FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_social_links" ON social_links;
CREATE POLICY "admin_update_social_links" ON social_links FOR UPDATE USING (true);

DROP POLICY IF EXISTS "admin_delete_social_links" ON social_links;
CREATE POLICY "admin_delete_social_links" ON social_links FOR DELETE USING (true);
