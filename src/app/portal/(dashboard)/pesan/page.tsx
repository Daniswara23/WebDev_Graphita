/*
  portal/pesan/page.tsx — Daftar pesan dari form kontak (read-only).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function PesanPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
        Pesan Masuk
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "32px" }}>
        Pesan yang dikirim pengunjung melalui form kontak.
      </p>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Email</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Perusahaan</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Jenis Permintaan</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Minat Layanan</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!messages || messages.length === 0) ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                  Belum ada pesan masuk.
                </td>
              </tr>
            ) : (
              messages.map((msg) => {
                const requestTypeMap: Record<string, string> = {
                  konsultasi: "Konsultasi Awal",
                  kolaborasi: "Kolaborasi Proyek",
                  umum: "Pesan Umum",
                };
                const serviceInterestMap: Record<string, string> = {
                  pemetaan: "Pemetaan Terpadu",
                  pendampingan: "Pendampingan",
                  solusi_tekno: "Solusi Tekno-Sosial",
                  publikasi: "Publikasi & Penelitian",
                  lainnya: "Lainnya",
                };
                return (
                  <tr key={msg.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{msg.name}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-primary)" }}>
                      {msg.email}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", color: "var(--text-secondary)" }}>
                      {msg.company || <span style={{ color: "var(--text-secondary)" }}>—</span>}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {requestTypeMap[msg.request_type] || msg.request_type || "—"}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)" }}>
                      {serviceInterestMap[msg.service_interest] || msg.service_interest || <span style={{ color: "var(--text-secondary)" }}>—</span>}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)" }}>
                      {formatDate(msg.created_at)}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <Link href={`/portal/pesan/${msg.id}`} style={{
                        padding: "6px 14px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}>
                        Detail
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}