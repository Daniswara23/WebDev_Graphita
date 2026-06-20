/*
  Hero.tsx — SECTION UTAMA (HERO)
*/

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/images/hero.jpg",
  "/images/hero1.jpg",
  "/images/hero2.jpg",
];

export default function Hero() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToContact = () => {
    router.push("/contact");
  };
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--hero-bg)",
      }}
    >
      {/* ===== GAMBAR LATAR BELAKANG DAN OVERLAY ===== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Image
          src={HERO_IMAGES[currentImageIndex]}
          alt="Latar belakang Graphita"
          fill
          priority
          style={{
            objectFit: "cover",
            opacity: isTransitioning ? 0 : 0.85,
            transition: "opacity 0.5s ease-in-out",
          }}
        />

        {/* 
          ── OVERLAY 1 ──────────────────────────────────────────────────
          Penutup sisi KIRI yang solid (area teks).
          Gradient dari navy solid di kiri → transparan di tengah-kanan.
          Fungsi: membuat teks terbaca, sekaligus "membingkai" foto dari kiri.
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, var(--hero-overlay) 0%, var(--hero-overlay-mid) 30%, var(--hero-overlay-mid2) 52%, transparent 68%)",
            zIndex: 2,
          }}
        />

        {/* 
          ── OVERLAY 2 ──────────────────────────────────────────────────
          "Bingkai Oval" di sekeliling foto sisi kanan.
          Menggunakan mask-image radial-gradient agar overlay ini
          hanya muncul di TEPI LUAR oval → foto terlihat di dalam bingkai.
          
          Cara kerjanya:
          - div ini berwarna navy solid penuh
          - mask-image membuat bagian TENGAH-KANAN menjadi transparan (terlihat foto)
          - bagian LUAR oval tetap tertutup navy → efek frame
          
          Ubah angka "at 72% 45%" untuk geser posisi oval.
          Ubah "55% 70%" untuk ubah ukuran oval.
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--hero-overlay-2)",
            WebkitMaskImage:
              "radial-gradient(ellipse 52% 68% at 70% 44%, transparent 0%, transparent 52%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.75) 78%, black 92%)",
            maskImage:
              "radial-gradient(ellipse 52% 68% at 70% 44%, transparent 0%, transparent 52%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.75) 78%, black 92%)",
            zIndex: 3,
          }}
        />
      </div>

      {/* ===== KONTEN UTAMA ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "96px 56px 0",
          zIndex: 5,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "600px",
          }}
        >
          <h1
            className="animate-on-scroll"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-5xl)",
              fontWeight: 900,
              lineHeight: "var(--line-tight)",
              marginBottom: "20px",
              color: "var(--hero-heading-primary)",
              textTransform: "uppercase",
            }}
          >
            Menjadi Sahabat<br />
            Menuju Keberlanjutan<br />
            yang Maknawi
          </h1>

          <p
            className="animate-on-scroll animate-delay-200"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--line-normal)",
              color: "var(--gold)",
              maxWidth: "480px",
              marginBottom: "40px",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            Tanggap – Tangguh – Tumbuh
          </p>

          <div className="animate-on-scroll animate-delay-400" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              onClick={goToContact}
              className="hover-lift hover-glow"
              style={{
                padding: "12px 30px",
                background: "var(--gold)",
                color: "var(--navy-dark)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "capitalize",
                cursor: "pointer",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Mulai Kolaborasi
            </button>

            <button
              onClick={() => {
                const element = document.getElementById('layanan');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover-scale"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--gold-light)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-xs)",
                letterSpacing: "1px",
                textTransform: "capitalize",
                cursor: "pointer",
                background: "none",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--gold-light)";
              }}
            >
              Lihat Layanan
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid var(--gold-light)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== SECTION STATEMENT VISUAL ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 56px",
          backgroundColor: "var(--hero-statement-bg)",
          zIndex: 5,
          position: "relative",
          width: "100%",
        }}
      >
        <p style={{ fontFamily: "var(--font-primary)", color: "var(--hero-statement-text)", fontSize: "var(--text-base)", maxWidth: "760px", textAlign: "center", lineHeight: "var(--line-relaxed)" }}>
          Sahabat yang hadir, merasakan, dan menyatu — menciptakan pusaran kebaikan yang terus bertumbuh untuk generasi selanjutnya.
        </p>
      </div>

    </section>
  );
}
