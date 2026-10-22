import { LayoutDashboard, Search, Star, Send, CalendarCheck, FileText, Cpu, MessageSquare, BarChart3, Newspaper, Bell, SlidersHorizontal, Plug, ShieldCheck, type LucideIcon } from "lucide-react";
export const NAV: { href: string; label: string; icon: LucideIcon; mobile?: boolean }[] = [
  { href:"/", label:"Tableau de bord", icon:LayoutDashboard, mobile:true },
  { href:"/offres", label:"Offres découvertes", icon:Search },
  { href:"/opportunites", label:"Opportunités", icon:Star, mobile:true },
  { href:"/candidatures", label:"Candidatures", icon:Send, mobile:true },
  { href:"/entretiens", label:"Entretiens", icon:CalendarCheck },
  { href:"/documents", label:"Documents & CV", icon:FileText },
  { href:"/centre-de-controle", label:"Centre de contrôle IA", icon:Cpu, mobile:true },
  { href:"/chat", label:"Chat KENAYAH", icon:MessageSquare, mobile:true },
  { href:"/statistiques", label:"Statistiques", icon:BarChart3 },
  { href:"/rapports", label:"Rapports", icon:Newspaper },
  { href:"/notifications", label:"Notifications", icon:Bell },
  { href:"/parametres", label:"Paramètres de recherche", icon:SlidersHorizontal },
  { href:"/integrations", label:"Intégrations", icon:Plug },
  { href:"/securite", label:"Sécurité & confidentialité", icon:ShieldCheck },
];
