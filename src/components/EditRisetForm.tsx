"use client";

import { updateReport } from "@/app/portal/(dashboard)/riset/actions";
import Link from "next/link";
import { useRef, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";

type Report = {
  id: string;
  title: string;
  subtitle: string | null;
  year: number;
  category: string;
  file_url: string | null;
};

const MAX_SIZE_MB = 10;

export function EditRisetForm({ report }: { report: Report }) {
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const file = fileRef.current?.files?.[0];
    if (file && file.size > MAX_SIZE_MB * 1024 * 1024) {
      e.preventDefault();
      setError(`Ukuran file maksimal ${MAX_SIZE_MB} MB. File Anda ${(file.size / (1024 * 1024)).toFixed(1)} MB.`);
      return;
    }
    setError(null);
  }

  return (
    <form action={updateReport} onSubmit={handleSubmit} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <input type="hidden" name="id" value={report.id} />
      <input type="hidden" name="existing_url" value={report.file_url ?? ""} />

      {error && (
        <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "var(--radius-md)", color: "#b91c1c", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul *</span>
        <input type="text" name="title" defaultValue={report.title} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Subtitle (opsional)</span>
        <input type="text" name="subtitle" defaultValue={report.subtitle ?? ""} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori *</span>
          <select name="category" defaultValue={report.category} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }}>
            {["Sosial", "Ekonomi", "Lingkungan", "SDGs", "Pangan", "Lainnya"].map((cat) => (
              <option key={cat} value={cat} style={{ background: "var(--bg-primary)" }}>{cat}</option>
            ))}
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tahun *</span>
          <input type="number" name="year" min="2000" max="2099" defaultValue={report.year} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
        </label>
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>
          File PDF {report.file_url ? "(saat ini: sudah ada)" : `(opsional, maks ${MAX_SIZE_MB}MB)`}
        </span>
        <input ref={fileRef} type="file" name="file" accept=".pdf,application/pdf" style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "14px" }} />
        <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>
          Kosongkan jika tidak ingin mengganti file. Maksimal {MAX_SIZE_MB} MB.
        </span>
      </label>

      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <SubmitButton label="Simpan" loadingLabel="Menyimpan..." />
        <Link href="/portal/riset" style={{
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
  );
}
