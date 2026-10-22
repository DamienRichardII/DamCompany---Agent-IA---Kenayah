"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
/** Si Supabase est configuré, exige une session ; sinon (dev/démo sans backend) laisse passer. */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const sb = getSupabase(); const path = usePathname(); const router = useRouter();
  const [ready, setReady] = useState(!sb);
  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => { if (!data.session && path !== "/connexion") router.replace("/connexion"); else setReady(true); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => { if (!s && path !== "/connexion") router.replace("/connexion"); });
    return () => sub.subscription.unsubscribe();
  }, [sb, path, router]);
  return ready || path === "/connexion" ? <>{children}</> : <p className="p-10 text-sm text-mute">Vérification de la session…</p>;
}
