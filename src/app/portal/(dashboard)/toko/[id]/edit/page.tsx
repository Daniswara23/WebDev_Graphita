/*
  portal/toko/[id]/edit/page.tsx — Form edit produk.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "../../actions";

export default async function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) notFound();

  return (
    <div>
      <Link href="/portal/toko" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "32px" }}>
        Edit Produk
      </h1>

      <form action={updateProduct.bind(null, id)} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama Produk *</span>
          <input type="text" name="name" defaultValue={product.name} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi *</span>
          <textarea name="description" defaultValue={product.description} required rows={3} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Harga *</span>
            <input type="text" name="price" defaultValue={product.price} required style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Label (opsional)</span>
            <input type="text" name="label" defaultValue={product.label ?? ""} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Tokopedia (opsional)</span>
          <input type="url" name="tokopedia_url" defaultValue={product.tokopedia_url ?? ""} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Shopee (opsional)</span>
          <input type="url" name="shopee_url" defaultValue={product.shopee_url ?? ""} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" name="is_active" defaultChecked={product.is_active} style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }} />
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