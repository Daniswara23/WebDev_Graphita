/*
  toko/actions.ts — Server Actions CRUD products.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = String(formData.get("price") ?? "");
  const label = String(formData.get("label") ?? "");
  const tokopediaUrl = String(formData.get("tokopedia_url") ?? "");
  const shopeeUrl = String(formData.get("shopee_url") ?? "");
  const isActive = formData.get("is_active") === "on";

  if (!name || !description || !price) {
    throw new Error("Nama, deskripsi, dan harga wajib diisi.");
  }

  const { error } = await supabase.from("products").insert({
    name,
    description,
    price,
    label: label || null,
    tokopedia_url: tokopediaUrl || null,
    shopee_url: shopeeUrl || null,
    is_active: isActive,
    sort_order: 0,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/portal/toko");
  redirect("/portal/toko");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = String(formData.get("price") ?? "");
  const label = String(formData.get("label") ?? "");
  const tokopediaUrl = String(formData.get("tokopedia_url") ?? "");
  const shopeeUrl = String(formData.get("shopee_url") ?? "");
  const isActive = formData.get("is_active") === "on";

  if (!name || !description || !price) {
    throw new Error("Nama, deskripsi, dan harga wajib diisi.");
  }

  const { error } = await supabase
    .from("products")
    .update({
      name,
      description,
      price,
      label: label || null,
      tokopedia_url: tokopediaUrl || null,
      shopee_url: shopeeUrl || null,
      is_active: isActive,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/toko");
  redirect("/portal/toko");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/portal/toko");
}