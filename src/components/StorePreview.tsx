"use client";

/*
  StorePreview.tsx — PREVIEW PRODUK DI HOMEPAGE
  Data diambil dari tabel `products` di Supabase.
  Tampilan tidak berubah.
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  label: string | null;
};

export default function StorePreview() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, description, price, label")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  return (
    <section style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "42px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Produk Asli & Terpercaya
          </span>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, color: "var(--white)", textAlign: "center", maxWidth: "720px" }}>
            Belanja pangan asli langsung dari mitra lokal, terhubung dengan Tokopedia dan Shopee.
          </h2>
          <p style={{ maxWidth: "720px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, textAlign: "center", fontSize: "var(--text-lg)" }}>
            Jelajah produk pilihan dan dapatkan jaminan kualitas asli. Setiap produk di toko kami membawa cerita petani dan UMKM Indonesia.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "38px" }}>
          {products.map((product) => (
            <Link
              key={product.id}
              href="/toko"
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  padding: "40px 28px",
                  borderRadius: "16px",
                  border: "1px solid rgba(201,147,58,0.25)",
                  background: "rgba(255,255,255,0.03)",
                  transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,147,58,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(201,147,58,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(201,147,58,0.25)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--gold-light)" }}>
                    {product.label}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--white)", fontFamily: "'Times New Roman', serif" }}>
                    {product.price}
                  </span>
                </div>
                <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--white)", marginBottom: "14px" }}>
                  {product.name}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "26px" }}>
                  {product.description}
                </p>
                <div style={{ fontSize: "10px", letterSpacing: "0.5px", textTransform: "none", color: "var(--gold-light)", opacity: 0.85 }}>
                  Lihat detail
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/toko">
            <button
              style={{
                padding: "14px 30px",
                background: "var(--gold)",
                border: "1px solid var(--gold)",
                color: "var(--navy-dark)",
                fontWeight: 700,
                fontFamily: "var(--font-primary)",
                borderRadius: "10px",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "transform 0.3s ease, background 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,147,58,0.85)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.opacity = "0.95";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gold)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              Jelajahi Semua Produk
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
