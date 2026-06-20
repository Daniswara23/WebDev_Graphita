/*
  portal/publikasi/page.tsx — Daftar artikel publikasi (admin).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteArticle } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PublikasiPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, category, file_url, external_url, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
            Publikasi
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Kelola artikel blog dan publikasi.
          </p>
        </div>
        <Link href="/portal/publikasi/create" style={{
          padding: "10px 20px",
          background: "var(--gold)",
          color: "var(--navy-dark)",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>
          + Artikel Baru
        </Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>File</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!articles || articles.length === 0) ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada artikel. Klik "+ Artikel Baru" untuk membuat.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{article.title}</div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{article.category}</span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    {formatDate(article.published_at)}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {article.file_url ? (
                      <span style={{ fontSize: "12px", color: "#52b788" }}>✓ PDF</span>
                    ) : article.external_url ? (
                      <span style={{ fontSize: "12px", color: "#f59e0b" }}>✓ Link</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      {article.file_url && (
                        <a href={article.file_url} target="_blank" rel="noopener noreferrer" style={{
                          padding: "6px 14px",
                          background: "rgba(82,183,136,0.1)",
                          border: "1px solid rgba(82,183,136,0.3)",
                          borderRadius: "6px",
                          color: "#52b788",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}>
                          Preview
                        </a>
                      )}
                      {article.external_url && (
                        <a href={article.external_url} target="_blank" rel="noopener noreferrer" style={{
                          padding: "6px 14px",
                          background: "rgba(245,158,11,0.1)",
                          border: "1px solid rgba(245,158,11,0.3)",
                          borderRadius: "6px",
                          color: "#f59e0b",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}>
                          Open Link
                        </a>
                      )}
                      <a href={`/insights/${article.slug}`} target="_blank" rel="noopener noreferrer" style={{
                        padding: "6px 14px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}>
                        Read
                      </a>
                      <Link href={`/portal/publikasi/${article.id}/edit`} style={{
                        padding: "6px 14px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}>
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteArticle.bind(null, article.id)}
                        confirmMessage="Hapus artikel ini?"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}