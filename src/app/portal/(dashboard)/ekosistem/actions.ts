/*
  portal/(dashboard)/ekosistem/actions.ts — Server Actions CRUD ecosystem_partners & ecosystem_case_studies.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ─────────────────────────────────────────────────────────────
// ECOSYSTEM PARTNERS
// ─────────────────────────────────────────────────────────────

export async function createPartner(formData: FormData) {
  const supabase = await createClient();

  const category = String(formData.get("category") ?? "donor");
  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const iconSvg = String(formData.get("icon_svg") ?? "default");
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!name) {
    throw new Error("Nama partner wajib diisi.");
  }

  const { error } = await supabase.from("ecosystem_partners").insert({
    category,
    name,
    description,
    icon_svg: iconSvg,
    sort_order: sortOrder || 0,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/ekosistem");
  redirect("/portal/ekosistem");
}

export async function updatePartner(id: string, formData: FormData) {
  const supabase = await createClient();

  const category = String(formData.get("category") ?? "donor");
  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const iconSvg = String(formData.get("icon_svg") ?? "default");
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!name) {
    throw new Error("Nama partner wajib diisi.");
  }

  const { error } = await supabase
    .from("ecosystem_partners")
    .update({
      category,
      name,
      description,
      icon_svg: iconSvg,
      sort_order: sortOrder || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/ekosistem");
  redirect("/portal/ekosistem");
}

export async function deletePartner(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("ecosystem_partners")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/ekosistem");
}

// ─────────────────────────────────────────────────────────────
// ECOSYSTEM CASE STUDIES
// ─────────────────────────────────────────────────────────────

export async function createCaseStudy(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const client = String(formData.get("client") ?? "");
  const sector = String(formData.get("sector") ?? "");
  const summary = String(formData.get("summary") ?? "");
  const impact = String(formData.get("impact") ?? "");
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!title || !client) {
    throw new Error("Judul dan nama klien wajib diisi.");
  }

  const { error } = await supabase.from("ecosystem_case_studies").insert({
    title,
    client,
    sector,
    summary,
    impact,
    sort_order: sortOrder || 0,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/ekosistem");
  redirect("/portal/ekosistem");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "");
  const client = String(formData.get("client") ?? "");
  const sector = String(formData.get("sector") ?? "");
  const summary = String(formData.get("summary") ?? "");
  const impact = String(formData.get("impact") ?? "");
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!title || !client) {
    throw new Error("Judul dan nama klien wajib diisi.");
  }

  const { error } = await supabase
    .from("ecosystem_case_studies")
    .update({
      title,
      client,
      sector,
      summary,
      impact,
      sort_order: sortOrder || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/ekosistem");
  redirect("/portal/ekosistem");
}

export async function deleteCaseStudy(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("ecosystem_case_studies")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/ekosistem");
}