/*
  Trusted.tsx — SECTION LOGO KLIEN (fetch dari Supabase)
*/

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ClientRow } from "@/types/database";

type Client = { name: string; initials: string | null; logo_url: string | null };

const FALLBACK_CLIENTS: Client[] = [
  { name: "Oil Mine", initials: "OM", logo_url: null },
  { name: "Greentop", initials: "GR", logo_url: null },
  { name: "Astral", initials: "AS", logo_url: null },
  { name: "Corp Nusantara", initials: "CN", logo_url: null },
  { name: "Petronas", initials: "PT", logo_url: null },
  { name: "Evergreen", initials: "EV", logo_url: null },
];

export default function Trusted({ onViewTestimonials }: { onViewTestimonials: () => void }) {
  const [clients, setClients] = useState<Client[]>(FALLBACK_CLIENTS);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("clients")
      .select("name, initials, logo_url, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const rows = data as Pick<ClientRow, "name" | "initials" | "logo_url" | "sort_order">[];
          setClients(
            rows.map((c) => ({
              name: c.name,
              initials: c.initials,
              logo_url: c.logo_url,
            }))
          );
        }
      });
  }, []);

  return (
    <div
      style={{
        padding: "48px 56px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "32px",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          Kisah nyata dari mitra kami
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
          maxWidth: "1000px",
          margin: "0 auto 32px",
        }}
      >
        {clients.map((client) => (
          <div
            key={client.name}
            title={client.name}
            style={{
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "6px",
            }}
          >
            {client.logo_url ? (
              <img
                src={client.logo_url}
                alt={client.name}
                style={{ maxHeight: "40px", maxWidth: "80%", filter: "grayscale(1) opacity(0.7)" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "18px",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                }}
              >
                {client.initials ?? client.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={onViewTestimonials}
          style={{
            padding: "6px 16px",
            background: "rgba(201,147,58,0.1)",
            border: "1px solid rgba(201,147,58,0.3)",
            color: "var(--gold-light)",
            fontSize: "11px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease",
          }}
        >
          Lihat testimoni mitra
        </button>
      </div>
    </div>
  );
}
