"use client";

import { useState } from "react";
import TestimonialsModal from "@/components/TestimonialsModal";
import TestimonialTrigger from "@/components/TestimonialTrigger";

export default function HomeClient() {
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