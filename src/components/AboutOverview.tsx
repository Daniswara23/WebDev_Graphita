"use client";

/*
  AboutOverview.tsx — SEKSI TENTANG KAMI (PROFIL PERUSAHAAN)
  Data diambil dari tabel `case_studies` di Supabase.
  Tampilan tidak berubah.
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

export default function AboutOverview() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("id, title, client, challenge, solution, result, image_url")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCaseStudies(data);
      });
  }, []);

  return (
    <section id="cases" className="animate-on-scroll" style={{ padding: "96px 56px", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Sekilas Tentang Kami
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)" }}>
            Ringkasan Pendirian<br />
            <span style={{ color: "var(--gold-light)" }}>dan Komitmen SDGs</span>
          </h2>
        </div>
        <Link href="/about" className="hover-scale" style={{ fontSize: "var(--text-xs)", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--green-light)", cursor: "pointer", border: "none", background: "none", marginBottom: "8px", textDecoration: "none" }}>
          Pelajari Lebih Lanjut →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
        {caseStudies.map((cs, index) => (
          <div key={cs.id} className="grid-item hover-lift hover-glow" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "40px", cursor: "pointer", animationDelay: `${index * 0.15}s` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sdg.jpg"
              alt="SDGs"
              style={{ maxWidth: "700px", width: "100%", height: "auto", borderRadius: "8px", marginBottom: "24px", display: "block" }}
            />
            <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-2xl)", fontWeight: "700", color: "var(--white)", marginBottom: "12px" }}>
              {cs.title}
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
              <strong>Pendirian:</strong> {cs.client}
            </p>
            <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
              <strong>Deskripsi:</strong> {cs.challenge}
            </p>
            <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
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