/*
  portal/marketplace-links/page.tsx — Daftar marketplace links (admin).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PLATFORM_LABELS: Record<string, string> = {
  tokopedia: "Tokopedia",
  shopee: "Shopee",
};

const PLATFORM_ICONS: Record<string, string> = {
  tokopedia: "/images/tokopedia-logo.png",
  shopee: "/images/shopee-logo.png",
};

export default async function MarketplaceLinksAdminPage() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("marketplace_links")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
          Marketplace Links
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Kelola tautan marketplace untuk halaman toko publik.
        </p>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Platform</th>
              <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>URL</th>
              <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
              <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!links || links.length === 0) ? (
              <tr>
                <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada data marketplace.
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr key={link.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {PLATFORM_LABELS[link.platform] || link.platform}
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {link.url ? (
                      <a href={link.url} target="_blank" rel="noreferrer" style={{ color: "var(--gold)", textDecoration: "none" }}>
                        {link.url}
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
                        Segera Hadir
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: "var(--radius-xl)",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: link.is_active ? "rgba(82, 183, 136, 0.2)" : "rgba(100, 100, 100, 0.2)",
                      color: link.is_active ? "#52b788" : "#888",
                    }}>
                      {link.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <Link href={`/portal/marketplace-links/${link.id}/edit`} style={{
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