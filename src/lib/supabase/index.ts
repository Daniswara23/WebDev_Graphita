/*
  src/lib/supabase/index.ts — SUPABASE CLIENT UNTUK BROWSER
  Dipakai di Client Components.
*/

import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);