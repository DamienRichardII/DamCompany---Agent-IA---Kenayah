"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { isDemo } from "@/lib/env";
import { Button, DemoBanner } from "@/components/ui/primitives";
import { DamLogo } from "@/components/ui/DamLogo";
import { FloatingChat } from "@/components/chat/FloatingChat";

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <div className="min-h-screen">
      {isDemo && <DemoBanner />}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-ink p-5 text-white lg:flex" style={{ top: isDemo ? 28 : 0 }}>
        <div className="mb-8"><p className="text-xl font-bold tracking-tight">KENAYAH <span className="text-volt">AI</span></p>
          <div className="mt-2 flex items-center gap-2"><span className="text-[11px] uppercase tracking-widest text-white/50">Powered by</span><DamLogo variant="light" height={22} /></div></div>
        <nav aria-label="Navigation principale" className="flex-1 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition", active(href) ? "bg-volt font-semibold text-ink" : "text-white/70 hover:bg-white/10 hover:text-white")}>
              <Icon size={18} aria-hidden /> {label}</Link>))}
        </nav>
        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-volt text-sm font-bold text-ink">S</span>
          <div><p className="text-sm font-medium">Sandrine</p><p className="text-xs text-white/50">Directrice adjointe</p></div></div>
        <p className="mt-4 text-[10px] text-white/40">Your Career. Our Intelligence.</p>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur lg:px-10">
          <input aria-label="Rechercher une offre, une entreprise" placeholder="Rechercher une offre, une entreprise…" className="hidden h-10 max-w-md flex-1 rounded-full border border-line bg-surface px-4 text-sm md:block" />
          <div className="md:hidden"><p className="text-lg font-semibold">Bonjour Sandrine</p>
            <p className="flex items-center gap-2 text-xs text-mute"><span className="h-2 w-2 rounded-full bg-mute" aria-hidden /> KENAYAH : agents à l'arrêt (backend non connecté)</p></div>
          <div className="flex items-center gap-2">
            <Link href="/notifications" aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface"><Bell size={18} /></Link>
            <Button disabled title="Disponible dès le branchement du backend (phase 2)"><Search size={16} /> Lancer une recherche</Button></div>
        </header>
        <main className="px-5 py-8 pb-32 lg:px-10 lg:pb-28">{children}</main>
      </div>
      <FloatingChat />
      <nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-30 flex justify-around bg-ink px-2 py-2 lg:hidden">
        {NAV.filter(n => n.mobile).map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={cn("flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px]", active(href) ? "bg-volt text-ink" : "text-white/70")}>
            <Icon size={18} aria-hidden />{label.split(" ")[0]}</Link>))}
      </nav>
    </div>
  );
}
