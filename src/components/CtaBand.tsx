/*
  CtaBand.tsx — CALL TO ACTION BAND
  
  Banner di bagian bawah halaman yang mengajak pengunjung
  untuk menghubungi perusahaan.
  
  Komponen paling sederhana — hanya tampilan statis.
*/

"use client";

import { useRouter } from "next/navigation";

export default function CtaBand() {
  const router = useRouter();

  const goToContact = () => {
    router.push("/contact");
  };
  return (
    <div
      style={{
        background: "var(--cta-bg, #ffffff)",
        padding: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
        flexWrap: "wrap",
      }}
    >
      {/* Teks kiri */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-3xl)",
            fontWeight: 700,
            color: "var(--cta-text, #0c1163)",
            marginBottom: "8px",
          }}
        >
        Mari Berkolaborasi untuk Membangun Ekosistem yang Berdaya
        </h3>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--cta-text-muted, rgba(30, 58, 95, 0.7))",
            fontWeight: 300,
          }}
        >
        Hubungi kami untuk konsultasi awal — bersama kita wujudkan dampak yang berkelanjutan.
        </p>
      </div>

      {/* Tombol kanan */}
      <button
        onClick={goToContact}
        style={{
          padding: "14px 40px",
          background: "var(--cta-btn-bg, #c9a84c)",
          color: "var(--cta-btn-text, #0c1163)",
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          cursor: "pointer",
          border: "none",
          borderRadius: "2px",
          whiteSpace: "nowrap",
        }}
      >
        Mulai Kolaborasi
      </button>

    </div>
  );
}