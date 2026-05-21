/*
  /mitra/dashboard — Dashboard mitra (Server Component).
  Guard akses ditangani di src/proxy.ts.
*/

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import type { MitraProfileRow, ProjectRow } from "@/types/database";

const STATUS_COLOR: Record<string, string> = {
  active: "#52b788",
  on_hold: "#fbbf24",
  completed: "#94a3b8",
  cancelled: "#ef4444",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Aktif",
  on_hold: "Ditunda",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/mitra/login");

  const [profileRes, projectsRes] = await Promise.all([
    supabase.from("mitra_profiles").select("full_name, organization, position").eq("id", user.id).maybeSingle(),
    supabase.from("projects").select("id, title, description, service_type, status, start_date, end_date").order("created_at", { ascending: false }),
  ]);

  const profile = profileRes.data as Pick<MitraProfileRow, "full_name" | "organization" | "position"> | null;
  const projects = (projectsRes.data ?? []) as Pick<ProjectRow, "id" | "title" | "description" | "service_type" | "status" | "start_date" | "end_date">[];

  return (
    <main style={{ minHeight: "100vh", background: "radial-gradient(circle at 80% 0%, rgba(201,147,58,0.08), transparent 50%), var(--navy-dark)", padding: "60px 56px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
        <div>
          <Link href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>
            &larr; Beranda
          </Link>
          <h1 style={{ marginTop: "8px", fontSize: "32px", fontWeight: 700, color: "var(--white)" }}>
            Selamat datang, {profile?.full_name ?? user.email}
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
            {profile?.organization ?? "-"}
            {profile?.position ? ` - ${profile.position}` : ""}
          </p>
        </div>
        <LogoutButton />
      </div>

      <section>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--white)", marginBottom: "20px" }}>Proyek Anda</h2>

        {projects.length === 0 ? (
          <div style={{ padding: "40px", background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "12px", textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
            Belum ada proyek tercatat. Hubungi tim Grahita untuk informasi lebih lanjut.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
            {projects.map((p) => {
              const accent = STATUS_COLOR[p.status] ?? "var(--gold)";
              return (
                <Link key={p.id} href={`/mitra/projects/${p.id}`} style={{ textDecoration: "none", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", transition: "all 0.2s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", padding: "3px 10px", background: `${accent}22`, color: accent, borderRadius: "999px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
                      {STATUS_LABEL[p.status] ?? p.status}
                    </span>
                    {p.service_type && (
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{p.service_type}</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--white)", lineHeight: 1.3 }}>{p.title}</h3>
                  {p.description && (
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{p.description}</p>
                  )}
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    {p.start_date ? `Mulai ${p.start_date}` : "Tanggal mulai belum dijadwalkan"}
                    {p.end_date ? ` - Target ${p.end_date}` : ""}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
