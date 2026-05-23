/*
  Server Actions — login & logout admin.
  Mengecek apakah email terdaftar di tabel admin_users.
*/

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/portal/dashboard");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();

  // 1. Login dulu
  const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  // 2. Cek apakah email terdaftar sebagai admin
  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (adminError) {
    console.error("adminError:", adminError);
    await supabase.auth.signOut();
    return { error: "Gagal verifikasi admin: " + adminError.message };
  }

  if (!adminData) {
    await supabase.auth.signOut();
    return { error: "Akses ditolak. Anda tidak terdaftar sebagai admin." };
  }

  redirect(next || "/portal/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/portal/login");
}