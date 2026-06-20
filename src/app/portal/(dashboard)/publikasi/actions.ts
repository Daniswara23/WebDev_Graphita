/*
  portal/(dashboard)/publikasi/actions.ts — Server Actions CRUD articles + upload PDF / external link.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify, validateExternalUrl } from "@/lib/supabase/formatHelpers";
import { uploadPdf, deleteFile } from "@/lib/supabase/fileUpload";

/* ───── Helpers ───── */

function validateSourceType(sourceType: string): asserts sourceType is "pdf" | "link" {
  if (!sourceType || (sourceType !== "pdf" && sourceType !== "link")) {
    throw new Error("Pilih format artikel: PDF atau Link External.");
  }
}

/* ───── Actions ───── */

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const category = String(formData.get("category") ?? "");
  const publishedAt = String(formData.get("published_at") ?? "");
  const sourceType = String(formData.get("source_type") ?? "");
  const file = formData.get("file") as File | null;
  const externalUrl = String(formData.get("external_url") ?? "").trim();

  if (!title || !excerpt || !category || !publishedAt) {
    throw new Error("Title, excerpt, category, dan tanggal publikasi wajib diisi.");
  }

  validateSourceType(sourceType);

  let fileUrl: string | null = null;
  let externalUrlValue: string | null = null;

  if (sourceType === "pdf") {
      if (!file) throw new Error("File PDF wajib diupload.");
      fileUrl = await uploadPdf(file);
  } else {
    validateExternalUrl(externalUrl);
    externalUrlValue = externalUrl;
  }

  const slug = slugify(title);

  const { error } = await supabase.from("articles").insert({
    title,
    slug,
    excerpt,
    content: content || null,
    category,
    file_url: fileUrl,
    external_url: externalUrlValue,
    published_at: publishedAt,
    is_published: true,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/publikasi");
  redirect("/portal/publikasi");
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const category = String(formData.get("category") ?? "");
  const publishedAt = String(formData.get("published_at") ?? "");
  const sourceType = String(formData.get("source_type") ?? "");
  const existingFileUrl = String(formData.get("existing_file_url") ?? "");
  const existingExternalUrl = String(formData.get("existing_external_url") ?? "");
  const file = formData.get("file") as File | null;
  const externalUrl = String(formData.get("external_url") ?? "").trim();

  if (!title || !excerpt || !category || !publishedAt) {
    throw new Error("Title, excerpt, category, dan tanggal publikasi wajib diisi.");
  }

  validateSourceType(sourceType);

  let fileUrl: string | null = null;
  let externalUrlValue: string | null = null;

  if (sourceType === "pdf") {
    if (file && file.size > 0) {
      fileUrl = await uploadPdf(file);
    } else {
      fileUrl = existingFileUrl || null;
    }
  } else {
    if (externalUrl) {
      validateExternalUrl(externalUrl);
      externalUrlValue = externalUrl;
    } else {
      externalUrlValue = existingExternalUrl || null;
    }
  }

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      excerpt,
      content: content || null,
      category,
      file_url: fileUrl,
      external_url: externalUrlValue,
      published_at: publishedAt,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/publikasi");
  redirect("/portal/publikasi");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();

  // Get file_url to delete from storage
  const { data: article } = await supabase
    .from("articles")
    .select("file_url")
    .eq("id", id)
    .single();

  if (article?.file_url) {
    await deleteFile("pdf", article.file_url);
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/publikasi");
}