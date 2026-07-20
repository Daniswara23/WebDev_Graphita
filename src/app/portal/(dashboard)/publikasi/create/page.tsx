/*
  portal/publikasi/create/page.tsx — Form tambah artikel baru.
*/

import Link from "next/link";
import { CreatePublikasiForm } from "@/components/CreatePublikasiForm";

export default function CreateArtikelPage() {
  return (
    <div>
      <Link href="/portal/publikasi" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Artikel Baru
      </h1>

      <CreatePublikasiForm />
    </div>
  );
}