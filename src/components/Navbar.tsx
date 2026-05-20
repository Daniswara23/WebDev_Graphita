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

export default function Navbar() {
  /*
    useState = cara menyimpan data yang bisa berubah di React.
    Format: const [nilai, fungsiUbahNilai] = useState(nilaiAwal)
    
    scrolled = true jika user sudah scroll ke bawah.
    Kita pakai ini untuk mengubah tampilan navbar saat di-scroll.
  */
  const [scrolled, setScrolled] = useState(false);

  /*
    useEffect = menjalankan kode ketika komponen sudah tampil di browser.
    Parameter [] kosong = hanya jalan SEKALI saat komponen pertama muncul.
    
    Di sini kita pasang "event listener" untuk mendeteksi scroll.
  */
  useEffect(() => {
    const handleScroll = () => {
      // Jika user scroll lebih dari 20px, set scrolled = true
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup: hapus listener saat komponen dihapus dari halaman
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",           // Navbar menempel di atas layar
        top: 0, left: 0, right: 0,
        zIndex: 100,                 // Berada di atas elemen lain
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        // Background berubah berdasarkan state scrolled
        background: scrolled
          ? "rgba(15,26,48,0.97)"
          : "rgba(15,26,48,0.85)",
        backdropFilter: "blur(12px)", // Efek blur background
        borderBottom: "1px solid rgba(201,147,58,0.15)",
        transition: "all 0.3s ease",  // Animasi halus saat berubah
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-2xl)",
          fontWeight: 700,
          color: "var(--gold-light)",
          letterSpacing: "0.5px",
        }}
      >
        Grahita{" "}
        <span style={{ color: "var(--white)" }}>Adhi Sasmita</span>
      </div>

      {/* MENU LINKS */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "36px",
          listStyle: "none",     // Hapus bullet point bawaan
        }}
      >
        {/* 
          Kita map array menu agar tidak perlu tulis <li> berulang.
          map() = looping di React untuk membuat elemen dari array.
        */}
        {["Home", "Tentang Kami", "Ragam Layanan", "Toko", "Riset dan Publikasi", "Kontak"].map((item) => {
          const href =
            item === "Home"
              ? "/"
              : item === "Tentang Kami"
              ? "/about"
              : item === "Ragam Layanan"
              ? "/services"
              : item === "Toko"
              ? "/toko"
              : item === "Riset dan Publikasi"
              ? "/insights"
              : item === "Kontak"
              ? "/contact"
              : `#${item.toLowerCase()}`;

          const isInternal = href.startsWith("/");
          const isActive = pathname === href;

          const linkStyle = {
            color: "rgba(255,255,255,0.75)",
            textDecoration: "none",
            fontSize: "var(--text-sm)",
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

      {/* TOMBOL AKSI */}
      <div style={{ display: "flex", gap: "12px" }}>
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
    </nav>
  );
}
