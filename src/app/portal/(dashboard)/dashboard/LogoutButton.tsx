"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/portal/logout", { method: "POST" });
      router.push("/portal/login");
    } catch {
      router.push("/portal/login");
    }
  }

  return (
    <button type="button" onClick={handleLogout} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", borderRadius: "var(--radius-md)", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>
      Keluar
    </button>
  );
}
