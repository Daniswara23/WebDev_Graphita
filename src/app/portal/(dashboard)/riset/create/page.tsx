/*
  portal/riset/create/page.tsx — Form tambah laporan riset + upload PDF.
*/

import Link from "next/link";
import { createReport } from "../actions";

export default function CreateRisetPage() {
  return (
    <div>
      <Link href="/portal/riset" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "32px" }}>
        Laporan Riset Baru
      </h1>

      <form action={createReport} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul *</span>
          <input type="text" name="title" required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Subtitle (opsional)</span>
          <input type="text" name="subtitle" style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
            <select name="category" required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}>
              <option value="" style={{ background: "#1a2640" }}>Pilih kategori</option>
              <option value="Sosial" style={{ background: "#1a2640" }}>Sosial</option>
              <option value="Ekonomi" style={{ background: "#1a2640" }}>Ekonomi</option>
              <option value="Lingkungan" style={{ background: "#1a2640" }}>Lingkungan</option>
              <option value="SDGs" style={{ background: "#1a2640" }}>SDGs</option>
              <option value="Pangan" style={{ background: "#1a2640" }}>Pangan</option>
              <option value="Lainnya" style={{ background: "#1a2640" }}>Lainnya</option>
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Tahun *</span>
            <input type="number" name="year" min="2000" max="2099" defaultValue={new Date().getFullYear()} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>
            File PDF (opsional, maks 10MB)
          </span>
          <input type="file" name="file" accept=".pdf,application/pdf" style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "14px" }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
            Unggah file PDF laporan riset.
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
            Publikasikan
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