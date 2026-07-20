/*
  FormActions.tsx — Client component wrapper untuk tombol submit + batal.
  Gunakan di form server component agar SubmitButton (useFormStatus) bisa berfungsi.
*/

"use client";

import Link from "next/link";
import { SubmitButton } from "./SubmitButton";

interface FormActionsProps {
  submitLabel?: string;
  submitLoadingLabel?: string;
  cancelHref: string;
  cancelLabel?: string;
}

export default function FormActions({
  submitLabel = "Simpan",
  submitLoadingLabel = "Menyimpan...",
  cancelHref,
  cancelLabel = "Batal",
}: FormActionsProps) {
  return (
    <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
      <SubmitButton label={submitLabel} loadingLabel={submitLoadingLabel} />
      <Link
        href={cancelHref}
        style={{
          padding: "12px 28px",
          background: "transparent",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-secondary)",
          borderRadius: "var(--radius-lg)",
          fontSize: "13px",
          textDecoration: "none",
        }}
      >
        {cancelLabel}
      </Link>
    </div>
  );
}