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
          fontFamily: "'Playfair Display', serif",
          fontSize: "20px",
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
        {["Home", "Tentang Kami", "Layanan", "Publikasi & Riset", "Kontak"].map((item) => (
          <li key={item}>
            {item === 'Home' ? (
              <Link
                href="/"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Link>
            ) : item === 'Kontak' ? (
              <Link
                href="/contact"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Link>
            ) : item === 'Tentang Kami' ? (
              <Link
                href="/about"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Link>
            ) : item === 'Layanan' ? (
              <Link
                href="/services"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Link>
            ) : item === 'Publikasi & Riset' ? (
              <Link
                href="/insights"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Link>
            ) : (
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* TOMBOL AKSI */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Link href="/contact">
          <button
            style={{
              padding: "8px 22px",
              border: "1px solid var(--gold)",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
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
