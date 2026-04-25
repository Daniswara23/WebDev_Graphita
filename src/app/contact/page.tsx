"use client";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--navy-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Kontak
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Menjalin Kemitraan Strategis
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "rgba(255,255,255,0.9)", maxWidth: "700px", margin: "0 auto" }}>
            Kami percaya pada kekuatan kolaborasi dan sinergi. Mari bersama-sama menciptakan solusi keberlanjutan 
            yang bermakna dan berdampak positif bagi masyarakat, lingkungan, dan ekonomi.
          </p>
        </div>

        {/* Contact Form Section */}
        <ContactForm />

        {/* Office & Social Media Section */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "48px" }}>
              {/* Kantor */}
              <div className="grid-item hover-lift hover-glow animate-delay-100" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "24px" }}>📍</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Lokasi Kantor
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "8px" }}>
                  <strong>Grahita Adhi Sasmita</strong>
                </p>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "16px" }}>
                  Jakarta, Indonesia
                </p>
                <div style={{ background: "rgba(201,147,58,0.1)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(201,147,58,0.2)" }}>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", margin: "0" }}>
                    📧 hello@grahitaadhisasmita.com
                  </p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", margin: "8px 0 0 0" }}>
                    📱 +62 (Hubungi untuk informasi)
                  </p>
                </div>
              </div>

              {/* Media Sosial */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "24px" }}>🔗</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Ikuti Kami
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "32px" }}>
                  Temukan berita terbaru, insight, dan publikasi kami
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                  {[
                    { name: "LinkedIn", icon: "💼", url: "#" },
                    { name: "Instagram", icon: "📷", url: "#" },
                    { name: "Twitter", icon: "🐦", url: "#" },
                    { name: "Facebook", icon: "👥", url: "#" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        background: "rgba(201,147,58,0.1)",
                        border: "1px solid rgba(201,147,58,0.3)",
                        borderRadius: "8px",
                        color: "var(--gold-light)",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(201,147,58,0.2)";
                        e.currentTarget.style.borderColor = "rgba(201,147,58,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(201,147,58,0.1)";
                        e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)";
                      }}
                    >
                      <span>{social.icon}</span>
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Jam Operasional */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "24px" }}>🕐</div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                  Jam Operasional
                </h3>
                <div style={{ background: "rgba(201,147,58,0.1)", padding: "24px", borderRadius: "8px", border: "1px solid rgba(201,147,58,0.2)" }}>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: "1.8", margin: "0" }}>
                    <strong>Senin - Jumat</strong>
                    <br />
                    09:00 - 18:00 WIB
                  </p>
                  <div style={{ height: "1px", background: "rgba(201,147,58,0.3)", margin: "16px 0" }} />
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.8", margin: "0" }}>
                    <strong>Sabtu - Minggu</strong>
                    <br />
                    Tutup
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "12px", marginBottom: "0" }}>
                    *Respons konsultasi dalam 24 jam kerja
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
