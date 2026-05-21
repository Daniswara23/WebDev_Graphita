"use client";

/*
  toko/page.tsx — Halaman /toko
  Data diambil dari tabel `products` di Supabase.
  Tampilan tidak berubah.
*/

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  tokopedia_url: string | null;
  shopee_url: string | null;
};

const marketplaces = [
  { name: "Tokopedia", color: "#23AB4F", href: "https://www.tokopedia.com/" },
  { name: "Shopee",    color: "#EE4D2D", href: "https://shopee.co.id/" },
];

// Styles constants
const SHARED_STYLES = {
  sectionPadding:    { padding: "0 56px 80px" },
  headerSection:     { padding: "120px 56px 60px", textAlign: "center" as const },
  marketplaceSection: { padding: "60px 56px 100px", background: "rgba(255,255,255,0.02)" },
  buttonTransition:  { transition: "all 0.2s ease" },
  smoothTransition:  { transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease" },
};

export default function TokoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, description, price, tokopedia_url, shopee_url")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) console.error("[Supabase] products:", error.message, error.details);
        if (data) setProducts(data);
      });
  }, []);

  const marketplaceButtonStyles = useMemo(() => ({
    base: {
      display:        "inline-flex" as const,
      alignItems:     "center" as const,
      gap:            "10px",
      padding:        "16px 28px",
      minWidth:       "220px",
      borderRadius:   "16px",
      color:          "white",
      textDecoration: "none" as const,
      fontWeight:     700,
      justifyContent: "center" as const,
      transition:     "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  }), []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--navy-dark)" }}>
        <section style={SHARED_STYLES.headerSection}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Toko Pangan Asli
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, color: "var(--white)", lineHeight: 1.05, marginBottom: "24px" }}>
            Produk pangan asli, langsung dari petani dan UMKM lokal
          </h1>
          <p style={{ maxWidth: "760px", margin: "0 auto", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, fontSize: "var(--text-lg)" }}>
            Semua produk difokuskan pada keaslian, transparansi asal, dan dukungan untuk ekosistem pangan lokal. Pilih produk, lalu lanjutkan pembelian melalui Tokopedia, Shopee, atau channel e-commerce resmi kami.
          </p>
        </section>

        <section style={SHARED_STYLES.sectionPadding}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(201,147,58,0.2)",
                    ...SHARED_STYLES.smoothTransition,
                    transform:   hoveredProduct === product.id ? "translateY(-8px)" : "translateY(0)",
                    boxShadow:   hoveredProduct === product.id ? "0 20px 40px rgba(201,147,58,0.15)" : "0 5px 15px rgba(0,0,0,0.2)",
                    borderColor: hoveredProduct === product.id ? "rgba(201,147,58,0.4)" : "rgba(201,147,58,0.2)",
                  }}
                >
                  {/* Image Area — placeholder untuk gambar nanti */}
                  <div
                    style={{
                      width: "100%",
                      height: "240px",
                      background: "linear-gradient(135deg, rgba(201,147,58,0.15) 0%, rgba(201,147,58,0.05) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "rgba(255,255,255,0.02)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.3)",
                        fontStyle: "italic",
                      }}
                    >
                      Gambar produk
                    </div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: "32px" }}>
                    <div style={{ marginBottom: "18px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          background: hoveredProduct === product.id ? "rgba(201,147,58,0.25)" : "rgba(201,147,58,0.15)",
                          color: "var(--gold-light)",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          transition: "background 0.3s ease",
                        }}
                      >
                        Produk asli
                      </span>
                    </div>
                    <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--white)", marginBottom: "12px", transition: "color 0.3s ease" }}>
                      {product.name}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "22px", fontSize: "var(--text-base)" }}>
                      {product.description}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid rgba(201,147,58,0.1)" }}>
                      <span style={{ fontSize: "20px", fontWeight: 700, transition: "color 0.3s ease", color: hoveredProduct === product.id ? "var(--gold)" : "var(--gold-light)", fontFamily: "'Times New Roman', serif" }}>
                        {product.price}
                      </span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Stok terbatas
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <a href={product.tokopedia_url ?? "https://www.tokopedia.com/"} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <button
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#23AB4F",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontFamily: "var(--font-primary)",
                            ...SHARED_STYLES.buttonTransition,
                            transform: hoveredProduct === product.id ? "scale(1.02)" : "scale(1)",
                            opacity: hoveredProduct === product.id ? 1 : 0.95,
                          }}
                        >
                          Tokopedia
                        </button>
                      </a>
                      <a href={product.shopee_url ?? "https://shopee.co.id/"} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <button
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#EE4D2D",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontFamily: "var(--font-primary)",
                            ...SHARED_STYLES.buttonTransition,
                            transform: hoveredProduct === product.id ? "scale(1.02)" : "scale(1)",
                            opacity: hoveredProduct === product.id ? 1 : 0.95,
                          }}
                        >
                          Shopee
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={SHARED_STYLES.marketplaceSection}>
          <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
                Marketplace terhubung
              </span>
            </div>
            <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 700, color: "var(--white)", marginBottom: "18px" }}>
              Integrasi mudah dengan platform jual beli populer
            </h2>
            <p style={{ maxWidth: "660px", margin: "0 auto", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "40px" }}>
              Beli produk asli lewat marketplace resmi, dengan pilihan checkout cepat dan transparansi harga. Ideal untuk pembeli yang ingin belanja praktis dan terpercaya.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "18px" }}>
              {marketplaces.map((market) => (
                <a
                  key={market.name}
                  href={market.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...marketplaceButtonStyles.base, background: market.color }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
                    e.currentTarget.style.opacity = "0.95";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  {market.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
