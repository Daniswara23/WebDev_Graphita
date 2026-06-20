"use client";

import { Suspense, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  file_url: string | null;
  external_url: string | null;
};

type ResearchReport = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  category: string;
  file_url: string | null;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function ArticleCardSkeleton() {
  return (
    <div className="animate-pulse" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ height: "16px", width: "100px", background: "var(--border-subtle)", borderRadius: "4px" }} />
        <div style={{ height: "16px", width: "80px", background: "var(--border-subtle)", borderRadius: "4px" }} />
      </div>
      <div style={{ height: "28px", width: "80%", background: "var(--border-subtle)", borderRadius: "4px", marginBottom: "12px" }} />
      <div style={{ height: "16px", width: "100%", background: "var(--border-subtle)", borderRadius: "4px", marginBottom: "8px" }} />
      <div style={{ height: "16px", width: "60%", background: "var(--border-subtle)", borderRadius: "4px" }} />
    </div>
  );
}

function ReportCardSkeleton() {
  return (
    <div className="animate-pulse" style={{ background: "var(--overlay-gold)", padding: "36px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.2)" }}>
      <div style={{ height: "16px", width: "120px", background: "rgba(201,147,58,0.3)", borderRadius: "4px", marginBottom: "16px" }} />
      <div style={{ height: "28px", width: "90%", background: "var(--border-subtle)", borderRadius: "4px", marginBottom: "12px" }} />
      <div style={{ height: "16px", width: "100%", background: "var(--border-subtle)", borderRadius: "4px", marginBottom: "8px" }} />
      <div style={{ height: "40px", width: "200px", background: "var(--border-subtle)", borderRadius: "4px", marginTop: "24px" }} />
    </div>
  );
}

async function getArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`, { 
    next: { revalidate: 3600 } 
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data || [];
}

async function getResearchReports() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reports`, { 
    next: { revalidate: 3600 } 
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data || [];
}

function ArticlesSection() {
  const articles = useArticles();
  
  if (!articles.length) {
    return <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>Memuat artikel...</div>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
      {articles.map((article: Article, index: number) => (
        <article
          key={article.id}
          className="grid-item hover-lift hover-glow"
          style={{
            background: "var(--card-bg)",
            padding: "32px",
            borderRadius: "12px",
            border: "1px solid var(--card-border)",
            transition: "all 0.3s ease",
            cursor: article.file_url || article.external_url ? "pointer" : "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--card-bg)";
            e.currentTarget.style.borderColor = "var(--card-border)";
          }}
          onClick={() => {
            if (article.file_url) {
              window.open(article.file_url, "_blank");
            } else if (article.external_url) {
              window.open(article.external_url, "_blank");
            }
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
              color: article.file_url || article.external_url ? "var(--gold-light)" : "var(--text-secondary)",
              fontWeight: 600,
            }}>
              Baca Selengkapnya →
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

function ReportsSection() {
  const reports = useReports();

  if (!reports.length) {
    return <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>Memuat laporan riset...</div>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "28px" }}>
      {reports.map((report: ResearchReport) => (
        <div
          key={report.id}
          style={{
            background: "var(--overlay-gold)",
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
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                File belum tersedia
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("id, title, excerpt, category, published_at, file_url, external_url")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => {
        setArticles(data || []);
        setLoading(false);
      });
  }, []);

  return articles;
}

function useReports() {
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("research_reports")
      .select("id, title, subtitle, year, category, file_url")
      .order("sort_order")
      .then(({ data }) => {
        setReports(data || []);
        setLoading(false);
      });
  }, []);

  return reports;
}

export default function InsightsPage() {
  return (
    <>
      <Navbar />
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

        {/* Blog & Artikel Section with Suspense */}
        <Suspense fallback={
          <div style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <div style={{ height: "40px", width: "300px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto 16px" }} />
                <div style={{ height: "20px", width: "400px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
              </div>
            </div>
          </div>
        }>
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
              <ArticlesSection />
            </div>
          </div>
        </Suspense>

        {/* Laporan Riset Section with Suspense */}
        <Suspense fallback={
          <div style={{ padding: "80px 56px", background: "var(--bg-primary)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <div style={{ height: "40px", width: "300px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto 16px" }} />
                <div style={{ height: "20px", width: "400px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "28px" }}>
                <ReportCardSkeleton />
                <ReportCardSkeleton />
              </div>
            </div>
          </div>
        }>
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
              <ReportsSection />
            </div>
          </div>
        </Suspense>

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
