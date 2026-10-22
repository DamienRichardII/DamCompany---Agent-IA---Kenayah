import "./globals.css";
import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { AuthGate } from "@/components/layout/AuthGate";
export const metadata: Metadata = { title: "KENAYAH AI — Powered by DamCompany", description: "Your Career. Our Intelligence." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body><AuthGate><Shell>{children}</Shell></AuthGate></body></html>);
}
