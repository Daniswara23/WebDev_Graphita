"use client";

/*
  AboutOverview.tsx — SEKSI TENTANG KAMI (PROFIL PERUSAHAAN)
  Data dari `case_studies` (teks) dan `case_videos` (carousel YouTube) di Supabase.
  Layout:
    ┌──────────────────────┬──────────────────────┐
    │  Gambar Statis (kiri)│  Video Carousel (kanan)│
    └──────────────────────┴──────────────────────┘
    ┌──────────────────────────────────────────┐
    │  Teks Pendirian, Deskripsi, Dampak       │
    └──────────────────────────────────────────┘
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image_url: string | null;
};

type CaseVideo = {
  id: string;
  title: string;
  video_url: string;
  sort_order: number;
  is_active: boolean;
};

export default function AboutOverview() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [videos, setVideos] = useState<CaseVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("id, title, client, challenge, solution, result, image_url")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCaseStudies(data);
      });

    supabase
      .from("case_videos")
      .select("id, title, video_url, sort_order, is_active")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setVideos(data);
      });
  }, []);

  const goToPrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const currentVideo = videos[currentVideoIndex];

  const [etymologyIndex, setEtymologyIndex] = useState<number | null>(null);

  const toggleEtymology = (index: number) => {
    setEtymologyIndex(etymologyIndex === index ? null : index);
  };

  const etymologyItems = [
    {
      letter: "G",
      word: "Grahita",
      meaning: "Pemahaman Mendalam",
      detail: "Kepercayaan bahwa setiap perubahan dimulai dari pengenalan konteks yang benar — tidak hanya melihat angka, tetapi memahami cerita yang melatarbelakangi setiap tantangan.",
      color: "var(--brand-grahita)",
      bgColor: "rgba(12, 17, 99, 0.08)"
    },
    {
      letter: "A",
      word: "Adhi",
      meaning: "Keunggulan / Pelopor",
      detail: "Komitmen untuk selalu hadir sebagai pelopor — mengangkat standar, merancang solusi yang inovatif, dan menjadi contoh konkret dalam mewujudkan keberlanjutan.",
      color: "#a97b2d",
      bgColor: "rgba(169, 123, 45, 0.08)"
    },
    {
      letter: "S",
      word: "Sasmita",
      meaning: "Pendekatan Ramah & Inklusif",
      detail: "Setiap interaksi adalah kesempatan untuk membangun hubungan yang lasting — menghormati perbedaan, mendengarkan kebutuhan, dan menciptakan ruang kolaborasi yang nyaman.",
      color: "var(--brand-sasmita)",
      bgColor: "rgba(12, 17, 99, 0.08)"
    }
  ];

  return (
    <section id="cases" className="animate-on-scroll" style={{ padding: "96px 56px", background: "var(--section-bg-alt)" }}>

      {/* ===== SECTION ETIMOLOGI NAMA (BARU) ===== */}
      <div style={{ marginBottom: "80px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Filosofi Nama Kami
          </span>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "24px" }}>
          <span style={{ color: "var(--brand-grahita)" }}>Grahita</span> <span style={{ color: "#a97b2d" }}>Adhi</span> <span style={{ color: "var(--brand-sasmita)" }}>Sasmita</span>
        </h2>
        <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", maxWidth: "640px", margin: "0 auto 48px", lineHeight: 1.6 }}>
          Setiap huruf membawa makna yang menjadi fondasi cara kami bekerja — dari pemahaman yang mendalam, keunggulan yang berkelanjutan, hingga pendekatan yang ramah dan inklusif.
        </p>

        <div className="etymology-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", maxWidth: "960px", margin: "0 auto" }}>
          {etymologyItems.map((item, index) => (
            <div
              key={item.letter}
              onClick={() => toggleEtymology(index)}
              style={{
                padding: "36px 24px 28px",
                background: etymologyIndex === index ? item.bgColor : "var(--card-bg)",
                border: `1px solid ${etymologyIndex === index ? item.color : "var(--card-border)"}`,
                borderRadius: "16px",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (etymologyIndex !== index) {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.background = item.bgColor;
                }
              }}
              onMouseLeave={(e) => {
                if (etymologyIndex !== index) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.background = "var(--card-bg)";
                }
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: item.bgColor,
                border: `2px solid ${item.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 800,
                color: item.color,
                fontFamily: "'Times New Roman', serif",
                margin: "0 auto 20px",
                transition: "all 0.4s ease",
              }}>
                {item.letter}
              </div>
              <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-xl)", fontWeight: 700, color: item.color, marginBottom: "8px" }}>
                {item.word}
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: etymologyIndex === index ? "16px" : "0", lineHeight: 1.5 }}>
                {item.meaning}
              </p>
              <div style={{
                maxHeight: etymologyIndex === index ? "120px" : "0",
                overflow: "hidden",
                opacity: etymologyIndex === index ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: 1.6, paddingTop: "12px", borderTop: `1px solid ${item.color}33` }}>
                  {item.detail}
                </p>
              </div>
              <span style={{
                marginTop: "12px",
                fontSize: "11px",
                color: item.color,
                opacity: 0.7,
                fontStyle: "italic",
                letterSpacing: "0.5px",
              }}>
                {etymologyIndex === index ? "Klik untuk tutup" : "Klik untuk detail"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== HEADER SECTION ===== */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Landasan Filosofi & Komitmen
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)" }}>
            Selaras dengan SDGs,<br />
            <span style={{ color: "var(--gold-light)" }}>Bernilai untuk Masyarakat</span>
          </h2>
        </div>
        <Link href="/about" className="hover-scale" style={{ fontSize: "var(--text-xs)", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--accent-green-light)", cursor: "pointer", border: "none", background: "none", marginBottom: "8px", textDecoration: "none" }}>
          Pelajari Lebih Lanjut →
        </Link>
      </div>

      <div className="case-studies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
        {caseStudies.map((cs, index) => (
          <div key={cs.id} className="grid-item hover-lift hover-glow" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "16px", padding: "40px", animationDelay: `${index * 0.15}s` }}>

            {/* ===== BARIS ATAS: GAMBAR KIRI + VIDEO KANAN ===== */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>

              {/* Kiri: Gambar Statis */}
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sdg.jpg"
                  alt="SDGs"
                  style={{ width: "100%", height: "100%", minHeight: "200px", objectFit: "cover", borderRadius: "8px", display: "block" }}
                />
              </div>

              {/* Kanan: Video Carousel */}
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", background: "var(--bg-secondary)", minHeight: "200px" }}>
                {videos.length > 0 && currentVideo ? (
                  <>
                    <iframe
                      key={currentVideo.id}
                      src={currentVideo.video_url}
                      title={currentVideo.title}
                      style={{ width: "100%", height: "100%", minHeight: "200px", border: "none", borderRadius: "8px", display: "block" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />

                    {/* Tombol Navigasi Kiri */}
                    {videos.length > 1 && (
                      <button
                        onClick={goToPrev}
                        aria-label="Video sebelumnya"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "8px",
                          transform: "translateY(-50%)",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-subtle)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          lineHeight: 1,
                          padding: 0,
                          zIndex: 5,
                        }}
                      >
                        ‹
                      </button>
                    )}

                    {/* Tombol Navigasi Kanan */}
                    {videos.length > 1 && (
                      <button
                        onClick={goToNext}
                        aria-label="Video berikutnya"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "8px",
                          transform: "translateY(-50%)",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-subtle)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          lineHeight: 1,
                          padding: 0,
                          zIndex: 5,
                        }}
                      >
                        ›
                      </button>
                    )}

                    {/* Indikator Halaman */}
                    {videos.length > 1 && (
                      <div style={{
                        position: "absolute",
                        bottom: "8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        padding: "2px 10px",
                        borderRadius: "10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        zIndex: 5,
                      }}>
                        {currentVideoIndex + 1} / {videos.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                    padding: "16px",
                    textAlign: "center",
                  }}>
                    Video belum tersedia.<br />
                    Tambahkan melalui Portal Admin.
                  </div>
                )}
              </div>
            </div>

            {/* ===== TEKS DI BAWAH ===== */}
            <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-2xl)", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
              {cs.title}
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "16px" }}>
              <strong>Pendirian:</strong> {cs.client}
            </p>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "8px" }}>
              <strong>Deskripsi:</strong> {cs.challenge}
            </p>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "8px" }}>
              <strong>Komitmen SDGs:</strong> {cs.solution}
            </p>
            <p style={{ fontSize: "var(--text-base)", fontWeight: "600", color: "var(--gold-light)" }}>
              <strong>Dampak:</strong> {cs.result}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
