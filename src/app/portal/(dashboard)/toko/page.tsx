/*
  portal/toko/page.tsx — Daftar produk toko (admin).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "./actions";

export default async function TokoAdminPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "4px" }}>
            Toko
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            Kelola produk toko Pangan Asli.
          </p>
        </div>
        <Link href="/portal/toko/create" style={{
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
          + Produk Baru
        </Link>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama Produk</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Harga</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Label</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!products || products.length === 0) ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  Belum ada produk. Klik "+ Produk Baru" untuk menambah.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)" }}>{product.name}</div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "var(--gold-light)", fontFamily: "'Times New Roman', serif" }}>
                    {product.price}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {product.label ? (
                      <span style={{ fontSize: "12px", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.5px" }}>{product.label}</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      background: product.is_active ? "rgba(82,183,136,0.2)" : "rgba(148,163,184,0.2)",
                      color: product.is_active ? "#52b788" : "#94a3b8",
                    }}>
                      {product.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/toko/${product.id}/edit`} style={{
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
                      <form action={deleteProduct.bind(null, product.id)} method="POST" style={{ display: "inline" }}
                        onSubmit={(e) => { if (!confirm("Hapus produk ini?")) e.preventDefault(); }}>
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