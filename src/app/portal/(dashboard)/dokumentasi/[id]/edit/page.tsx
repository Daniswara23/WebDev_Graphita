/*
  dokumentasi/[id]/edit/page.tsx — Form edit event dokumentasi.
*/

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { updateGallery } from "../../actions";
import { toDirectImageUrl } from "@/lib/gdrive";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

type ImageEntry = {
  id: string;
  url: string;
  caption: string;
};

let imageIdCounter = 1000;
function newImageEntry(url = "", caption = ""): ImageEntry {
  return { id: `edit-img-${++imageIdCounter}`, url, caption };
}

export default function EditDokumentasiPage() {
  const params = useParams();
  const galleryId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: gallery } = await supabase
        .from("photo_galleries")
        .select("*")
        .eq("id", galleryId)
        .single();

      if (!gallery) {
        setError("Event tidak ditemukan.");
        setLoading(false);
        return;
      }

      setTitle(gallery.title);
      setDescription(gallery.description || "");
      setLocation(gallery.location || "");
      setEventDate(gallery.event_date || "");
      setSortOrder(gallery.sort_order);
      setIsPublished(gallery.is_published);

      const { data: galleryImages } = await supabase
        .from("gallery_images")
        .select("image_url, caption")
        .eq("gallery_id", galleryId)
        .order("sort_order");

      if (galleryImages) {
        setImages(
          galleryImages.map((img) => newImageEntry(img.image_url, img.caption || ""))
        );
      }

      setLoading(false);
    }
    load();
  }, [galleryId]);

  const addImageRow = () => {
    setImages((prev) => [...prev, newImageEntry()]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImage = (id: string, field: "url" | "caption", value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsPending(true);
    try {
      await updateGallery(galleryId, formData);
    } catch (e) {
      if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
        setError(e.message);
        setIsPending(false);
      }
    }
  }

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>Memuat data...</div>;
  }

  return (
    <div>
      <Link href="/portal/dokumentasi" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Edit Event
      </h1>

      {error && (
        <div style={{ padding: "12px 16px", background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "8px", color: "#ff5050", fontSize: "14px", marginBottom: "24px" }}>
          {error}
        </div>
      )}

      <form action={handleSubmit} style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul Event *</span>
            <input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal Event</span>
            <input type="date" name="event_date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Lokasi (opsional)</span>
            <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan</span>
            <input type="number" name="sort_order" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi (opsional)</span>
          <textarea name="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" name="is_published" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }} />
          <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>Publikasikan (tampil di halaman dokumentasi)</span>
        </label>

        {/* Images Section */}
        <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "24px", marginTop: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                Foto-foto Kegiatan
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Paste URL foto (ImgBB, Cloudinary, dll.). Foto akan otomatis tampil preview.
              </p>
            </div>
            <button
              type="button"
              onClick={addImageRow}
              style={{
                padding: "10px 18px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              + Tambah Foto
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {images.map((entry) => {
              const directUrl = toDirectImageUrl(entry.url);
              const showPreview = entry.url.trim().length > 0 && directUrl !== null;
              return (
                <div key={entry.id} style={{ padding: "16px", border: "1px solid var(--card-border)", borderRadius: "8px", background: "var(--bg-secondary)" }}>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "4px" }}>
                        URL Foto
                      </label>
                      <input
                        type="url"
                        name={`image_url[]`}
                        value={entry.url}
                        onChange={(e) => updateImage(entry.id, "url", e.target.value)}
                        style={{ width: "100%", padding: "10px 14px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "14px" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "4px" }}>
                        Keterangan (opsional)
                      </label>
                      <input
                        type="text"
                        name={`caption[]`}
                        value={entry.caption}
                        onChange={(e) => updateImage(entry.id, "caption", e.target.value)}
                        style={{ width: "100%", padding: "10px 14px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "14px" }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(entry.id)}
                      style={{
                        alignSelf: "flex-end",
                        padding: "10px 14px",
                        background: "transparent",
                        border: "1px solid rgba(255, 80, 80, 0.3)",
                        color: "#ff5050",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                  {showPreview && (
                    <div style={{ marginTop: "8px" }}>
                      <img
                        src={directUrl!}
                        alt="Preview"
                        style={{ maxHeight: "180px", maxWidth: "100%", borderRadius: "6px", border: "1px solid var(--card-border)" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <button
            type="submit"
            disabled={isPending}
            style={{
              padding: "12px 28px",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <Link href="/portal/dokumentasi" style={{
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