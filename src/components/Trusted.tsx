/*
  Trusted.tsx — SECTION LOGO KLIEN
  
  Menampilkan logo/nama perusahaan yang sudah jadi klien.
  Pola sama: data array + .map()
*/

export default function Trusted({ onViewTestimonials }: { onViewTestimonials: () => void }) {
  return (
    <div
      style={{
        padding: "48px 56px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header dengan garis kanan-kiri dan teks tengah */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "32px",
          justifyContent: "center",
        }}
      >
        {/* Garis kiri */}
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          Kisah nyata dari mitra kami
        </span>
        
        {/* Garis kanan */}
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Tombol Lihat Testimoni di tengah */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        <button
          onClick={onViewTestimonials}
          style={{
            padding: "6px 16px",
            background: "rgba(201,147,58,0.1)",
            border: "1px solid rgba(201,147,58,0.3)",
            color: "var(--gold-light)",
            fontSize: "11px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,147,58,0.2)";
            e.currentTarget.style.borderColor = "rgba(201,147,58,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(201,147,58,0.1)";
            e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)";
          }}
        >
          Lihat testimoni mitra
        </button>
      </div>

    </div>
  );
}
