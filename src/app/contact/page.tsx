"use client";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import {
  OfficeBuildingIcon,
  ShareNetworkIcon,
  SocialImageIcon,
  SocialIconWrapper,
} from "@/components/ContactIcons";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--bg-primary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Kontak
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "24px" }}>
            Mari Berkolaborasi untuk Membangun Ekosistem yang Berdaya
          </h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "var(--text-primary)", maxWidth: "700px", margin: "0 auto" }}>
            Sampaikan ide, tantangan, atau rencana Anda. Semua masukan ditangani dengan hati-hati dan diberi perlindungan data yang baik.
          </p>
        </div>

        {/* Contact Form Section */}
        <div style={{ background: "var(--section-bg-alt)", padding: "80px 56px" }}>
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "0",
              overflow: "hidden",
            }}
          >
            <ContactForm />
          </div>
        </div>




        {/* Office & Social Media Section */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "48px" }}>
               {/* Kantor */}
              <div className="grid-item animate-delay-100" style={{
                textAlign: "center",
                padding: "40px 32px",
                border: "1px solid var(--card-border)",
                borderRadius: "12px",
                background: "var(--card-bg)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(201, 147, 58, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 24px",
                  borderRadius: "4px",
                  background: "rgba(45,106,79,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <OfficeBuildingIcon size={24} />
                </div>
                <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                  Lokasi Kantor
                </h3>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "8px" }}>
                  <strong>Grahita Adhi Sasmita</strong>
                </p>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "16px" }}>
                  Jakarta, Indonesia
                </p>
                <div style={{ background: "var(--overlay-gold)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(201,147,58,0.2)" }}>
                  <p style={{ fontSize: "var(--text-base)", color: "var(--text-primary)", margin: "0" }}>
                    hello@grahitaadhisasmita.com
                  </p>
                  <p style={{ fontSize: "var(--text-base)", color: "var(--text-primary)", margin: "8px 0 0 0" }}>
                    +62 (Hubungi untuk informasi)
                  </p>
                </div>
              </div>

               {/* Media Sosial */}
              <div className="grid-item animate-delay-100" style={{
                textAlign: "center",
                padding: "40px 32px",
                border: "1px solid var(--card-border)",
                borderRadius: "12px",
                background: "var(--card-bg)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(201, 147, 58, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 24px",
                  borderRadius: "4px",
                  background: "rgba(12, 17, 99, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <ShareNetworkIcon size={24} />
                </div>
                <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                  Ikuti Kami
                </h3>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "32px" }}>
                  Temukan berita terbaru, insight, dan publikasi kami
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                  <SocialIconWrapper href="https://www.linkedin.com" icon={<SocialImageIcon src="/images/LinkedIn-logo.png" alt="LinkedIn" size={22} />} label="LinkedIn" />
                  <SocialIconWrapper href="https://www.instagram.com" icon={<SocialImageIcon src="/images/Instagram-icon.png" alt="Instagram" size={22} />} label="Instagram" />
                  <SocialIconWrapper href="https://www.twitter.com" icon={<SocialImageIcon src="/images/X-logo.png" alt="X (Twitter)" size={22} />} label="X (Twitter)" />
                  <SocialIconWrapper href="https://www.facebook.com" icon={<SocialImageIcon src="/images/Facebook-Logo.png" alt="Facebook" size={22} />} label="Facebook" />
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