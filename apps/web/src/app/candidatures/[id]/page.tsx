import Link from "next/link"; import { notFound } from "next/navigation";
import { getDataset } from "@/data"; import { Button, Card, PageHeader, ScoreBadge, StatusPill } from "@/components/ui/primitives";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const a = getDataset().applications.find(x => x.id === id); if (!a) notFound();
  return (<div className="space-y-6"><Link href="/candidatures" className="text-sm text-mute">← Retour</Link>
    <PageHeader title={a.title} subtitle={`${a.company} · ${a.location}`} actions={<div className="flex gap-2"><Button variant="dark">Refuser</Button><Button>Approuver</Button></div>} />
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2"><h2 className="mb-2 font-semibold">Offre</h2><a href={a.url} className="text-sm underline" rel="noreferrer noopener">Lien original</a>
        <p className="mt-3 text-sm text-mute">Description, compétences attendues/présentes, CV et lettre envoyés, historique et preuves de soumission : alimentés par les agents SCOUT, TAILOR et APPLY (phases 2–3). Aucune preuve de soumission = jamais « envoyée ».</p></Card>
      <Card><p className="text-sm text-mute">Score de compatibilité</p><p className="my-2"><ScoreBadge score={a.score} /> <span className="text-sm text-mute">/100 · confiance {a.confidence}</span></p><StatusPill status={a.status} />
        <p className="mt-4 text-sm"><b>Prochaine action :</b> {a.nextAction}</p></Card></div></div>);
}
