/*
  Footer.tsx — SIMPLE FOOTER WITH LINKS
*/

export default function Footer() {
  return (
    <footer style={{ background: "var(--footer-bg)", padding: "48px 56px 24px", borderTop: "1px solid var(--footer-border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ maxWidth: "300px" }}>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--gold-light)", letterSpacing: "0.5px", marginBottom: "12px" }}>
            Grahita Adhi Sasmita
          </div>
          <p style={{ fontSize: "var(--text-base)", color: "var(--footer-text)", lineHeight: "var(--line-normal)" }}>
            Mitra keberlanjutan strategis membantu organisasi menyelesaikan tantangan sosial, ekonomi, dan lingkungan.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-lg)", color: "var(--footer-heading)", marginBottom: "16px" }}>Ragam Layanan</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#services" style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)", textDecoration: "none" }}>Strategi ESG</a></li>
            <li><a href="#services" style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)", textDecoration: "none" }}>Pelaporan SDG</a></li>
            <li><a href="#cases" style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)", textDecoration: "none" }}>Studi Kasus</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-lg)", color: "var(--footer-heading)", marginBottom: "16px" }}>Kontak</h4>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)" }}>hello@grahitaadhisasmita.com</p>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--footer-link)" }}>+62 21 1234 5678</p>
        </div>
      </div>
      <div style={{ height: "1px", background: "var(--footer-border)", margin: "40px 0" }} />
      <div style={{ textAlign: "center", fontSize: "var(--text-xs)", color: "var(--footer-text-muted)" }}>
        © 2024 Grahita Adhi Sasmita. Semua hak dilindungi.
      </div>
    </footer>
  );
}
