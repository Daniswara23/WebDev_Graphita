/*
  /mitra/projects/[id] — Detail proyek mitra.
  RLS memastikan user hanya melihat proyek miliknya.
*/

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "../../dashboard/LogoutButton";
import type { ProjectRow, ProjectMilestoneRow, ProjectDocumentRow } from "@/types/database";

const STATUS_COLOR_PROJECT: Record<string, string> = {
  active: "#52b788",
  on_hold: "#fbbf24",
  completed: "#94a3b8",
  cancelled: "#ef4444",
};

const STATUS_COLOR_MILESTONE: Record<string, string> = {
  pending: "rgba(255,255,255,0.4)",
  in_progress: "#fbbf24",
  done: "#52b788",
};

const STATUS_LABEL_MILESTONE: Record<string, string> = {
  pending: "Belum Mulai",
  in_progress: "Berjalan",
  done: "Selesai",
};

function formatSize(kb: number | null): string {
  if (!kb) return "-";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/mitra/login");

  const [projectRes, milestonesRes, documentsRes] = await Promise.all([
    supabase.from("projects").select("id, title, description, service_type, status, start_date, end_date").eq("id", id).maybeSingle(),
    supabase.from("project_milestones").select("id, title, description, status, due_date, completed_at, sort_order").eq("project_id", id).order("sort_order", { ascending: true }),
    supabase.from("project_documents").select("id, title, file_url, file_type, file_size_kb, uploaded_by, created_at").eq("project_id", id).eq("is_visible", true).order("created_at", { ascending: false }),
  ]);

  const project = projectRes.data as Pick<ProjectRow, "id" | "title" | "description" | "service_type" | "status" | "start_date" | "end_date"> | null;
  if (!project) notFound();

  const milestones = (milestonesRes.data ?? []) as Pick<ProjectMilestoneRow, "id" | "title" | "description" | "status" | "due_date" | "completed_at" | "sort_order">[];
  const documents = (documentsRes.data ?? []) as Pick<ProjectDocumentRow, "id" | "title" | "file_url" | "file_type" | "file_size_kb" | "uploaded_by" | "created_at">[];

  const projectAccent = STATUS_COLOR_PROJECT[project.status] ?? "var(--gold)";

  return (
    <main style={{ minHeight: "100vh", background: "radial-gradient(circle at 80% 0%, rgba(201,147,58,0.08), transparent 50%), var(--navy-dark)", padding: "60px 56px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <Link href="/mitra/dashboard" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>
          &larr; Dashboard
        </Link>
        <LogoutButton />
      </div>

      <header style={{ marginBottom: "48px" }}>
        <span style={{ display: "inline-block", fontSize: "11px", padding: "4px 12px", background: `${projectAccent}22`, color: projectAccent, borderRadius: "999px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: "12px" }}>
          {project.status}
        </span>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", lineHeight: 1.2, marginBottom: "12px" }}>{project.title}</h1>
        {project.service_type && (
          <p style={{ fontSize: "13px", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "1.5px" }}>{project.service_type}</p>
        )}
        {project.description && (
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginTop: "16px", maxWidth: "800px" }}>{project.description}</p>
        )}
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>
          {project.start_date ? `Mulai ${project.start_date}` : "Belum mulai"}
          {project.end_date ? ` - Target selesai ${project.end_date}` : ""}
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: "32px", alignItems: "start" }}>
        <section>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--white)", marginBottom: "20px" }}>Progress Kajian</h2>
          {milestones.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Belum ada milestone tercatat.</p>
          ) : (
            <ol style={{ listStyle: "none", padding: 0, margin: 0, position: "relative" }}>
              <div style={{ position: "absolute", left: "9px", top: "10px", bottom: "10px", width: "2px", background: "rgba(255,255,255,0.1)" }} />
              {milestones.map((m) => {
                const accent = STATUS_COLOR_MILESTONE[m.status] ?? "rgba(255,255,255,0.4)";
                return (
                  <li key={m.id} style={{ position: "relative", paddingLeft: "36px", paddingBottom: "24px" }}>
                    <span style={{ position: "absolute", left: "2px", top: "4px", width: "16px", height: "16px", borderRadius: "999px", background: accent, boxShadow: `0 0 0 4px var(--navy-dark)` }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "4px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--white)" }}>{m.title}</h3>
                      <span style={{ fontSize: "11px", color: accent, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
                        {STATUS_LABEL_MILESTONE[m.status] ?? m.status}
                      </span>
                    </div>
                    {m.description && (
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{m.description}</p>
                    )}
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
                      {m.due_date && <span>Jatuh tempo: {m.due_date}</span>}
                      {m.completed_at && <span> - Diselesaikan: {new Date(m.completed_at).toLocaleDateString("id-ID")}</span>}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--white)", marginBottom: "20px" }}>Dokumen</h2>
          {documents.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Belum ada dokumen yang dibagikan.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {documents.map((d) => (
                <li key={d.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)" }}>{d.title}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                        {(d.file_type ?? "FILE").toUpperCase()} - {formatSize(d.file_size_kb)}
                        {d.uploaded_by ? ` - oleh ${d.uploaded_by}` : ""}
                      </div>
                    </div>
                    <a href={d.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
                      Unduh
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
