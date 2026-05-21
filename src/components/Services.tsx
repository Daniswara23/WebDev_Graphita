"use client";

/*
  Services.tsx — SECTION LAYANAN (homepage, 6 kartu)
  Data teks diambil dari tabel `home_services` di Supabase.
  Ikon SVG tetap hardcoded karena JSX tidak bisa disimpan di DB.
  Tampilan tidak berubah.
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type HomeService = {
  id: string;
  num: string;
  title: string;
  description: string;
  icon_key: string;
};

// Peta ikon berdasarkan icon_key yang tersimpan di DB
const iconMap: Record<string, React.ReactNode> = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

export default function Services() {
  const [services, setServices] = useState<HomeService[]>([]);

  useEffect(() => {
    supabase
      .from("home_services")
      .select("id, num, title, description, icon_key")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setServices(data);
      });
  }, []);

  return (
    <section id="layanan" className="animate-on-scroll" style={{ padding: "96px 56px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "64px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              Ragam Layanan
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-4xl)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--white)",
            }}
          >
            Ragam layanan kami untuk menyokong<br />
            <span style={{ color: "var(--gold-light)" }}>perjalanan keberlanjutan Anda</span>
          </h2>
        </div>

        <Link
          href="/services"
          className="hover-scale"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--green-light)",
            cursor: "pointer",
            border: "none",
            background: "none",
            marginBottom: "8px",
            textDecoration: "none",
          }}
        >
          Semua Layanan →
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }}
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            className="grid-item hover-lift hover-glow"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "40px 32px",
              cursor: "pointer",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <span
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "var(--text-xs)",
                color: "rgba(201,147,58,0.4)",
                letterSpacing: "2px",
                display: "block",
                marginBottom: "24px",
                fontWeight: 700,
              }}
            >
              {service.num}
            </span>

            <div
              style={{
                width: "48px",
                height: "48px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(45,106,79,0.2)",
                borderRadius: "4px",
              }}
            >
              {iconMap[service.icon_key] ?? iconMap.default}
            </div>

            <div
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "14px",
                lineHeight: 1.2,
              }}
            >
              {service.title}
            </div>

            <p
              style={{
                fontSize: "var(--text-sm)",
                lineHeight: "var(--line-relaxed)",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
