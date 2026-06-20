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
export const metadata: Metadata = {
  title: "PT Grahita Adhi Sasmita",
  description: "Sahabat organisasi dalam membangun jejak keberlanjutan yang jelas, personal, dan terasa.",
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