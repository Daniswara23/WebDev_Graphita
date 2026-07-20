"use client";

import { updateProduct } from "@/app/portal/(dashboard)/toko/actions";
import Link from "next/link";
import { useRef, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";

type Product = {
  id: string;
  name: string;
  description: string;
  label: string | null;
  image_url: string | null;
  tokopedia_url: string | null;
  shopee_url: string | null;
  is_active: boolean;
};

const MAX_SIZE_MB = 5;

export function EditTokoForm({ product }: { product: Product }) {
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const file = fileRef.current?.files?.[0];
    if (file && file.size > MAX_SIZE_MB * 1024 * 1024) {
      e.preventDefault();
      setError(`Ukuran file maksimal ${MAX_SIZE_MB} MB. File Anda ${(file.size / (1024 * 1024)).toFixed(1)} MB.`);
      return;
    }
    setError(null);
  }

  return (
    <form action={updateProduct} onSubmit={handleSubmit} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <input type="hidden" name="id" value={product.id} />

      {error && (
        <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "var(--radius-md)", color: "#b91c1c", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama Produk *</span>
        <input type="text" name="name" defaultValue={product.name} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi *</span>
        <textarea name="description" defaultValue={product.description} required rows={3} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px", resize: "vertical" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Label (opsional)</span>
        <input type="text" name="label" defaultValue={product.label ?? ""} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Foto Produk (maks {MAX_SIZE_MB}MB)</span>
        {product.image_url && (
          <div style={{ marginBottom: "8px" }}>
            <img src={product.image_url} alt={product.name} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }} />
            <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Foto saat ini</p>
          </div>
        )}
        <input ref={fileRef} type="file" name="image" accept="image/*" style={{ padding: "10px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Format: JPG, PNG, WebP. Maksimal {MAX_SIZE_MB} MB. Kosongkan jika tidak ingin mengubah foto.</span>
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Tokopedia (opsional)</span>
        <input type="url" name="tokopedia_url" defaultValue={product.tokopedia_url ?? ""} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Shopee (opsional)</span>
        <input type="url" name="shopee_url" defaultValue={product.shopee_url ?? ""} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input type="checkbox" name="is_active" defaultChecked={product.is_active} style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }} />
        <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>Produk aktif (tampil di halaman toko)</span>
      </label>

      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <SubmitButton label="Simpan" loadingLabel="Menyimpan..." />
        <Link href="/portal/toko" style={{
          padding: "12px 28px",
          background: "transparent",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-secondary)",
          borderRadius: "var(--radius-lg)",
          fontSize: "13px",
          textDecoration: "none",
        }}>
          Batal
        </Link>
      </div>
    </form>
  );
}
