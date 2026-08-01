/*
  insights/publikasi/[id]/page.tsx — Halaman detail publikasi (server component).
  Setiap artikel punya URL unik — kunci untuk di-index Google.
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

  const { data: article } = await supabase
    .from("articles")
    .select("id, title, excerpt, category, published_at, cover_image")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!article) {
    return {
      title: "Publikasi Tidak Ditemukan",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `https://grahitas.co.id/insights/publikasi/${id}`,
    },
    openGraph: {
      title: `${article.title} | PT Grahita Adhi Sasmita`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      url: `https://grahitas.co.id/insights/publikasi/${id}`,
      images: article.cover_image ? [{ url: article.cover_image }] : undefined,
    },
  };
}

export default async function PublikasiDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("id, title, excerpt, content, category, published_at, file_url, external_url, cover_image")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!article) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
        {/* Hero */}
        <div style={{ padding: "120px 56px 60px", textAlign: "center", background: "var(--bg-primary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              {article.category}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.2, color: "var(--text-primary)", maxWidth: "900px", margin: "0 auto 16px" }}>
            {article.title}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
            {formatDate(article.published_at)}
          </p>
          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={article.title}
              style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "var(--radius-lg)" }}
            />
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "40px 56px 80px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "var(--text-primary)", marginBottom: "24px" }}>
              {article.excerpt}
            </p>
            {article.content && (
              <div
                style={{ fontSize: "16px", lineHeight: "1.8", color: "var(--text-secondary)" }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            {/* Actions */}
            <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {article.file_url && (
                <a
                  href={article.file_url}
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
                  Unduh Dokumen
                </a>
              )}
              {article.external_url && (
                <a
                  href={article.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "14px 28px",
                    background: "var(--card-bg)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  Baca di Sumber Asli
                </a>
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