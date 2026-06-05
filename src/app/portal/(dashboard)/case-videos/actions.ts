/*
  case-videos/actions.ts — Server Actions CRUD case_videos
  Video disimpan sebagai link eksternal (YouTube, Vimeo, dll).
  Tidak ada file upload — admin cukup input link.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { toEmbedUrl } from "./embed-utils";

export async function createCaseVideo(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();
  const sortOrderRaw = String(formData.get("sort_order") ?? "0");
  const isActive = formData.get("is_active") === "on";

  if (!title) throw new Error("Judul video wajib diisi.");
  if (!videoUrl) throw new Error("Link video wajib diisi.");

  const embedUrl = toEmbedUrl(videoUrl);
  if (!embedUrl) {
    throw new Error("Link tidak valid. Gunakan link YouTube atau Vimeo.");
  }

  const sortOrder = Number.parseInt(sortOrderRaw, 10) || 0;

  const { error } = await supabase.from("case_videos").insert({
    title,
    video_url: embedUrl,
    sort_order: sortOrder,
    is_active: isActive,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/case-videos");
  revalidatePath("/");
  redirect("/portal/case-videos");
}

export async function updateCaseVideo(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();
  const sortOrderRaw = String(formData.get("sort_order") ?? "0");
  const isActive = formData.get("is_active") === "on";

  if (!title) throw new Error("Judul video wajib diisi.");
  if (!videoUrl) throw new Error("Link video wajib diisi.");

  const embedUrl = toEmbedUrl(videoUrl);
  if (!embedUrl) {
    throw new Error("Link tidak valid. Gunakan link YouTube atau Vimeo.");
  }

  const sortOrder = Number.parseInt(sortOrderRaw, 10) || 0;

  const { error } = await supabase
    .from("case_videos")
    .update({
      title,
      video_url: embedUrl,
      sort_order: sortOrder,
      is_active: isActive,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/case-videos");
  revalidatePath("/");
  redirect("/portal/case-videos");
}

export async function deleteCaseVideo(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("case_videos").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/case-videos");
  revalidatePath("/");
}
