/*
  Services.tsx — SECTION LAYANAN
  
  Menampilkan 6 kartu layanan dalam grid 3 kolom.
  
  Konsep baru di sini: SVG ICON
  Ikon dibuat langsung dengan SVG (bukan library eksternal)
  agar tidak perlu install package tambahan.
*/

type Service = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    num: "01",
    title: "Strategi ESG & Keberlanjutan",
    desc: "Menyusun peta jalan ESG yang selaras dengan strategi bisnis jangka panjang perusahaan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Pelaporan & Pengukuran SDG",
    desc: "Membangun sistem pemantauan SDG yang terukur, transparan, dan siap untuk audit eksternal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Jejak Karbon & Strategi Net Zero",
    desc: "Menghitung emisi karbon serta merancang strategi dekarbonisasi menuju target net zero.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
        <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Pelatihan & Penguatan Kapasitas",
    desc: "Menyelenggarakan program pelatihan keberlanjutan untuk meningkatkan kesiapan tim internal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Due Diligence Keberlanjutan",
    desc: "Melakukan analisis risiko dan peluang keberlanjutan dalam proses investasi dan akuisisi.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Energi Terbarukan & Efisiensi",
    desc: "Memberikan konsultasi transisi energi serta peningkatan efisiensi operasional secara terukur.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" width="24" height="24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="layanan" style={{ padding: "96px 56px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "64px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              Solusi Strategis untuk Tantangan Anda
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 3.5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--white)",
            }}
          >
            Layanan Keberlanjutan<br />
            <span style={{ color: "var(--gold-light)" }}>Solusi Kami</span>
          </h2>
        </div>

        <button
          style={{
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--green-light)",
            cursor: "pointer",
            border: "none",
            background: "none",
            marginBottom: "8px",
          }}
        >
          Semua Layanan →
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }}
      >
        {services.map((service) => (
          <div
            key={service.num}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "40px 32px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "11px",
                color: "rgba(201,147,58,0.4)",
                letterSpacing: "2px",
                display: "block",
                marginBottom: "24px",
              }}
            >
              {service.num}
            </span>

            <div
              style={{
                width: "48px",
                height: "48px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(45,106,79,0.2)",
                borderRadius: "4px",
              }}
            >
              {service.icon}
            </div>

            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "14px",
                lineHeight: 1.2,
              }}
            >
              {service.title}
            </div>

            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}