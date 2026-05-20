/*
  /knowledge-hub — Pustaka Digital (fetch dari Supabase).
*/

"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import type { KnowledgeHubFileRow } from "@/types/database";

type KHFile = Pick<KnowledgeHubFileRow, "id" | "title" | "description" | "file_url" | "file_type" | "file_size_kb" | "category" | "tags" | "is_free">;

function formatSize(kb: number | null): string {
  if (!kb) return "-";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function KnowledgeHubPage() {
  const [files, setFiles] = useState<KHFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("knowledge_hub_files")
      .select("id, title, description, file_url, file_type, file_size_kb, category, tags, is_free")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setFiles(data as KHFile[]);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    files.forEach((f) => f.category && set.add(f.category));
    return ["Semua", ...Array.from(set).sort()];
  }, [files]);

  const filtered = useMemo(() => {
    if (activeCategory === "Semua") return files;
    return files.filter((f) => f.category === activeCategory);
  }, [files, activeCategory]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>Knowledge Hub</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>Pustaka Digital GAS</h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "rgba(255,255,255,0.9)", maxWidth: "720px", margin: "0 auto" }}>
            Unduh laporan riset, panduan praktis, dan template kerja keberlanjutan untuk mempercepat dampak organisasi Anda.
          </p>
        </div>

        <div style={{ padding: "60px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "48px" }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "8px 18px", background: activeCategory === cat ? "var(--gold)" : "rgba(255,255,255,0.05)", color: activeCategory === cat ? "var(--navy-dark)" : "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease" }}>
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Memuat pustaka...</p>
            ) : filtered.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>Belum ada file untuk kategori ini.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
                {filtered.map((file) => (
                  <article key={file.id} style={{ background: "rgba(255,255,255,0.03)", padding: "28px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{file.category ?? "Umum"}</span>
                      {!file.is_free && (
                        <span style={{ fontSize: "10px", padding: "3px 8px", background: "rgba(201,147,58,0.2)", color: "var(--gold-light)", borderRadius: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>Login</span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--white)", lineHeight: "1.4" }}>{file.title}</h3>
                    {file.description && (
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.5" }}>{file.description}</p>
                    )}
                    {file.tags && file.tags.length > 0 && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {file.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: "10px", padding: "2px 8px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", borderRadius: "4px" }}>#{tag}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {file.file_type ?? "FILE"} - {formatSize(file.file_size_kb)}
                      </span>
                      <a href={file.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700, textDecoration: "none" }}>Unduh</a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
