"use client";

import Navbar from "@/components/Navbar";
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
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Ragam Layanan
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Ragam layanan yang dibangun untuk langkah nyata
          </h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "rgba(255,255,255,0.9)", maxWidth: "700px", margin: "0 auto" }}>
            Kami membantu organisasi merancang layanan keberlanjutan yang tidak terlalu rumit, tetapi jelas, relevan, dan dapat dijalankan.
          </p>
        </div>

        {/* Services Grid */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "48px" }}>

              {/* Kajian Pemetaan Terpadu */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "12px", background: "rgba(255,255,255,0.08)" }} />
                <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Kajian Pemetaan Terpadu
                </h3>
                <p style={{ fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.8)", lineHeight: "var(--line-relaxed)", marginBottom: "24px" }}>
                  Analisis komprehensif yang mencakup tiga dimensi utama: psikososial, ekonomi, dan lingkungan.
                  Kami membantu organisasi memahami kompleksitas tantangan keberlanjutan melalui pendekatan holistik.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Assessment psikososial komunitas</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Analisis dampak ekonomi lokal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Evaluasi kondisi lingkungan</span>
                  </div>
                </div>
              </div>

              {/* Pendampingan Organisasi & SDM */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "12px", background: "rgba(255,255,255,0.08)" }} />
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
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Perancangan strategi adaptif</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Capacity building tim</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Change management</span>
                  </div>
                </div>
              </div>

              {/* Pengembangan Potensi Lokal */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "12px", background: "rgba(255,255,255,0.08)" }} />
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
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Model tekno-sosial inovatif</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Pengembangan UMKM lokal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Mata pencaharian berkelanjutan</span>
                  </div>
                </div>
              </div>

              {/* Ekosistem Pangan ASLI */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "12px", background: "rgba(255,255,255,0.08)" }} />
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
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Sistem pertanian berkelanjutan</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Supply chain pangan lokal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%" }} />
                    <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>Pendidikan nutrisi masyarakat</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: "80px 56px", textAlign: "center", background: "var(--navy-dark)" }}>
          <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
            Siap Memulai Transformasi?
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
            Mari diskusikan bagaimana layanan kami dapat membantu organisasi Anda mencapai tujuan keberlanjutan.
          </p>
          <a
            href="/contact"
            className="button-primary"
          >
            Hubungi Kami
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
