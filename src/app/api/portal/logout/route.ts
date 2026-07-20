import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true, redirectTo: "/portal/login" }, { status: 200 });
  } catch (error) {
    console.error("Logout route error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat logout." }, { status: 500 });
  }
}
