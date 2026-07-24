/*
  src/proxy.ts — Next.js 16 PROXY (pengganti middleware.ts)
  1. Refresh session Supabase di setiap request.
  2. Auth guard untuk /portal/*: redirect ke /portal/login jika belum login.
     Kecuali /portal/login itu sendiri.
*/

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Buat Supabase client untuk dipakai di proxy (auth guard).
 */
function createProxyClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Refresh session dulu untuk semua request
  const response = await updateSession(request);

  // Auth guard portal — skip untuk halaman login
  if (pathname.startsWith("/portal") && !pathname.startsWith("/portal/login")) {
    // Redirect /portal → /portal/dashboard
    if (pathname === "/portal" || pathname === "/portal/") {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }

    const supabase = createProxyClient(request, response);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }

    // Cek admin
    const { data: admin } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", user.email)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }

    return response;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};