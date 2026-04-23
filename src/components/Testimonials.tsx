/*
  Testimonials.tsx — PARTNER QUOTES
  Builds social proof alongside cases.
*/

const testimonials = [
  {
    quote: "GAS membantu kami mentransformasi pelaporan ESG dari proses yang tidak terstruktur menjadi sistem yang siap audit dalam waktu kurang dari 6 bulan.",
    author: "Dr. Rina S., Direktur Keberlanjutan",
    company: "PT Energi Nasional",
  },
  {
    quote: "Pendekatan strategis mereka dalam menyusun peta jalan net zero memberikan arah yang jelas sekaligus dampak finansial yang terukur bagi perusahaan.",
    author: "Budi A., Kepala CSR",
    company: "Astra Agro Lestari",
  },
  {
    quote: "Solusi SDG yang diberikan tidak hanya konseptual, tetapi juga dapat langsung diimplementasikan dalam operasional sehari-hari.",
    author: "Sari L., Manajer Operasional",
    company: "PT Tambang Berkelanjutan",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "96px 56px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Apa Kata Mitra
          </span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)" }}>
          Dipercaya Pemimpin Industri
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr)", gap: "32px" }}>
        {testimonials.map((t, index) => (
          <div key={index} style={{ textAlign: "center", padding: "40px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "rgba(255,255,255,0.9)", fontStyle: "italic", marginBottom: "24px" }}>
              "{t.quote}"
            </p>
            <div>
              <div style={{ fontWeight: "600", color: "var(--white)", marginBottom: "4px" }}>{t.author}</div>
              <div style={{ fontSize: "13px", color: "var(--gold-light)" }}>{t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
