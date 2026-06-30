"use client";

/*
  EcosystemHub.tsx — KOLABORASI MULTIPAIK & EKOSISTEM
  Data diambil real-time dari Supabase.
  Ikon SVG line-art menggantikan emoji untuk tampilan profesional.
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Partner = {
  id: string;
  category: string;
  name: string;
  description: string;
  icon_svg: string;
};

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  sector: string;
  summary: string;
  impact: string;
};

// Peta ikon SVG line-art (gaya Services.tsx) — dirancang minimalis & konsisten
const iconMap: Record<string, React.ReactNode> = {
  // Tangan memegang hati — donor/pendanaan
  handHeart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="28" height="28">
      <path d="M12 21C12 21 4 14.5 4 9a4.5 4.5 0 018.5-2.5A4.5 4.5 0 0120 9c0 5.5-8 12-8 12z" />
      <path d="M12 11v6M9 14h6" />
    </svg>
  ),
  // Mikroskop — riset & teknis
  microscope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="28" height="28">
      <rect x="6" y="2" width="12" height="8" rx="2" />
      <path d="M12 10v4M9 14h6" />
      <path d="M8 18h8M10 22h4" />
    </svg>
  ),
  // Gedung instansi — pemerintah/LSM
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="28" height="28">
      <path d="M4 22h16" />
      <path d="M6 22V10l6-5 6 5v12" />
      <path d="M9 22v-6h6v6" />
      <path d="M9 14h.01M15 14h.01M9 17h.01M13 17h.01" />
    </svg>
  ),
  // Default: lingkaran sebagai fallback
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

export default function EcosystemHub() {
  const [activeCategory, setActiveCategory] = useState<string>("donor");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [partnersRes, casesRes] = await Promise.all([
        supabase.from("ecosystem_partners").select("*").order("sort_order"),
        supabase.from("ecosystem_case_studies").select("*").order("sort_order"),
      ]);

      if (partnersRes.data) setPartners(partnersRes.data);
      if (casesRes.data) setCaseStudies(casesRes.data);
    }

    fetchData();
  }, []);

  const categories = Array.from(new Set(partners.map((p) => p.category)));
  const uniquePartners = Array.from(new Map(partners.map((p) => [p.category + p.name, p])).values());
  const activePartners = uniquePartners.filter((p) => p.category === activeCategory);
  const uniqueCaseStudies = Array.from(new Map(caseStudies.map((cs) => [cs.title + cs.client + cs.sector, cs])).values());

  return (
    <section id="ekosistem" className="animate-on-scroll" style={{ padding: "96px 56px", background: "var(--section-bg-alt)" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Ekosistem & Jejaring
          </span>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "20px" }}>
          Kolaborasi Multipihak untuk Dampak yang Lebih Luas
        </h2>
        <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.6 }}>
          Kekuatan kami terletak pada jaringan. Kami memadukan sumber daya, keahlian, dan komitmen dari berbagai pemangku kepentingan untuk menghasilkan solusi yang inklusif dan berkelanjutan.
        </p>
      </div>

      {/* ===== PARTNER CATEGORIES ===== */}
      <div style={{ marginBottom: "80px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "12px 24px",
                background: activeCategory === cat ? "var(--overlay-gold)" : "var(--card-bg)",
                border: `1px solid ${activeCategory === cat ? "var(--gold)" : "var(--card-border)"}`,
                borderRadius: "100px",
                cursor: "pointer",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                fontWeight: activeCategory === cat ? 600 : 400,
                color: activeCategory === cat ? "var(--gold-light)" : "var(--text-primary)",
                transition: "all 0.3s ease",
              }}
            >
              {cat === "donor" && "Penyandang Dana"}
              {cat === "technical" && "Mitra Teknis"}
              {cat === "government" && "Pemerintah & LSM"}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        {activePartners.length > 0 && (
          <div className="animate-on-scroll" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
              {activeCategory === "donor" && "Penyandang Dana"}
              {activeCategory === "technical" && "Mitra Teknis"}
              {activeCategory === "government" && "Pemerintah & Organisasi Sosial"}
            </h3>
            <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", marginBottom: "32px", lineHeight: 1.6 }}>
              {activePartners[0]?.description}
            </p>

            <div className="partners-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {activePartners.map((partner) => (
                <div
                  key={partner.id}
                  className="hover-lift hover-glow"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "12px",
                    padding: "28px 24px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                    {iconMap[partner.icon_svg] ?? iconMap.default}
                  </div>
                  <h4 style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                    {partner.name}
                  </h4>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.5, wordBreak: "break-word", overflowWrap: "anywhere" }}>
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== CASE STUDIES ===== */}
      <div>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-3xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "16px" }}>
            Dampak Nyata di Berbagai Sektor
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
            Beberapa kisah kolaborasi yang telah mengukir perubahan konkret — dari tambang hingga pertanian.
          </p>
        </div>

        <div className="case-studies-ecosystem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", maxWidth: "1200px", margin: "0 auto" }}>
          {uniqueCaseStudies.map((cs) => {
            const isExpanded = expandedCase === cs.id;
            return (
              <div
                key={cs.id}
                onClick={() => setExpandedCase(isExpanded ? null : cs.id)}
                className="hover-lift"
                style={{
                  background: "var(--card-bg)",
                  border: `1px solid ${isExpanded ? "var(--gold)" : "var(--card-border)"}`,
                  borderRadius: "16px",
                  padding: isExpanded ? "36px 28px" : "32px 24px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "var(--gold-light)",
                      background: "var(--overlay-gold)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {cs.sector}
                  </span>
                </div>

                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.3, wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "14px", fontStyle: "italic", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.client}
                </p>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: isExpanded ? "16px" : "0", wordBreak: "break-word" }}>
                  {cs.summary}
                </p>

                <div
                  style={{
                    maxHeight: isExpanded ? "120px" : "0",
                    overflow: "hidden",
                    opacity: isExpanded ? 1 : 0,
                    transition: "all 0.4s ease",
                  }}
                >
                  <div style={{ paddingTop: "14px", borderTop: `1px solid ${"var(--gold)"}33`, marginTop: "4px" }}>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: 1.6, marginBottom: "6px", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                      <strong>Dampak:</strong> {cs.impact}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    marginTop: "12px",
                    fontSize: "11px",
                    color: "var(--gold-light)",
                    opacity: 0.7,
                    fontStyle: "italic",
                    letterSpacing: "0.5px",
                    display: "block",
                  }}
                >
                  {isExpanded ? "Klik untuk tutup" : "Klik untuk detail"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}