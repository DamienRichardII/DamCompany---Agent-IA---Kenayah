"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Sparkles, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { KenayahAvatar } from "@/components/ui/Avatar";
import { ChatPanel } from "./ChatPanel";
import { guideFor } from "@/lib/guides";

const KEY = "kenayah:guides-seen";
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; } };
const write = (v: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* stockage indisponible : on ignore */ } };

/** Kenayah en bas à droite de chaque page : guide de la page (auto à la 1re visite) + chat. */
export function FloatingChat() {
  const path = usePathname(); const guide = guideFor(path);
  const [open, setOpen] = useState(false); const [tab, setTab] = useState<"guide" | "chat">("guide");
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (last.current === path) return; last.current = path;   // évite le double déclenchement (StrictMode)
    const seen = read();
    if (!seen.includes(path)) { setTab("guide"); setOpen(true); write([...seen, path]); } else setOpen(false);
  }, [path]);
  return (<>
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: 12, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: .2 }}
          role="dialog" aria-label="Kenayah, ton assistante" className="fixed bottom-24 right-4 z-40 flex h-[600px] max-h-[75vh] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl lg:bottom-24 lg:right-6">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
            <div className="flex items-center gap-3"><KenayahAvatar size={40} /><div><p className="text-sm font-semibold">KENAYAH AI</p><p className="text-[11px] text-white/60">Ton assistante de carrière</p></div></div>
            <button onClick={() => setOpen(false)} aria-label="Fermer"><X size={18} /></button></div>
          <div className="flex border-b border-line bg-surface text-sm" role="tablist">
            {([["guide", "Sur cette page", Sparkles], ["chat", "Discuter", MessageCircle]] as const).map(([k, label, Icon]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`flex flex-1 items-center justify-center gap-2 py-2.5 font-medium ${tab === k ? "border-b-2 border-ink bg-volt/60" : "text-mute"}`}><Icon size={15} />{label}</button>))}</div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {tab === "guide" ? (
              <div className="space-y-4 p-4">
                <div className="flex gap-2"><span className="mt-1 shrink-0"><KenayahAvatar size={32} ring={false} /></span>
                  <div className="rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3 text-sm"><p className="mb-1 font-semibold">{guide.title}</p>{guide.hello}</div></div>
                <ul className="space-y-2">{guide.features.map(f => (
                  <li key={f.label} className="rounded-xl border border-line bg-surface p-3 text-sm"><p className="font-semibold">{f.label}</p><p className="text-mute">{f.text}</p></li>))}</ul>
                {guide.tip && <p className="rounded-xl bg-volt px-3 py-2 text-xs font-medium text-ink">💡 {guide.tip}</p>}
                <button onClick={() => setTab("chat")} className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white">Une question ? Discutons</button>
              </div>) : <ChatPanel />}
          </div>
        </motion.div>)}
    </AnimatePresence>
    <button onClick={() => { setTab("guide"); setOpen(o => !o); }} aria-label={open ? "Fermer Kenayah" : "Ouvrir Kenayah"} aria-expanded={open}
      className="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-6">
      <span className="relative block"><KenayahAvatar size={64} className="shadow-xl" />
        {!open && <span className="pulse-volt absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-white bg-volt" aria-hidden />}</span></button>
  </>);
}
