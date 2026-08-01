/*
  ContactForm.tsx — FORMULIR KONTAK
  Kiriman disimpan ke tabel `contact_submissions` di Supabase.
  Dilengkapi honeypot anti-spam + validasi kata (maksimal 1000 kata).
*/

"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const MAX_WORDS = 1000;

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

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
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [loadTime] = useState(() => Date.now()); // catat kapan form dirender
  const [wordCount, setWordCount] = useState(0);

  const isOverLimit = wordCount > MAX_WORDS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // --- HONEYPOT CHECK ---
    // Field tersembunyi (type="hidden") — browser autofill tidak akan mengisinya,
    // hanya bot naif yang mengisi semua field.
    const honeypot = formData.get("company_website") as string;
    if (honeypot) {
      // Bot terdeteksi — diam-diam anggap sukses agar bot tidak curiga
      setFormSuccess(true);
      setWordCount(0);
      formRef.current.reset();
      return;
    }

    // --- TIME VALIDATION ---
    const elapsed = Date.now() - loadTime;
    if (elapsed < 3000) {
      setFormError("Formulir dikirim terlalu cepat. Mohon tunggu beberapa saat.");
      return;
    }

    const name             = formData.get("name")             as string;
    const email            = formData.get("email")            as string;
    const organization     = formData.get("company")          as string;
    const message          = formData.get("message")          as string;
    const requestType      = formData.get("request_type")     as string;
    const serviceInterest  = formData.get("service_interest") as string;

    // --- WORD COUNT VALIDATION ---
    const msgWordCount = countWords(message);
    if (msgWordCount > MAX_WORDS) {
      setFormError(`Pesan maksimal ${MAX_WORDS} kata. Anda menulis ${msgWordCount} kata. Silakan persingkat pesan Anda.`);
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, organization, message, request_type: requestType, service_interest: serviceInterest });

    setSubmitting(false);

    if (error) {
      console.error("Contact form insert error:", error);

      // 23514 = constraint violation dari database
      if (error.code === "23514") {
        const detail = error.message || "";
        if (detail.includes("message_word_limit")) {
          setFormError(`Pesan maksimal ${MAX_WORDS} kata. Silakan persingkat pesan Anda.`);
        } else if (detail.includes("email_valid")) {
          setFormError("Format email tidak valid. Periksa kembali alamat email Anda.");
        } else if (detail.includes("name_length")) {
          setFormError("Nama harus diisi dan maksimal 100 karakter.");
        } else if (detail.includes("organization_length")) {
          setFormError("Perusahaan/Organisasi maksimal 200 karakter.");
        } else {
          setFormError("Data yang Anda masukkan tidak valid. Periksa kembali formulir Anda.");
        }
      } else {
        setFormError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } else {
      setFormSuccess(true);
      setWordCount(0);
      formRef.current.reset();
    }
  };

  if (formSuccess) {
    return (
      <section id="contact" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "rgba(82, 183, 136, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
            Pesan Terkirim!
          </h2>
          <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", marginBottom: "32px" }}>
            Terima kasih. Tim kami akan menghubungi Anda dalam 24 jam kerja.
          </p>
          <button
            onClick={() => setFormSuccess(false)}
            style={{
              padding: "12px 28px",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              border: "none",
              borderRadius: "var(--radius-lg)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Kirim Pesan Lagi
          </button>
        </div>
      </section>
    );
  }

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

        {formError && (
          <div style={{
            padding: "12px 16px",
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: "var(--radius-md)",
            color: "#b91c1c",
            fontSize: "14px",
            marginBottom: "20px",
          }}>
            {formError}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Honeypot — type="hidden" agar browser autofill tidak pernah mengisinya */}
          <input
            type="hidden"
            name="company_website"
            value=""
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
          />

          <div className="contact-form-row">
            <input
              name="name"
              type="text"
              placeholder="Nama Anda"
              required
              maxLength={100}
              style={{ flex: 1, padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "var(--text-base)" }}
            />
            <input
              name="email"
              type="email"
              placeholder="Alamat Email"
              required
              maxLength={254}
              style={{ flex: 1, padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "var(--text-base)" }}
            />
          </div>
          <input
            name="company"
            type="text"
            placeholder="Perusahaan/Organisasi"
            className="contact-form-input"
            maxLength={200}
            style={{ padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "var(--text-base)" }}
          />
          <div className="contact-form-row">
<select
  id="request_type"
  name="request_type"
  defaultValue="umum"
  className="contact-form-select"
  style={{ flex: 1, padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "var(--text-base)" }}
>
  <option value="konsultasi">Konsultasi Awal (Gratis)</option>
  <option value="kolaborasi">Kolaborasi Proyek</option>
  <option value="umum">Pesan Umum</option>
</select>
<select
  name="service_interest"
  className="contact-form-select"
  style={{ padding: "14px 20px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "var(--text-base)" }}
>
  <option value="">-- Minat Layanan --</option>
  <option value="pemetaan">Pemetaan Terpadu</option>
  <option value="pendampingan">Pendampingan</option>
  <option value="solusi_tekno">Solusi Tekno-Sosial</option>
  <option value="publikasi">Publikasi & Penelitian</option>
  <option value="lainnya">Lainnya</option>
</select>
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Ceritakan tentang tantangan Anda..."
              rows={4}
              required
              maxLength={7000}
              onChange={(e) => setWordCount(countWords(e.target.value))}
              style={{ width: "100%", boxSizing: "border-box", padding: "14px 20px", background: "var(--input-bg)", border: isOverLimit ? "1px solid #fca5a5" : "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "var(--text-base)", resize: "vertical" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px", gap: "12px" }}>
              {isOverLimit ? (
                <span style={{ fontSize: "12px", color: "#b91c1c" }}>
                  Pesan maksimal {MAX_WORDS} kata. Saat ini {wordCount} kata — tombol kirim dinonaktifkan.
                </span>
              ) : (
                <span />
              )}
              <span style={{ fontSize: "12px", color: isOverLimit ? "#b91c1c" : "var(--text-secondary)", whiteSpace: "nowrap" }}>
                {wordCount} / {MAX_WORDS} kata
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || isOverLimit}
            style={{
              padding: "16px 40px",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: submitting || isOverLimit ? "not-allowed" : "pointer",
              border: "none",
              borderRadius: "var(--radius-lg)",
              transition: "all 0.3s ease",
              alignSelf: "center",
              opacity: submitting || isOverLimit ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!submitting && !isOverLimit) {
                e.currentTarget.style.background = "var(--gold-light)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {submitting ? (
              <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                </svg>
                Mengirim...
              </span>
            ) : isOverLimit ? (
              <span>Pesan Terlalu Panjang</span>
            ) : (
              <FormButtonText />
            )}
          </button>
        </form>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "28px", textAlign: "center" }}>
          Data Anda dilindungi dengan aman, dikirim melalui enkripsi, dan hanya digunakan untuk tindak lanjut yang relevan.
        </p>
      </div>
    </section>
  );
}