import { z } from "zod";
export const AppStatus = z.enum(["decouverte","preparee","en_validation","envoyee","accuse","entretien","refus","archivee"]);
export type AppStatus = z.infer<typeof AppStatus>;
export const AgentId = z.enum(["scout","match","tailor","apply","tracker","analyst","orchestrator"]);
export type AgentId = z.infer<typeof AgentId>;

export interface Application {
  id: string; company: string; title: string; location: string; salary: string | null;
  score: number; confidence: "haute"|"moyenne"|"faible"; discoveredAt: string; appliedAt: string | null;
  status: AppStatus; source: string; documents: string[]; lastActivity: string; nextAction: string; url: string;
}
export interface AgentState {
  id: AgentId; name: string; fn: string; status: "actif"|"pause"|"inactif"|"erreur";
  currentTask: string | null; lastRun: string | null; actions: number; history: string[];
}
export interface Kpi { key: string; label: string; value: number | null; priority?: boolean }
export interface Dataset { kpis: Kpi[]; applications: Application[]; agents: AgentState[]; daily: {day:string; discovered:number; sent:number}[] }
