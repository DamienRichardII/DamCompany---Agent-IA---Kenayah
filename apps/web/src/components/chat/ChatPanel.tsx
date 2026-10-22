"use client";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Mascot } from "@/components/ui/Mascot";
import { ScoreBadge } from "@/components/ui/primitives";
import { answer, type ChatReply } from "@/lib/chatEngine";
import { getDataset } from "@/data";

type Msg = { role: "user" | "ai"; text: string; cards?: ChatReply["cards"]; t: string };
const now = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
const SUGGESTIONS = ["Quelles sont mes meilleures opportunités aujourd'hui ?", "Montre-moi les offres avec un score supérieur à 85", "Combien d'entreprises m'ont répondu cette semaine ?", "Pourquoi as-tu écarté cette offre ?"];

export function ChatPanel() {
  const ds = getDataset();
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "ai", t: now(), text: ds.applications.length ? "Bonjour Sandrine ! Pose-moi une question sur tes offres et candidatures." : "Bonjour Sandrine ! Je n'ai pas encore de données réelles : je répondrai dès la première recherche exécutée." }]);
  const [val, setVal] = useState(""); const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);
  const send = (text: string) => {
    if (!text.trim() || busy) return;
    setMsgs(m => [...m, { role: "user", text, t: now() }]); setVal(""); setBusy(true);
    setTimeout(() => { const r = answer(text, ds); setMsgs(m => [...m, { role: "ai", text: r.text, cards: r.cards, t: now() }]); setBusy(false); }, 450);
  };
  return (
    <div className="flex h-full min-h-[480px] flex-col">
      <div role="log" aria-live="polite" className="flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence initial={false}>{msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={m.role === "user" ? "flex justify-end" : "flex gap-2"}>
            {m.role === "ai" && <span className="mt-1 shrink-0"><Mascot size={32} /></span>}
            <div className="max-w-[85%]">
              <div className={m.role === "user" ? "rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-sm text-white" : "rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3 text-sm"}>{m.text}</div>
              {m.cards && <div className="mt-2 flex gap-2 overflow-x-auto pb-1">{m.cards.map(c => (
                <div key={c.id} className="min-w-[170px] rounded-xl border border-line bg-surface p-3 text-xs"><p className="font-semibold">{c.company}</p><p className="text-mute">{c.title}</p><p className="mb-2 text-mute">{c.location}</p><ScoreBadge score={c.score} /></div>))}</div>}
              <p className="mt-1 text-[10px] text-mute">{m.t}</p>
            </div>
          </motion.div>))}</AnimatePresence>
        {busy && <div className="flex items-center gap-2 text-xs text-mute" aria-label="KENAYAH réfléchit"><span className="pulse-volt h-2 w-2 rounded-full bg-volt ring-1 ring-ink" /> Kenayah analyse tes données…</div>}
        <div ref={end} />
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-2">{SUGGESTIONS.map(s => <button key={s} onClick={() => send(s)} className="rounded-full border border-line bg-surface px-3 py-1 text-xs hover:bg-volt">{s}</button>)}</div>
      <form onSubmit={e => { e.preventDefault(); send(val); }} className="m-4 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-4">
        <input value={val} onChange={e => setVal(e.target.value)} aria-label="Message à Kenayah" placeholder="Posez votre question à Kenayah…" className="flex-1 bg-transparent text-sm outline-none" />
        <button aria-label="Envoyer" className="grid h-10 w-10 place-items-center rounded-full bg-volt"><Send size={16} /></button>
      </form>
    </div>
  );
}
