/*
  portal/(dashboard)/marketplace-links/actions.ts — Server Actions CRUD marketplace_links.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/supabase/server";

export async function updateMarketplaceLink(id: string, formData: FormData) {
  const { supabase } = await requireAuth();

  const url = String(formData.get("url") ?? "");
  const isActive = formData.get("is_active") === "on";

  const { error } = await supabase
    .from("marketplace_links")
    .update({
      url: url || null,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/marketplace-links");
  redirect("/portal/marketplace-links");
}