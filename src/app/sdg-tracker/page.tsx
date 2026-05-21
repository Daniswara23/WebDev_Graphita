/*
  /sdg-tracker — SDG Impact Tracker.
*/

"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import type { SdgMetricRow } from "@/types/database";

type SdgMetric = Pick<SdgMetricRow, "sdg_number" | "sdg_name" | "sdg_icon" | "metric_label" | "metric_value" | "metric_unit" | "description" | "year">;

const SDG_COLORS: Record<number, string> = {
  1: "#e5243b",
  3: "#4c9f38",
  8: "#a21942",
  9: "#fd6925",
  10: "#dd1367",
  17: "#19486a",
};

export default function SdgTrackerPage() {
  const [metrics, setMetrics] = useState<SdgMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("sdg_metrics")
      .select("sdg_number, sdg_name, sdg_icon, metric_label, metric_value, metric_unit, description, year")
      .order("sdg_number", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setMetrics(data as SdgMetric[]);
        setLoading(false);
      });
  }, []);

  const currentYear = metrics[0]?.year ?? new Date().getFullYear();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>SDG Impact Tracker</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Dampak Nyata kami pada Sustainable Development Goals
          </h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "rgba(255,255,255,0.9)", maxWidth: "740px", margin: "0 auto" }}>
            Komitmen kami terukur - setiap angka di bawah adalah hasil pendampingan, kolaborasi, dan transformasi yang dijalankan bersama mitra.
          </p>
          <p style={{ fontSize: "13px", color: "var(--gold-light)", marginTop: "16px", letterSpacing: "1px" }}>Data tahun {currentYear}</p>
        </div>

        <div style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {loading ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Memuat data SDG...</p>
            ) : metrics.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Belum ada data SDG yang dipublikasikan.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {metrics.map((m) => {
                  const accent = SDG_COLORS[m.sdg_number] ?? "var(--gold)";
                  return (
                    <div key={m.sdg_number} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accent}40`, borderRadius: "12px", padding: "28px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: accent }} />
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <div style={{ width: "48px", height: "48px", background: accent, color: "white", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", fontWeight: 700, fontSize: "20px" }}>
                          {m.sdg_number}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>SDG {m.sdg_number}</div>
                          <div style={{ fontSize: "13px", color: "var(--white)", fontWeight: 600, lineHeight: 1.3 }}>{m.sdg_name}</div>
                        </div>
                        {m.sdg_icon && <span style={{ fontSize: "28px" }}>{m.sdg_icon}</span>}
                      </div>

                      <div style={{ marginBottom: "8px" }}>
                        <span style={{ fontFamily: "'Times New Roman', serif", fontSize: "44px", fontWeight: 700, color: "var(--gold-light)", lineHeight: 1 }}>{m.metric_value}</span>
                        {m.metric_unit && (
                          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px" }}> {m.metric_unit}</span>
                        )}
                      </div>

                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{m.metric_label}</p>
                      {m.description && (
                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: "10px", fontStyle: "italic" }}>{m.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
