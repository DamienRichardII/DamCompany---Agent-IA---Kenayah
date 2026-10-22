import type { AgentState } from "./types";
const base = (id: AgentState["id"], name: string, fn: string): AgentState =>
  ({ id, name, fn, status: "inactif", currentTask: null, lastRun: null, actions: 0, history: [] });
export const AGENT_DEFS: AgentState[] = [
  base("scout","SCOUT","Recherche et normalisation des offres"),
  base("match","MATCH","Score de compatibilité /100"),
  base("tailor","TAILOR","CV et lettres personnalisés, vérifiés"),
  base("apply","APPLY","Soumission sur canaux autorisés"),
  base("tracker","TRACKER","Suivi des emails et statuts"),
  base("analyst","ANALYST","Analyses et recommandations"),
  base("orchestrator","ORCHESTRATOR","Supervision, limites, validations"),
];
