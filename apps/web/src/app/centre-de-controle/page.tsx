"use client";
import { useState } from "react";
import { getDataset } from "@/data"; import { Button, Card, PageHeader, Reveal } from "@/components/ui/primitives"; import { cn } from "@/lib/cn";
export default function Page() {
  const ds = getDataset(); const [open, setOpen] = useState<string | null>(null);
  return (<><PageHeader title="Centre de contrôle des agents" subtitle="7 agents spécialisés. Les boutons seront reliés au backend en phase 5." actions={<div className="flex gap-2"><Button variant="dark" disabled>Arrêter les soumissions auto</Button><Button disabled>Lancer tous les agents</Button></div>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{ds.agents.map((a, i) => (<Reveal key={a.id} delay={i * .04}><Card>
      <div className="flex items-center justify-between"><h2 className="font-bold">{a.name}</h2><span className="flex items-center gap-1.5 text-xs"><span className={cn("h-2 w-2 rounded-full", a.status === "actif" ? "pulse-volt bg-volt ring-1 ring-ink" : "bg-mute")} />{a.status}</span></div>
      <p className="mt-1 text-sm text-mute">{a.fn}</p>
      <dl className="mt-3 space-y-1 text-xs"><div className="flex justify-between"><dt className="text-mute">Tâche</dt><dd>{a.currentTask ?? "—"}</dd></div><div className="flex justify-between"><dt className="text-mute">Dernière exécution</dt><dd>{a.lastRun ?? "Jamais"}</dd></div><div className="flex justify-between"><dt className="text-mute">Actions</dt><dd>{a.actions}</dd></div></dl>
      <div className="mt-4 flex gap-2"><Button variant="ghost" className="h-9 flex-1 px-3 text-xs" onClick={() => setOpen(open === a.id ? null : a.id)}>Voir les logs</Button><Button variant="dark" className="h-9 px-3 text-xs" disabled>Pause</Button></div>
      {open === a.id && <ul className="mt-3 border-t border-line pt-3 text-xs text-mute">{a.history.length ? a.history.map((h, j) => <li key={j}>{h}</li>) : <li>Aucun journal : agent jamais exécuté.</li>}</ul>}</Card></Reveal>))}</div></>);
}
