/*
  portal/toko/create/page.tsx — Form tambah produk baru.
*/

import Link from "next/link";
import { CreateTokoForm } from "@/components/CreateTokoForm";

export default function CreateProdukPage() {
  return (
    <div>
      <Link href="/portal/toko" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Produk Baru
      </h1>

      <CreateTokoForm />
    </div>
  );
}
