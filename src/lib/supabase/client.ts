/*
  src/lib/supabase/client.ts — SUPABASE CLIENT UNTUK BROWSER
  Aman karena hanya pakai ANON KEY (RLS aktif di sisi DB).
*/

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
