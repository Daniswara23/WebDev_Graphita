import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { createClient } from "@/lib/supabase/server";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon_path: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export default async function ContactPage() {
  const supabase = await createClient();
  
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order");

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

        {/* Office & Social Media Section - Client Component untuk interactivity */}
        <ContactSection socialLinks={socialLinks as SocialLink[] | null} />
      </main>
      <Footer />
    </>
  );
}