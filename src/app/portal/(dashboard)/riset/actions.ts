/*
  riset/actions.ts — Server Actions CRUD research_reports + upload PDF.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
    if (file.type !== "application/pdf") {
      throw new Error("Hanya file PDF yang diizinkan.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Ukuran file maksimal 10 MB.");
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `research-reports/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("research-reports")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) throw new Error("Gagal upload file: " + uploadError.message);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("research-reports")
      .getPublicUrl(filePath);

    fileUrl = urlData.publicUrl;
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
    if (file.type !== "application/pdf") {
      throw new Error("Hanya file PDF yang diizinkan.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Ukuran file maksimal 10 MB.");
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `research-reports/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("research-reports")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) throw new Error("Gagal upload file: " + uploadError.message);

    const { data: urlData } = supabase.storage
      .from("research-reports")
      .getPublicUrl(filePath);

    fileUrl = urlData.publicUrl;
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
    // Extract path from URL
    const urlParts = report.file_url.split("/research-reports/");
    if (urlParts.length > 1) {
      const filePath = `research-reports/${urlParts[1]}`;
      await supabase.storage.from("research-reports").remove([filePath]);
    }
  }

  const { error } = await supabase.from("research_reports").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/riset");
}