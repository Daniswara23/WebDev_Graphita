/*
  TestimonialsModal.tsx — TESTIMONIALS POPUP MODAL
  Data diambil dari tabel `testimonials` di Supabase.
  Animasi: modal scale-in, overlay fade, staggered cards.
*/

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  company: string;
};

export default function TestimonialsModal({ onClose }: { onClose: () => void }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger mounted state untuk entrance animation
    requestAnimationFrame(() => setMounted(true));

    supabase
      .from("testimonials")
      .select("id, quote, author, company")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setTestimonials(data);
      });
  }, []);

  return (
    <>
      {/* Overlay backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--modal-overlay-bg, var(--modal-bg))",
          zIndex: 999,
          backdropFilter: "blur(4px)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Modal content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: mounted
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.92)",
          opacity: mounted ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          background: "var(--modal-bg)",
          border: "1px solid var(--modal-border)",
          borderRadius: "12px",
          padding: "48px",
          maxWidth: "900px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "scroll",
          zIndex: 1000,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "24px",
                  height: "1px",
                  background: "var(--gold)",
                  transform: mounted ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left center",
                  transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.5s ease-out 0.4s",
                }}
              >
                Apa Kata Mitra
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Goudy Old Style, Georgia, serif",
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--text-primary)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s",
              }}
            >
              Pengalaman Mitra dalam Cerita
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--white)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Testimonials grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              style={{
                textAlign: "center",
                padding: "32px 24px",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.35 + index * 0.1}s`,
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "var(--text-primary)",
                  fontStyle: "italic",
                  marginBottom: "20px",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px", fontSize: "13px" }}>
                  {t.author}
                </div>
                <div style={{ fontSize: "12px", color: "var(--modal-company-text)" }}>{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}