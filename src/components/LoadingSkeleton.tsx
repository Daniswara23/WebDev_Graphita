/*
  LoadingSkeleton.tsx — Komponen loading reusable dengan animasi skeleton.
  Digunakan oleh file loading.tsx di setiap route.
*/

export function PageSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 56px",
      }}
    >
      {/* Gold line & badge skeleton */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "1px",
            background: "var(--border-subtle)",
          }}
        />
        <div
          style={{
            width: "80px",
            height: "12px",
            borderRadius: "var(--radius-md)",
            background: "var(--border-subtle)",
          }}
        />
        <div
          style={{
            width: "24px",
            height: "1px",
            background: "var(--border-subtle)",
          }}
        />
      </div>

      {/* Title skeleton */}
      <div
        style={{
          width: "400px",
          height: "40px",
          borderRadius: "var(--radius-md)",
          background: "var(--card-bg)",
          marginBottom: "16px",
        }}
      />
      <div
        style={{
          width: "300px",
          height: "16px",
          borderRadius: "var(--radius-md)",
          background: "var(--card-bg)",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          width: "200px",
          height: "16px",
          borderRadius: "var(--radius-md)",
          background: "var(--card-bg)",
        }}
      />

      {/* Spinning indicator */}
      <div
        style={{
          marginTop: "48px",
          width: "32px",
          height: "32px",
          border: "3px solid var(--border-subtle)",
          borderTopColor: "var(--gold)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}