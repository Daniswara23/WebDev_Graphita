"use client";

import { useState } from "react";
import TestimonialsModal from "./TestimonialsModal";
import TestimonialTrigger from "./TestimonialTrigger";

export default function TestimonialsSection() {
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <>
      <TestimonialTrigger onViewTestimonials={() => setShowTestimonials(true)} />
      {showTestimonials && (
        <TestimonialsModal onClose={() => setShowTestimonials(false)} />
      )}
    </>
  );
}
