"use client";

import { useState } from "react";

const standards = [
  {
    title: "Mengenal Diriku",
    description: "Kami mulai dengan mendengar dan memahami konteks tim Anda. Bukan sekadar data, tetapi cerita yang memberi arah pada setiap opsi.",
    details: "Kami melakukan deep dive untuk memahami nilai-nilai, tantangan, dan visi organisasi Anda. Setiap insight diterjemahkan menjadi strategi yang relevan dan implementatif untuk sustainability journey Anda.",
  },
  {
    title: "Proses yang Ringkas",
    description: "Tak ada jargon yang bikin bingung. Langkah kami dibuat sederhana, ramah, dan mudah diikuti untuk semua pihak.",
    details: "Metodologi kami dirancang untuk transparency dan engagement. Setiap fase dijelaskan dengan jelas, milestones dimonitor bersama, dan feedback loops memastikan alignment maksimal dengan kebutuhan Anda.",
  },
  {
    title: "Hasil yang Terlihat",
    description: "Setiap rekomendasi disajikan sebagai sesuatu yang bisa ditinjau dan digunakan, bukan hanya sebagai laporan tebal di rak.",
    details: "Deliverables kami actionable, terukur, dan siap implementasi. Dari roadmap strategis hingga toolkit operasional, semua dirancang untuk memberikan impact nyata dan sustainable value bagi organisasi Anda.",
  },
];

export default function Etos3T() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "96px 56px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Standar Layanan Kami
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)" }}>
          Cara kami bekerja
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
        {standards.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleCard(index)}
            style={{
              padding: "40px 24px",
              background: expandedIndex === index ? "rgba(201,147,58,0.15)" : "rgba(255,255,255,0.03)",
              border: expandedIndex === index ? "1px solid rgba(201,147,58,0.4)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              minHeight: expandedIndex === index ? "auto" : "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: expandedIndex === index ? "flex-start" : "center",
            }}
            onMouseEnter={(e) => {
              if (expandedIndex !== index) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }
            }}
            onMouseLeave={(e) => {
              if (expandedIndex !== index) {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: expandedIndex === index ? "rgba(201,147,58,0.25)" : "rgba(201,147,58,0.12)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--gold-light)",
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                {index + 1}
              </div>
            </div>
            <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--gold-light)", marginBottom: "16px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--line-relaxed)", color: "rgba(255,255,255,0.8)", marginBottom: expandedIndex === index ? "20px" : "0" }}>
              {item.description}
            </p>

            {/* Hidden content reveal */}
            <div
              style={{
                maxHeight: expandedIndex === index ? "500px" : "0",
                overflow: "hidden",
                opacity: expandedIndex === index ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                marginTop: expandedIndex === index ? "16px" : "0",
              }}
            >
              <div style={{ paddingTop: expandedIndex === index ? "16px" : "0", borderTop: "1px solid rgba(201,147,58,0.2)" }}>
                <p style={{ fontSize: "var(--text-sm)", lineHeight: "var(--line-loose)", color: "rgba(255,255,255,0.7)" }}>
                  {item.details}
                </p>
              </div>
            </div>

            {/* Click indicator */}
            <div
              style={{
                marginTop: "16px",
                fontSize: "var(--text-xs)",
                color: "var(--gold-light)",
                opacity: 0.7,
                transition: "all 0.3s ease",
                fontStyle: "italic",
              }}
            >
              {expandedIndex === index ? "Klik untuk tutup" : "Klik untuk detail"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
