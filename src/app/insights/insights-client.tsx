"use client";

/*
  insights-client.tsx — Client component untuk interaktivitas di halaman /insights.
  Data diterima dari server component (page.tsx) — tampilan identik dengan sebelumnya.
*/

import Link from "next/link";
import type { Article, ResearchReport } from "./types";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function InsightsClient({
  articles,
  reports,
}: {
  articles: Article[];
  reports: ResearchReport[];
}) {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--bg-primary)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Riset dan Publikasi
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "24px" }}>
          Ruang Berbagi Pengetahuan
        </h1>
        <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "var(--text-primary)", maxWidth: "700px", margin: "0 auto" }}>
          Sebuah ruang untuk membagikan insight, riset, dan narasi yang membantu organisasi memahami peran mereka dalam keberlanjutan.
        </p>
      </div>

      {/* Blog & Artikel Section */}
      <div style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
              Blog & Artikel
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
              Tulisan mendalam mengenai kesadaran keberdayaan dan keberlanjutan
            </p>
          </div>
          <div className="insights-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
            {articles.map((article) => (
              <Link
                href={`/insights/publikasi/${article.id}`}
                key={article.id}
                className="grid-item hover-lift hover-glow"
                style={{
                  background: "var(--card-bg)",
                  padding: "32px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--card-border)",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--card-bg)";
                  e.currentTarget.style.borderColor = "var(--card-border)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    {formatDate(article.published_at)}
                  </span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", lineHeight: "1.4", marginBottom: "12px" }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {article.excerpt}
                </p>
                <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{
                    fontSize: "12px",
                    color: "var(--gold-light)",
                    fontWeight: 600,
                  }}>
                    Baca Selengkapnya →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Laporan Riset Section */}
      <div style={{ padding: "80px 56px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
              Laporan Riset
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
              Ringkasan hasil riset ilmu pengetahuan sosial untuk pembangunan berkelanjutan
            </p>
          </div>
          <div className="insights-reports-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "28px" }}>
            {reports.map((report) => (
              <Link
                href={`/insights/riset/${report.id}`}
                key={report.id}
                style={{
                  background: "var(--overlay-gold)",
                  padding: "36px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(201,147,58,0.2)",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,147,58,0.12)";
                  e.currentTarget.style.borderColor = "rgba(201,147,58,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--overlay-gold)";
                  e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {report.category}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gold-light)" }}>
                    {report.year}
                  </span>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", lineHeight: "1.3", marginBottom: "12px" }}>
                  {report.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", fontStyle: "italic" }}>
                  {report.subtitle}
                </p>
                <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(201,147,58,0.2)" }}>
                  <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700 }}>
                    Lihat Detail →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: "80px 56px", textAlign: "center", background: "var(--section-bg-alt)" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
          Tertarik Berkolaborasi?
        </h2>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
          Mari diskusikan peluang riset, publikasi, atau kolaborasi ilmiah bersama tim kami.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "var(--gold)",
            color: "var(--navy-dark)",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "var(--radius-lg)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--gold-light)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Hubungi Kami
        </a>
      </div>
    </main>
  );
}