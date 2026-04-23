/*
  Hero.tsx — SECTION UTAMA (HERO)
*/

export default function Hero() {
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
        <img
          src="/images/hero.jpg"
          alt="Latar belakang panel surya dan pekerja"
          style={{
            width: "100%",
            height: "100%",
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

      {/* ===== NAVBAR ===== */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          background: "rgba(10, 20, 40, 0.9)",
          borderRadius: "50px",
          margin: "30px 50px 0 50px",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div style={{ color: "var(--white)", fontWeight: "bold", fontSize: "20px" }}>LOGO</div>
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <a href="#" style={{ color: "var(--white)", textDecoration: "none", textTransform: "uppercase", fontSize: "12px" }}>ABOUT US</a>
          <a href="#" style={{ color: "var(--white)", textDecoration: "none", textTransform: "uppercase", fontSize: "12px" }}>INSIGHT</a>
          <a href="#" style={{ color: "var(--white)", textDecoration: "none", textTransform: "uppercase", fontSize: "12px" }}>SERVICE</a>
          <a href="#" style={{ color: "var(--white)", textDecoration: "none", textTransform: "uppercase", fontSize: "12px" }}>CONTACT</a>
          <button style={{ background: "var(--gold)", color: "var(--navy-dark)", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>LOGIN</button>
          <button style={{ background: "var(--gold)", color: "var(--navy-dark)", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>SIGN UP</button>
        </div>
      </nav>

      {/* ===== KONTEN UTAMA ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0 56px",
          zIndex: 5,
          position: "relative",
          marginTop: "-100px",
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
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 900,
              lineHeight: 1.2,
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
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "rgba(255, 215, 0, 0.8)",
              maxWidth: "480px",
              marginBottom: "40px",
              fontWeight: 300,
            }}
          >
            Kami membantu bisnis dan organisasi membangun solusi sustainability
            yang nyata dan terukur.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              style={{
                padding: "12px 30px",
                background: "var(--gold)",
                color: "var(--navy-dark)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "capitalize",
                cursor: "pointer",
                border: "none",
                borderRadius: "50px",
              }}
            >
              Mulai Konsultasi
            </button>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--gold-light)",
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "capitalize",
                cursor: "pointer",
                background: "none",
                border: "none",
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

      {/* ===== SECTION LOGO KLIEN ===== */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 5,
          position: "relative",
          width: "100%",
        }}
      >
        <p style={{ color: "var(--gold-light)", fontSize: "14px", marginBottom: "20px" }}>Dipercaya oleh 50+ organisasi</p>
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <img src="/images/logo1.png" alt="Logo Klien 1" style={{ height: "30px" }} />
          <img src="/images/logo2.png" alt="Logo Klien 2" style={{ height: "30px" }} />
          <img src="/images/logo3.png" alt="Logo Klien 3" style={{ height: "30px" }} />
          <img src="/images/logo4.png" alt="Logo Klien 4" style={{ height: "30px" }} />
        </div>
        <p style={{ color: "var(--gold-light)", fontSize: "11px", marginTop: "20px" }}>Scroll untuk melihat lebih</p>
      </div>

    </section>
  );
}
