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

  return (
    <section id="cases" className="animate-on-scroll" style={{ padding: "96px 56px", background: "var(--section-bg-alt)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Sekilas Tentang Kami
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)" }}>
            Ringkasan Pendirian<br />
            <span style={{ color: "var(--gold-light)" }}>dan Komitmen SDGs</span>
          </h2>
        </div>
        <Link href="/about" className="hover-scale" style={{ fontSize: "var(--text-xs)", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--accent-green-light)", cursor: "pointer", border: "none", background: "none", marginBottom: "8px", textDecoration: "none" }}>
          Pelajari Lebih Lanjut →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
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
