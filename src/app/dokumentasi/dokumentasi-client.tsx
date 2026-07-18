/*
  dokumentasi-client.tsx — Client component untuk halaman dokumentasi publik.
  Menampilkan kartu event dengan carousel foto.
*/

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
};

export type Gallery = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string | null;
  images: GalleryImage[];
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <div
      className="grid-item hover-lift"
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--card-bg)",
        border: "1px solid rgba(201,147,58,0.2)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
      }}
    >
      {/* Carousel Area */}
      {gallery.images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={gallery.images.length > 1}
          style={{
            width: "100%",
            height: "400px",
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "var(--gold)",
            "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.5)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
          } as React.CSSProperties}
        >
          {gallery.images.map((img) => (
            <SwiperSlide key={img.id}>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(201,147,58,0.15) 0%, rgba(201,147,58,0.05) 100%)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={img.image_url}
                  alt={img.caption || gallery.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              {img.caption && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "12px 16px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    color: "#fff",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {img.caption}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div
          style={{
            width: "100%",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--card-bg)",
            color: "var(--text-secondary)",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          Belum ada foto
        </div>
      )}

      {/* Content Area */}
      <div style={{ padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {gallery.title}
          </h2>
        </div>

        {/* Meta info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
           {gallery.event_date && (
             <span
               style={{
                 fontSize: "12px",
                 color: "var(--gold-light)",
                 display: "flex",
                 alignItems: "center",
                 gap: "6px",
               }}
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M8 2v4"/>
                 <path d="M16 2v4"/>
                 <rect width="18" height="18" x="3" y="4" rx="2"/>
                 <path d="M3 10h18"/>
                 <path d="M8 14h.01"/>
                 <path d="M12 14h.01"/>
                 <path d="M16 14h.01"/>
                 <path d="M8 18h.01"/>
                 <path d="M12 18h.01"/>
                 <path d="M16 18h.01"/>
               </svg>
               {formatDate(gallery.event_date)}
             </span>
           )}
          {gallery.location && (
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {gallery.location}
            </span>
          )}
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
            {gallery.images.length} foto
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(201,147,58,0.2)",
            marginBottom: "16px",
          }}
        />

        {/* Description */}
        {gallery.description && (
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "var(--text-base)",
              margin: 0,
            }}
          >
            {gallery.description}
          </p>
        )}
      </div>
    </div>
  );
}

function GalleryCardSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "400px",
          background: "var(--border-subtle)",
        }}
      />
      <div style={{ padding: "32px" }}>
        <div
          style={{
            height: "28px",
            width: "70%",
            background: "var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            height: "16px",
            width: "50%",
            background: "var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            height: "1px",
            background: "var(--border-subtle)",
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            height: "14px",
            width: "100%",
            background: "var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            height: "14px",
            width: "80%",
            background: "var(--border-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        />
      </div>
    </div>
  );
}

export function GalleryList({ galleries }: { galleries: Gallery[] }) {
  if (galleries.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "var(--text-secondary)",
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "8px" }}>
          Belum ada dokumentasi kegiatan.
        </p>
        <p style={{ fontSize: "14px" }}>
          Dokumentasi akan muncul setelah admin menambahkan event dan foto.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
        gap: "36px",
      }}
    >
      {galleries.map((gallery) => (
        <GalleryCard key={gallery.id} gallery={gallery} />
      ))}
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
        gap: "36px",
      }}
    >
      <GalleryCardSkeleton />
      <GalleryCardSkeleton />
    </div>
  );
}