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
    <section id="contact" style={{ padding: "80px 56px", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
              Formulir Kontak
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-4xl)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)", marginBottom: "16px" }}>
            Mari Memulai Percakapan
          </h2>
          <p style={{ fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>
            Bagikan visi keberlanjutan Anda, dan kami akan merancang solusi yang tepat untuk organisasi Anda.
          </p>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.6)" }}>
            Tim ahli kami siap memberikan konsultasi gratis dalam 24 jam kerja.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <input type="text" placeholder="Nama Anda" required style={{ flex: 1, padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "var(--text-base)" }} />
            <input type="email" placeholder="Alamat Email" required style={{ flex: 1, padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "var(--text-base)" }} />
          </div>
          <input type="text" placeholder="Perusahaan/Organisasi" style={{ padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "var(--text-base)" }} />
          <textarea placeholder="Ceritakan tentang tantangan Anda..." rows={4} required style={{ padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: "4px", fontSize: "var(--text-base)", resize: "vertical" }} />
          <button 
            type="submit" 
            style={{ 
              padding: "16px 40px", 
              background: "var(--gold)", 
              color: "var(--navy-dark)", 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: "var(--text-xs)", 
              fontWeight: 600, 
              letterSpacing: "1px", 
              textTransform: "uppercase", 
              cursor: "pointer", 
              border: "none", 
              borderRadius: "8px",
              transition: "all 0.3s ease",
              alignSelf: "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold-light)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Kirim Pesan
          </button>
        </form>
        <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.5)", marginTop: "28px", textAlign: "center" }}>
          Data Anda dilindungi dengan aman, dikirim melalui enkripsi, dan hanya digunakan untuk tindak lanjut yang relevan.
        </p>
      </div>
    </section>
  );
}
