"use client";

import { useState } from "react";
import TestimonialsModal from "@/components/TestimonialsModal";

export default function HomeClient() {
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <>
      <TestimonialTrigger onClick={() => setShowTestimonials(true)} />
      <TestimonialsModal onClose={() => setShowTestimonials(false)} />
    </>
  );
}

function TestimonialTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999,
        background: "var(--gold)",
        color: "var(--navy-dark)",
        border: "none",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        fontSize: "24px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
      aria-label="Buka testimoni"
    >
      💬
    </button>
  );
}