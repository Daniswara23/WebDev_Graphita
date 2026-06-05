/*
  case-videos/create/page.tsx — Form tambah video baru.
*/

import Link from "next/link";
import { createCaseVideo } from "../actions";

export default function CreateCaseVideoPage() {
  return (
    <div>
      <Link href="/portal/case-videos" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "32px" }}>
        Video Baru
      </h1>

      <form action={createCaseVideo} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul Video *</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Contoh: Profil Perusahaan 2026"
            style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Video (YouTube / Vimeo) *</span>
          <input
            type="url"
            name="video_url"
            required
            placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
            style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}
          />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
            Upload video ke YouTube terlebih dahulu, lalu salin link videonya ke sini. Mendukung format youtube.com/watch, youtu.be, shorts, Vimeo.
          </span>
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan Tampil</span>
            <input
              type="number"
              name="sort_order"
              defaultValue="0"
              min="0"
              style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}
            />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
              Angka kecil = tampil lebih awal
            </span>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</span>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }}>
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
                style={{ accentColor: "var(--gold)", width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "14px", color: "var(--white)" }}>Aktif (tampilkan di website)</span>
            </label>
          </label>
        </div>

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
          <Link href="/portal/case-videos" style={{
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
