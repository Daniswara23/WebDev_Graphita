/*
  CtaBand.tsx — CALL TO ACTION BAND
  
  Banner di bagian bawah halaman yang mengajak pengunjung
  untuk menghubungi perusahaan.
  
  Komponen paling sederhana — hanya tampilan statis.
*/

export default function CtaBand() {
  return (
    <div
      style={{
        background: "var(--gold)",      // Background emas mencolok
        padding: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
        flexWrap: "wrap",               // Wrap ke bawah di layar kecil
      }}
    >
      {/* Teks kiri */}
      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--navy-dark)",  // Teks gelap di background terang
            marginBottom: "8px",
          }}
        >
        Siap menyelesaikan tantangan keberlanjutan Anda?
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(15,26,48,0.65)",
            fontWeight: 300,
          }}
        >
        Dapatkan saran ahli gratis. Mulai kolaborasi hari ini.
        </p>
      </div>

      {/* Tombol kanan */}
      <button
        style={{
          padding: "14px 40px",
          background: "var(--navy-dark)",
          color: "var(--gold-light)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          cursor: "pointer",
          border: "none",
          borderRadius: "2px",
          whiteSpace: "nowrap",        // Cegah teks tombol terpotong
        }}
      >
        Mulai Kolaborasi
      </button>
    </div>
  );
}
