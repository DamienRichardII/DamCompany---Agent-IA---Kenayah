"use client";
import { useState } from "react";
import { Button, Card, PageHeader } from "@/components/ui/primitives";
import { DEFAULT_WEIGHTS, sumWeights, type Weights } from "@/lib/scoring";
import { grossToNet, netToGross } from "@/lib/salary";
const LABEL: Record<keyof Weights, string> = { competences: "Compétences", missions: "Missions", localisation: "Localisation", experience: "Niveau d'expérience", salaire: "Salaire", secteur_avantages: "Secteur & avantages" };
export default function Page() {
  const [w, setW] = useState<Weights>({ ...DEFAULT_WEIGHTS }); const [mode, setMode] = useState<"manuel" | "assiste" | "auto">("assiste");
  const [unit, setUnit] = useState<"net" | "brut" | null>(null); const total = sumWeights(w);
  return (<div className="space-y-6"><PageHeader title="Paramètres de recherche" subtitle="Contrat : CDI · Île-de-France · temps plein. (Enregistrement serveur : phase 2.)" />
    <Card><h2 className="font-semibold">Rémunération souhaitée : 40 000 – 45 000 €</h2>
      <p className="mt-1 text-sm text-mute">Obligatoire avant toute candidature automatique : ce montant est-il net ou brut annuel ?</p>
      <div className="mt-3 flex gap-2">{(["net", "brut"] as const).map(u => <Button key={u} variant={unit === u ? "primary" : "ghost"} onClick={() => setUnit(u)}>{u === "net" ? "Net / an" : "Brut / an"}</Button>)}</div>
      {unit === "net" && <p className="mt-3 text-sm">Équivalent brut estimé (indicatif) : {netToGross(40000).toLocaleString("fr-FR")} – {netToGross(45000).toLocaleString("fr-FR")} €. Les offres sans salaire publié ne sont pas exclues.</p>}
      {unit === "brut" && <p className="mt-3 text-sm">Équivalent net estimé (indicatif) : {grossToNet(40000).toLocaleString("fr-FR")} – {grossToNet(45000).toLocaleString("fr-FR")} €.</p>}
      {!unit && <p role="alert" className="mt-3 text-sm font-medium">⚠ Confirmation requise : le filtre salaire reste inactif.</p>}</Card>
    <Card><h2 className="mb-3 font-semibold">Pondération du score MATCH <span className={total === 100 ? "text-mute" : "font-bold"}>({total}/100)</span></h2>
      {(Object.keys(w) as (keyof Weights)[]).map(k => <label key={k} className="mb-3 block text-sm"><span className="flex justify-between"><span>{LABEL[k]}</span><b>{w[k]} %</b></span>
        <input type="range" min={0} max={60} value={w[k]} onChange={e => setW({ ...w, [k]: Number(e.target.value) })} className="w-full accent-black" /></label>)}
      {total !== 100 && <p role="alert" className="text-sm">La somme doit être égale à 100 % pour enregistrer.</p>}</Card>
    <Card><h2 className="mb-3 font-semibold">Niveau d'automatisation</h2><div className="grid gap-2 sm:grid-cols-3">
      {([["manuel", "Manuel", "Sandrine valide et soumet."], ["assiste", "Assisté", "KENAYAH prépare, Sandrine confirme."], ["auto", "Automatique encadré", "Canaux autorisés uniquement, arrêt immédiat possible."]] as const).map(([k, t, d]) =>
        <button key={k} onClick={() => setMode(k)} aria-pressed={mode === k} className={`rounded-xl border p-4 text-left text-sm ${mode === k ? "border-ink bg-volt" : "border-line bg-surface"}`}><b>{t}</b><br /><span className="text-mute">{d}</span></button>)}</div></Card></div>);
}
