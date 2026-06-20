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
            <h1 style={{ fontFamily: "Goudy Old Style, Georgia, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "24px" }}>
              Kami bekerja dengan cara yang terasa lebih ringan
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "var(--text-primary)", maxWidth: "600px", margin: "0 auto" }}>
              Grahita Adhi Sasmita hadir untuk menjadi teman perjalanan organisasi yang ingin menjelaskan arah keberlanjutan tanpa harus terdengar berlebihan.
            </p>
          </div>

          {/* Landasan Cerita */}
          <section className="animate-on-scroll" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "24px", textAlign: "center" }}>
              Landasan Cerita
            </h2>
            <div className="hover-lift" style={{ background: "var(--card-bg)", padding: "48px", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
              <p style={{ fontSize: "18px", color: "var(--text-primary)", lineHeight: "1.8", marginBottom: "24px" }}>
                Kami mulai dari mendengar. Setiap pendekatan kami rancang berdasarkan siapa Anda, apa yang penting bagi tim, dan bagaimana perubahan itu bisa terasa alami.
              </p>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                Alih-alih menawarkan sekadar kerangka konsep, kami membantu menyusun langkah-langkah yang bisa langsung dipakai dan ditindaklanjuti.
              </p>
            </div>
          </section>

          {/* Nilai Inti */}
          <section className="animate-on-scroll animate-delay-200" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "24px", textAlign: "center" }}>
              Nilai Inti Kami
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "12px", border: "1px solid var(--card-border)", textAlign: "center" }}>
                <div style={{ width: "52px", height: "52px", margin: "0 auto 16px", borderRadius: "16px", background: "rgba(45,106,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Gunung — Gigih: 3 puncak bertingkat */}
                    <polyline points="2,20 8,8 12,14 16,4 22,20" stroke="var(--green)" />
                    <line x1="2" y1="20" x2="22" y2="20" stroke="var(--green)" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gold)", marginBottom: "16px" }}>Gigih</h3>
                <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Kami terus mencari jalan yang paling masuk akal, bahkan ketika kondisi terlihat rumit.
                </p>
              </div>

              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "12px", border: "1px solid var(--card-border)", textAlign: "center" }}>
                <div style={{ width: "52px", height: "52px", margin: "0 auto 16px", borderRadius: "16px", background: "rgba(45,106,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Daun — Adaptif: garis kontinu melengkung */}
                    <path d="M12 2C8 6 4 10 4 14c0 4 3 8 8 8s8-4 8-8C20 10 16 6 12 2z" stroke="var(--green)" />
                    <path d="M12 2v20" opacity="0.4" stroke="var(--green)" />
                    <path d="M12 10c-2 2-4 4-4 6" opacity="0.4" stroke="var(--green)" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gold)", marginBottom: "16px" }}>Adaptif</h3>
                <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Solusi kami disesuaikan dengan ritme organisasi, bukan paksa dalam satu formula yang sama untuk semua.
                </p>
              </div>

              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "12px", border: "1px solid var(--card-border)", textAlign: "center" }}>
                <div style={{ width: "52px", height: "52px", margin: "0 auto 16px", borderRadius: "16px", background: "rgba(45,106,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Cincin Bertaut — Sinergi: dua lingkaran interlock */}
                    <circle cx="10" cy="12" r="7" stroke="var(--green)" />
                    <circle cx="14" cy="12" r="7" stroke="var(--green)" />
                    <line x1="9" y1="7" x2="15" y2="17" opacity="0.3" stroke="var(--green)" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gold)", marginBottom: "16px" }}>Sinergi</h3>
                <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Kolaborasi jadi pusat. Kami bekerja dengan orang-orang yang punya tujuan serupa untuk kelanjutan yang lebih nyata.
                </p>
              </div>
            </div>
          </section>

          {/* Fokus Dampak */}
          <section className="animate-on-scroll animate-delay-400">
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "24px", textAlign: "center" }}>
              Fokus Dampak
            </h2>
            <p style={{ fontSize: "18px", color: "var(--text-primary)", lineHeight: "1.7", textAlign: "center", marginBottom: "48px" }}>
              Kami bekerja dalam area yang jelas: ekonomi inklusif, kesehatan kerja, inovasi, inklusi sosial, dan kemitraan yang berkelanjutan.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--overlay-gold)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>Pemberdayaan Ekonomi</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Mendorong peluang kerja dan usaha lokal yang memberi dampak ke masyarakat.
                </p>
              </div>

              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--overlay-gold)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>Kesehatan & Kesejahteraan</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Membantu organisasi menghadirkan lingkungan kerja yang lebih aman dan lebih manusiawi.
                </p>
              </div>

              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--overlay-gold)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>Inovasi yang Relevan</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Menyusun pendekatan baru yang sesuai konteks dan bisa dipraktikkan setiap hari.
                </p>
              </div>

              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ background: "var(--overlay-gold)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(201,147,58,0.3)" }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>Kemitraan Nyata</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Membangun relasi lintas sektor yang mendukung keberlanjutan jangka panjang.
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
