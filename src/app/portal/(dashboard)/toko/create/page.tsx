/*
  portal/toko/create/page.tsx — Form tambah produk baru.
*/

import Link from "next/link";
import { createProduct } from "../actions";

export default function CreateProdukPage() {
  return (
    <div>
      <Link href="/portal/toko" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "32px" }}>
        Produk Baru
      </h1>

      <form action={createProduct} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama Produk *</span>
          <input type="text" name="name" required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi *</span>
          <textarea name="description" required rows={3} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Harga *</span>
            <input type="text" name="price" placeholder="Contoh: Rp 85.000/kg" required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Label (opsional)</span>
            <input type="text" name="label" placeholder="Best seller, Terlaris" style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Tokopedia (opsional)</span>
          <input type="url" name="tokopedia_url" placeholder="https://tokopedia.com/..." style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Shopee (opsional)</span>
          <input type="url" name="shopee_url" placeholder="https://shopee.co.id/..." style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" name="is_active" defaultChecked style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }} />
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Produk aktif (tampil di halaman toko)</span>
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
          <Link href="/portal/toko" style={{
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