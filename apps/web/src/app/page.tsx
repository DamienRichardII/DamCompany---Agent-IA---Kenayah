import { ArrowUpRight } from "lucide-react";
import { getDataset } from "@/data";
import { Card, Reveal, StatusPill } from "@/components/ui/primitives";
import { KenayahAvatar } from "@/components/ui/Avatar";
import { WeekChart } from "@/components/dashboard/Charts";
import { isDemo } from "@/lib/env";
import { cn } from "@/lib/cn";

export default function Dashboard() {
  const ds = getDataset(); const active = ds.agents.filter(a => a.status === "actif").length;
  return (<div className="space-y-6">
    <Reveal><div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Bonjour Sandrine,</h1>
        <p className="mt-1 text-xl">{active ? "Kenayah travaille pour vous aujourd'hui" : "Kenayah est prête — aucun agent n'est encore actif"}</p></div>
      <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4 shadow-card"><div><p className="flex items-center gap-2 font-semibold"><span className={cn("h-2.5 w-2.5 rounded-full", active ? "pulse-volt bg-volt ring-1 ring-ink" : "bg-mute")} />{active ? "Kenayah est actif" : "Kenayah est à l'arrêt"}</p>
        <p className="text-xs text-mute">{active} agent(s) en fonctionnement</p></div><KenayahAvatar size={64} /></div></div></Reveal>
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">{ds.kpis.map((k, i) => (
      <Reveal key={k.key} delay={i * .04}><Card className={cn(k.priority && "ring-2 ring-volt")}>
        <div className="flex items-start justify-between"><p className="text-5xl font-bold tabular-nums">{k.value ?? "—"}</p><span className="grid h-9 w-9 place-items-center rounded-lg bg-paper"><ArrowUpRight size={16} aria-hidden /></span></div>
        <p className="mt-2 text-sm text-mute">{k.label}</p>{k.value === null && <p className="mt-1 text-[11px] text-mute">En attente de données réelles</p>}</Card></Reveal>))}</div>
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2"><h2 className="mb-4 font-semibold">Candidatures cette semaine</h2><WeekChart daily={ds.daily} /></Card>
      <Card><h2 className="mb-4 font-semibold">Dernières candidatures</h2>
        {ds.applications.length === 0 ? <p className="text-sm text-mute">Rien pour l'instant. {isDemo ? "" : "Aucune donnée fictive n'est affichée en production."}</p> :
          <ul className="space-y-3">{ds.applications.map(a => <li key={a.id} className="flex items-center justify-between gap-2 text-sm"><span><b>{a.company}</b><br /><span className="text-mute">{a.title}</span></span><StatusPill status={a.status} /></li>)}</ul>}</Card></div>
  </div>);
}
