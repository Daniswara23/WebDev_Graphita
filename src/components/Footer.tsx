/*
  Footer.tsx — SIMPLE FOOTER WITH LINKS
  Layanan diambil dari Supabase (tidak hardcoded).
*/

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Service = {
  id: string;
  title: string;
};

export default function Footer() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    supabase
      .from("home_services")
      .select("id, title")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setServices(data.slice(0, 5)); // Ambil maksimal 5
      });
  }, []);

  return (
    <footer style={{ background: "var(--footer-bg)", padding: "48px 56px 24px", borderTop: "1px solid var(--footer-border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ maxWidth: "300px" }}>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-2xl)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "12px" }}>
            <span style={{ color: "#0c1163" }}>Grahita</span>{" "}
            <span style={{ color: "#a97b2d" }}>Adhi</span>{" "}
            <span style={{ color: "#0c1163" }}>Sasmita</span>
          </div>
          <p style={{ fontSize: "var(--text-base)", color: "var(--footer-text)", lineHeight: "var(--line-normal)" }}>
            Mitra keberlanjutan strategis untuk aksi profesional, ilmiah, dan teknis.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-lg)", color: "var(--footer-heading)", marginBottom: "16px" }}>Ragam Layanan</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {services.map((service) => (
              <li key={service.id}>
                <Link href="#services" style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)", textDecoration: "none" }}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-lg)", color: "var(--footer-heading)", marginBottom: "16px" }}>Kontak</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4997d0" strokeWidth="1.5" width="16" height="16" style={{ flexShrink: 0 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)" }}>Jakarta, Indonesia</span>
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)" }}>hello@grahitaadhisasmita.com</p>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)" }}>+62 21 1234 5678</p>
        </div>
      </div>
      <div style={{ height: "1px", background: "var(--footer-border)", margin: "40px 0" }} />
      <div style={{ textAlign: "center", fontSize: "var(--text-xs)", color: "var(--footer-text-muted)" }}>
        © 2024 Grahita Adhi Sasmita. Semua hak dilindungi.
      </div>
    </footer>
  );
}