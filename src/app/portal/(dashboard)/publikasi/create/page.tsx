/*
  portal/publikasi/create/page.tsx — Form tambah artikel baru.
*/

import Link from "next/link";
import { createArticle } from "../actions";
import ArticleFormatSelector from "../ArticleFormatSelector";

export default function CreateArtikelPage() {
  return (
    <div>
      <Link href="/portal/publikasi" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Artikel Baru
      </h1>

      <form action={createArticle} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul *</span>
          <input type="text" name="title" required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
          <select name="category" required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }}>
            <option value="" style={{ background: "var(--bg-primary)" }}>Pilih kategori</option>
            <option value="Keberlanjutan" style={{ background: "var(--bg-primary)" }}>Keberlanjutan</option>
            <option value="Riset" style={{ background: "var(--bg-primary)" }}>Riset</option>
            <option value="Pangan" style={{ background: "var(--bg-primary)" }}>Pangan</option>
            <option value="SDGs" style={{ background: "var(--bg-primary)" }}>SDGs</option>
            <option value="UMKM" style={{ background: "var(--bg-primary)" }}>UMKM</option>
            <option value="Lingkungan" style={{ background: "var(--bg-primary)" }}>Lingkungan</option>
            <option value="Lainnya" style={{ background: "var(--bg-primary)" }}>Lainnya</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Ringkasan (excerpt) *</span>
          <textarea name="excerpt" required rows={3} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Konten (opsional)</span>
          <textarea name="content" rows={10} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px", resize: "vertical", fontFamily: "monospace" }} />
        </label>

        {/* Pilihan Format Artikel */}
        <ArticleFormatSelector mode="create" />

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal Publikasi *</span>
          <input type="date" name="published_at" required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <button type="submit" style={{
            padding: "12px 28px",
            background: "var(--gold)",
            color: "var(--navy-dark)",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}>
            Publikasikan
          </button>
          <Link href="/portal/publikasi" style={{
            padding: "12px 28px",
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            borderRadius: "8px",
            fontSize: "13px",
            textDecoration: "none",
          }}>
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}