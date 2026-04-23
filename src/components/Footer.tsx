/*
  Footer.tsx — SIMPLE FOOTER WITH LINKS
*/

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy-dark)", padding: "48px 56px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ maxWidth: "300px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "var(--gold-light)", letterSpacing: "0.5px", marginBottom: "12px" }}>
            Grahita Adhi Sasmita
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
            Mitra keberlanjutan strategis membantu organisasi menyelesaikan tantangan sosial, ekonomi, dan lingkungan.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "var(--white)", marginBottom: "16px" }}>Layanan</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#services" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Strategi ESG</a></li>
            <li><a href="#services" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Pelaporan SDG</a></li>
            <li><a href="#cases" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Studi Kasus</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "var(--white)", marginBottom: "16px" }}>Kontak</h4>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>hello@grahitaadhisasmita.com</p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>+62 21 1234 5678</p>
        </div>
      </div>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "40px 0" }} />
      <div style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
        © 2024 Grahita Adhi Sasmita. Semua hak dilindungi.
      </div>
    </footer>
  );
}
