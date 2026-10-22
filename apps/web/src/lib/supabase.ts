import { createClient, type SupabaseClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseConfigured = Boolean(url && key);
let client: SupabaseClient | null = null;
/** Client navigateur (clé anon publique ; l'accès aux données est protégé par RLS). */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  return (client ??= createClient(url!, key!));
}
