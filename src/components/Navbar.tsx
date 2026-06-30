/*
  Navbar.tsx — KOMPONEN NAVIGASI
  
  "use client" wajib ditulis jika komponen menggunakan:
  - useState, useEffect (React Hooks)
  - event handler seperti onClick, onChange
  - fitur browser (window, document)
  
  Tanpa "use client", komponen berjalan di SERVER (tidak bisa interaktif).
*/
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = ["Home", "Tentang Kami", "Ragam Layanan", "Galeri Kegiatan", "Toko", "Wawasan Keberlanjutan", "Kontak"] as const;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(10px, 2vw, 20px) clamp(12px, 4vw, 48px)",
          background: scrolled
            ? "var(--navbar-bg-scrolled)"
            : "var(--navbar-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,147,58,0.15)",
          transition: "all 0.3s ease",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          onClick={handleLinkClick}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            marginRight: "clamp(12px, 3vw, 40px)",
            flexShrink: 0,
          }}
        >
          <img
            src="/images/logo-GAS.png"
            alt="Grahita Adhi Sasmita"
            style={{
              height: "clamp(36px, 6vw, 60px)",
              width: "auto",
            }}
          />
        </Link>

        {/* DESKTOP MENU LINKS */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 2.5vw, 36px)",
            listStyle: "none",
          }}
          className="navbar-desktop-menu"
        >
          {menuItems.map((item) => {
            const href =
              item === "Home"
                ? "/"
                : item === "Tentang Kami"
                ? "/about"
                : item === "Ragam Layanan"
                ? "/services"
                : item === "Toko"
                ? "/toko"
                : item === "Wawasan Keberlanjutan"
                ? "/insights"
                : item === "Kontak"
                ? "/contact"
              : item === "Galeri Kegiatan"
              ? "/dokumentasi"
              : `#${(item as string).toLowerCase()}`;

            const isInternal = href.startsWith("/");
            const isActive = pathname === href;

            const linkStyle = {
              color: "var(--navbar-text)",
              textDecoration: "none",
              fontSize: "clamp(9px, 1.1vw, 13px)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            };

            return (
              <li key={item}>
                {isInternal ? (
                  <Link href={href} className="nav-link" aria-current={isActive ? "page" : undefined} style={linkStyle}>
                    {item}
                  </Link>
                ) : (
                  <a href={href} className="nav-link" style={linkStyle}>
                    {item}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* DESKTOP AKSI */}
        <div
          className="navbar-desktop-menu"
          style={{ display: "flex", gap: "12px", alignItems: "center" }}
        >
          <ThemeToggle />
          <Link
            href="/portal/login"
            style={{
              fontSize: "11px",
              color: "var(--navbar-text)",
              textDecoration: "none",
              letterSpacing: "1px",
              textTransform: "uppercase",
              transition: "color 0.2s",
              marginRight: "4px",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-light)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--navbar-text)"}
          >
            Admin
          </Link>
          <Link href="/contact">
            <button
              className="hover-lift hover-glow"
              style={{
                padding: "8px 22px",
                border: "1px solid var(--gold)",
                background: "var(--gold)",
                color: "var(--navy-dark)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              Mulai Kolaborasi
            </button>
          </Link>
        </div>

        {/* HAMBURGER BUTTON (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileMenuOpen}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "44px",
            height: "44px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            gap: "6px",
            zIndex: 110,
          }}
          className="navbar-hamburger"
        >
          <span
            style={{
              display: "block",
              width: "26px",
              height: "2px",
              background: "var(--gold-light)",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: mobileMenuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "26px",
              height: "2px",
              background: "var(--gold-light)",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "26px",
              height: "2px",
              background: "var(--gold-light)",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: mobileMenuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          {/* Overlay backdrop */}
          <div
            onClick={handleLinkClick}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 150,
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Drawer panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(320px, 85vw)",
              background: "var(--mobile-drawer-bg)",
              borderLeft: "1px solid rgba(201,147,58,0.2)",
              zIndex: 160,
              padding: "80px 32px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              overflowY: "auto",
            }}
          >
            {/* Close button inside drawer */}
            <button
              onClick={handleLinkClick}
              aria-label="Tutup menu"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "40px",
                height: "40px",
                background: "var(--input-bg)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                color: "var(--text-secondary)",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              ✕
            </button>

            {/* Theme toggle in drawer */}
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <ThemeToggle />
              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Tema</span>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border-subtle)", margin: "8px 0" }} />

            {/* Menu links */}
            {menuItems.map((item) => {
              const href =
                item === "Home"
                  ? "/"
                  : item === "Tentang Kami"
                  ? "/about"
                  : item === "Ragam Layanan"
                  ? "/services"
                  : item === "Toko"
                  ? "/toko"
                  : item === "Wawasan Keberlanjutan"
                  ? "/insights"
                  : item === "Kontak"
                  ? "/contact"
              : item === "Galeri Kegiatan"
              ? "/dokumentasi"
              : `#${(item as string).toLowerCase()}`;

              const isInternal = href.startsWith("/");
              const isActive = pathname === href;

              const linkStyle = {
                color: isActive ? "var(--gold-light)" : "var(--text-primary)",
                textDecoration: "none",
                fontSize: "16px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                display: "block",
                padding: "14px 16px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                background: isActive ? "var(--overlay-gold)" : "transparent",
                fontWeight: isActive ? 600 : 400,
              };

              return (
                <div key={item}>
                  {isInternal ? (
                    <Link href={href} style={linkStyle} onClick={handleLinkClick}>
                      {item}
                    </Link>
                  ) : (
                    <a href={href} style={linkStyle} onClick={handleLinkClick}>
                      {item}
                    </a>
                  )}
                </div>
              );
            })}

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border-subtle)", margin: "16px 0" }} />

            {/* Admin link */}
            <Link
              href="/portal/login"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                display: "block",
                padding: "12px 16px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onClick={handleLinkClick}
            >
              Admin Portal
            </Link>

            {/* CTA Button */}
            <Link href="/contact" style={{ textDecoration: "none", marginTop: "8px" }} onClick={handleLinkClick}>
              <button
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "var(--gold)",
                  color: "var(--navy-dark)",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-primary)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Mulai Kolaborasi
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}