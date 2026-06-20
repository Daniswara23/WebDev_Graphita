/*
  riset/actions.ts — Server Actions CRUD research_reports + upload PDF.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadResearchPdf, deleteFile } from "@/lib/supabase/fileUpload";

export async function createReport(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const year = parseInt(String(formData.get("year") ?? "0"), 10);
  const category = String(formData.get("category") ?? "");
  const file = formData.get("file") as File | null;

  if (!title || !year || !category) {
    throw new Error("Title, year, dan kategori wajib diisi.");
  }

  let fileUrl: string | null = null;

  // Upload PDF to Supabase Storage if file provided
  if (file && file.size > 0) {
    fileUrl = await uploadResearchPdf(file);
  }

  // subtitle: kolom NOT NULL di DB — simpan string kosong jika tidak diisi
  const { error } = await supabase.from("research_reports").insert({
    title,
    subtitle,
    year,
    category,
    file_url: fileUrl,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/riset");
  redirect("/portal/riset");
}

export async function updateReport(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const year = parseInt(String(formData.get("year") ?? "0"), 10);
  const category = String(formData.get("category") ?? "");
  const existingUrl = String(formData.get("existing_url") ?? "");
  const file = formData.get("file") as File | null;

  if (!title || !year || !category) {
    throw new Error("Title, year, dan kategori wajib diisi.");
  }

  let fileUrl = existingUrl || null;

  // Upload new PDF if provided
  if (file && file.size > 0) {
    fileUrl = await uploadResearchPdf(file);
  }

  // subtitle: kolom NOT NULL di DB — simpan string kosong jika tidak diisi
  const { error } = await supabase
    .from("research_reports")
    .update({
      title,
      subtitle,
      year,
      category,
      file_url: fileUrl,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/riset");
  redirect("/portal/riset");
}

export async function deleteReport(id: string) {
  const supabase = await createClient();

  // Get file_url to delete from storage
  const { data: report } = await supabase
    .from("research_reports")
    .select("file_url")
    .eq("id", id)
    .single();

  if (report?.file_url) {
    await deleteFile("research", report.file_url);
  }

  const { error } = await supabase.from("research_reports").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/riset");
}