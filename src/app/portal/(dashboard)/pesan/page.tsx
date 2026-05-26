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
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--white)", marginBottom: "4px" }}>
        Pesan Masuk
      </h1>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>
        Pesan yang dikirim pengunjung melalui form kontak.
      </p>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Email</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Perusahaan</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Tanggal</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(!messages || messages.length === 0) ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  Belum ada pesan masuk.
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)" }}>{msg.name}</div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                    {msg.email}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                    {msg.company || <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                    {formatDate(msg.created_at)}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <Link href={`/portal/pesan/${msg.id}`} style={{
                      padding: "6px 14px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "12px",
                    }}>
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}