import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", padding: "120px 56px 96px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
            Tentang Grahita Adhi Sasmita
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "rgba(255,255,255,0.9)", marginBottom: "32px" }}>
            Kami adalah mitra strategis Anda dalam keberlanjutan, membantu bisnis dan organisasi mengatasi tantangan sosial, ekonomi, dan lingkungan yang kompleks dengan solusi yang terbukti dan terukur.
          </p>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "40px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>Misi Kami</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
              Memberikan solusi sistematis yang menciptakan dampak nyata. Dari strategi ESG hingga roadmap net zero, kami mengubah keberlanjutan menjadi keunggulan kompetitif.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
