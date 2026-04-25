"use client";

import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Layanan & Solusi
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Apa yang Kami Lakukan
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "rgba(255,255,255,0.9)", maxWidth: "700px", margin: "0 auto" }}>
            PT Grahita Adhi Sasmita menyediakan solusi keberlanjutan komprehensif yang mengintegrasikan aspek psikososial,
            ekonomi, dan lingkungan untuk menciptakan dampak positif yang berkelanjutan.
          </p>
        </div>

        {/* Services Grid */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "48px" }}>

              {/* Kajian Pemetaan Terpadu */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "64px", marginBottom: "24px" }}>🗺️</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Kajian Pemetaan Terpadu
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "24px" }}>
                  Analisis komprehensif yang mencakup tiga dimensi utama: psikososial, ekonomi, dan lingkungan.
                  Kami membantu organisasi memahami kompleksitas tantangan keberlanjutan melalui pendekatan holistik.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Assessment psikososial komunitas</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Analisis dampak ekonomi lokal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Evaluasi kondisi lingkungan</span>
                  </div>
                </div>
              </div>

              {/* Pendampingan Organisasi & SDM */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "64px", marginBottom: "24px" }}>👥</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Pendampingan Organisasi & SDM
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "24px" }}>
                  Pengembangan kapasitas organisasi melalui perancangan rencana strategis yang adaptif dan
                  program peningkatan kinerja tim yang berkelanjutan.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Perancangan strategi adaptif</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Capacity building tim</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Change management</span>
                  </div>
                </div>
              </div>

              {/* Pengembangan Potensi Lokal */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "64px", marginBottom: "24px" }}>🌱</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Pengembangan Potensi Lokal
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "24px" }}>
                  Implementasi model tekno-sosial dan pengembangan mata pencaharian yang ramah lingkungan
                  untuk meningkatkan kesejahteraan masyarakat lokal.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Model tekno-sosial inovatif</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Pengembangan UMKM lokal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Mata pencaharian berkelanjutan</span>
                  </div>
                </div>
              </div>

              {/* Ekosistem Pangan ASLI */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "64px", marginBottom: "24px" }}>🌾</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Ekosistem Pangan ASLI
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "24px" }}>
                  Inisiasi program pangan yang Aman, Sehat, dan Lestari untuk membangun ketahanan pangan
                  dan kesejahteraan masyarakat melalui pendekatan holistik.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Sistem pertanian berkelanjutan</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Supply chain pangan lokal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Pendidikan nutrisi masyarakat</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: "80px 56px", textAlign: "center", background: "var(--navy-dark)" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
            Siap Memulai Transformasi?
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
            Mari diskusikan bagaimana layanan kami dapat membantu organisasi Anda mencapai tujuan keberlanjutan.
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
