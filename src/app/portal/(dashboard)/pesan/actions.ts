/*
  portal/(dashboard)/pesan/actions.ts — Server Actions untuk pesan masuk.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/supabase/server";

export async function deletePesan(id: string) {
  const { supabase } = await requireAuth();

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/pesan");
  redirect("/portal/pesan");
}