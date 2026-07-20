"use client";

import { updateArticle } from "@/app/portal/(dashboard)/publikasi/actions";
import ArticleFormatSelector from "@/app/portal/(dashboard)/publikasi/ArticleFormatSelector";
import Link from "next/link";
import { useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";

type Article = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string | null;
  file_url: string | null;
  external_url: string | null;
  published_at: string | null;
};

export function EditPublikasiForm({ article }: { article: Article }) {
  const [fileError, setFileError] = useState<string | null>(null);
  const currentSourceType = article.file_url ? "pdf" : article.external_url ? "link" : "";

  return (
    <form action={updateArticle} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <input type="hidden" name="id" value={article.id} />

      {fileError && (
        <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "var(--radius-md)", color: "#b91c1c", fontSize: "14px" }}>
          {fileError}
        </div>
      )}
      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul *</span>
        <input type="text" name="title" defaultValue={article.title} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
        <select name="category" defaultValue={article.category} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }}>
          {["Keberlanjutan", "Riset", "Pangan", "SDGs", "UMKM", "Lingkungan", "Lainnya"].map((cat) => (
            <option key={cat} value={cat} style={{ background: "var(--bg-primary)" }}>{cat}</option>
          ))}
        </select>
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Ringkasan (excerpt) *</span>
        <textarea name="excerpt" defaultValue={article.excerpt} required rows={3} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px", resize: "vertical" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Konten (opsional)</span>
        <textarea name="content" defaultValue={article.content ?? ""} rows={10} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px", resize: "vertical", fontFamily: "monospace" }} />
      </label>

      <ArticleFormatSelector
        mode="edit"
        defaultSourceType={currentSourceType}
        existingFileUrl={article.file_url}
        existingExternalUrl={article.external_url}
        onFileError={setFileError}
      />

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal Publikasi *</span>
        <input type="date" name="published_at" defaultValue={article.published_at ?? ""} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <SubmitButton label="Simpan" loadingLabel="Menyimpan..." />
        <Link href="/portal/publikasi" style={{
          padding: "12px 28px",
          background: "transparent",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-secondary)",
          borderRadius: "var(--radius-lg)",
          fontSize: "13px",
          textDecoration: "none",
        }}>
          Batal
        </Link>
      </div>
    </form>
  );
}