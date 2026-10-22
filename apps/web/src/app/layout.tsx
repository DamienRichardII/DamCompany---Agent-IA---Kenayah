import "./globals.css";
import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { AuthGate } from "@/components/layout/AuthGate";
const site = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "KENAYAH AI — Powered by DamCompany",
  description: "Your Career. Our Intelligence. Assistante IA de carrière.",
  openGraph: { title: "KENAYAH AI", description: "Your Career. Our Intelligence.", siteName: "KENAYAH AI — DamCompany", type: "website", locale: "fr_FR" },
  twitter: { card: "summary_large_image", title: "KENAYAH AI", description: "Your Career. Our Intelligence." },
  robots: { index: false, follow: false },   // application privée
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body><AuthGate><Shell>{children}</Shell></AuthGate></body></html>);
}
