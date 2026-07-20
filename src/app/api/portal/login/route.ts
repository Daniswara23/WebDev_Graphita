import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const next = String(formData.get("next") ?? "/portal/dashboard");

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !authData.user) {
      return NextResponse.json({ error: error?.message ?? "Login gagal." }, { status: 401 });
    }

    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (adminError) {
      console.error("adminError:", adminError);
      await supabase.auth.signOut();
      return NextResponse.json({ error: "Gagal verifikasi admin: " + adminError.message }, { status: 403 });
    }

    if (!adminData) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "Akses ditolak. Anda tidak terdaftar sebagai admin." }, { status: 403 });
    }

    return NextResponse.json({ success: true, redirectTo: next || "/portal/dashboard" }, { status: 200 });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat login." }, { status: 500 });
  }
}
