/*
  portal/(dashboard)/toko/actions.ts — Server Actions CRUD products.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/fileUpload";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const label = String(formData.get("label") ?? "");
  const tokopediaUrl = String(formData.get("tokopedia_url") ?? "");
  const shopeeUrl = String(formData.get("shopee_url") ?? "");
  const isActive = formData.get("is_active") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!name || !description) {
    throw new Error("Nama dan deskripsi wajib diisi.");
  }

  const imageUrl = imageFile ? await uploadImage(imageFile) : null;

  const { error } = await supabase.from("products").insert({
    name,
    description,
    label: label || null,
    tokopedia_url: tokopediaUrl || null,
    shopee_url: shopeeUrl || null,
    is_active: isActive,
    image_url: imageUrl,
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
  const label = String(formData.get("label") ?? "");
  const tokopediaUrl = String(formData.get("tokopedia_url") ?? "");
  const shopeeUrl = String(formData.get("shopee_url") ?? "");
  const isActive = formData.get("is_active") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!name || !description) {
    throw new Error("Nama dan deskripsi wajib diisi.");
  }

  const imageUrl = imageFile && imageFile.size > 0 ? await uploadImage(imageFile) : null;

  const updateData: Record<string, unknown> = {
    name,
    description,
    label: label || null,
    tokopedia_url: tokopediaUrl || null,
    shopee_url: shopeeUrl || null,
    is_active: isActive,
  };

  if (imageUrl) {
    updateData.image_url = imageUrl;
  }

  const { error } = await supabase
    .from("products")
    .update(updateData)
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