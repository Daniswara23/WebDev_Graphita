/*
  portal/riset/page.tsx — Daftar laporan riset (admin).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteReport } from "./actions";

export default async function RisetPage() {
  const supabase = await createClient();
  const { data: reports } = await supabase
    .from("research_reports")
    .select("*")
    .order("year", { ascending: false });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "4px" }}>
            Laporan Riset
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            Kelola laporan riset dan publikasi ilmiah.
          </p>
        </div>
        <Link href="/portal/riset/create" style={{
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
          + Laporan Baru
        </Link>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Tahun</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>File</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!reports || reports.length === 0) ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  Belum ada laporan riset. Klik "+ Laporan Baru" untuk membuat.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)" }}>{report.title}</div>
                    {report.subtitle && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{report.subtitle}</div>}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{report.category}</span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                    {report.year}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {report.file_url ? (
                      <a href={report.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "#52b788", textDecoration: "none" }}>✓ PDF</a>
                    ) : (
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/riset/${report.id}/edit`} style={{
                        padding: "6px 14px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "6px",
                        color: "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}>
                        Edit
                      </Link>
                      <form action={deleteReport.bind(null, report.id)} method="POST" style={{ display: "inline" }}
                        onSubmit={(e) => { if (!confirm("Hapus laporan ini?")) e.preventDefault(); }}>
                        <button type="submit" style={{
                          padding: "6px 14px",
                          background: "rgba(220,38,38,0.1)",
                          border: "1px solid rgba(220,38,38,0.3)",
                          borderRadius: "6px",
                          color: "#fca5a5",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}>
                          Hapus
                        </button>
                      </form>
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