"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      style={{
        position: "relative",
        width: "52px",
        height: "26px",
        borderRadius: "13px",
        border: "1px solid rgba(201,147,58,0.3)",
        background: isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(201,147,58,0.12)",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
      }}
    >
      {/* Sun icon (kiri) — SVG matahari */}
      <span
        style={{
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "14px",
          height: "14px",
          zIndex: 2,
          transition: "opacity 0.3s ease",
          opacity: isDarkMode ? 0.4 : 1,
          pointerEvents: "none",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#52b788"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Moon icon (kanan) — SVG bulan */}
      <span
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "14px",
          height: "14px",
          zIndex: 2,
          transition: "opacity 0.3s ease",
          opacity: isDarkMode ? 1 : 0.4,
          pointerEvents: "none",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#52b788"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Slider bullet */}
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: isDarkMode ? "calc(100% - 22px)" : "2px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "var(--green)",
          boxShadow: isDarkMode
            ? "0 1px 4px rgba(0,0,0,0.3)"
            : "0 1px 4px rgba(45,106,79,0.4)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </button>
  );
}