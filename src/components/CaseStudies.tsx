/*
  CaseStudies.tsx — SEKSI STUDI KASUS
  Addresses key gap: concrete evidence to build trust.
*/

import Link from "next/link";

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
    title: "Ringkasan Pendirian Perusahaan",
    client: "Didirikan 03 Februari 2026",
    challenge: "Perusahaan dibentuk untuk mendukung transformasi menuju praktik bisnis berkelanjutan.",
    solution: "Kami berfokus pada integrasi SDGs dalam setiap layanan dan proyek yang kami jalankan.",
    result: "Komitmen terhadap tujuan SDGs untuk menciptakan dampak positif dan pertumbuhan berkelanjutan.",
    image: "/images/case1.jpg",
  },
];
export default function CaseStudies() {
  return (
    <section id="cases" className="animate-on-scroll" style={{ padding: "96px 56px", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Sekilas Tentang Kami
            </span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)" }}>
            Ringkasan Pendirian<br />
            <span style={{ color: "var(--gold-light)" }}>dan Komitmen SDGs</span>
          </h2>
        </div>
        <Link href="/about" className="hover-scale" style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--green-light)", cursor: "pointer", border: "none", background: "none", marginBottom: "8px", textDecoration: "none" }}>
          Pelajari Lebih Lanjut →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
        {caseStudies.map((cs, index) => (
          <div key={index} className={`grid-item hover-lift hover-glow`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "40px", cursor: "pointer", animationDelay: `${index * 0.15}s` }}>
            <img src={cs.image} alt={cs.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "24px" }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700", color: "var(--white)", marginBottom: "12px" }}>
              {cs.title}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
              <strong>Pendirian:</strong> {cs.client}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
              <strong>Deskripsi:</strong> {cs.challenge}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}><strong>Komitmen SDGs:</strong> {cs.solution}</p>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--gold-light)" }}><strong>Dampak:</strong> {cs.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
