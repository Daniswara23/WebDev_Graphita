import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ padding: "120px 56px 48px", textAlign: "center", background: "var(--navy-dark)" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "var(--white)" }}>
            Layanan Kami
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto" }}>
            Solusi keberlanjutan komprehensif yang disesuaikan dengan tantangan bisnis Anda.
          </p>
        </div>
        <Services />
      </main>
      <Footer />
    </>
  );
}
