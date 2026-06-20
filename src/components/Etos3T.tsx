"use client";

/*
  Etos3T.tsx — "Cara kami bekerja" (3 kartu expandable)
  Data diambil dari tabel `standards` di Supabase.
  Tampilan tidak berubah.
*/

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Standard = {
  id: string;
  title: string;
  description: string;
  details: string;
};

export default function Etos3T() {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("standards")
      .select("id, title, description, details")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setStandards(data);
      });
  }, []);

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
        <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)" }}>
          Cara kami bekerja
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
        {standards.map((item, index) => (
          <div
            key={item.id}
            onClick={() => toggleCard(index)}
            style={{
              padding: "40px 24px",
              background: expandedIndex === index ? "var(--overlay-gold)" : "var(--card-bg)",
              border: expandedIndex === index ? "1px solid rgba(201,147,58,0.4)" : "1px solid var(--card-border)",
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
                e.currentTarget.style.background = "var(--section-bg-alt)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }
            }}
            onMouseLeave={(e) => {
              if (expandedIndex !== index) {
                e.currentTarget.style.background = "var(--card-bg)";
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
                  background: expandedIndex === index ? "var(--overlay-gold)" : "rgba(201,147,58,0.12)",
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
            <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--line-relaxed)", color: "var(--text-primary)", marginBottom: expandedIndex === index ? "20px" : "0" }}>
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
                <p style={{ fontSize: "var(--text-sm)", lineHeight: "var(--line-loose)", color: "var(--text-secondary)" }}>
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