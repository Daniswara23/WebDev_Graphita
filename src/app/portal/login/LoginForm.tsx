/*
  LoginForm.tsx — form login mitra (Client Component).
*/

"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/portal/dashboard";
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input type="hidden" name="next" value={next} />

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Email</span>
        <input type="email" name="email" required autoComplete="email" style={{ padding: "14px 18px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Password</span>
        <input type="password" name="password" required autoComplete="current-password" style={{ padding: "14px 18px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "6px", fontSize: "15px" }} />
      </label>

      {state.error && (
        <div style={{ padding: "12px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.4)", color: "#fca5a5", borderRadius: "6px", fontSize: "13px" }}>
          {state.error}
        </div>
      )}

      <button type="submit" disabled={pending} style={{ padding: "14px 24px", background: pending ? "rgba(201,147,58,0.5)" : "var(--gold)", color: "var(--navy-dark)", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", cursor: pending ? "not-allowed" : "pointer", marginTop: "8px" }}>
        {pending ? "Memproses..." : "Masuk"}
      </button>

      <p style={{ fontSize: "12px", color: "var(--text-secondary)", textAlign: "center", marginTop: "8px" }}>
  Hubungi tim Grahita jika belum memiliki akses admin.
      </p>
    </form>
  );
}