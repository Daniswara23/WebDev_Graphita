/*
  dokumentasi/create/page.tsx — Form tambah event dokumentasi baru.
  Admin cukup paste URL foto — langsung preview.
*/

"use client";

import Link from "next/link";
import { useState } from "react";
import { createGallery } from "../actions";
import { toDirectImageUrl } from "@/lib/gdrive";

type ImageEntry = {
  id: string;
  url: string;
  caption: string;
  preview: string | null;
};

let imageIdCounter = 0;
function newImageEntry(): ImageEntry {
  return { id: `img-${++imageIdCounter}`, url: "", caption: "", preview: null };
}

function ImageInputRow({
  entry,
  onChange,
  onRemove,
}: {
  entry: ImageEntry;
  onChange: (id: string, field: "url" | "caption", value: string) => void;
  onRemove: (id: string) => void;
}) {
  const directUrl = toDirectImageUrl(entry.url);
  const showPreview = entry.url.trim().length > 0 && directUrl !== null;

  return (
    <div style={{ padding: "16px", border: "1px solid var(--card-border)", borderRadius: "8px", background: "var(--bg-secondary)" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "4px" }}>
            URL Foto
          </label>
          <input
            type="url"
            name={`image_url[]`}
            value={entry.url}
            onChange={(e) => onChange(entry.id, "url", e.target.value)}
            placeholder="https://i.ibb.co/xxxxx/nama.jpg (ImgBB, dll.)"
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
            onChange={(e) => onChange(entry.id, "caption", e.target.value)}
            placeholder="Keterangan singkat foto..."
            style={{ width: "100%", padding: "10px 14px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "14px" }}
          />
        </div>
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
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
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>
            Preview: <code style={{ fontSize: "10px", wordBreak: "break-all", background: "var(--card-bg)", padding: "2px 6px", borderRadius: "4px" }}>{directUrl}</code>
          </div>
          <img
            src={directUrl!}
            alt="Preview"
            style={{ maxHeight: "180px", maxWidth: "100%", borderRadius: "6px", border: "1px solid var(--card-border)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const errMsg = document.createElement("div");
                errMsg.innerHTML = `<strong>⚠️ Gambar tidak bisa dimuat</strong><br><br>
                  <strong>Penyebab paling umum:</strong><br>
                  URL foto tidak dapat diakses publik.<br><br>
                  <strong>Cara fix:</strong><br>
                  1. Buka link di browser → klik "Bagikan" (Share)<br>
                  2. Ubah dari <strong>"Restricted"</strong> → <strong>"Anyone with the link"</strong><br>
                  3. Set role ke <strong>"Viewer"</strong><br>
                  4. Klik "Done"<br><br>
                  <strong>Alternatif:</strong> Buka foto di browser → klik kanan → "Copy image address" → paste URL tersebut.<br><br>
                  <span style="font-size:11px">Debug URL: ${directUrl}</span>`;
                errMsg.style.color = "#ff5050";
                errMsg.style.fontSize = "13px";
                errMsg.style.lineHeight = "1.6";
                errMsg.style.padding = "16px";
                errMsg.style.background = "rgba(255,80,80,0.08)";
                errMsg.style.borderRadius = "8px";
                errMsg.style.border = "1px solid rgba(255,80,80,0.2)";
                parent.appendChild(errMsg);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function CreateDokumentasiPage() {
  const [images, setImages] = useState<ImageEntry[]>([newImageEntry()]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleImageChange = (id: string, field: "url" | "caption", value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
  };

  const addImageRow = () => {
    setImages((prev) => [...prev, newImageEntry()]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsPending(true);
    try {
      await createGallery(formData);
    } catch (e) {
      if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
        setError(e.message);
        setIsPending(false);
      }
      // NEXT_REDIRECT is handled by Next.js automatically after the catch
    }
  }

  return (
    <div>
      <Link href="/portal/dokumentasi" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Event Baru
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
            <input type="text" name="title" required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal Event</span>
            <input type="date" name="event_date" style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Lokasi (opsional)</span>
            <input type="text" name="location" placeholder="Contoh: Jakarta, Indonesia" style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan</span>
            <input type="number" name="sort_order" defaultValue={0} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi (opsional)</span>
          <textarea name="description" rows={3} placeholder="Cerita singkat tentang kegiatan ini..." style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px", resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" name="is_published" defaultChecked style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }} />
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
                Paste URL foto (ImgBB, Cloudinary, atau URL gambar lainnya). Foto akan otomatis tampil preview.
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
            {images.map((entry) => (
              <ImageInputRow
                key={entry.id}
                entry={entry}
                onChange={handleImageChange}
                onRemove={removeImage}
              />
            ))}
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
            {isPending ? "Menyimpan..." : "Simpan"}
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