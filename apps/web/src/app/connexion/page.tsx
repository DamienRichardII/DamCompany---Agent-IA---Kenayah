"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives"; import { Mascot } from "@/components/ui/Mascot";
import { getSupabase } from "@/lib/supabase";
export default function Page() {
  const router = useRouter(); const sb = getSupabase();
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (!sb) return; setBusy(true); setErr(null);
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    setBusy(false); if (error) setErr("Identifiants invalides."); else router.replace("/");
  }
  return (<form onSubmit={submit} className="mx-auto mt-10 max-w-sm rounded-card border border-line bg-surface p-8 text-center shadow-card">
    <div className="mb-3 flex justify-center"><Mascot size={72} /></div>
    <h1 className="text-2xl font-bold">KENAYAH <span className="bg-volt px-1">AI</span></h1><p className="mb-6 text-sm text-mute">Your Career. Our Intelligence.</p>
    <input aria-label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-3 h-11 w-full rounded-full border border-line px-4 text-sm" />
    <input aria-label="Mot de passe" type="password" required value={pw} onChange={e => setPw(e.target.value)} placeholder="Mot de passe" className="mb-4 h-11 w-full rounded-full border border-line px-4 text-sm" />
    {err && <p role="alert" className="mb-3 text-sm font-medium">{err}</p>}
    {!sb && <p role="alert" className="mb-3 text-xs text-mute">Supabase non configuré (variables NEXT_PUBLIC_SUPABASE_*).</p>}
    <Button className="w-full" disabled={!sb || busy}>{busy ? "Connexion…" : "Se connecter"}</Button>
    <p className="mt-4 text-[11px] text-mute">Application privée · Powered by DamCompany</p></form>);
}
