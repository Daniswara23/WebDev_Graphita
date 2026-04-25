/*
  Etos3T.tsx — ETOS 3T (TANGGAP, TANGGUH, TUMBUH)
  Interactive panels explaining the 3T values
*/

const etos3T = [
  {
    title: "Tanggap",
    description: "Responsif dan peka terhadap kebutuhan klien serta tantangan keberlanjutan yang mereka hadapi. Kami mendengarkan, memahami, dan memberikan solusi yang disesuaikan dengan konteks bisnis lokal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.5" width="48" height="48">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Tangguh",
    description: "Komitmen yang kuat dan berkelanjutan dalam menghadapi tantangan keberlanjutan. Kami membangun fondasi yang solid untuk transformasi jangka panjang dengan strategi yang terbukti efektif.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.5" width="48" height="48">
        <path d="M12 2v20M7 7l10 10M7 17l10-10" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Tumbuh",
    description: "Pertumbuhan berkelanjutan yang menguntungkan semua stakeholder. Kami memastikan bahwa upaya keberlanjutan menciptakan nilai tambah bisnis dan dampak positif bagi masyarakat serta lingkungan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.5" width="48" height="48">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function Etos3T() {
  return (
    <section style={{ padding: "96px 56px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-light)" }}>
            Fondasi Kami
          </span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "var(--white)" }}>
          Etos 3T: Tanggap, Tangguh, Tumbuh
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
        {etos3T.map((t, index) => (
          <div key={index} style={{ padding: "40px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
              {t.icon}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "var(--gold-light)", marginBottom: "16px" }}>
              {t.title}
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "rgba(255,255,255,0.8)" }}>
              {t.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
