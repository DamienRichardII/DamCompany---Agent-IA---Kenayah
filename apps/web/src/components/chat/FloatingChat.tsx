"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Mascot } from "@/components/ui/Mascot";
import { ChatPanel } from "./ChatPanel";
export function FloatingChat() {
  const [open, setOpen] = useState(false);
  return (<>
    {open && <div role="dialog" aria-label="Chat KENAYAH" className="fixed bottom-24 right-4 z-40 flex h-[600px] max-h-[75vh] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl lg:bottom-6 lg:right-6">
      <div className="flex items-center justify-between bg-ink px-4 py-3 text-white"><div className="flex items-center gap-2"><span className="rounded-full bg-paper p-0.5"><Mascot size={28} /></span><div><p className="text-sm font-semibold">KENAYAH AI</p><p className="text-[11px] text-white/60">Votre assistante de carrière</p></div></div>
        <button onClick={() => setOpen(false)} aria-label="Fermer le chat"><X size={18} /></button></div>
      <div className="min-h-0 flex-1"><ChatPanel /></div></div>}
    {!open && <button onClick={() => setOpen(true)} aria-label="Ouvrir le chat KENAYAH" className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink shadow-xl ring-2 ring-volt lg:bottom-6 lg:right-6"><Mascot size={38} /></button>}
  </>);
}
