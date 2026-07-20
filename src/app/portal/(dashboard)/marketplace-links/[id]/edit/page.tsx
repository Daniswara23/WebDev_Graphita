/*
  portal/marketplace-links/[id]/edit/page.tsx — Form edit marketplace link.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateMarketplaceLink } from "../../actions";

const PLATFORM_LABELS: Record<string, string> = {
  tokopedia: "Tokopedia",
  shopee: "Shopee",
};

export default async function EditMarketplaceLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: link } = await supabase
    .from("marketplace_links")
    .select("*")
    .eq("id", id)
    .single();

  if (!link) notFound();

  const platformLabel = PLATFORM_LABELS[link.platform] || link.platform;

  return (
    <div>
      <Link href="/portal/marketplace-links" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
        Edit Marketplace: {platformLabel}
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "32px" }}>
        Ubah tautan marketplace. Kosongkan jika belum tersedia (akan tampil "Segera Hadir").
      </p>

      <form action={updateMarketplaceLink} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <input type="hidden" name="id" value={link.id} />
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Platform</span>
          <input
            type="text"
            value={platformLabel}
            disabled
            style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-secondary)", borderRadius: "var(--radius-md)", fontSize: "15px", opacity: 0.7 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>URL Marketplace</span>
          <input
            type="url"
            name="url"
            placeholder="https://..."
            defaultValue={link.url || ""}
            style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }}
          />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Kosongkan jika belum ada — akan otomatis menampilkan "Segera Hadir" di halaman toko.
          </span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" name="is_active" defaultChecked={link.is_active} style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }} />
          <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>Tampilkan di halaman toko</span>
        </label>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <button type="submit" style={{
            padding: "12px 28px",
            background: "var(--gold)",
            color: "var(--navy-dark)",
            border: "none",
            borderRadius: "var(--radius-lg)",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}>
            Simpan
          </button>
          <Link href="/portal/marketplace-links" style={{
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
    </div>
  );
}