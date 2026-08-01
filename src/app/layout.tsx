/*
  layout.tsx — ROOT LAYOUT
  
  Di Next.js App Router, layout.tsx adalah "pembungkus" semua halaman.
  Semua halaman akan dirender di dalam {children}.
  
  Analoginya: layout = bingkai foto, page = foto di dalamnya.
  Navbar dan Footer biasanya diletakkan di sini agar muncul di semua halaman.
*/

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ScrollAnimations from "@/components/ScrollAnimations";

// Metadata = informasi halaman yang muncul di tab browser & hasil Google
// SEO: metadataBase penting untuk canonical URL & Open Graph
export const metadata: Metadata = {
  metadataBase: new URL("https://grahitas.co.id"),
  title: {
    default: "PT Grahita Adhi Sasmita — Konsultan Keberlanjutan & ESG",
    template: "%s | PT Grahita Adhi Sasmita",
  },
  description:
    "PT Grahita Adhi Sasmita adalah konsultan keberlanjutan (sustainability) & ESG di Indonesia. Sahabat organisasi dalam membangun jejak keberlanjutan yang jelas, personal, dan terasa.",
  keywords: [
    "Grahita Adhi Sasmita",
    "konsultan keberlanjutan",
    "sustainability consultant Indonesia",
    "ESG Indonesia",
    "laporan keberlanjutan",
    "CSR",
    "SDGs",
    "konsultan lingkungan",
  ],
  authors: [{ name: "PT Grahita Adhi Sasmita" }],
  creator: "PT Grahita Adhi Sasmita",
  publisher: "PT Grahita Adhi Sasmita",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://grahitas.co.id",
    siteName: "PT Grahita Adhi Sasmita",
    title: "PT Grahita Adhi Sasmita — Konsultan Keberlanjutan & ESG",
    description:
      "Sahabat organisasi dalam membangun jejak keberlanjutan yang jelas, personal, dan terasa.",
    images: [
      {
        url: "/images/logo-GAS.png",
        width: 1200,
        height: 630,
        alt: "PT Grahita Adhi Sasmita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Grahita Adhi Sasmita — Konsultan Keberlanjutan & ESG",
    description:
      "Sahabat organisasi dalam membangun jejak keberlanjutan yang jelas, personal, dan terasa.",
    images: ["/images/logo-GAS.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://grahitas.co.id",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // children = konten dari page.tsx
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      {/* 
        suppressHydrationWarning: Diperlukan karena inline script di bawah
        mengubah class <html> sebelum React melakukan hydration.
      */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Cek localStorage dulu (prioritas pilihan user)
                var theme = localStorage.getItem('theme-preference');
                if (theme === 'light') {
                  document.documentElement.classList.add('light-mode');
                } else if (!theme) {
                  // Tidak ada preferensi tersimpan — cek sistem browser
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  if (prefersLight) {
                    document.documentElement.classList.add('light-mode');
                  }
                }
                // Jika theme === 'dark' atau default, biarkan tanpa class (dark mode default)
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data — Organization Schema untuk SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT Grahita Adhi Sasmita",
              url: "https://grahitas.co.id",
              logo: "https://grahitas.co.id/images/logo-GAS.png",
              description:
                "Sahabat organisasi dalam membangun jejak keberlanjutan yang jelas, personal, dan terasa.",
              sameAs: [],
            }),
          }}
        />
      </head>
      {/* lang="id" penting untuk aksesibilitas & SEO */}
      <body>
        <ThemeProvider>
          <ScrollAnimations />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}