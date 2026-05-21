import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton — cegah multiple instance saat hot reload di development
declare global {
  // eslint-disable-next-line no-var
  var _supabase: SupabaseClient | undefined;
}

export const supabase: SupabaseClient =
  globalThis._supabase ?? createClient(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== "production") {
  globalThis._supabase = supabase;
}
