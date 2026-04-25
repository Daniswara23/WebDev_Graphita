"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data untuk articles
const articles = [
  {
    id: 1,
    title: "Keberdayaan Komunitas Lokal untuk Pertumbuhan Berkelanjutan",
    excerpt: "Bagaimana strategi pemberdayaan komunitas dapat menciptakan lapangan kerja dan mendorong ekonomi lokal yang berkelanjutan.",
    category: "Keberdayaan",
    date: "15 April 2026",
  },
  {
    id: 2,
    title: "ESG sebagai Strategi Kompetitif Bisnis Modern",
    excerpt: "Perusahaan yang mengintegrasikan Environmental, Social, dan Governance tidak hanya menciptakan dampak sosial, tetapi juga keuntungan finansial jangka panjang.",
    category: "Keberlanjutan",
    date: "12 April 2026",
  },
  {
    id: 3,
    title: "Transformasi Digital untuk Model Bisnis Berkelanjutan",
    excerpt: "Teknologi menjadi enabler utama dalam menciptakan solusi keberlanjutan yang scalable dan terukur di era digital.",
    category: "Keberlanjutan",
    date: "08 April 2026",
  },
  {
    id: 4,
    title: "Net Zero Roadmap: Panduan Menuju Emisi Karbon Nol",
    excerpt: "Strategi langkah demi langkah yang dapat diimplementasikan perusahaan untuk mencapai target net zero emissions.",
    category: "Keberlanjutan",
    date: "05 April 2026",
  },
];

// Mock data untuk research reports
const researchReports = [
  {
    id: 1,
    title: "Studi Dampak Program CSR terhadap Kesejahteraan Masyarakat",
    subtitle: "Riset Kualitatif dan Kuantitatif di 5 Kabupaten Indonesia",
    year: 2026,
    category: "Ilmu Pengetahuan Sosial",
  },
  {
    id: 2,
    title: "Analisis Potensi Ekonomi Sirkular di Sektor Pertanian Indonesia",
    subtitle: "Peluang dan Tantangan Implementasi Circular Economy Model",
    year: 2026,
    category: "Ilmu Pengetahuan Sosial",
  },
  {
    id: 3,
    title: "Pemetaan Ekosistem Pangan Lokal dan Strategi Keamanan Pangan",
    subtitle: "Studi Kasus Implementasi Program ASLI di Komunitas Petani",
    year: 2025,
    category: "Ilmu Pengetahuan Sosial",
  },
  {
    id: 4,
    title: "Pengaruh Pendampingan SDM terhadap Peningkatan Kinerja Organisasi",
    subtitle: "Meta-Analysis dari 20 Organisasi di Wilayah Indonesia Timur",
    year: 2025,
    category: "Ilmu Pengetahuan Sosial",
  },
];

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Publikasi & Riset
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Wadah Produksi Pengetahuan
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "rgba(255,255,255,0.9)", maxWidth: "700px", margin: "0 auto" }}>
            Kami memproduksi dan menerbitkan karya publikasi yang berkontribusi pada pengembangan ilmu pengetahuan tentang keberlanjutan, 
            keberdayaan, dan transformasi sosial ekonomi di Indonesia.
          </p>
        </div>

        {/* Blog & Artikel Section */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                Blog & Artikel
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
                Tulisan mendalam mengenai kesadaran keberdayaan dan keberlanjutan
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }}>
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className={`grid-item hover-lift hover-glow`}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "32px",
                    animationDelay: `${index * 0.1}s`,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                      {article.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--white)", lineHeight: "1.4", marginBottom: "12px" }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                    {article.excerpt}
                  </p>
                  <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold-light)", fontWeight: 600, cursor: "pointer" }}>
                      Baca Selengkapnya →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Laporan Riset Section */}
        <div style={{ padding: "80px 56px", background: "var(--navy-dark)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                Laporan Riset
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
                Ringkasan hasil riset ilmu pengetahuan sosial untuk pembangunan berkelanjutan
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "28px" }}>
              {researchReports.map((report) => (
                <div
                  key={report.id}
                  style={{
                    background: "rgba(201,147,58,0.08)",
                    padding: "36px",
                    borderRadius: "12px",
                    border: "1px solid rgba(201,147,58,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,147,58,0.12)";
                    e.currentTarget.style.borderColor = "rgba(201,147,58,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(201,147,58,0.08)";
                    e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {report.category}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gold-light)" }}>
                      {report.year}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--white)", lineHeight: "1.3", marginBottom: "12px" }}>
                    {report.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: "1.6", fontStyle: "italic" }}>
                    {report.subtitle}
                  </p>
                  <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(201,147,58,0.2)" }}>
                    <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700, cursor: "pointer" }}>
                      Unduh Laporan →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: "80px 56px", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
            Tertarik Berkolaborasi?
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
            Mari diskusikan peluang riset, publikasi, atau kolaborasi ilmiah bersama tim kami.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold-light)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Hubungi Kami
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
