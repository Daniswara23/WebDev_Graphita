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
  // Ikon LAMA (kompatibel dengan database existing)
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

  // Ikon BARU (untuk 5 pilar layanan)
  barChart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 16l4-6 4 4 4-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  checkCircle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  userGroup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <circle cx="17" cy="10" r="3" />
      <path d="M21 21v-1.5a3 3 0 00-2-2.5" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M7.5 17.5l3-3 3 3M12 12l-5 4M12 12l5 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  documentText: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
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
              color: "var(--text-primary)",
            }}
          >
            Ragam layanan kami untuk menyokong<br />
            <span style={{ color: "var(--accent-gold)" }}>perjalanan keberlanjutan Anda</span>
          </h2>
        </div>

        <Link
          href="/services"
          className="hover-scale"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
              color: "var(--accent-green-light)",
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
        className="services-grid"
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
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "40px 32px",
              cursor: "pointer",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <span
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "var(--text-xs)",
                  color: "var(--gold-light)",
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
                background: "var(--overlay-gold)",
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
                  color: "var(--text-primary)",
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
                color: "var(--text-secondary)",
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
