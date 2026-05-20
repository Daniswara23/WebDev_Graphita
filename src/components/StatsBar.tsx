/*
  StatsBar.tsx — BAR STATISTIK (Client Component, fetch dari Supabase)
  Fallback FALLBACK_STATS dipakai saat loading / query gagal.
*/

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteStatRow } from "@/types/database";

type StatItem = { number: string; label: string };

const FALLBACK_STATS: StatItem[] = [
  { number: "50+", label: "Portofolio visual" },
  { number: "12", label: "Tahun pengalaman" },
  { number: "98%", label: "Kepuasan mitra" },
  { number: "$10M+", label: "Dampak bisnis nyata" },
];

export default function StatsBar() {
  const [stats, setStats] = useState<StatItem[]>(FALLBACK_STATS);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_stats")
      .select("value, label, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const rows = data as Pick<SiteStatRow, "value" | "label" | "sort_order">[];
          setStats(rows.map((r) => ({ number: r.value, label: r.label })));
        }
      });
  }, []);

  return (
    <div
      style={{
        background: "rgba(201,147,58,0.08)",
        borderTop: "1px solid rgba(201,147,58,0.2)",
        borderBottom: "1px solid rgba(201,147,58,0.1)",
        padding: "28px 56px",
        display: "grid",
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: "24px",
      }}
    >
      {stats.map((item, index) => (
        <div
          key={index}
          style={{
            textAlign: "center",
            padding: "8px 0",
            borderRight:
              index < stats.length - 1
                ? "1px solid rgba(255,255,255,0.08)"
                : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "38px",
              fontWeight: 700,
              color: "var(--gold-light)",
              lineHeight: 1,
              marginBottom: "6px",
            }}
          >
            {item.number}
          </div>
          <div
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
