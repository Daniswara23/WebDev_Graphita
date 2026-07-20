/*
  ContactSection.tsx — Interactive section wrapper untuk contact page
  Client Component agar bisa pakai onMouseEnter/onMouseLeave
*/

"use client";

import { SocialImageIcon, SocialIconWrapper } from "./ContactIcons";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon_path: string;
  is_active: boolean;
  sort_order: number;
};

const getSocialLabel = (platform: string) => {
  const labels: Record<string, string> = {
    linkedin: "LinkedIn",
    instagram: "Instagram",
    twitter: "X (Twitter)",
    facebook: "Facebook",
  };
  return labels[platform] || platform;
};

export default function ContactSection({ socialLinks }: { socialLinks: SocialLink[] | null }) {
  return (
    <div className="animate-on-scroll" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "48px" }}>
           {/* Kantor */}
          <div className="grid-item animate-delay-100" style={{
            textAlign: "center",
            padding: "40px 32px",
            border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-lg)",
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
              borderRadius: "var(--radius-md)",
              background: "rgba(45,106,79,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#52b788"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="12,3 2,12" />
                <polyline points="12,3 22,12" />
                <rect x="6" y="12" width="12" height="9" />
                <line x1="8.5" y1="15" x2="10.5" y2="15" />
                <line x1="8.5" y1="17" x2="10.5" y2="17" />
                <line x1="13.5" y1="15" x2="15.5" y2="15" />
                <line x1="13.5" y1="17" x2="15.5" y2="17" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
              Lokasi Kantor
            </h3>
            <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "8px" }}>
              <strong>Grahita Adhi Sasmita</strong>
            </p>
            <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "16px" }}>
              Area Sawah, Tlogoadi, Mlati, Sleman Regency, Special Region of Yogyakarta 55288
            </p>
            <div style={{ background: "var(--overlay-gold)", padding: "16px", borderRadius: "var(--radius-lg)", border: "1px solid rgba(201,147,58,0.2)" }}>
              <p style={{ fontSize: "var(--text-base)", color: "var(--text-primary)", margin: "0" }}>
                hello@grahitaadhisasmita.com
              </p>
              <p style={{ fontSize: "var(--text-base)", color: "var(--text-primary)", margin: "8px 0 0 0" }}>
                +62 21 1234 5678
              </p>
            </div>
          </div>

           {/* Media Sosial */}
          <div className="grid-item animate-delay-100" style={{
            textAlign: "center",
            padding: "40px 32px",
            border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-lg)",
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
              borderRadius: "var(--radius-md)",
              background: "rgba(12, 17, 99, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#52b788"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
              Ikuti Kami
            </h3>
            <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: "var(--line-relaxed)", marginBottom: "32px" }}>
              Temukan berita terbaru, insight, dan publikasi kami
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              {socialLinks?.map((link) => (
                <SocialIconWrapper 
                  key={link.id} 
                  href={link.url} 
                  icon={<SocialImageIcon src={link.icon_path} alt={getSocialLabel(link.platform)} size={22} />} 
                  label={getSocialLabel(link.platform)} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}