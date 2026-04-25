import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", padding: "120px 56px 96px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
                Tentang Kami
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
              Fondasi Perusahaan Kami
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "rgba(255,255,255,0.9)", maxWidth: "600px", margin: "0 auto" }}>
              Kami adalah mitra strategis Anda dalam keberlanjutan, membantu bisnis dan organisasi mengatasi tantangan sosial, ekonomi, dan lingkungan yang kompleks.
            </p>
          </div>

          {/* Landasan Filosofi */}
          <section className="animate-on-scroll" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "24px", textAlign: "center" }}>
              Landasan Filosofi
            </h2>
            <div className="hover-lift" style={{ background: "rgba(255,255,255,0.03)", padding: "48px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.9)", lineHeight: "1.8", marginBottom: "24px" }}>
                Di Grahita Adhi Sasmita, kami percaya bahwa sektor swasta memiliki peran fundamental dalam membangun kesejahteraan umum dan kecerdasan bangsa. 
                Keberlanjutan bukanlah pilihan, melainkan kewajiban moral dan strategis bagi setiap entitas bisnis modern.
              </p>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7" }}>
                Melalui pendekatan yang sistematis dan berbasis data, kami membantu perusahaan tidak hanya memenuhi tanggung jawab sosialnya, 
                tetapi juga menciptakan nilai ekonomi yang berkelanjutan. Setiap solusi yang kami kembangkan dirancang untuk memberikan dampak 
                positif yang terukur terhadap masyarakat, lingkungan, dan perekonomian nasional.
              </p>
            </div>
          </section>

          {/* Nilai-Nilai Inti (GAS) */}
          <section className="animate-on-scroll animate-delay-200" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "24px", textAlign: "center" }}>
              Nilai-Nilai Inti (GAS)
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
              {/* Gigih */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(255,255,255,0.03)", padding: "32px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>💪</div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gold)", marginBottom: "16px" }}>Gigih</h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Kami tidak pernah menyerah dalam menghadapi tantangan kompleks. Setiap proyek adalah komitmen untuk memberikan 
                  hasil terbaik, bahkan ketika jalan terasa sulit.
                </p>
              </div>

              {/* Adaptif */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "32px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔄</div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gold)", marginBottom: "16px" }}>Adaptif</h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Dunia berubah dengan cepat, dan kami siap beradaptasi. Setiap solusi disesuaikan dengan konteks spesifik 
                  klien dan perkembangan terkini.
                </p>
              </div>

              {/* Sinergi */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "32px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤝</div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gold)", marginBottom: "16px" }}>Sinergi</h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Kami percaya kekuatan kolaborasi. Setiap proyek melibatkan pemangku kepentingan yang tepat untuk 
                  menciptakan dampak maksimal.
                </p>
              </div>
            </div>
          </section>

          {/* Komitmen SDGs */}
          <section className="animate-on-scroll animate-delay-400">
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", marginBottom: "24px", textAlign: "center" }}>
              Komitmen SDGs
            </h2>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.9)", lineHeight: "1.7", textAlign: "center", marginBottom: "48px" }}>
              Kami berkomitmen untuk berkontribusi pada pencapaian Sustainable Development Goals (SDGs) melalui solusi bisnis yang berkelanjutan.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {/* SDG 1 */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>SDG 1: Tanpa Kemiskinan</h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Membantu perusahaan menciptakan lapangan kerja berkualitas dan program kesejahteraan yang berdampak pada pengurangan kemiskinan struktural.
                </p>
              </div>

              {/* SDG 3 */}
              <div style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>SDG 3: Kesehatan yang Baik</h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Mengembangkan solusi yang meningkatkan kesehatan dan keselamatan kerja, serta mendukung program kesehatan masyarakat.
                </p>
              </div>

              {/* SDG 8 */}
              <div style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>SDG 8: Pekerjaan Layak</h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Mendorong praktik bisnis yang menciptakan pekerjaan yang layak, aman, dan berkelanjutan dengan upah yang adil.
                </p>
              </div>

              {/* SDG 9 */}
              <div style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>SDG 9: Industri dan Inovasi</h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Mendukung pengembangan infrastruktur yang berkelanjutan dan inovasi teknologi untuk pertumbuhan ekonomi inklusif.
                </p>
              </div>

              {/* SDG 10 */}
              <div style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>SDG 10: Berkurangnya Kesenjangan</h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Mendorong praktik bisnis yang mengurangi kesenjangan sosial dan ekonomi melalui program inklusi dan pemberdayaan.
                </p>
              </div>

              {/* SDG 17 */}
              <div style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>SDG 17: Kemitraan Global</h4>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                  Membangun kemitraan strategis antara sektor swasta, pemerintah, dan masyarakat sipil untuk pencapaian tujuan bersama.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
