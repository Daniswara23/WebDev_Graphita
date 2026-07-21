/*
  portal/ekosistem/page.tsx — Kelola Ekosistem & Jejaring (Partners + Case Studies) dengan sorting interaktif.
*/

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { deletePartner } from "./actions";
import { deleteCaseStudy } from "./actions";
import DeleteButton from "@/app/portal/(dashboard)/DeleteButton";
import { useSort } from "@/hooks/useSort";

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

const categoryLabel = (cat: string) => {
  const map: Record<string, string> = {
    donor: "Penyandang Dana",
    technical: "Mitra Teknis",
    government: "Pemerintah & LSM",
    corporate: "Korporasi",
    academic: "Lembaga Pendidikan",
    ngo: "NGO & Komunitas",
  };
  return map[cat] || cat;
};

export default function EkosistemAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [partnersRes, casesRes] = await Promise.all([
        supabase.from("ecosystem_partners").select("*").order("sort_order"),
        supabase.from("ecosystem_case_studies").select("*").order("sort_order"),
      ]);
      if (partnersRes.data) setPartners(partnersRes.data as Partner[]);
      if (casesRes.data) setCaseStudies(casesRes.data as CaseStudy[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const { sortedData: sortedPartners, toggleSort: togglePartnerSort, getSortIndicator: getPartnerIndicator } = useSort(partners, "sort_order");
  const { sortedData: sortedCaseStudies, toggleSort: toggleCaseSort, getSortIndicator: getCaseIndicator } = useSort(caseStudies, "sort_order");

  const thStyle: React.CSSProperties = {
    padding: "14px 18px",
    fontSize: "11px",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>Memuat...</div>;
  }

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
            borderRadius: "var(--radius-lg)",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            + Partner Baru
          </Link>
        </div>

        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
                <th style={thStyle} onClick={() => togglePartnerSort("sort_order")}>
                  Urutan{getPartnerIndicator("sort_order")}
                </th>
                <th style={thStyle} onClick={() => togglePartnerSort("category")}>
                  Kategori{getPartnerIndicator("category")}
                </th>
                <th style={thStyle} onClick={() => togglePartnerSort("name")}>
                  Nama{getPartnerIndicator("name")}
                </th>
                <th style={{ ...thStyle, cursor: "default" }}>Deskripsi</th>
                <th style={{ ...thStyle, textAlign: "right", cursor: "default" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedPartners.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                    Belum ada partner. Klik "+ Partner Baru" untuk menambah.
                  </td>
                </tr>
              ) : (
                sortedPartners.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)", textAlign: "center" }}>{p.sort_order}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>
                      {categoryLabel(p.category)}
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
                          borderRadius: "var(--radius-md)",
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
            borderRadius: "var(--radius-lg)",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            + Case Study Baru
          </Link>
        </div>

        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--card-border)", textAlign: "left" }}>
                <th style={thStyle} onClick={() => toggleCaseSort("sort_order")}>
                  Urutan{getCaseIndicator("sort_order")}
                </th>
                <th style={thStyle} onClick={() => toggleCaseSort("sector")}>
                  Sektor{getCaseIndicator("sector")}
                </th>
                <th style={thStyle} onClick={() => toggleCaseSort("title")}>
                  Judul{getCaseIndicator("title")}
                </th>
                <th style={thStyle} onClick={() => toggleCaseSort("client")}>
                  Klien{getCaseIndicator("client")}
                </th>
                <th style={{ ...thStyle, textAlign: "right", cursor: "default" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedCaseStudies.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>
                    Belum ada case study. Klik "+ Case Study Baru" untuk menambah.
                  </td>
                </tr>
              ) : (
                sortedCaseStudies.map((cs) => (
                  <tr key={cs.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)", textAlign: "center" }}>{cs.sort_order}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>{cs.sector}</td>
                    <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{cs.title}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "var(--text-secondary)" }}>{cs.client}</td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <Link href={`/portal/ekosistem/case-studies/${cs.id}/edit`} style={{
                          padding: "6px 14px",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "var(--radius-md)",
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