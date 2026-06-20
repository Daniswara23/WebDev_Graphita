/*
  dokumentasi/page.tsx — Daftar galeri foto dokumentasi kegiatan (admin).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteGallery } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";

export default async function DokumentasiPage() {
  const supabase = await createClient();
  const { data: galleries } = await supabase
    .from("photo_galleries")
    .select("id, title, event_date, is_published, sort_order, created_at")
    .order("sort_order", { ascending: true });

  // Get image count for each gallery
  let imageCounts: Record<string, number> = {};
  if (galleries && galleries.length > 0) {
    const { data: counts } = await supabase
      .from("gallery_images")
      .select("gallery_id")
      .in("gallery_id", galleries.map((g) => g.id));

    if (counts) {
      imageCounts = counts.reduce((acc: Record<string, number>, img) => {
        acc[img.gallery_id] = (acc[img.gallery_id] || 0) + 1;
        return acc;
      }, {});
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
            Dokumentasi Kegiatan
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Kelola galeri foto dokumentasi kegiatan dan event.
          </p>
        </div>
        <Link href="/portal/dokumentasi/create" style={{
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
          + Event Baru
        </Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Event</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Foto</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!galleries || galleries.length === 0) ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada dokumentasi. Klik &ldquo;+ Event Baru&rdquo; untuk menambahkan.
                </td>
              </tr>
            ) : (
              galleries.map((gallery) => (
                <tr key={gallery.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{gallery.title}</div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-primary)" }}>
                    {gallery.event_date
                      ? new Date(gallery.event_date + "T12:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                      : "—"}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-primary)" }}>
                    {imageCounts[gallery.id] || 0} foto
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-primary)" }}>
                    {gallery.sort_order}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {gallery.is_published ? (
                      <span style={{ fontSize: "12px", color: "#52b788" }}>● Publik</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>● Draf</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/dokumentasi/${gallery.id}/edit`} style={{
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
                        action={deleteGallery.bind(null, gallery.id)}
                        confirmMessage={`Hapus event "${gallery.title}" beserta semua fotonya?`}
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
        💡 Paste URL foto (ImgBB, Cloudinary, atau URL gambar lainnya) ke form, dan foto akan otomatis tampil di website.
      </p>
    </div>
  );
}