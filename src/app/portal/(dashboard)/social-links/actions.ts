/*
  portal/(dashboard)/social-links/actions.ts — Server Actions untuk Social Links
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const PLATFORM_OPTIONS = [
  { value: "linkedin", label: "LinkedIn", icon: "/images/LinkedIn-logo.png" },
  { value: "instagram", label: "Instagram", icon: "/images/Instagram-icon.png" },
  { value: "twitter", label: "X (Twitter)", icon: "/images/X-logo.png" },
  { value: "facebook", label: "Facebook", icon: "/images/Facebook-Logo.png" },
] as const;

export async function createSocialLink(formData: FormData) {
  const supabase = await createClient();

  const platform = String(formData.get("platform") ?? "");
  const url = String(formData.get("url") ?? "");
  const is_active = formData.get("is_active") === "true";
  const sort_order = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!platform || !url) {
    throw new Error("Platform dan URL wajib diisi.");
  }

  // Get icon path based on platform
  const platformOption = PLATFORM_OPTIONS.find((p) => p.value === platform);
  const icon_path = platformOption?.icon ?? "/images/LinkedIn-logo.png";

  const { error } = await supabase.from("social_links").insert({
    platform,
    url,
    icon_path,
    is_active,
    sort_order,
  });

  if (error) {
    console.error("Error creating social link:", error);
    throw new Error(error.message);
  }

  revalidatePath("/portal/social-links");
  revalidatePath("/contact");
  redirect("/portal/social-links");
}

export async function updateSocialLink(id: string, formData: FormData) {
  const supabase = await createClient();

  const platform = String(formData.get("platform") ?? "");
  const url = String(formData.get("url") ?? "");
  const is_active = formData.get("is_active") === "true";
  const sort_order = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!platform || !url) {
    throw new Error("Platform dan URL wajib diisi.");
  }

  // Get icon path based on platform
  const platformOption = PLATFORM_OPTIONS.find((p) => p.value === platform);
  const icon_path = platformOption?.icon ?? "/images/LinkedIn-logo.png";

  const { error } = await supabase
    .from("social_links")
    .update({ platform, url, icon_path, is_active, sort_order })
    .eq("id", id);

  if (error) {
    console.error("Error updating social link:", error);
    throw new Error(error.message);
  }

  revalidatePath("/portal/social-links");
  revalidatePath("/contact");
  redirect("/portal/social-links");
}

export async function deleteSocialLink(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("social_links").delete().eq("id", id);

  if (error) {
    console.error("Error deleting social link:", error);
    throw new Error(error.message);
  }

  revalidatePath("/portal/social-links");
  revalidatePath("/contact");
}