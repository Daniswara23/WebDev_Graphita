export type Product = {
  id: string;
  name: string;
  description: string;
  label: string | null;
  image_url: string | null;
  tokopedia_url: string | null;
  shopee_url: string | null;
};

export type MarketplaceLink = {
  id: string;
  platform: string;
  url: string | null;
  is_active: boolean;
  sort_order: number;
};