/*
  portal/riset/[id]/edit/page.tsx — Form edit laporan riset + upload PDF.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateReport } from "../../actions";

export default async function EditRisetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: report } = await supabase.from("research_reports").select("*").eq("id", id).single();

  if (!report) notFound();

  return (
    <div>
      <Link href="/portal/riset" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "32px" }}>
        Edit Laporan Riset
      </h1>

      <form action={updateReport.bind(null, id)} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <input type="hidden" name="existing_url" value={report.file_url ?? ""} />

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul *</span>
          <input type="text" name="title" defaultValue={report.title} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Subtitle (opsional)</span>
          <input type="text" name="subtitle" defaultValue={report.subtitle ?? ""} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
            <select name="category" defaultValue={report.category} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}>
              {["Sosial", "Ekonomi", "Lingkungan", "SDGs", "Pangan", "Lainnya"].map((cat) => (
                <option key={cat} value={cat} style={{ background: "#1a2640" }}>{cat}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Tahun *</span>
            <input type="number" name="year" min="2000" max="2099" defaultValue={report.year} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>
            File PDF {report.file_url ? "(saat ini: sudah ada)" : "(opsional, maks 10MB)"}
          </span>
          <input type="file" name="file" accept=".pdf,application/pdf" style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "14px" }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
            Kosongkan jika tidak ingin mengganti file.
          </span>
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
          <Link href="/portal/riset" style={{
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