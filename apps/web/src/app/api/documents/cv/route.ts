import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** CV de Sandrine : fichier privé (hors /public), servi uniquement à une session Supabase valide. */
export async function GET(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return new Response("Authentification non configurée", { status: 503 });
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return new Response("Connexion requise", { status: 401 });
  const { data, error } = await createClient(url, anon).auth.getUser(token);
  if (error || !data.user) return new Response("Session invalide", { status: 401 });
  const file = await readFile(path.join(process.cwd(), "private", "CV_Sandrine_Kellam_Nonga.pdf"));
  return new Response(new Uint8Array(file), { headers: {
    "Content-Type": "application/pdf", "Content-Disposition": 'inline; filename="CV_Sandrine_Kellam_Nonga.pdf"', "Cache-Control": "private, no-store" } });
}
