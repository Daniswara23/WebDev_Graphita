"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import AboutOverview from "@/components/AboutOverview";
import StorePreview from "@/components/StorePreview";
import TestimonialTrigger from "@/components/TestimonialTrigger";
import Etos3T from "@/components/Etos3T";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import TestimonialsModal from "@/components/TestimonialsModal";

export default function HomePage() {
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hook */}
        <Hero />

        {/* 2. Trust */}
        <StatsBar />
        <TestimonialTrigger onViewTestimonials={() => setShowTestimonials(true)} />

        <AboutOverview />

        {/* 4. Value */}
        <Services />
        <StorePreview />

        {/* 5. Etos */}
        <Etos3T />

        {/* 6. CTA */}
        <CtaBand />
        <Footer />
      </main>

      {showTestimonials && (
        <TestimonialsModal onClose={() => setShowTestimonials(false)} />
      )}
    </>
  );
}