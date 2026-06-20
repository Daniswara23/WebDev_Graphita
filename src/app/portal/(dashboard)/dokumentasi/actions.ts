/*
  dokumentasi/actions.ts — Server Actions CRUD photo_galleries + gallery_images
  Foto disimpan sebagai Google Drive link — tidak ada file upload.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function createGallery(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();
  const isPublished = formData.get("is_published") === "on";
  const sortOrderRaw = String(formData.get("sort_order") ?? "0");

  if (!title) throw new Error("Judul event wajib diisi.");

  const slug = slugify(title);
  const sortOrder = Number.parseInt(sortOrderRaw, 10) || 0;

  // Insert gallery
  const { data: gallery, error: galleryError } = await supabase
    .from("photo_galleries")
    .insert({
      title,
      slug,
      description: description || null,
      location: location || null,
      event_date: eventDate || null,
      is_published: isPublished,
      sort_order: sortOrder,
    })
    .select("id")
    .single();

  if (galleryError) {
    if (galleryError.code === "23505") {
      throw new Error("Judul event sudah ada. Gunakan judul yang berbeda.");
    }
    throw new Error(galleryError.message);
  }

  // Insert images
  const imageLinks = formData.getAll("image_url[]") as string[];
  const captions = formData.getAll("caption[]") as string[];
  const validImages = imageLinks
    .map((url, i) => ({
      gallery_id: gallery.id,
      image_url: url.trim(),
      caption: captions[i]?.trim() || null,
      sort_order: i,
    }))
    .filter((img) => img.image_url.length > 0);

  if (validImages.length > 0) {
    const { error: imagesError } = await supabase
      .from("gallery_images")
      .insert(validImages);

    if (imagesError) throw new Error(imagesError.message);
  }

  revalidatePath("/portal/dokumentasi");
  revalidatePath("/dokumentasi");
  redirect("/portal/dokumentasi");
}

export async function updateGallery(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();
  const isPublished = formData.get("is_published") === "on";
  const sortOrderRaw = String(formData.get("sort_order") ?? "0");

  if (!title) throw new Error("Judul event wajib diisi.");

  const slug = slugify(title);
  const sortOrder = Number.parseInt(sortOrderRaw, 10) || 0;

  // Update gallery
  const { error: galleryError } = await supabase
    .from("photo_galleries")
    .update({
      title,
      slug,
      description: description || null,
      location: location || null,
      event_date: eventDate || null,
      is_published: isPublished,
      sort_order: sortOrder,
    })
    .eq("id", id);

  if (galleryError) {
    if (galleryError.code === "23505") {
      throw new Error("Judul event sudah ada. Gunakan judul yang berbeda.");
    }
    throw new Error(galleryError.message);
  }

  // Delete existing images and re-insert
  const imageLinks = formData.getAll("image_url[]") as string[];
  const captions = formData.getAll("caption[]") as string[];
  const validImages = imageLinks
    .map((url, i) => ({
      gallery_id: id,
      image_url: url.trim(),
      caption: captions[i]?.trim() || null,
      sort_order: i,
    }))
    .filter((img) => img.image_url.length > 0);

  // Delete old images first
  await supabase.from("gallery_images").delete().eq("gallery_id", id);

  // Insert new images
  if (validImages.length > 0) {
    const { error: imagesError } = await supabase
      .from("gallery_images")
      .insert(validImages);

    if (imagesError) throw new Error(imagesError.message);
  }

  revalidatePath("/portal/dokumentasi");
  revalidatePath("/dokumentasi");
  redirect("/portal/dokumentasi");
}

export async function deleteGallery(id: string) {
  const supabase = await createClient();

  // Images will be deleted automatically via ON DELETE CASCADE
  const { error } = await supabase
    .from("photo_galleries")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/dokumentasi");
  revalidatePath("/dokumentasi");
}