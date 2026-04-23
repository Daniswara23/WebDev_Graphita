/*
  page.tsx — HOMEPAGE
  
  Ini adalah halaman utama (localhost:3000).
  Di Next.js App Router:
  - Setiap folder di dalam /app bisa punya page.tsx sendiri
  - /app/page.tsx          → localhost:3000
  - /app/about/page.tsx    → localhost:3000/about
  - /app/layanan/page.tsx  → localhost:3000/layanan
  
  File ini bertugas MERAKIT semua komponen menjadi satu halaman utuh.
  Analoginya: page.tsx = LEGO base, komponen-komponen = kepingan LEGO.
  
  Tidak butuh "use client" karena semua komponen di bawah sudah 
  mengatur dirinya sendiri (Navbar sudah "use client" sendiri).
*/

// Import komponen dari folder components
// "@/" adalah alias untuk folder src/ (dikonfigurasi di tsconfig.json)
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Trusted from "@/components/Trusted";
import Services from "@/components/Services";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  return (
    /*
      <> </> disebut "Fragment" = pembungkus tanpa elemen HTML.
      Dipakai karena React mengharuskan ada satu elemen pembungkus,
      tapi kita tidak mau div yang tidak perlu.
    */
    <>
      <Navbar />
      <main>
        {/*
          Urutan komponen di sini = urutan tampil di halaman.
          Gampang untuk reorder, tambah, atau hapus section.
        */}
        <Hero />
        <StatsBar />
        <Trusted />
        <Services />
        <CtaBand />
      </main>
    </>
  );
}
