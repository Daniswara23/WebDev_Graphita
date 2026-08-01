/*
  insights/riset/[id]/page.tsx — Halaman detail riset (server component).
  Setiap laporan riset punya URL unik — kunci untuk di-index Google.
*/

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("research_reports")
    .select("id, title, subtitle, year, category")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!report) {
    return {
      title: "Riset Tidak Ditemukan",
    };
  }

  return {
    title: report.title,
    description: report.subtitle || `Laporan riset ${report.category} ${report.year} oleh PT Grahita Adhi Sasmita.`,
    alternates: {
      canonical: `https://grahitas.co.id/insights/riset/${id}`,
    },
    openGraph: {
      title: `${report.title} | PT Grahita Adhi Sasmita`,
      description: report.subtitle || `Laporan riset ${report.category} ${report.year}.`,
      type: "article",
      url: `https://grahitas.co.id/insights/riset/${id}`,
    },
  };
}

export default async function RisetDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("research_reports")
    .select("id, title, subtitle, year, category, file_url")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!report) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
        {/* Hero */}
        <div style={{ padding: "120px 56px 60px", textAlign: "center", background: "var(--bg-primary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              {report.category} • {report.year}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.2, color: "var(--text-primary)", maxWidth: "900px", margin: "0 auto 16px" }}>
            {report.title}
          </h1>
          {report.subtitle && (
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto" }}>
              {report.subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "40px 56px 80px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ background: "var(--overlay-gold)", padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid rgba(201,147,58,0.2)", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>
                Informasi Laporan
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Kategori</div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{report.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Tahun</div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{report.year}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {report.file_url ? (
                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "14px 28px",
                    background: "var(--gold)",
                    color: "var(--navy-dark)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  ⬇ Unduh Laporan (PDF)
                </a>
              ) : (
                <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  File belum tersedia
                </span>
              )}
              <Link
                href="/insights"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "transparent",
                  color: "var(--gold-light)",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--gold)",
                }}
              >
                ← Kembali ke Insight
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}