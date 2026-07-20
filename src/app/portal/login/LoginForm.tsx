/*
  LoginForm.tsx — form login mitra (Client Component).
*/

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/portal/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login gagal.");
        setPending(false);
        return;
      }

      router.push(data.redirectTo || next);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input type="hidden" name="next" value={next} />

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Email</span>
        <input type="email" name="email" required autoComplete="email" style={{ padding: "14px 18px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Password</span>
        <input type="password" name="password" required autoComplete="current-password" style={{ padding: "14px 18px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
      </label>

      {error && (
        <div style={{ padding: "12px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.4)", color: "#fca5a5", borderRadius: "var(--radius-md)", fontSize: "13px" }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={pending} style={{ padding: "14px 24px", background: pending ? "rgba(201,147,58,0.5)" : "var(--gold)", color: "var(--navy-dark)", border: "none", borderRadius: "var(--radius-lg)", fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", cursor: pending ? "not-allowed" : "pointer", marginTop: "8px" }}>
        {pending ? "Memproses..." : "Masuk"}
      </button>

      <p style={{ fontSize: "12px", color: "var(--text-secondary)", textAlign: "center", marginTop: "8px" }}>
  Hubungi tim Grahita jika belum memiliki akses admin.
      </p>
    </form>
  );
}