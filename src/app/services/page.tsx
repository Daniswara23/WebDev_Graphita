"use client";

/*
  services/page.tsx — Halaman /services
  Data diambil dari tabel `service_details` di Supabase.
  Tampilan tidak berubah.
*/

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

// Mapping ikon berdasarkan title layanan
const serviceIcons: Record<string, React.ReactNode> = {
  "Kajian Pemetaan Terpadu": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Radar konsentris — pemetaan multidimensional */}
      <circle cx="12" cy="12" r="9" strokeDasharray="2 3" stroke="var(--green)" />
      <circle cx="12" cy="12" r="5" strokeDasharray="1.5 2" stroke="var(--green)" />
      <circle cx="12" cy="12" r="2" stroke="var(--green)" />
      <line x1="12" y1="2" x2="12" y2="22" opacity="0.3" stroke="var(--green)" />
      <line x1="2" y1="12" x2="22" y2="12" opacity="0.3" stroke="var(--green)" />
      <circle cx="12" cy="12" r="1.5" fill="var(--green)" />
    </svg>
  ),
  "Pendampingan Organisasi & SDM": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Dua diamond bertumpuk — pengembangan berjenjang */}
      <polygon points="12,2 18,8 12,14 6,8" stroke="var(--green)" />
      <polygon points="12,10 18,16 12,22 6,16" stroke="var(--green)" />
      <line x1="12" y1="14" x2="12" y2="16" opacity="0.3" strokeWidth="1" stroke="var(--green)" />
    </svg>
  ),
  "Pengembangan Potensi Lokal": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Tunas dengan akar dan gear — potensi lokal + tekno-sosial */}
      <line x1="12" y1="22" x2="12" y2="8" stroke="var(--green)" />
      <path d="M12 14C10 12 8 10 8 8C8 6 10 5 12 5C14 5 16 6 16 8C16 10 14 12 12 14z" stroke="var(--green)" />
      <path d="M12 5C12 3 14 2 16 2" opacity="0.5" stroke="var(--green)" />
      <path d="M12 5C12 3 10 2 8 2" opacity="0.5" stroke="var(--green)" />
      <circle cx="12" cy="14" r="3" strokeDasharray="1.5 1.5" stroke="var(--green)" />
    </svg>
  ),
  "Ekosistem Pangan ASLI": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Tangkai padi melingkar — pangan berkelanjutan */}
      <path d="M12 2C7 5 4 10 4 14C4 18 7 22 12 22C17 22 20 18 20 14C20 10 17 5 12 2z" stroke="var(--green)" />
      <circle cx="12" cy="6" r="1" fill="var(--green)" />
      <circle cx="8" cy="10" r="1" fill="var(--green)" />
      <circle cx="16" cy="10" r="1" fill="var(--green)" />
      <circle cx="7" cy="15" r="1" fill="var(--green)" />
      <circle cx="17" cy="15" r="1" fill="var(--green)" />
      <circle cx="12" cy="18" r="1" fill="var(--green)" />
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
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="grid-item hover-lift hover-glow animate-delay-100"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "48px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "12px", background: "rgba(45,106,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {getIcon(service.title)}
                  </div>
                  <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.8)", lineHeight: "var(--line-relaxed)", marginBottom: "24px" }}>
                    {service.description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {service.features.map((feature, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "8px", height: "8px", background: "var(--gold)", borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)" }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
          <a href="/contact" className="button-primary">
            Hubungi Kami
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
