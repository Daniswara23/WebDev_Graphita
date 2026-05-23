/*
  /portal/login — Halaman login admin.
*/

import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login Admin - Grahita Adhi Sasmita",
};

export default function PortalLoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", background: "radial-gradient(circle at 30% 20%, rgba(201,147,58,0.08), transparent 60%), var(--navy-dark)" }}>
      <div style={{ width: "100%", maxWidth: "440px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "48px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-primary)", fontSize: "24px", fontWeight: 700, color: "var(--gold-light)", textDecoration: "none", letterSpacing: "0.5px" }}>
            Grahita <span style={{ color: "var(--white)" }}>Adhi Sasmita</span>
          </Link>
          <h1 style={{ marginTop: "20px", fontSize: "22px", fontWeight: 700, color: "var(--white)" }}>Portal Admin</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>
            Masuk untuk mengelola konten website.
          </p>
        </div>

        <Suspense fallback={<p style={{ color: "rgba(255,255,255,0.5)" }}>Memuat...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}