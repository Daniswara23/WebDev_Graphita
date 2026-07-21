"use client";

/*
  services/page.tsx — Halaman /services
  Data diambil dari tabel `service_details` di Supabase.
  Tampilan tidak berubah.
*/

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

// Mapping ikon berdasarkan title layanan
const serviceIcons: Record<string, React.ReactNode> = {
  "Riset & Pemetaan Sosial Terintegrasi": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Globe + bold chart overlay — riset terintegrasi */}
      <circle cx="12" cy="12" r="9" stroke="var(--green-light)" />
      <path d="M12 3v18" opacity="0.35" stroke="var(--green-light)" />
      <path d="M3 12h18" opacity="0.35" stroke="var(--green-light)" />
      <rect x="6" y="11" width="3" height="6" rx="0.75" fill="var(--green-light)" opacity="0.25" />
      <rect x="10.5" y="8" width="3" height="9" rx="0.75" fill="var(--green-light)" opacity="0.25" />
      <rect x="15" y="14" width="3" height="3" rx="0.75" fill="var(--green-light)" opacity="0.25" />
      <path d="M6 14h3M10.5 11h3M15 16h3" stroke="var(--green-light)" strokeLinecap="round" />
    </svg>
  ),
  "Perencanaan Strategis & Konsultasi Keberlanjutan": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Clipboard with roadmap lines — strategic planning */}
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="var(--green-light)" />
      <line x1="8" y1="7" x2="16" y2="7" stroke="var(--green-light)" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="var(--green-light)" />
      <line x1="8" y1="15" x2="16" y2="15" stroke="var(--green-light)" />
      <circle cx="8" cy="19" r="1" fill="var(--green-light)" />
      <circle cx="12" cy="19" r="1" fill="var(--green-light)" />
      <circle cx="16" cy="19" r="1" fill="var(--green-light)" />
    </svg>
  ),
  "Pengembangan Kapasitas & Pemberdayaan Komunitas": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Users group — capacity building */}
      <circle cx="9" cy="7" r="3" stroke="var(--green-light)" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="var(--green-light)" />
      <circle cx="17" cy="8" r="2.5" stroke="var(--green-light)" />
      <path d="M21 21v-2a3 3 0 00-3-3h-1a3 3 0 00-3 3v2" stroke="var(--green-light)" opacity="0.6" />
    </svg>
  ),
  "Fasilitasi Kolaborasi Multipihak": (
    <svg width="30" height="30" viewBox="-2 0 28 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Network nodes — multi-stakeholder collaboration */}
      <circle cx="12" cy="4" r="2.5" fill="var(--green-light)" />
      <circle cx="2" cy="18" r="2.5" fill="var(--green-light)" />
      <circle cx="22" cy="18" r="2.5" fill="var(--green-light)" />
      <line x1="12" y1="7" x2="2" y2="15.5" stroke="var(--green-light)" />
      <line x1="12" y1="7" x2="22" y2="15.5" stroke="var(--green-light)" />
      <line x1="4.5" y1="19" x2="19.5" y2="19" stroke="var(--green-light)" strokeWidth="2.5" opacity="0.4" />
    </svg>
  ),
  "Publikasi & Diseminasi Ilmu Pengetahuan": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Document with share arrows — knowledge dissemination */}
      <path d="M14 2H8a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6z" stroke="var(--green-light)" />
      <path d="M14 2v6h6" stroke="var(--green-light)" />
      <path d="M10 14h4M12 16v-4" strokeLinecap="round" stroke="var(--green-light)" opacity="0.6" />
    </svg>
  ),
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceDetail[]>([]);

  useEffect(() => {
    supabase
      .from("service_details")
      .select("id, title, description, features")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setServices(data);
      });
  }, []);

  // Ambil ikon berdasarkan title, fallback ke div kosong
  const getIcon = (title: string) => serviceIcons[title] || null;

  const router = useRouter();
  const goToContact = () => {
    router.push("/contact");
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero Section */}
        <div style={{ padding: "120px 56px 80px", textAlign: "center", background: "var(--bg-primary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Ragam Layanan
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-5xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "24px" }}>
            Ragam layanan yang dibangun untuk langkah nyata
          </h1>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--line-relaxed)", color: "var(--text-primary)", maxWidth: "700px", margin: "0 auto" }}>
            Kami membantu organisasi merancang layanan keberlanjutan yang tidak terlalu rumit, tetapi jelas, relevan, dan dapat dijalankan.
          </p>
        </div>

        {/* Services Grid */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "48px" }}>
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="grid-item hover-lift hover-glow animate-delay-100"
                  style={{
                    background: "var(--card-bg)",
                    padding: "48px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--card-border)",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "var(--radius-lg)", background: "rgba(45,106,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {getIcon(service.title)}
                  </div>
                  <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "24px" }}>
                    {service.description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {service.features.map((feature, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "var(--radius-full)", flexShrink: 0 }} />
                        <span style={{ fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="animate-on-scroll" style={{ padding: "80px 56px", textAlign: "center", background: "var(--cta-bg)" }}>
          <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--cta-text)", marginBottom: "8px" }}>
            Mari Berkolaborasi untuk Membangun Ekosistem yang Berdaya
          </h3>
          <p style={{ fontSize: "var(--text-base)", color: "var(--cta-text-muted)", fontWeight: 300, marginBottom: "32px" }}>
            Hubungi kami untuk konsultasi awal — bersama kita wujudkan dampak yang berkelanjutan.
          </p>
          <button
            onClick={goToContact}
            className="hover-lift hover-glow"
            style={{
              padding: "14px 40px",
              background: "var(--cta-btn-bg, #c9a84c)",
              color: "var(--cta-btn-text, #0c1163)",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "none",
              borderRadius: "var(--radius-md)",
              whiteSpace: "nowrap",
            }}
          >
            Mulai Kolaborasi
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
