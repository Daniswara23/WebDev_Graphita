"use client";

/*
  insights/page.tsx — Halaman /insights (Riset dan Publikasi)
  Data diambil dari tabel `articles` dan `research_reports` di Supabase.
  Tombol unduh untuk laporan yang punya file PDF.
*/

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
};

type ResearchReport = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  category: string;
  file_url: string | null;
};

// Format date string "2026-04-15" → "15 April 2026"
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [researchReports, setResearchReports] = useState<ResearchReport[]>([]);

  useEffect(() => {
    supabase
      .from("articles")
      .select("id, title, excerpt, category, published_at")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setArticles(data); });

    supabase
      .from("research_reports")
      .select("id, title, subtitle, year, category, file_url")
      .order("sort_order")
      .then(({ data }) => { if (data) setResearchReports(data); });
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Riset dan Publikasi
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Ruang Berbagi Pengetahuan
          </h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "rgba(255,255,255,0.9)", maxWidth: "700px", margin: "0 auto" }}>
            Sebuah ruang untuk membagikan insight, riset, dan narasi yang membantu organisasi memahami peran mereka dalam keberlanjutan.
          </p>
        </div>

        {/* Blog & Artikel Section */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                Blog & Artikel
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
                Tulisan mendalam mengenai kesadaran keberdayaan dan keberlanjutan
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="grid-item hover-lift hover-glow"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "32px",
                    animationDelay: `${index * 0.1}s`,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                      {formatDate(article.published_at)}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--white)", lineHeight: "1.4", marginBottom: "12px" }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                    {article.excerpt}
                  </p>
                  <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold-light)", fontWeight: 600, cursor: "pointer" }}>
                      Baca Selengkapnya →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Laporan Riset Section */}
        <div style={{ padding: "80px 56px", background: "var(--navy-dark)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                Laporan Riset
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
                Ringkasan hasil riset ilmu pengetahuan sosial untuk pembangunan berkelanjutan
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "28px" }}>
              {researchReports.map((report) => (
                <div
                  key={report.id}
                  style={{
                    background: "rgba(201,147,58,0.08)",
                    padding: "36px",
                    borderRadius: "12px",
                    border: "1px solid rgba(201,147,58,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,147,58,0.12)";
                    e.currentTarget.style.borderColor = "rgba(201,147,58,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(201,147,58,0.08)";
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
                  <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--white)", lineHeight: "1.3", marginBottom: "12px" }}>
                    {report.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: "1.6", fontStyle: "italic" }}>
                    {report.subtitle}
                  </p>
                  <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(201,147,58,0.2)" }}>
                    {report.file_url ? (
                      <a
                        href={report.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "var(--gold)",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span style={{ fontSize: "16px" }}>⬇</span>
                        Unduh Laporan (PDF) →
                      </a>
                    ) : (
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                        File belum tersedia
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: "80px 56px", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
            Tertarik Berkolaborasi?
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
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
              borderRadius: "8px",
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
      <Footer />
    </>
  );
}