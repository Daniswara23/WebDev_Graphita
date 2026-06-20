"use client";

/*
  StatsBar.tsx — BAR STATISTIK
  Semua data diambil real-time dari database Supabase:
  - Portofolio visual  → COUNT articles (published) + research_reports
  - Tahun pengalaman   → dari tabel stats
  - Layanan Unggulan   → COUNT home_services
  - Produk Lokal       → COUNT products (is_active = true)
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
    async function fetchData() {
      // Ambil stats statis dari tabel (hanya "Tahun pengalaman")
      const statsResult = await supabase
        .from("stats")
        .select("id, number_text, label")
        .order("sort_order");

      // Hitung jumlah portofolio dari articles + research_reports
      const [articlesResult, researchResult] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("research_reports").select("id", { count: "exact", head: true }),
      ]);

      // Hitung jumlah layanan dari home_services
      const servicesResult = await supabase
        .from("home_services")
        .select("id", { count: "exact", head: true });

      // Hitung jumlah produk aktif dari products
      const productsResult = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true);

      const totalPortofolio = (articlesResult.count ?? 0) + (researchResult.count ?? 0);
      const totalServices = servicesResult.count ?? 0;
      const totalProducts = productsResult.count ?? 0;

      // Bangun 4 item stat
      const dynamicStats: StatItem[] = [
        {
          id: "portofolio-dynamic",
          number_text: String(totalPortofolio),
          label: "Portofolio visual",
        },
      ];

      // Ambil "Tahun pengalaman" dari tabel stats (filter agar tidak duplikat)
      if (statsResult.data) {
        const filteredStats = statsResult.data.filter(
          (s) => s.label !== "Portofolio visual"
        );
        dynamicStats.push(...filteredStats);
      }

      dynamicStats.push(
        {
          id: "services-dynamic",
          number_text: String(totalServices),
          label: "Layanan Unggulan",
        },
        {
          id: "products-dynamic",
          number_text: String(totalProducts),
          label: "Produk Lokal",
        }
      );

      setStats(dynamicStats);
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        background: "var(--overlay-gold)",
        borderTop: "1px solid rgba(201,147,58,0.2)",
        borderBottom: "1px solid rgba(201,147,58,0.1)",
        padding: "28px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      {stats.map((item, index) => (
        <div
          key={item.id}
          style={{
            textAlign: "center",
            padding: "8px 24px",
            minWidth: "120px",
            borderRight:
              index < stats.length - 1
                ? "1px solid var(--border-subtle)"
                : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "32px",
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
              fontSize: "10px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}