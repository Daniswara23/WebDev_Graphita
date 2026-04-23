/*
  StatsBar.tsx — BAR STATISTIK
  
  Menampilkan angka-angka pencapaian perusahaan.
  Server Component (tidak butuh interaktivitas).
  
  Pola yang dipakai: DATA ARRAY + MAP
  Daripada menulis JSX berulang untuk tiap stat,
  kita simpan datanya dalam array lalu render dengan .map()
*/

// Tipe data untuk setiap item statistik
// TypeScript: mendefinisikan "bentuk" data agar tidak salah isi
type StatItem = {
  number: string;
  label: string;
};

// Data statistik disimpan di luar komponen
// Keuntungan: mudah diupdate tanpa ubah struktur komponen
const stats: StatItem[] = [
  { number: "50+", label: "Organisasi Dipercaya" },
  { number: "12", label: "Tahun Pengalaman" },
  { number: "98%", label: "Tingkat Kepuasan" },
  { number: "$10M+", label: "Dampak Bisnis Tersampaikan" },
];

export default function StatsBar() {
  return (
    <div
      style={{
        background: "rgba(201,147,58,0.08)",
        borderTop: "1px solid rgba(201,147,58,0.2)",
        borderBottom: "1px solid rgba(201,147,58,0.1)",
        padding: "28px 56px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // 4 kolom rata
        gap: "24px",
      }}
    >
      {/*
        stats.map((item, index) => ...)
        = untuk setiap item di array stats, render satu blok JSX.
        key={index} wajib ada di React untuk performa rendering.
      */}
      {stats.map((item, index) => (
        <div
          key={index}
          style={{
            textAlign: "center",
            padding: "8px 0",
            // Garis pemisah antar stat, kecuali yang terakhir
            borderRight:
              index < stats.length - 1
                ? "1px solid rgba(255,255,255,0.08)"
                : "none",
          }}
        >
          {/* Angka besar */}
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "38px",
              fontWeight: 700,
              color: "var(--gold-light)",
              lineHeight: 1,
              marginBottom: "6px",
            }}
          >
            {item.number}
          </div>
          {/* Label kecil */}
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
