/*
  portal/toko/page.tsx — Daftar produk toko (admin) dengan sorting interaktif.
*/

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { deleteProduct } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";
import { useSort } from "@/hooks/useSort";

type Product = {
  id: string;
  name: string;
  label: string | null;
  is_active: boolean;
  sort_order: number;
};

export default function TokoAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("products")
        .select("id, name, label, is_active, sort_order")
        .order("sort_order");
      if (data) setProducts(data as Product[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const { sortedData, toggleSort, getSortIndicator } = useSort(products, "sort_order");

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
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
            Toko
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Kelola produk toko Pangan Asli.
          </p>
        </div>
        <Link href="/portal/toko/create" style={{
          padding: "10px 20px",
          background: "var(--gold)",
          color: "var(--navy-dark)",
          borderRadius: "var(--radius-lg)",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>
          + Produk Baru
        </Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={thStyle} onClick={() => toggleSort("sort_order")}>
                Urutan{getSortIndicator("sort_order")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("name")}>
                Nama Produk{getSortIndicator("name")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("label")}>
                Label{getSortIndicator("label")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("is_active")}>
                Status{getSortIndicator("is_active")}
              </th>
              <th style={{ ...thStyle, textAlign: "right", cursor: "default" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada produk. Klik "+ Produk Baru" untuk menambah.
                </td>
              </tr>
            ) : (
              sortedData.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-secondary)", textAlign: "center" }}>{product.sort_order}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{product.name}</div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {product.label ? (
                      <span style={{ fontSize: "12px", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.5px" }}>{product.label}</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      borderRadius: "var(--radius-full)",
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
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-md)",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}>
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteProduct.bind(null, product.id)}
                        confirmMessage="Hapus produk ini?"
                      />
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