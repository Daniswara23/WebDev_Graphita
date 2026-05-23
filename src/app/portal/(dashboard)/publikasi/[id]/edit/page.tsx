/*
  portal/publikasi/[id]/edit/page.tsx — Form edit artikel.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateArticle } from "../../actions";

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", id).single();

  if (!article) notFound();

  return (
    <div>
      <Link href="/portal/publikasi" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "32px" }}>
        Edit Artikel
      </h1>

      <form action={updateArticle.bind(null, id)} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul *</span>
          <input type="text" name="title" defaultValue={article.title} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
          <select name="category" defaultValue={article.category} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}>
            {["Keberlanjutan", "Riset", "Pangan", "SDGs", "UMKM", "Lingkungan", "Lainnya"].map((cat) => (
              <option key={cat} value={cat} style={{ background: "#1a2640" }}>{cat}</option>
            ))}
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Ringkasan (excerpt) *</span>
          <textarea name="excerpt" defaultValue={article.excerpt} required rows={3} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Konten (opsional)</span>
          <textarea name="content" defaultValue={article.content ?? ""} rows={10} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px", resize: "vertical", fontFamily: "monospace" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>File PDF</span>
          {article.file_url ? (
            <div style={{ fontSize: "13px", color: "#52b788", marginBottom: "6px" }}>
              PDF saat ini: <a href={article.file_url} target="_blank" rel="noopener noreferrer" style={{ color: "#52b788", textDecoration: "underline" }}>Lihat PDF</a>
            </div>
          ) : (
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>Belum ada file PDF.</div>
          )}
          <input type="file" name="file" accept="application/pdf" style={{ padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "14px" }} />
          <input type="hidden" name="existing_url" value={article.file_url ?? ""} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal Publikasi *</span>
          <input type="date" name="published_at" defaultValue={article.published_at ?? ""} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px", colorScheme: "dark" }} />
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
            Simpan
          </button>
          <Link href="/portal/publikasi" style={{
            padding: "12px 28px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
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