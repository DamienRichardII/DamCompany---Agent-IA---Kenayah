"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Application } from "@/data/types";
import { Button, EmptyState, ScoreBadge, StatusPill } from "./primitives";

const COLS = ["Entreprise","Poste","Localisation","Salaire","Score IA","Découverte","Candidature","Statut","Source","Documents","Dernière activité","Prochaine action"];
export function ApplicationsTable({ rows, minScore = 0 }: { rows: Application[]; minScore?: number }) {
  const [q, setQ] = useState(""); const [desc, setDesc] = useState(true);
  const data = useMemo(() => rows.filter(r => r.score >= minScore && `${r.company} ${r.title}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => desc ? b.score - a.score : a.score - b.score), [rows, q, desc, minScore]);
  const csv = () => {
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const body = [COLS, ...data.map(r => [r.company,r.title,r.location,r.salary,r.score,r.discoveredAt,r.appliedAt,r.status,r.source,r.documents.join(" | "),r.lastActivity,r.nextAction])].map(l => l.map(esc).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + body], { type: "text/csv" })); a.download = "kenayah-candidatures.csv"; a.click();
  };
  if (rows.length === 0) return <EmptyState title="Aucune donnée pour l'instant" hint="Les candidatures apparaîtront ici dès que KENAYAH aura exécuté sa première recherche réelle." />;
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher entreprise ou poste…" aria-label="Rechercher" className="h-10 flex-1 rounded-full border border-line bg-surface px-4 text-sm" />
        <Button variant="ghost" onClick={() => setDesc(d => !d)}>Tri score {desc ? "↓" : "↑"}</Button>
        <Button variant="dark" onClick={csv}><Download size={16} /> CSV</Button>
      </div>
      <div className="overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-mute"><tr>{COLS.map(c => <th key={c} scope="col" className="px-4 py-3 font-medium">{c}</th>)}</tr></thead>
          <tbody>{data.map(r => (
            <tr key={r.id} className="border-b border-line last:border-0 hover:bg-paper/60">
              <td className="px-4 py-4 font-medium"><Link href={`/candidatures/${r.id}`} className="underline-offset-4 hover:underline">{r.company}</Link></td>
              <td className="px-4 py-4">{r.title}</td><td className="px-4 py-4">{r.location}</td>
              <td className="px-4 py-4 text-mute">{r.salary ?? "Non publié"}</td><td className="px-4 py-4"><ScoreBadge score={r.score} /></td>
              <td className="px-4 py-4">{r.discoveredAt}</td><td className="px-4 py-4">{r.appliedAt ?? "—"}</td>
              <td className="px-4 py-4"><StatusPill status={r.status} /></td><td className="px-4 py-4">{r.source}</td>
              <td className="px-4 py-4">{r.documents.length}</td><td className="px-4 py-4 text-mute">{r.lastActivity}</td><td className="px-4 py-4">{r.nextAction}</td>
            </tr>))}</tbody>
        </table>
      </div>
    </div>);
}
