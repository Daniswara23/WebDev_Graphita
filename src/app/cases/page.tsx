import Navbar from "@/components/Navbar";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";

export default function CasesPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ padding: "120px 56px 48px", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, color: "var(--white)" }}>
            Studi Kasus
          </h1>
          <p style={{ fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto" }}>
            Hasil nyata dari kemitraan nyata. Lihat bagaimana kami memberikan dampak yang terukur.
          </p>
        </div>
        <CaseStudies />
      </main>
      <Footer />
    </>
  );
}
