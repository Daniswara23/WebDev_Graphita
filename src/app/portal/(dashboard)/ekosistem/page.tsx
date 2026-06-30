/*
  portal/ekosistem/page.tsx — Kelola Ekosistem & Jejaring (Partners + Case Studies).
*/

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePartner } from "./actions";
import { deleteCaseStudy } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";

type Partner = {
  id: string;
  category: string;
  name: string;
  description: string;
  icon_svg: string;
  sort_order: number;
};

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  sector: string;
  summary: string;
  impact: string;
  sort_order: number;
};

export default async function EkosistemAdminPage() {
  const supabase = await createClient();
  const { data: partners } = await supabase
    .from("ecosystem_partners")
    .select("*")
    .order("sort_order");

  const { data: caseStudies } = await supabase
    .from("ecosystem_case_studies")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
          Ekosistem & Jejaring
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Kelola mitra kolaborasi dan studi kasus proyek.
        </p>
      </div>

      {/* ── PARTNERS SECTION ── */}
      <div style={{ marginBottom: "56px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>Partners</h2>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Mitra penyandang dana, teknis, dan pemerintah/LSM.</p>
          </div>
          <Link href="/portal/ekosistem/partners/create" style={{
            padding: "10px 20px",
            background: "var(--gold)",
            color: "var(--navy-dark)",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            + Partner Baru
          </Link>
        </div>

        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kategori</th>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama</th>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Deskripsi</th>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(!partners || partners.length === 0) ? (
                <tr>
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                    Belum ada partner. Klik "+ Partner Baru" untuk menambah.
                  </td>
                </tr>
              ) : (
                (partners as Partner[]).map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>
                      {p.category === "donor" ? "Penyandang Dana" : p.category === "technical" ? "Mitra Teknis" : "Pemerintah & LSM"}
                    </td>
                    <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.description}
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <Link href={`/portal/ekosistem/partners/${p.id}/edit`} style={{
                          padding: "6px 14px",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "6px",
                          color: "var(--text-primary)",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}>
                          Edit
                        </Link>
                        <DeleteButton
                          action={deletePartner.bind(null, p.id)}
                          confirmMessage="Hapus partner ini?"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CASE STUDIES SECTION ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>Case Studies</h2>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Kisah kolaborasi dan dampak nyata di berbagai sektor.</p>
          </div>
          <Link href="/portal/ekosistem/case-studies/create" style={{
            padding: "10px 20px",
            background: "var(--gold)",
            color: "var(--navy-dark)",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            + Case Study Baru
          </Link>
        </div>

        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Sektor</th>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Judul</th>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Klien</th>
                <th style={{ padding: "14px 18px", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(!caseStudies || caseStudies.length === 0) ? (
                <tr>
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                    Belum ada case study. Klik "+ Case Study Baru" untuk menambah.
                  </td>
                </tr>
              ) : (
                (caseStudies as CaseStudy[]).map((cs) => (
                  <tr key={cs.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>{cs.sector}</td>
                    <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{cs.title}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>{cs.client}</td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <Link href={`/portal/ekosistem/case-studies/${cs.id}/edit`} style={{
                          padding: "6px 14px",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "6px",
                          color: "var(--text-primary)",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}>
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteCaseStudy.bind(null, cs.id)}
                          confirmMessage="Hapus case study ini?"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}