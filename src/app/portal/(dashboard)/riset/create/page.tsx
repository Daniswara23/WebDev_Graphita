/*
  portal/riset/create/page.tsx — Form tambah laporan riset baru.
*/

import Link from "next/link";
import { CreateRisetForm } from "@/components/CreateRisetForm";

export default function CreateRisetPage() {
  return (
    <div>
      <Link href="/portal/riset" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Laporan Riset Baru
      </h1>

      <CreateRisetForm />
    </div>
  );
}
