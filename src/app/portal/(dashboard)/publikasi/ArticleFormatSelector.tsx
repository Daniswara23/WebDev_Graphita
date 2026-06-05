"use client";

import { useState } from "react";

type Mode = "create" | "edit";

interface Props {
  mode: Mode;
  defaultSourceType?: "" | "pdf" | "link";
  existingFileUrl?: string | null;
  existingExternalUrl?: string | null;
}

export default function ArticleFormatSelector({
  mode,
  defaultSourceType = "",
  existingFileUrl = null,
  existingExternalUrl = null,
}: Props) {
  const [sourceType, setSourceType] = useState<"" | "pdf" | "link">(defaultSourceType);

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", display: "block" }}>
        Format Artikel *
      </span>
      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
        Pilih salah satu: upload PDF atau masukkan link external
      </p>

      <div style={{ display: "flex", gap: "24px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="radio"
            name="source_type"
            value="pdf"
            checked={sourceType === "pdf"}
            onChange={(e) => setSourceType(e.target.value as "pdf")}
            style={{ accentColor: "var(--gold)", width: "16px", height: "16px" }}
          />
          <span style={{ fontSize: "14px", color: "var(--white)" }}>Upload PDF</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="radio"
            name="source_type"
            value="link"
            checked={sourceType === "link"}
            onChange={(e) => setSourceType(e.target.value as "link")}
            style={{ accentColor: "var(--gold)", width: "16px", height: "16px" }}
          />
          <span style={{ fontSize: "14px", color: "var(--white)" }}>Link External</span>
        </label>
      </div>

      {sourceType === "pdf" && (
        <div style={{ marginTop: "16px" }}>
          {mode === "edit" && existingFileUrl && (
            <div style={{ fontSize: "13px", color: "#52b788", marginBottom: "8px" }}>
              PDF saat ini:{" "}
              <a href={existingFileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#52b788", textDecoration: "underline" }}>
                Lihat PDF
              </a>
            </div>
          )}
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
              {mode === "edit" ? "Ganti PDF baru (kosongkan jika tidak ingin diganti)" : "File PDF (maks 10MB)"}
            </span>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              required={mode === "create"}
              style={{ padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "14px" }}
            />
          </label>
          {mode === "edit" && <input type="hidden" name="existing_file_url" value={existingFileUrl ?? ""} />}
        </div>
      )}

      {sourceType === "link" && (
        <div style={{ marginTop: "16px" }}>
          {mode === "edit" && existingExternalUrl && (
            <div style={{ fontSize: "13px", color: "#52b788", marginBottom: "8px" }}>
              Link saat ini:{" "}
              <a href={existingExternalUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#52b788", textDecoration: "underline" }}>
                {existingExternalUrl}
              </a>
            </div>
          )}
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>URL External (contoh: https://kompas.id/...)</span>
            <input
              type="url"
              name="external_url"
              defaultValue={existingExternalUrl ?? ""}
              placeholder="https://"
              required={mode === "create"}
              style={{ padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "6px", fontSize: "15px" }}
            />
          </label>
          {mode === "edit" && <input type="hidden" name="existing_external_url" value={existingExternalUrl ?? ""} />}
        </div>
      )}

      {sourceType === "" && (
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "16px", fontStyle: "italic" }}>
          Pilih format di atas untuk menampilkan input yang sesuai.
        </p>
      )}
    </div>
  );
}


