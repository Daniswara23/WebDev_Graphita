/*
  portal/pesan/[id]/page.tsx — Detail pesan dari form kontak.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function PesanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: msg } = await supabase.from("contact_submissions").select("*").eq("id", id).single();

  if (!msg) notFound();

  return (
    <div>
      <Link href="/portal/pesan" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali ke daftar pesan
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Detail Pesan
      </h1>

      <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "12px", padding: "16px 20px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama</span>
          <span style={{ fontSize: "15px", color: "var(--text-primary)", fontWeight: 600 }}>{msg.name}</span>

          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Email</span>
          <span style={{ fontSize: "14px", color: "var(--gold-light)" }}>{msg.email}</span>

          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Perusahaan</span>
          <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{msg.company || <span style={{ color: "var(--text-secondary)" }}>—</span>}</span>

          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal</span>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{formatDate(msg.created_at)}</span>
        </div>

        <div style={{ padding: "20px 24px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
            Isi Pesan
          </h3>
          <p style={{ fontSize: "15px", color: "var(--text-primary)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {msg.message}
          </p>
        </div>
      </div>
    </div>
  );
}