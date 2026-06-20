/*
  dokumentasi/page.tsx — Halaman publik Dokumentasi Kegiatan (server component).
  Menampilkan grid card event dengan carousel foto.
*/

import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GalleryList, GallerySkeleton, Gallery } from "./dokumentasi-client";

async function getGalleries(): Promise<Gallery[]> {
  const supabase = await createClient();

  // Get published galleries
  const { data: galleries } = await supabase
    .from("photo_galleries")
    .select("id, title, description, location, event_date")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (!galleries || galleries.length === 0) return [];

  // Get images for all galleries
  const { data: images } = await supabase
    .from("gallery_images")
    .select("id, gallery_id, image_url, caption")
    .in(
      "gallery_id",
      galleries.map((g) => g.id)
    )
    .order("sort_order", { ascending: true });

  // Map images to galleries
  const imageMap: Record<string, Gallery["images"]> = {};
  if (images) {
    images.forEach((img) => {
      if (!imageMap[img.gallery_id]) {
        imageMap[img.gallery_id] = [];
      }
      imageMap[img.gallery_id].push({
        id: img.id,
        image_url: img.image_url,
        caption: img.caption,
      });
    });
  }

  return galleries.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    location: g.location,
    event_date: g.event_date,
    images: imageMap[g.id] || [],
  }));
}

async function GallerySection() {
  const galleries = await getGalleries();
  return <GalleryList galleries={galleries} />;
}

export default function DokumentasiPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
        {/* Hero Section */}
        <div
          style={{
            padding: "120px 56px 80px",
            textAlign: "center",
            background: "var(--bg-primary)",
          }}
        >
          <div
            className="animate-on-scroll"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "var(--gold)",
              }}
            />
            <span
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              Dokumentasi Kegiatan
            </span>
          </div>
          <h1
            className="animate-on-scroll animate-delay-100"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-5xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Jejak Langkah dan Cerita dalam Bingkai
          </h1>
          <p
            className="animate-on-scroll animate-delay-200"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              fontSize: "var(--text-lg)",
            }}
          >
            Dokumentasi dari setiap kegiatan dan event yang telah kami lakukan.
            Setiap foto adalah cerita tentang kolaborasi, pembelajaran, dan dampak nyata.
          </p>
        </div>

        {/* Gallery Grid Section */}
        <section style={{ padding: "0 56px 100px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Suspense fallback={<GallerySkeleton />}>
              <GallerySection />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <div
          style={{
            padding: "80px 56px",
            textAlign: "center",
            background: "var(--section-bg-alt)",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Ingin Berkolaborasi?
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              marginBottom: "32px",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            Mari diskusikan peluang kolaborasi kegiatan bersama tim kami.
          </p>
          <a
            href="/contact"
            className="hover-lift"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
          >
            Hubungi Kami
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}