/*
  dokumentasi/page.tsx — Daftar galeri foto dokumentasi kegiatan (admin) dengan sorting interaktif.
*/

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { deleteGallery } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";
import { useSort } from "@/hooks/useSort";

type Gallery = {
  id: string;
  title: string;
  event_date: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

type GalleryWithCount = Gallery & { image_count: number };

export default function DokumentasiPage() {
  const [galleries, setGalleries] = useState<GalleryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: galleryData } = await supabase
        .from("photo_galleries")
        .select("id, title, event_date, is_published, sort_order, created_at")
        .order("sort_order", { ascending: true });

      if (galleryData && galleryData.length > 0) {
        const { data: counts } = await supabase
          .from("gallery_images")
          .select("gallery_id")
          .in("gallery_id", galleryData.map((g) => g.id));

        const imageCounts: Record<string, number> = {};
        if (counts) {
          counts.forEach((img) => {
            imageCounts[img.gallery_id] = (imageCounts[img.gallery_id] || 0) + 1;
          });
        }

        setGalleries(
          galleryData.map((g) => ({
            ...(g as Gallery),
            image_count: imageCounts[g.id] || 0,
          }))
        );
      } else {
        setGalleries([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const { sortedData, toggleSort, getSortIndicator } = useSort(galleries, "sort_order");

  const thStyle: React.CSSProperties = {
    padding: "14px 18px",
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

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
          borderRadius: "var(--radius-lg)",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>
          + Galeri Baru
        </Link>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={thStyle} onClick={() => toggleSort("sort_order")}>
                Urutan{getSortIndicator("sort_order")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("title")}>
                Judul{getSortIndicator("title")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("event_date")}>
                Tanggal{getSortIndicator("event_date")}
              </th>
              <th style={{ ...thStyle, cursor: "default" }}>Foto</th>
              <th style={thStyle} onClick={() => toggleSort("is_published")}>
                Status{getSortIndicator("is_published")}
              </th>
              <th style={{ ...thStyle, textAlign: "right", cursor: "default" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada galeri. Klik "+ Galeri Baru" untuk menambah.
                </td>
              </tr>
            ) : (
              sortedData.map((gallery) => (
                <tr key={gallery.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)", textAlign: "center" }}>{gallery.sort_order}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{gallery.title}</div>
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    {formatDate(gallery.event_date)}
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-primary)" }}>
                    {gallery.image_count} foto
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: gallery.is_published ? "rgba(82, 183, 136, 0.2)" : "rgba(148, 163, 184, 0.2)",
                      color: gallery.is_published ? "#52b788" : "#94a3b8",
                    }}>
                      {gallery.is_published ? "Publikasi" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/portal/dokumentasi/${gallery.id}/edit`} style={{
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
                        action={deleteGallery.bind(null, gallery.id)}
                        confirmMessage="Hapus galeri ini beserta semua fotonya?"
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