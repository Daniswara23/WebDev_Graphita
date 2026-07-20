/*
  portal/toko/[id]/edit/page.tsx — Form edit produk.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditTokoForm } from "@/components/EditTokoForm";

export default async function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) notFound();

  return (
    <div>
      <Link href="/portal/toko" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Edit Produk
      </h1>

      <EditTokoForm product={product} />
    </div>
  );
}
