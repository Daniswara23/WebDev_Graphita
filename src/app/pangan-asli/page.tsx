/*
  /pangan-asli — Pangan ASLI Showcase

  Galeri produk pangan lokal (Aman, Sehat, Lestari).
  Data dari tabel `pangan_asli_products` (RLS: is_active = true).
*/

"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  description: string | null;
  origin_region: string | null;
  category: string | null;
  image_url: string | null;
  is_featured: boolean;
};

export default function PanganAsliPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("pangan_asli_products")
      .select("id, name, description, origin_region, category, image_url, is_featured")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return ["Semua", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    if (activeCategory === "Semua") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Pangan ASLI Showcase
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Aman · Sehat · Lestari
          </h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "rgba(255,255,255,0.9)", maxWidth: "720px", margin: "0 auto" }}>
            Galeri produk pangan lokal dari komunitas mitra — hasil pendampingan ekosistem pangan
            berkelanjutan di berbagai wilayah Indonesia.
          </p>
        </div>

        {/* Filter + Grid */}
        <div style={{ padding: "60px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "48px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    background: activeCategory === cat ? "var(--gold)" : "rgba(255,255,255,0.05)",
                    color: activeCategory === cat ? "var(--navy-dark)" : "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "999px",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Memuat produk…</p>
            ) : filtered.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                Belum ada produk pada kategori ini.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {filtered.map((p) => (
                  <article
                    key={p.id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image / placeholder */}
                    <div
                      style={{
                        aspectRatio: "16/10",
                        background: p.image_url
                          ? `url(${p.image_url}) center/cover`
                          : "linear-gradient(135deg, rgba(82,183,136,0.15), rgba(45,106,79,0.25))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      {!p.image_url && (
                        <span style={{ fontSize: "44px", opacity: 0.4 }}>🌾</span>
                      )}
                      {p.is_featured && (
                        <span
                          style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            fontSize: "10px",
                            padding: "4px 10px",
                            background: "var(--gold)",
                            color: "var(--navy-dark)",
                            borderRadius: "999px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            fontWeight: 700,
                          }}
                        >
                          Pilihan
                        </span>
                      )}
                    </div>
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "11px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                          {p.category ?? "Umum"}
                        </span>
                        {p.origin_region && (
                          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                            {p.origin_region}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--white)" }}>
                        {p.name}
                      </h3>
                      {p.description && (
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                          {p.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
