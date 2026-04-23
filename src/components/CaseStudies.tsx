/*
  CaseStudies.tsx — SEKSI STUDI KASUS
  Addresses key gap: concrete evidence to build trust.
*/

type CaseStudy = {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Peta Jalan ESG untuk Perusahaan Energi Nasional",
    client: "PT Energi Nasional",
    challenge: "Mengurangi emisi karbon tanpa mengorbankan profitabilitas.",
    solution: "Audit ESG menyeluruh + rencana dekarbonisasi 5 tahun.",
    result: "Penurunan emisi sebesar 40% dalam 2 tahun, penghematan $2.5M per tahun.",
    image: "/images/case1.jpg",
  },
  {
    title: "Sistem Pelaporan SDG untuk Perusahaan Pertambangan",
    client: "PT Tambang Berkelanjutan",
    challenge: "Pelacakan SDG yang transparan untuk audit internasional.",
    solution: "Dashboard kustom + alat pelaporan otomatis.",
    result: "Lolos 3 audit eksternal, peningkatan rating ESG dari BB ke AA.",
    image: "/images/case2.jpg",
  },
  {
    title: "Strategi Net Zero untuk Perusahaan Kelapa Sawit",
    client: "Astra Agro Lestari",
    challenge: "Mencapai net zero pada 2035 di tengah tekanan regulasi.",
    solution: "Baseline jejak karbon + roadmap transisi energi terbarukan.",
    result: "Adopsi energi terbarukan 30%, menghasilkan kredit karbon senilai $10M.",
    image: "/images/case3.jpg",
  },
];
export default function CaseStudies() {
  return (
    <section id="cases" style={{ padding: "96px 56px", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Hasil Terbukti
            </span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)" }}>
            Dampak Nyata untuk<br />
            <span style={{ color: "var(--gold-light)" }}>Mitra Nyata</span>
          </h2>
        </div>
        <a href="#contact" style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--green-light)", cursor: "pointer", border: "none", background: "none", marginBottom: "8px" }}>
          Lihat Semua Kasus →
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
        {caseStudies.map((cs, index) => (
          <div key={index} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "40px", cursor: "pointer" }}>
            <img src={cs.image} alt={cs.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "24px" }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700", color: "var(--white)", marginBottom: "12px" }}>
              {cs.title}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
              <strong>Klien:</strong> {cs.client}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
              <strong>Tantangan:</strong> {cs.challenge}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}><strong>Solusi:</strong> {cs.solution}</p>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--gold-light)" }}><strong>Hasil:</strong> {cs.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
