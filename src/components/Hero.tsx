/*
  Hero.tsx — SECTION UTAMA (HERO)
*/

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
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
        backgroundColor: "var(--navy-dark)",
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
          src="/images/hero.jpg"
          alt="Latar belakang panel surya dan pekerja"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.85,
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
              "linear-gradient(to right, rgba(10,20,40,0.97) 0%, rgba(10,20,40,0.88) 30%, rgba(10,20,40,0.45) 52%, transparent 68%)",
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
            backgroundColor: "rgba(10, 20, 40, 1)",
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
              color: "var(--gold-light)",
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
              fontSize: "var(--text-base)",
              lineHeight: "var(--line-normal)",
              color: "rgba(255,255,255,0.95)",
              maxWidth: "480px",
              marginBottom: "40px",
              fontWeight: 300,
            }}
          >
            Kami membantu organisasi merancang arah keberlanjutan yang jelas,
            sederhana, dan mudah dijalankan.
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
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 5,
          position: "relative",
          width: "100%",
        }}
      >
        <p style={{ fontFamily: "var(--font-primary)", color: "var(--gold-light)", fontSize: "var(--text-base)", maxWidth: "760px", textAlign: "center", lineHeight: "var(--line-relaxed)" }}>
          Pernyataan kami tidak bergantung pada daftar nama. Kami menghadirkan pengalaman mitra secara visual, melalui proses yang jelas dan hasil yang dapat ditinjau.
        </p>
      </div>

    </section>
  );
}
