"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Trusted from "@/components/Trusted";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Etos3T from "@/components/Etos3T";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import TestimonialsModal from "@/components/TestimonialsModal";
import { app } from "../lib/firebase";

export default function HomePage() {
  const [showTestimonials, setShowTestimonials] = useState(false);
  if (app) {
    console.log("🔥 Firebase BERHASIL terhubung! App Name:", app.name);
  } else {
    console.log("❌ Firebase GAGAL terhubung.");
  }

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hook */}
        <Hero />

        {/* 2. Trust */}
        <StatsBar />
        <Trusted onViewTestimonials={() => setShowTestimonials(true)} />

        {/* 3. Proof */}
        <CaseStudies />

        {/* 4. Value */}
        <Services />

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