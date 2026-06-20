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
  label: string | null;
  image_url: string | null;
  tokopedia_url: string | null;
  shopee_url: string | null;
};

const marketplaces = [
  { name: "Tokopedia", href: "https://www.tokopedia.com/" },
  { name: "Shopee",    href: "https://shopee.co.id/" },
];

// Styles constants
const SHARED_STYLES = {
  sectionPadding:    { padding: "0 56px 80px" },
  headerSection:     { padding: "120px 56px 60px", textAlign: "center" as const },
  marketplaceSection: { padding: "60px 56px 100px", background: "var(--section-bg-alt)" },
  buttonTransition:  { transition: "all 0.2s ease" },
  smoothTransition:  { transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease" },
};

export default function TokoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, description, label, image_url, tokopedia_url, shopee_url")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) {
          console.error("[Supabase] products error:", error.message);
          console.error("[Supabase] products details:", error.details);
        }
        console.log("[DEBUG] Products data from Supabase:", data);
        if (data) setProducts(data);
      });
  }, []);

  const marketplaceButtonStyles = useMemo(() => ({
    base: {
      display:        "inline-flex" as const,
      alignItems:     "center" as const,
      justifyContent: "center" as const,
      padding:        "20px 48px",
      borderRadius:   "16px",
      textDecoration: "none" as const,
      transition:     "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border:         "1px solid var(--border-subtle)",
      background:     "var(--card-bg)",
    },
  }), []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
        <section style={SHARED_STYLES.headerSection}>
          <div className="animate-on-scroll" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Toko Pangan Asli
            </span>
          </div>
          <h1 className="animate-on-scroll animate-delay-100" style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.05, marginBottom: "24px" }}>
            Produk pangan asli, langsung dari petani dan UMKM lokal
          </h1>
          <p className="animate-on-scroll animate-delay-200" style={{ maxWidth: "760px", margin: "0 auto", color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "var(--text-lg)" }}>
            Semua produk difokuskan pada keaslian, transparansi asal, dan dukungan untuk ekosistem pangan lokal. Pilih produk, lalu lanjutkan pembelian melalui Tokopedia, Shopee, atau channel e-commerce resmi kami.
          </p>
        </section>

        <section style={SHARED_STYLES.sectionPadding}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="animate-on-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="grid-item hover-lift"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "var(--card-bg)",
                    border: "1px solid rgba(201,147,58,0.2)",
                    ...SHARED_STYLES.smoothTransition,
                    transform:   hoveredProduct === product.id ? "translateY(-8px)" : "translateY(0)",
                    boxShadow:   hoveredProduct === product.id ? "0 20px 40px rgba(201,147,58,0.15)" : "0 5px 15px rgba(0,0,0,0.2)",
                    borderColor: hoveredProduct === product.id ? "rgba(201,147,58,0.4)" : "rgba(201,147,58,0.2)",
                  }}
                >
                  {/* Image Area */}
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
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "var(--card-bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                          fontStyle: "italic",
                        }}
                      >
                        Gambar produk
                      </div>
                    )}
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
                        {product.label || "Produk asli"}
                      </span>
                    </div>
                    <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", transition: "color 0.3s ease" }}>
                      {product.name}
                    </h2>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "22px", fontSize: "var(--text-base)" }}>
                      {product.description}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {product.tokopedia_url ? (
                        <a href={product.tokopedia_url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
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
                      ) : (
                        <button
                          disabled
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-subtle)",
                            background: "var(--card-bg)",
                            color: "var(--text-secondary)",
                            cursor: "not-allowed",
                            fontWeight: 700,
                            fontFamily: "var(--font-primary)",
                          }}
                        >
                          Tokopedia
                        </button>
                      )}
                      {product.shopee_url ? (
                        <a href={product.shopee_url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
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
                      ) : (
                        <button
                          disabled
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-subtle)",
                            background: "var(--card-bg)",
                            color: "var(--text-secondary)",
                            cursor: "not-allowed",
                            fontWeight: 700,
                            fontFamily: "var(--font-primary)",
                          }}
                        >
                          Shopee
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={SHARED_STYLES.marketplaceSection}>
          <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
            <div className="animate-on-scroll" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
                Marketplace terhubung
              </span>
            </div>
            <h2 className="animate-on-scroll animate-delay-100" style={{ fontSize: "var(--text-4xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "18px" }}>
              Integrasi mudah dengan platform jual beli populer
            </h2>
            <p className="animate-on-scroll animate-delay-200" style={{ maxWidth: "660px", margin: "0 auto", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "40px" }}>
              Beli produk asli lewat marketplace resmi, dengan pilihan checkout cepat dan transparansi harga. Ideal untuk pembeli yang ingin belanja praktis dan terpercaya.
            </p>
            <div className="animate-on-scroll animate-delay-300" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "24px" }}>
              {marketplaces.map((market) => (
                <a
                  key={market.name}
                  href={market.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-lift"
                  style={marketplaceButtonStyles.base}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                    e.currentTarget.style.background = "var(--bg-secondary)";
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "var(--card-bg)";
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                  }}
                >
                  <img
                    src={`/images/${market.name.toLowerCase()}-logo.png`}
                    alt={market.name}
                    style={{ height: "48px", objectFit: "contain" }}
                  />
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