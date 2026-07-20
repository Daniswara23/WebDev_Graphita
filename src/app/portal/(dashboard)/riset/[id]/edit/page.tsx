/*
  portal/riset/[id]/edit/page.tsx — Form edit laporan riset + upload PDF.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditRisetForm } from "@/components/EditRisetForm";

export default async function EditRisetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: report } = await supabase.from("research_reports").select("*").eq("id", id).single();

  if (!report) notFound();

  return (
    <div>
      <Link href="/portal/riset" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Edit Laporan Riset
      </h1>

      <EditRisetForm report={report} />
    </div>
  );
}
