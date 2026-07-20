/*
  portal/testimoni/[id]/edit/page.tsx — Form edit feedback.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateTestimonial } from "../../actions";
import FormActions from "@/components/FormActions";

export default async function EditTestimoniPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!testimonial) notFound();

  return (
    <div>
      <Link href="/portal/testimoni" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        &larr; Kembali
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "32px" }}>
        Edit Feedback
      </h1>

      <form action={updateTestimonial} style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <input type="hidden" name="id" value={id} />
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Nama Penulis *</span>
          <input type="text" name="author" defaultValue={testimonial.author} required style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Perusahaan</span>
          <input type="text" name="company" defaultValue={testimonial.company ?? ""} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Kutipan *</span>
          <textarea name="quote" defaultValue={testimonial.quote} required rows={4} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px", resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Urutan Tampil</span>
          <input type="number" name="sort_order" defaultValue={testimonial.sort_order} min={0} style={{ padding: "12px 16px", background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)", borderRadius: "var(--radius-md)", fontSize: "15px", width: "120px" }} />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Semakin kecil angka, semakin atas tampilnya.</span>
        </label>

        <FormActions submitLabel="Simpan" submitLoadingLabel="Menyimpan..." cancelHref="/portal/testimoni" />
      </form>
    </div>
  );
}
