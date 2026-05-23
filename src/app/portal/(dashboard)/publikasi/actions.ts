/*
  publikasi/actions.ts — Server Actions CRUD articles + upload PDF.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const category = String(formData.get("category") ?? "");
  const publishedAt = String(formData.get("published_at") ?? "");
  const file = formData.get("file") as File | null;

  if (!title || !excerpt || !category || !publishedAt) {
    throw new Error("Title, excerpt, category, dan tanggal publikasi wajib diisi.");
  }

  // Upload PDF to Supabase Storage if file provided
  let fileUrl: string | null = null;

  if (file && file.size > 0) {
    if (file.type !== "application/pdf") {
      throw new Error("Hanya file PDF yang diizinkan.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Ukuran file maksimal 10 MB.");
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("articles")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) throw new Error("Gagal upload file: " + uploadError.message);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("articles")
      .getPublicUrl(filePath);

    fileUrl = urlData.publicUrl;
  }

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);

  const { error } = await supabase.from("articles").insert({
    title,
    slug,
    excerpt,
    content: content || null,
    category,
    file_url: fileUrl,
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
  const existingUrl = String(formData.get("existing_url") ?? "");
  const file = formData.get("file") as File | null;

  if (!title || !excerpt || !category || !publishedAt) {
    throw new Error("Title, excerpt, category, dan tanggal publikasi wajib diisi.");
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
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("articles")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) throw new Error("Gagal upload file: " + uploadError.message);

    const { data: urlData } = supabase.storage
      .from("articles")
      .getPublicUrl(filePath);

    fileUrl = urlData.publicUrl;
  }

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      excerpt,
      content: content || null,
      category,
      file_url: fileUrl,
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
    // Extract path from URL
    const urlParts = article.file_url.split("/articles/");
    if (urlParts.length > 1) {
      const filePath = `articles/${urlParts[1]}`;
      await supabase.storage.from("articles").remove([filePath]);
    }
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/publikasi");
}
