/*
  portal/(dashboard)/testimoni/actions.ts — Server Actions CRUD testimonials/feedback.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();

  const quote = String(formData.get("quote") ?? "");
  const author = String(formData.get("author") ?? "");
  const company = String(formData.get("company") ?? "");
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!quote || !author) {
    throw new Error("Kutipan dan nama penulis wajib diisi.");
  }

  const { error } = await supabase.from("testimonials").insert({
    quote,
    author,
    company: company || "",
    sort_order: sortOrder || 0,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/testimoni");
  redirect("/portal/testimoni");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();

  const quote = String(formData.get("quote") ?? "");
  const author = String(formData.get("author") ?? "");
  const company = String(formData.get("company") ?? "");
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!quote || !author) {
    throw new Error("Kutipan dan nama penulis wajib diisi.");
  }

  const { error } = await supabase
    .from("testimonials")
    .update({
      quote,
      author,
      company: company || "",
      sort_order: sortOrder || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/testimoni");
  redirect("/portal/testimoni");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/testimoni");
}