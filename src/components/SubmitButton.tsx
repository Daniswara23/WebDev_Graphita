/*
  SubmitButton.tsx — Reusable submit button dengan loading indicator.
  Gunakan di semua form admin agar user mendapat feedback visual saat submit.
  
  Dua mode:
  1. useFormStatus (default) — untuk form dengan action={serverAction}
  2. Manual pending state — untuk form dengan onSubmit handler
*/

"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  /** Label saat tidak loading */
  label?: string;
  /** Label saat loading (default: "Menyimpan...") */
  loadingLabel?: string;
  /** Manual pending state — gunakan jika form pakai onSubmit, bukan action */
  isPending?: boolean;
  /** Warna background (default: var(--gold)) */
  color?: string;
  /** Ukuran padding */
  size?: "sm" | "md";
}

export function SubmitButton({
  label = "Simpan",
  loadingLabel = "Menyimpan...",
  isPending: manualPending,
  color,
  size = "md",
}: SubmitButtonProps) {
  // useFormStatus otomatis mendeteksi pending dari form action
  const { pending: formPending } = useFormStatus();
  const isPending = manualPending !== undefined ? manualPending : formPending;

  const padding = size === "sm" ? "10px 20px" : "12px 28px";
  const fontSize = size === "sm" ? "12px" : "13px";

  return (
    <button
      type="submit"
      disabled={isPending}
      style={{
        padding,
        background: color || "var(--gold)",
        color: "var(--navy-dark)",
        border: "none",
        borderRadius: "var(--radius-lg)",
        fontSize,
        fontWeight: 700,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        cursor: isPending ? "not-allowed" : "pointer",
        opacity: isPending ? 0.7 : 1,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.3s ease",
      }}
    >
      {isPending && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ animation: "spin 1s linear infinite" }}
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
        </svg>
      )}
      {isPending ? loadingLabel : label}
    </button>
  );
}