import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Trusted from "@/components/Trusted";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hook */}
        <Hero />

        {/* 2. Trust */}
        <StatsBar />
        <Trusted />

        {/* 3. Proof */}
        <CaseStudies />
        <Testimonials />

        {/* 4. Value */}
        <Services />

        {/* 5. CTA */}
        <CtaBand />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}