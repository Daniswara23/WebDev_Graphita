/*
  IdleTimeout.tsx — Client Component.
  Mendeteksi inactivity (30 menit) dan logout otomatis dengan warning 30 detik.
*/

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 menit
const WARNING_BEFORE = 30 * 1000; // 30 detik sebelum logout

export default function IdleTimeout() {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const logout = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/logout", { method: "POST" });
      if (res.ok) {
        router.push("/portal/login");
      }
    } catch {
      router.push("/portal/login");
    }
  }, [router]);

  const resetTimer = useCallback(() => {
    // Hapus timer yang berjalan
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    setShowWarning(false);

    // Set timer baru: warning dulu, lalu logout
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
    }, IDLE_TIMEOUT - WARNING_BEFORE);

    timerRef.current = setTimeout(() => {
      logout();
    }, IDLE_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    // Event listeners untuk mendeteksi aktivitas
    const events = ["mousedown", "keydown", "mousemove", "touchstart", "scroll", "click"];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Start timer pertama kali
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, [resetTimer]);

  // Jika warning tampil, tetap reset timer jika user kembali aktif
  const handleStayActive = () => {
    setShowWarning(false);
    resetTimer();
  };

  return (
    <>
      {showWarning && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-lg)",
            padding: "40px 48px",
            maxWidth: "440px",
            width: "90%",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏰</div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
              Sesi Akan Berakhir
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: 1.6 }}>
              Anda tidak melakukan aktivitas selama 30 menit.
              Demi keamanan, sesi akan ditutup dalam 30 detik.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={handleStayActive}
                style={{
                  padding: "12px 28px",
                  background: "var(--gold)",
                  color: "var(--navy-dark)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Saya masih di sini
              </button>
              <button
                onClick={logout}
                style={{
                  padding: "12px 28px",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Logout Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}