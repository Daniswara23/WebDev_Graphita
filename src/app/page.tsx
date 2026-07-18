import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AboutOverviewContainer from "@/components/AboutOverviewContainer";
import HomeClient from "./HomeClient";
import { lazy, Suspense } from "react";

// Dynamic imports untuk komponen non-kritis (below-the-fold)
const StatsBar = lazy(() => import("@/components/StatsBar"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const Services = lazy(() => import("@/components/Services"));
const StorePreview = lazy(() => import("@/components/StorePreview"));
const Etos3T = lazy(() => import("@/components/Etos3T"));
const EcosystemHub = lazy(() => import("@/components/EcosystemHub"));
const CtaBand = lazy(() => import("@/components/CtaBand"));

// Skeleton loading components
function SectionSkeleton() {
  return (
    <div className="animate-pulse" style={{ padding: "80px 56px", background: "var(--section-bg-alt)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ height: "40px", width: "300px", background: "var(--card-bg)", borderRadius: "var(--radius-lg)", margin: "0 auto 64px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: "200px", background: "var(--card-bg)", borderRadius: "var(--radius-lg)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
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

        {/* 2b. Testimonials */}
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>

        {/* 3. About - Video carousel, server-side fetch */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutOverviewContainer />
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

      <HomeClient />
    </>
  );
}