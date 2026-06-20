/*
  case-videos/page.tsx — Daftar video carousel "Sekilas Tentang Kami" (admin).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteCaseVideo } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";

export default async function CaseVideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("case_videos")
    .select("id, title, video_url, sort_order, is_active, created_at")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
            Video Carousel
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Kelola video untuk section "Sekilas Tentang Kami". Video ditampilkan sebagai carousel di samping gambar.
          </p>
        </div>
        <Link href="/portal/case-videos/create" style={{
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
          + Video Baru
        </Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Link</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!videos || videos.length === 0) ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada video. Klik "+ Video Baru" untuk menambahkan.
                </td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr key={video.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{video.title}</div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <a href={video.video_url} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: "12px",
                      color: "#52b788",
                      textDecoration: "none",
                      wordBreak: "break-all",
                      display: "inline-block",
                      maxWidth: "320px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {video.video_url}
                    </a>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-primary)" }}>
                    {video.sort_order}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {video.is_active ? (
                      <span style={{ fontSize: "12px", color: "#52b788" }}>● Aktif</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>● Non-aktif</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/case-videos/${video.id}/edit`} style={{
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
                        action={deleteCaseVideo.bind(null, video.id)}
                        confirmMessage="Hapus video ini?"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
        💡 Tips: Upload video ke YouTube terlebih dahulu, lalu salin link video (https://youtu.be/... atau https://www.youtube.com/watch?v=...) ke form tambah video.
      </p>
    </div>
  );
}