/*
  TestimonialsModal.tsx — TESTIMONIALS POPUP MODAL
  Displays testimonials in a modal/popup overlay below Trusted section
*/

"use client";

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

export default function TestimonialsModal({ onClose }: { onClose: () => void }) {
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
          background: "rgba(0,0,0,0.7)",
          zIndex: 999,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(15,26,48,0.98)",
          border: "1px solid rgba(201,147,58,0.2)",
          borderRadius: "12px",
          padding: "48px",
          maxWidth: "900px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          zIndex: 1000,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
                Apa Kata Mitra
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "var(--white)" }}>
              Dipercaya Pemimpin Industri
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              padding: "0",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            ✕
          </button>
        </div>

        {/* Testimonials grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {testimonials.map((t, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "32px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "rgba(255,255,255,0.9)",
                  fontStyle: "italic",
                  marginBottom: "20px",
                }}
              >
                "{t.quote}"
              </p>
              <div>
                <div style={{ fontWeight: "600", color: "var(--white)", marginBottom: "4px", fontSize: "13px" }}>
                  {t.author}
                </div>
                <div style={{ fontSize: "12px", color: "var(--gold-light)" }}>{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
