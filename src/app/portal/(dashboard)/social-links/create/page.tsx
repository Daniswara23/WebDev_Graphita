/*
  portal/social-links/create/page.tsx — Form Tambah Social Media Link
*/

import Link from "next/link";
import { createSocialLink } from "../actions";
import { PLATFORM_OPTIONS } from "../constants";

export default function CreateSocialLinkPage() {
  return (
    <div>
      <Link href="/portal/social-links" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Tambah Social Media
      </h1>

      <form action={createSocialLink} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Platform *</span>
          <select 
            name="platform" 
            required 
            style={{ 
              padding: "12px 16px", 
              background: "var(--input-bg)", 
              border: "1px solid var(--input-border)", 
              color: "var(--text-primary)", 
              borderRadius: "6px", 
              fontSize: "15px" 
            }}
          >
            <option value="">Pilih Platform</option>
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>URL *</span>
          <input 
            type="url" 
            name="url" 
            required 
            placeholder="https://..." 
            style={{ 
              padding: "12px 16px", 
              background: "var(--input-bg)", 
              border: "1px solid var(--input-border)", 
              color: "var(--text-primary)", 
              borderRadius: "6px", 
              fontSize: "15px" 
            }} 
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan Tampil</span>
          <input 
            type="number" 
            name="sort_order" 
            defaultValue={0} 
            min={0} 
            style={{ 
              padding: "12px 16px", 
              background: "var(--input-bg)", 
              border: "1px solid var(--input-border)", 
              color: "var(--text-primary)", 
              borderRadius: "6px", 
              fontSize: "15px", 
              width: "120px" 
            }} 
          />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Semakin kecil angka, semakin atas tampilnya.</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="checkbox" name="is_active" value="true" defaultChecked id="is_active" />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Aktif</span>
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
          <Link href="/portal/social-links" style={{
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