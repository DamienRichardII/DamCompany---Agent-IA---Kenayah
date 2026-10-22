"use client";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({ variant="primary", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"dark"|"ghost" }) {
  const v = { primary:"bg-volt text-ink hover:brightness-95", dark:"bg-ink text-white hover:bg-black/80", ghost:"border border-line bg-surface hover:bg-paper" }[variant];
  return <button className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition disabled:opacity-50", v, className)} {...p} />;
}
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-card border border-line bg-surface p-5 shadow-card", className)}>{children}</section>;
}
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div><h1 className="text-3xl font-semibold tracking-tight">{title}</h1>{subtitle && <p className="mt-1 text-sm text-mute">{subtitle}</p>}</div>{actions}</div>);
}
export function Reveal({ children, delay=0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.35,delay}}>{children}</motion.div>;
}
export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (<div className="rounded-card border border-dashed border-line bg-surface/60 p-10 text-center">
    <p className="font-medium">{title}</p><p className="mx-auto mt-1 max-w-md text-sm text-mute">{hint}</p></div>);
}
const STATUS: Record<string,{label:string;cls:string}> = {
  decouverte:{label:"Découverte",cls:"bg-line text-ink"}, preparee:{label:"Préparée",cls:"bg-line text-ink"},
  en_validation:{label:"À valider",cls:"bg-volt text-ink"}, envoyee:{label:"Envoyée",cls:"bg-ink text-white"},
  accuse:{label:"Accusé",cls:"bg-ink text-white"}, entretien:{label:"Entretien",cls:"bg-volt text-ink ring-1 ring-ink"},
  refus:{label:"Refus",cls:"border border-ink text-ink"}, archivee:{label:"Archivée",cls:"text-mute border border-line"},
};
export const StatusPill = ({ status }: { status: string }) => { const s = STATUS[status] ?? STATUS.decouverte!; return <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", s.cls)}>{s.label}</span>; };
export const ScoreBadge = ({ score }: { score: number }) => (
  <span className={cn("inline-flex min-w-[2.75rem] justify-center rounded-md px-2 py-1 text-sm font-semibold tabular-nums", score>=85?"bg-volt text-ink":score>=70?"bg-ink text-white":"bg-line text-ink")} aria-label={`Score ${score} sur 100`}>{score}</span>);
export const DemoBanner = () => (<div role="status" className="bg-volt px-4 py-1.5 text-center text-xs font-semibold text-ink">MODE DÉMO — toutes les données affichées sont fictives</div>);
