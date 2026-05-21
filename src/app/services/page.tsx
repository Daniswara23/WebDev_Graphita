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
                  <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "12px", background: "rgba(255,255,255,0.08)" }} />
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
