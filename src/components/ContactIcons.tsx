/*
  ContactIcons.tsx — IKON KONTAK UNTUK PAGE /contact
  Menggunakan gambar logo yang sudah disiapkan di public/images/
  Styling mengikuti pattern dari Services.tsx (Ragam Layanan)
*/

import Image from "next/image";

// ============================================================
// 1. GEDUNG KANTOR — Simbol Tempat & Stabilitas (SVG Icon)
// Style: stroke="#52b788" (hijau), strokeWidth="1.5", 24x24
// ============================================================
export function OfficeBuildingIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#52b788"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Atap segitiga - rata di kedua sisi */}
      <polyline points="12,3 2,12" />
      <polyline points="12,3 22,12" />
      {/* Badan gedung */}
      <rect x="6" y="12" width="12" height="9" />
      {/* Jendela kiri */}
      <line x1="8.5" y1="15" x2="10.5" y2="15" />
      <line x1="8.5" y1="17" x2="10.5" y2="17" />
      {/* Jendela kanan */}
      <line x1="13.5" y1="15" x2="15.5" y2="15" />
      <line x1="13.5" y1="17" x2="15.5" y2="17" />
      {/* Pintu */}
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

// ============================================================
// 2. SHARE/NETWORK ICON — Tiga orang terhubung untuk "Ikuti Kami"
// Style: stroke="#52b788" (hijau), strokeWidth="1.5", 24x24
// ============================================================
export function ShareNetworkIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#52b788"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Orang kiri atas */}
      <circle cx="6" cy="6" r="2.5" />
      <path d="M6 8.5v3.5" />
      <path d="M3.5 15v-1a2.5 2.5 0 012.5-2.5h0a2.5 2.5 0 012.5 2.5v1" />

      {/* Orang tengah bawah (lebih besar - utama) */}
      <circle cx="12" cy="10" r="3" />
      <path d="M12 13v4" />
      <path d="M7.5 21v-2a4.5 4.5 0 014.5-4.5h0a4.5 4.5 0 014.5 4.5v2" />

      {/* Orang kanan atas */}
      <circle cx="18" cy="6" r="2.5" />
      <path d="M18 8.5v3.5" />
      <path d="M15.5 15v-1a2.5 2.5 0 012.5-2.5h0a2.5 2.5 0 012.5 2.5v1" />

      {/* Garis penghubung antar orang */}
      <line x1="8" y1="9" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="9" />
    </svg>
  );
}

// ============================================================
// 3. SHARE/GRID ICON — Untuk section "Ikuti Kami" (backup/jika perlu)
// Style: stroke="#52b788" (hijau), strokeWidth="1.5", 24x24
// ============================================================
export function ShareGridIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
  );
}

// ============================================================
// 3. SOCIAL MEDIA IMAGE ICON — Pakai gambar dari public/images/
// ============================================================
interface SocialImageIconProps {
  src: string;
  alt: string;
  size?: number;
}

export function SocialImageIcon({ src, alt, size = 22 }: SocialImageIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      unoptimized
    />
  );
}

// ============================================================
// SOCIAL ICON WRAPPER — Container circular dengan hover effect
// ============================================================
interface SocialIconWrapperProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function SocialIconWrapper({ href, icon, label }: SocialIconWrapperProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "48px",
        height: "48px",
        borderRadius: "4px",
        background: "rgba(45,106,79,0.2)",
        transition: "all 0.3s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(82, 183, 136, 0.3)";
        e.currentTarget.style.background = "rgba(45,106,79,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "rgba(45,106,79,0.2)";
      }}
    >
      {icon}
    </a>
  );
}
