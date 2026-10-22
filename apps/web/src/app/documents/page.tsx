"use client";
import { useState } from "react";
import { ExternalLink, FileText, Globe } from "lucide-react";
import { Button, Card, PageHeader } from "@/components/ui/primitives";
import { getSupabase } from "@/lib/supabase";

const PORTFOLIO = "https://portfolio-sandrine.vercel.app/";
const Badge = ({ children }: { children: React.ReactNode }) => <span className="rounded-full border border-ink px-2.5 py-0.5 text-xs font-medium">{children}</span>;

export default function Page() {
  const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  async function openCv(download: boolean) {
    setErr(null); setBusy(true);
    try {
      const sb = getSupabase(); const token = sb ? (await sb.auth.getSession()).data.session?.access_token : undefined;
      const res = await fetch("/api/documents/cv", { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!res.ok) throw new Error(res.status === 401 ? "Connecte-toi pour consulter le CV." : res.status === 503 ? "Authentification non configurée sur ce déploiement." : "CV indisponible.");
      const url = URL.createObjectURL(await res.blob());
      if (download) { const a = document.createElement("a"); a.href = url; a.download = "CV_Sandrine_Kellam_Nonga.pdf"; a.click(); } else window.open(url, "_blank", "noopener");
    } catch (e) { setErr(e instanceof Error ? e.message : "Erreur"); } finally { setBusy(false); }
  }
  return (<div className="space-y-6">
    <PageHeader title="Documents & CV" subtitle="Sources du profil de Sandrine. Rien n'est utilisé dans une candidature tant qu'elle ne l'a pas confirmé." />
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-volt"><FileText size={20} /></span>
          <div><h2 className="font-semibold">CV — Sandrine Kellam Nonga</h2><p className="text-sm text-mute">CV_CDI_2026-7.pdf · CV principal</p></div></div><Badge>Importé · à confirmer</Badge></div>
        <p className="mt-4 text-sm text-mute">Recherche CDI chargée de projets marketing et expérience client, disponible dès octobre 2026. Document privé : accessible uniquement connectée.</p>
        <div className="mt-4 flex flex-wrap gap-2"><Button disabled={busy} onClick={() => openCv(false)}>Consulter le CV</Button><Button variant="ghost" disabled={busy} onClick={() => openCv(true)}>Télécharger</Button></div>
        {err && <p role="alert" className="mt-3 text-sm font-medium">{err}</p>}
      </Card>
      <Card>
        <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white"><Globe size={20} /></span>
          <div><h2 className="font-semibold">Portfolio</h2><p className="text-sm text-mute">portfolio-sandrine.vercel.app · source secondaire</p></div></div><Badge>Public</Badge></div>
        <p className="mt-4 text-sm text-mute">Réalisations et parcours. En cas d'écart avec le CV, c'est le CV qui prévaut.</p>
        <div className="mt-4"><a href={PORTFOLIO} target="_blank" rel="noreferrer noopener" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-black/80">Ouvrir le portfolio <ExternalLink size={14} /></a></div>
      </Card>
    </div>
    <Card><h2 className="mb-2 font-semibold">CV ciblés & lettres de motivation</h2>
      <p className="text-sm text-mute">Les versions adaptées à chaque offre apparaîtront ici, avec leur historique, une fois le module TAILOR branché. Chaque document sera vérifié factuellement par rapport au CV confirmé.</p></Card>
  </div>);
}
