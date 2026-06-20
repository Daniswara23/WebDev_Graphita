/*
  case-videos/[id]/edit/page.tsx — Form edit video.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCaseVideo } from "../../actions";

export default async function EditCaseVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: video } = await supabase.from("case_videos").select("*").eq("id", id).single();

  if (!video) notFound();

  return (
    <div>
      <Link href="/portal/case-videos" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Edit Video
      </h1>

      <form action={updateCaseVideo.bind(null, id)} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul Video *</span>
          <input
            type="text"
            name="title"
            defaultValue={video.title}
            required
            style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Link Video (YouTube / Vimeo) *</span>
          <input
            type="url"
            name="video_url"
            defaultValue={video.video_url}
            required
            style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }}
          />
          <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
            Link akan otomatis dikonversi ke format embed. Salin link YouTube/Vimeo di sini.
          </span>
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan Tampil</span>
            <input
              type="number"
              name="sort_order"
              defaultValue={video.sort_order}
              min="0"
              style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }}
            />
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Angka kecil = tampil lebih awal
            </span>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</span>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", borderRadius: "6px" }}>
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={video.is_active}
                style={{ accentColor: "var(--gold)", width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>Aktif (tampilkan di website)</span>
            </label>
          </label>
        </div>

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
            Simpan Perubahan
          </button>
          <Link href="/portal/case-videos" style={{
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