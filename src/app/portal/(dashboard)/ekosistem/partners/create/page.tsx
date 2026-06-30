/*
  portal/ekosistem/partners/create/page.tsx — Form tambah partner baru.
*/

import Link from "next/link";
import { createPartner } from "../../actions";

export default function CreatePartnerPage() {
  return (
    <div>
      <Link href="/portal/ekosistem" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Partner Baru
      </h1>

      <form action={createPartner} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
          <select name="category" required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }}>
            <option value="donor" style={{ background: "var(--bg-primary)" }}>Penyandang Dana</option>
            <option value="technical" style={{ background: "var(--bg-primary)" }}>Mitra Teknis</option>
            <option value="government" style={{ background: "var(--bg-primary)" }}>Pemerintah & LSM</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama Partner *</span>
          <input type="text" name="name" required placeholder="Kementerian Lingkungan Hidup" style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi</span>
          <textarea name="description" rows={3} placeholder="Deskripsi singkat partner..." style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Ikon SVG</span>
          <select name="icon_svg" style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }}>
            <option value="handHeart" style={{ background: "var(--bg-primary)" }}>handHeart (Donor)</option>
            <option value="microscope" style={{ background: "var(--bg-primary)" }}>microscope (Teknis)</option>
            <option value="building" style={{ background: "var(--bg-primary)" }}>building (Pemerintah/LSM)</option>
            <option value="default" style={{ background: "var(--bg-primary)" }}>default (Lingkaran)</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan Tampil</span>
          <input type="number" name="sort_order" defaultValue={0} min={0} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px", width: "120px" }} />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Semakin kecil angka, semakin atas tampilnya.</span>
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
          <Link href="/portal/ekosistem" style={{
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