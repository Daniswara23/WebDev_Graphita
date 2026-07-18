/*
  portal/social-links/page.tsx — Kelola Social Media Links
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteSocialLink } from "./actions";
import DeleteButton from "../DeleteButton";
import { PLATFORM_OPTIONS } from "./constants";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon_path: string;
  is_active: boolean;
  sort_order: number;
};

export default async function SocialLinksAdminPage() {
  const supabase = await createClient();
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order");

  // Get label for platform
  const getPlatformLabel = (platform: string) => {
    const option = PLATFORM_OPTIONS.find((p) => p.value === platform);
    return option?.label || platform;
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
          Social Media Links
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Kelola tautan media sosial untuk halaman kontak.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>Daftar Social Media</h2>
        </div>
        <Link href="/portal/social-links/create" style={{
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
          + Tambah Social Media
        </Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
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
            {(!socialLinks || socialLinks.length === 0) ? (
              <tr>
                <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada social media. Klik "+ Tambah Social Media" untuk menambah.
                </td>
              </tr>
            ) : (
              (socialLinks as SocialLink[]).map((link) => (
                <tr key={link.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {getPlatformLabel(link.platform)}
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <a href={link.url} target="_blank" rel="noreferrer" style={{ color: "var(--gold)", textDecoration: "none" }}>
                      {link.url}
                    </a>
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: link.is_active ? "rgba(82, 183, 136, 0.2)" : "rgba(100, 100, 100, 0.2)",
                      color: link.is_active ? "#52b788" : "#888",
                    }}>
                      {link.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/social-links/${link.id}/edit`} style={{
                        padding: "6px 14px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}>
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteSocialLink.bind(null, link.id)}
                        confirmMessage="Hapus social media ini?"
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