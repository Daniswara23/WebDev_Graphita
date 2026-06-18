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
      {/* Sun icon (kiri) */}
      <span
        style={{
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "12px",
          lineHeight: 1,
          zIndex: 2,
          transition: "opacity 0.3s ease",
          opacity: isDarkMode ? 0.5 : 1,
          filter: isDarkMode ? "grayscale(0.6)" : "none",
          pointerEvents: "none",
        }}
      >
        ☀️
      </span>

      {/* Moon icon (kanan) */}
      <span
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "12px",
          lineHeight: 1,
          zIndex: 2,
          transition: "opacity 0.3s ease",
          opacity: isDarkMode ? 1 : 0.5,
          filter: isDarkMode ? "none" : "grayscale(0.6)",
          pointerEvents: "none",
        }}
      >
        🌙
      </span>

      {/* Slider bullet */}
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: isDarkMode ? "2px" : "calc(100% - 22px)",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: isDarkMode ? "var(--gold-light)" : "var(--gold)",
          boxShadow: isDarkMode
            ? "0 1px 4px rgba(0,0,0,0.3)"
            : "0 1px 4px rgba(201,147,58,0.4)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </button>
  );
}