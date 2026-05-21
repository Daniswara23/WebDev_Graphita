/*
  layout.tsx — ROOT LAYOUT
  
  Di Next.js App Router, layout.tsx adalah "pembungkus" semua halaman.
  Semua halaman akan dirender di dalam {children}.
  
  Analoginya: layout = bingkai foto, page = foto di dalamnya.
  Navbar dan Footer biasanya diletakkan di sini agar muncul di semua halaman.
*/

import type { Metadata } from "next";
import "./globals.css";

// Metadata = informasi halaman yang muncul di tab browser & hasil Google
export const metadata: Metadata = {
  title: "PT Grahita Adhi Sasmita",
  description: "Menjadi sahabat menuju keberlanjutan yang maknawi. Konsultan sustainability terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // children = konten dari page.tsx
}>) {
  return (
    <html lang="id">
      {/* lang="id" penting untuk aksesibilitas & SEO */}
      <body>
        {children}
      </body>
    </html>
  );
}
