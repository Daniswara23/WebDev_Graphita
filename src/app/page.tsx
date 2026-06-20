"use client";

import { useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import TestimonialTrigger from "@/components/TestimonialTrigger";

// Dynamic imports untuk komponen non-kritis (below-the-fold)
const StatsBar = lazy(() => import("@/components/StatsBar"));
const AboutOverview = lazy(() => import("@/components/AboutOverview"));
const Services = lazy(() => import("@/components/Services"));
const StorePreview = lazy(() => import("@/components/StorePreview"));
const Etos3T = lazy(() => import("@/components/Etos3T"));
const EcosystemHub = lazy(() => import("@/components/EcosystemHub"));
const CtaBand = lazy(() => import("@/components/CtaBand"));
const TestimonialsModal = lazy(() => import("@/components/TestimonialsModal"));

// Skeleton loading components
function SectionSkeleton() {
  return (
    <div className="animate-pulse" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ height: "40px", width: "300px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto 64px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: "200px", background: "var(--card-bg)", borderRadius: "12px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="animate-pulse" style={{ textAlign: "center" }}>
        <div style={{ height: "80px", width: "600px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto 24px" }} />
        <div style={{ height: "24px", width: "400px", background: "var(--card-bg)", borderRadius: "8px", margin: "0 auto" }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hook - Critical, load immediately */}
        <Hero />

        {/* 2. Trust - Load after initial paint */}
        <Suspense fallback={<SectionSkeleton />}>
          <StatsBar />
        </Suspense>

        <TestimonialTrigger onViewTestimonials={() => setShowTestimonials(true)} />

        <Suspense fallback={<SectionSkeleton />}>
          <AboutOverview />
        </Suspense>

        {/* 4. Value */}
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <StorePreview />
        </Suspense>

        {/* 5. Etos */}
        <Suspense fallback={<SectionSkeleton />}>
          <Etos3T />
        </Suspense>

        {/* 5b. Ecosystem & Kolaborasi */}
        <Suspense fallback={<SectionSkeleton />}>
          <EcosystemHub />
        </Suspense>

        {/* 6. CTA */}
        <Suspense fallback={<SectionSkeleton />}>
          <CtaBand />
        </Suspense>

        <Footer />
      </main>

      {showTestimonials && (
        <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
          <TestimonialsModal onClose={() => setShowTestimonials(false)} />
        </Suspense>
      )}
    </>
  );
}
