/*
  Trusted.tsx — SECTION LOGO KLIEN
  
  Menampilkan logo/nama perusahaan yang sudah jadi klien.
  Pola sama: data array + .map()
*/

// Data klien — ganti sesuai klien asli nanti
const clients = [
  { initials: "OM", name: "Oil Mine" },
  { initials: "GR", name: "Greentop" },
  { initials: "AS", name: "Astral" },
  { initials: "CN", name: "Corp Nusantara" },
  { initials: "PT", name: "Petronas" },
  { initials: "EV", name: "Evergreen" },
];

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
          Dipercaya oleh Pemimpin Industri
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
          Lihat Testimoni
        </button>
      </div>

      {/* Grid logo klien */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "32px",
          flexWrap: "wrap",
        }}
      >
        {clients.map((client) => (
          <div
            key={client.initials}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              opacity: 0.5,
            }}
          >
            {/* Lingkaran inisial sebagai placeholder logo */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--gold-light)",
                letterSpacing: "0.5px",
              }}
            >
              {client.initials}
            </div>
            
            {/* Nama klien */}
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
