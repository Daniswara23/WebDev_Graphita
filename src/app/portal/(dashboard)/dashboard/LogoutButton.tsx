"use client";

import { logoutAction } from "@/app/portal/login/actions";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", borderRadius: "6px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>
        Keluar
      </button>
    </form>
  );
}
