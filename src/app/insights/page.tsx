/*
  /insights — Halaman Publikasi & Riset (fetch dari Supabase)
*/

"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import type { ArticleRow, ResearchReportRow } from "@/types/database";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
};

type ResearchReport = {
  id: string;
  title: string;
  subtitle: string | null;
  year: number;
  category: string;
  file_url: string | null;
};

const ID_MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
function formatTanggalID(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${ID_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("articles").select("id, title, excerpt, category, published_at, slug").eq("is_published", true).order("published_at", { ascending: false }),
      supabase.from("research_reports").select("id, title, subtitle, year, category, file_url").eq("is_published", true).order("year", { ascending: false }),
    ]).then(([artRes, repRes]) => {
      if (!artRes.error && artRes.data) {
        const rows = artRes.data as Pick<ArticleRow, "id" | "title" | "excerpt" | "category" | "published_at" | "slug">[];
        setArticles(rows.map((a) => ({
          id: a.id,
          title: a.title,
          excerpt: a.excerpt,
          category: a.category,
          date: formatTanggalID(a.published_at),
          slug: a.slug,
        })));
      }
      if (!repRes.error && repRes.data) {
        setReports(repRes.data as ResearchReportRow[]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
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

        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>Blog & Artikel</h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>Tulisan mendalam mengenai kesadaran keberdayaan dan keberlanjutan</p>
            </div>

            {loading ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Memuat artikel...</p>
            ) : articles.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Belum ada artikel.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
                {articles.map((article, index) => (
                  <article key={article.id} className="grid-item hover-lift hover-glow" style={{ background: "rgba(255,255,255,0.03)", padding: "32px", animationDelay: `${index * 0.1}s`, borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s ease", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{article.category}</span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{article.date}</span>
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--white)", lineHeight: "1.4", marginBottom: "12px" }}>{article.title}</h3>
                    <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>{article.excerpt}</p>
                    <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <span style={{ fontSize: "12px", color: "var(--gold-light)", fontWeight: 600, cursor: "pointer" }}>Baca Selengkapnya -&gt;</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "80px 56px", background: "var(--navy-dark)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>Laporan Riset</h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>Ringkasan hasil riset ilmu pengetahuan sosial untuk pembangunan berkelanjutan</p>
            </div>

            {loading ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Memuat laporan...</p>
            ) : reports.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Belum ada laporan riset.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "28px" }}>
                {reports.map((report) => (
                  <div key={report.id} style={{ background: "rgba(201,147,58,0.08)", padding: "36px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.2)", transition: "all 0.3s ease" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px" }}>{report.category}</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gold-light)" }}>{report.year}</span>
                    </div>
                    <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--white)", lineHeight: "1.3", marginBottom: "12px" }}>{report.title}</h3>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: "1.6", fontStyle: "italic" }}>{report.subtitle}</p>
                    <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(201,147,58,0.2)" }}>
                      {report.file_url ? (
                        <a href={report.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700, textDecoration: "none" }}>Unduh Laporan -&gt;</a>
                      ) : (
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>File belum tersedia</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "80px 56px", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>Tertarik Berkolaborasi?</h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>Mari diskusikan peluang riset, publikasi, atau kolaborasi ilmiah bersama tim kami.</p>
          <a href="/contact" style={{ display: "inline-block", padding: "16px 32px", background: "var(--gold)", color: "var(--navy-dark)", fontSize: "16px", fontWeight: 600, textDecoration: "none", borderRadius: "8px", transition: "all 0.3s ease" }}>Hubungi Kami</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
