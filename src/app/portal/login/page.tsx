/*
  /portal/login — Halaman login admin.
*/

import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Login Admin - Grahita Adhi Sasmita",
};

export default function PortalLoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", background: "radial-gradient(circle at 30% 20%, var(--overlay-gold), transparent 60%), var(--bg-primary)" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Theme Toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <ThemeToggle />
        </div>
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "16px", padding: "48px 36px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Link href="/">
              <img src="/images/logo-GAS.png" alt="Grahita Adhi Sasmita" style={{ maxWidth: "200px", height: "auto" }} />
            </Link>
            <h1 style={{ marginTop: "20px", fontSize: "22px", fontWeight: 700, color: "var(--text-primary)" }}>Portal Admin</h1>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "6px" }}>
              Masuk untuk mengelola konten website.
            </p>
          </div>

          <Suspense fallback={<p style={{ color: "var(--text-secondary)" }}>Memuat...</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}