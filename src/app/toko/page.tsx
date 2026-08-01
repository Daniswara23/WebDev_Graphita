/*
  toko/page.tsx — Halaman /toko (server component)
  Data diambil dari tabel `products` dan `marketplace_links` di Supabase.
  Marketplace global menampilkan "Segera Hadir" jika url null.
  Tombol per produk tetap di-"hitamkan" (disabled) jika url null.
*/

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import TokoClient from "./toko-client";
import type { Product, MarketplaceLink } from "./types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toko & Produk",
  description:
    "Toko Pangan Asli PT Grahita Adhi Sasmita — produk pangan asli langsung dari petani dan UMKM lokal. Beli melalui Tokopedia, Shopee, atau channel e-commerce resmi.",
  alternates: {
    canonical: "https://grahitas.co.id/toko",
  },
  openGraph: {
    title: "Toko & Produk | PT Grahita Adhi Sasmita",
    description:
      "Produk pangan asli, langsung dari petani dan UMKM lokal. Beli melalui Tokopedia, Shopee, atau channel e-commerce resmi.",
    url: "https://grahitas.co.id/toko",
  },
};

export default async function TokoPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, description, label, image_url, tokopedia_url, shopee_url")
    .eq("is_active", true)
    .order("sort_order");

  const { data: marketplaceLinks } = await supabase
    .from("marketplace_links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  return (
    <>
      <Navbar />
      <TokoClient
        products={(products ?? []) as Product[]}
        marketplaceLinks={(marketplaceLinks ?? []) as MarketplaceLink[]}
      />
      <Footer />
    </>
  );
}