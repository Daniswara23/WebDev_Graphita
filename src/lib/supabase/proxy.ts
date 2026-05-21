/*
  src/lib/supabase/proxy.ts — HELPER UNTUK SESSION REFRESH
  Dipanggil dari src/proxy.ts (Next.js 16 — pengganti middleware).
*/

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const needsAuth =
    pathname.startsWith("/mitra") && !pathname.startsWith("/mitra/login");

  if (needsAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/mitra/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/mitra/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/mitra/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
