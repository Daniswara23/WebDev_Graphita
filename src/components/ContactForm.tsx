/*
  ContactForm.tsx — SIMPLE CONTACT FORM
  Use Netlify form or EmailJS for production.
  For now, static with JS alert placeholder.
*/

"use client";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Kami akan menghubungi Anda segera. (Demo - integrasikan EmailJS/Netlify di produksi)");
  };

  return (
    <section id="contact" style={{ padding: "96px 56px", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Mari Berkolaborasi
          </span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "8px" }}>
          Siap Memulai Kemitraan?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginBottom: "48px" }}>
          Ceritakan tantangan keberlanjutan Anda. Konsultasi gratis dalam 24 jam.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <input type="text" placeholder="Nama Anda" required style={{ flex: 1, padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "14px" }} />
            <input type="email" placeholder="Alamat Email" required style={{ flex: 1, padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "14px" }} />
          </div>
          <input type="text" placeholder="Perusahaan/Organisasi" style={{ padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "14px" }} />
          <textarea placeholder="Ceritakan tentang tantangan Anda..." rows={4} required style={{ padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "14px", resize: "vertical" }} />
          <button type="submit" style={{ padding: "16px 40px", background: "var(--gold)", color: "var(--navy-dark)", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", border: "none", borderRadius: "4px" }}>
            Kirim Pesan
          </button>
        </form>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "24px" }}>
          Atau email langsung: hello@grahitaadhisasmita.com
        </p>
      </div>
    </section>
  );
}
