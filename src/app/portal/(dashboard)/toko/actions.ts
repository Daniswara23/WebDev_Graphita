/*
  portal/(dashboard)/toko/actions.ts — Server Actions CRUD products.
*/

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BUCKET_NAME = "product-images";

async function uploadProductImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File | null): Promise<string | null> {
  if (!file || file.size === 0) {
    console.log("[DEBUG] No file to upload");
    return null;
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  console.log("[DEBUG] Uploading file:", fileName, "size:", file.size);

  const { data: uploadData, error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadError) {
    console.error("[DEBUG] Upload error:", uploadError.message);
    console.error("[DEBUG] Upload error details:", uploadError);
    return null;
  }

  console.log("[DEBUG] Upload success:", uploadData);

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
  console.log("[DEBUG] Public URL:", urlData.publicUrl);
  return urlData.publicUrl;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = String(formData.get("price") ?? "");
  const label = String(formData.get("label") ?? "");
  const tokopediaUrl = String(formData.get("tokopedia_url") ?? "");
  const shopeeUrl = String(formData.get("shopee_url") ?? "");
  const isActive = formData.get("is_active") === "on";
  const imageFile = formData.get("image") as File | null;

  console.log("[DEBUG] createProduct - imageFile:", imageFile);
  if (imageFile) {
    console.log("[DEBUG] imageFile name:", imageFile.name, "size:", imageFile.size, "type:", imageFile.type);
  }

  if (!name || !description || !price) {
    throw new Error("Nama, deskripsi, dan harga wajib diisi.");
  }

  const imageUrl = await uploadProductImage(supabase, imageFile);
  console.log("[DEBUG] createProduct - imageUrl result:", imageUrl);

  const { error } = await supabase.from("products").insert({
    name,
    description,
    price,
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
  const price = String(formData.get("price") ?? "");
  const label = String(formData.get("label") ?? "");
  const tokopediaUrl = String(formData.get("tokopedia_url") ?? "");
  const shopeeUrl = String(formData.get("shopee_url") ?? "");
  const isActive = formData.get("is_active") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!name || !description || !price) {
    throw new Error("Nama, deskripsi, dan harga wajib diisi.");
  }

  const imageUrl = await uploadProductImage(supabase, imageFile);

  const updateData: Record<string, unknown> = {
    name,
    description,
    price,
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