/*
  src/lib/supabase/server.ts — SUPABASE CLIENT UNTUK SERVER
  Dipakai di Server Components, Server Actions, Route Handlers.
*/

import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Dipanggil dari Server Component — bisa diabaikan
          }
        },
      },
    }
  );
}

export async function getSession() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

/**
 * requireAuth — Wajib dipanggil di awal setiap Server Action.
 * Cek apakah user masih login, kalau tidak → redirect ke login.
 * Mengembalikan { supabase, user } untuk dipakai action selanjutnya.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("requireAuth: session invalid or expired", error?.message);
    redirect("/portal/login?error=session_expired");
  }

  return { supabase, user };
}
