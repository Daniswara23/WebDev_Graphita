"use client";

/*
  StatsBar.tsx — BAR STATISTIK
  Data diambil dari tabel `stats` di Supabase.
  Tampilan tidak berubah.
*/

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type StatItem = {
  id: string;
  number_text: string;
  label: string;
};

export default function StatsBar() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    supabase
      .from("stats")
      .select("id, number_text, label")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setStats(data);
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
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }}
    >
      {stats.map((item, index) => (
        <div
          key={item.id}
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
            {item.number_text}
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
