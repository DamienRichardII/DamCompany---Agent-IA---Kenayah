import type { Dataset } from "./types";
import { AGENT_DEFS } from "./agents";
/** ⚠ DONNÉES FICTIVES — chargées uniquement si NEXT_PUBLIC_KENAYAH_ENV=demo. Entreprises/offres illustratives. */
export const DEMO: Dataset = {
  kpis: [
    { key:"disc", label:"Offres découvertes aujourd'hui", value:24 },
    { key:"qual", label:"Offres qualifiées", value:9, priority:true },
    { key:"prep", label:"Candidatures préparées", value:6 },
    { key:"sent", label:"Candidatures envoyées", value:3, priority:true },
    { key:"wait", label:"En attente de validation", value:3 },
    { key:"pos", label:"Réponses positives", value:1 },
    { key:"ref", label:"Refus", value:2 },
    { key:"int", label:"Entretiens", value:1 },
  ],
  applications: [
    { id:"demo-1", company:"[DÉMO] Entreprise A", title:"Chargée de projets marketing", location:"Paris (75)", salary:null, score:88, confidence:"haute", discoveredAt:"2026-10-21", appliedAt:null, status:"en_validation", source:"Site carrières", documents:["CV ciblé v1","Lettre v1"], lastActivity:"Il y a 2 h", nextAction:"Valider la candidature", url:"https://example.com/offre-demo-1" },
    { id:"demo-2", company:"[DÉMO] Entreprise B", title:"Chargée de relation client", location:"Clichy (92)", salary:"38–42 k€ bruts", score:76, confidence:"moyenne", discoveredAt:"2026-10-20", appliedAt:"2026-10-21", status:"envoyee", source:"France Travail", documents:["CV ciblé v1","Lettre v1"], lastActivity:"Hier", nextAction:"Attendre une réponse", url:"https://example.com/offre-demo-2" },
    { id:"demo-3", company:"[DÉMO] Entreprise C", title:"Cheffe de projet marketing", location:"Courbevoie (92)", salary:null, score:64, confidence:"faible", discoveredAt:"2026-10-19", appliedAt:null, status:"decouverte", source:"APEC", documents:[], lastActivity:"Il y a 3 j", nextAction:"Examiner l'offre", url:"https://example.com/offre-demo-3" },
  ],
  agents: AGENT_DEFS.map((a,i)=>({ ...a, status: i<3?"actif":"inactif", currentTask: i<3?"Tâche de démonstration":null, lastRun:"07:00", actions: 12*(i+1), history:["07:00 — exécution de démonstration"] })),
  daily: [["Lun",18,2],["Mar",22,4],["Mer",15,3],["Jeu",24,3],["Ven",0,0]].map(([day,discovered,sent])=>({day:day as string,discovered:discovered as number,sent:sent as number})),
};
export const EMPTY: Dataset = {
  kpis: ["Offres découvertes aujourd'hui","Offres qualifiées","Candidatures préparées","Candidatures envoyées","En attente de validation","Réponses positives","Refus","Entretiens"].map((label,i)=>({ key:String(i), label, value:null })),
  applications: [], agents: AGENT_DEFS, daily: [],
};
