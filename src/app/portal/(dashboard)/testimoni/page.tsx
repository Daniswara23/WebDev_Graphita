"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { deleteTestimonial } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";
import { useSort } from "@/hooks/useSort";

type Testimonial = {
  id: string;
  author: string;
  company: string | null;
  quote: string;
  is_featured: boolean;
  sort_order: number;
};

export default function TestimoniAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("testimonials")
        .select("id, author, company, quote, is_featured, sort_order")
        .order("sort_order");
      if (data) setTestimonials(data as Testimonial[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const { sortedData, toggleSort, getSortIndicator } = useSort(testimonials, "sort_order");

  const thStyle: React.CSSProperties = {
    padding: "16px 20px",
    fontSize: "11px",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>Memuat...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>Feedback</h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Kelola testimoni dan feedback dari mitra.</p>
        </div>
        <Link href="/portal/testimoni/create" style={{ padding: "10px 20px", background: "var(--gold)", color: "var(--navy-dark)", borderRadius: "var(--radius-lg)", textDecoration: "none", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>+ Feedback Baru</Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={thStyle} onClick={() => toggleSort("sort_order")}>Urutan{getSortIndicator("sort_order")}</th>
              <th style={thStyle} onClick={() => toggleSort("author")}>Penulis{getSortIndicator("author")}</th>
              <th style={thStyle} onClick={() => toggleSort("company")}>Perusahaan{getSortIndicator("company")}</th>
              <th style={{ ...thStyle, cursor: "default" }}>Kutipan</th>
              <th style={{ ...thStyle, textAlign: "right", cursor: "default" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>Belum ada feedback. Klik "+ Feedback Baru" untuk menambah.</td></tr>
            ) : (
              sortedData.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-secondary)", textAlign: "center" }}>{t.sort_order}</td>
                  <td style={{ padding: "16px 20px" }}><div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{t.author}</div></td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "var(--text-secondary)" }}>{t.company || "—"}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "var(--text-primary)", fontStyle: "italic", maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>&ldquo;{t.quote}&rdquo;</td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/testimoni/${t.id}/edit`} style={{ padding: "6px 14px", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", color: "var(--text-primary)", textDecoration: "none", fontSize: "12px" }}>Edit</Link>
                      <DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmMessage="Hapus feedback ini?" />
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