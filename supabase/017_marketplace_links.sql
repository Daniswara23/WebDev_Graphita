-- ============================================================
-- 017_marketplace_links.sql
-- Tabel untuk menyimpan link marketplace global (Tokopedia & Shopee)
-- Digunakan di halaman /toko bagian "Marketplace terhubung"
-- ============================================================

CREATE TABLE IF NOT EXISTS marketplace_links (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  platform    text        NOT NULL UNIQUE,
  url         text,
  is_active   boolean     NOT NULL DEFAULT true,
  sort_order  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Insert default rows
INSERT INTO marketplace_links (platform, url, is_active, sort_order)
VALUES
  ('tokopedia', NULL, true, 1),
  ('shopee', NULL, true, 2)
ON CONFLICT (platform) DO NOTHING;

-- Enable RLS
ALTER TABLE marketplace_links ENABLE ROW LEVEL SECURITY;

-- RLS: read for all
CREATE POLICY "marketplace_links_select_anon"
  ON marketplace_links FOR SELECT
  USING (true);

-- RLS: insert/update/delete only for authenticated admin
CREATE POLICY "marketplace_links_insert_admin"
  ON marketplace_links FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "marketplace_links_update_admin"
  ON marketplace_links FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "marketplace_links_delete_admin"
  ON marketplace_links FOR DELETE
  USING (auth.role() = 'authenticated');

-- Grant permissions to roles (required for RLS to work)
GRANT SELECT ON public.marketplace_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marketplace_links TO authenticated;
