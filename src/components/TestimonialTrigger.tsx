/*
  TestimonialTrigger.tsx — TRIGGER TOMBOL TESTIMONIAL
   
  Menampilkan tombol untuk membuka modal testimoni mitra.
*/

export default function TestimonialTrigger({ onViewTestimonials }: { onViewTestimonials: () => void }) {
  return (
    <div
      style={{
        padding: "48px 56px",
        borderBottom: "1px solid var(--border-subtle)",
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
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
          }}
        >
          Kisah nyata dari mitra kami
        </span>
        
        {/* Garis kanan */}
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
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
            background: "var(--overlay-gold)",
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
