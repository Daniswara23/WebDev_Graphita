/*
  ContactForm.tsx — FORMULIR KONTAK
  Kiriman disimpan ke tabel `contact_submissions` di Supabase.
  Tampilan tidak berubah.
*/

"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

function FormButtonText() {
  const type = typeof window !== "undefined"
    ? (document.getElementById("request_type") as HTMLSelectElement | null)?.value
    : "umum";

  if (type === "konsultasi") return <span>Minta Konsultasi Gratis →</span>;
  if (type === "kolaborasi") return <span>Propose Kolaborasi →</span>;
  return <span>Kirim Pesan</span>;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name             = formData.get("name")             as string;
    const email            = formData.get("email")            as string;
    const company          = formData.get("company")          as string;
    const message          = formData.get("message")          as string;
    const requestType      = formData.get("request_type")     as string;
    const serviceInterest  = formData.get("service_interest") as string;

    setSubmitting(true);

    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, company, message, request_type: requestType, service_interest: serviceInterest });

    setSubmitting(false);

    if (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } else {
      alert("Pesan Anda telah terkirim. Tim kami akan menghubungi Anda segera.");
      formRef.current.reset();
    }
  };

  return (
    <section id="contact" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Formulir Kontak
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "16px" }}>
            Mari Memulai Percakapan
          </h2>
          <p style={{ fontSize: "var(--text-lg)", color: "var(--text-primary)", marginBottom: "8px" }}>
            Bagikan visi keberlanjutan Anda, dan kami akan merancang solusi yang tepat untuk organisasi Anda.
          </p>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)" }}>
            Tim ahli kami siap memberikan konsultasi gratis dalam 24 jam kerja.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="contact-form-row">
            <input
              name="name"
              type="text"
              placeholder="Nama Anda"
              required
              style={{ flex: 1, padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "4px", fontSize: "var(--text-base)" }}
            />
            <input
              name="email"
              type="email"
              placeholder="Alamat Email"
              required
              style={{ flex: 1, padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "4px", fontSize: "var(--text-base)" }}
            />
          </div>
          <input
            name="company"
            type="text"
            placeholder="Perusahaan/Organisasi"
            className="contact-form-input"
            style={{ padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "4px", fontSize: "var(--text-base)" }}
          />
          <div className="contact-form-row">
            <select
              id="request_type"
              name="request_type"
              defaultValue="umum"
              style={{ flex: 1, padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "4px", fontSize: "var(--text-base)" }}
            >
              <option value="konsultasi">Konsultasi Awal (Gratis)</option>
              <option value="kolaborasi">Kolaborasi Proyek</option>
              <option value="umum">Pesan Umum</option>
            </select>
            <select
              name="service_interest"
              className="contact-form-input"
              style={{ padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "4px", fontSize: "var(--text-base)" }}
            >
              <option value="">-- Minat Layanan --</option>
              <option value="pemetaan">Pemetaan Terpadu</option>
              <option value="pendampingan">Pendampingan</option>
              <option value="solusi_tekno">Solusi Tekno-Sosial</option>
              <option value="publikasi">Publikasi & Penelitian</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <textarea
            name="message"
            placeholder="Ceritakan tentang tantangan Anda..."
            rows={4}
            required
            style={{ padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "4px", fontSize: "var(--text-base)", resize: "vertical" }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "16px 40px",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: submitting ? "not-allowed" : "pointer",
              border: "none",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              alignSelf: "center",
              opacity: submitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.currentTarget.style.background = "var(--gold-light)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {submitting ? "Mengirim..." : <FormButtonText />}
          </button>
        </form>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "28px", textAlign: "center" }}>
          Data Anda dilindungi dengan aman, dikirim melalui enkripsi, dan hanya digunakan untuk tindak lanjut yang relevan.
        </p>
      </div>
    </section>
  );
}