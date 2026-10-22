/**
 * Estimation brut→net (France, salarié cadre/non-cadre) — INDICATIVE, jamais utilisée pour exclure une offre.
 * Taux de cotisations salariales approximatifs, configurables ; avant prélèvement à la source.
 */
export type Statut = "non-cadre" | "cadre";
export const RATE: Record<Statut, number> = { "non-cadre": 0.78, cadre: 0.75 };
export const grossToNet = (g: number, s: Statut = "cadre", rate = RATE[s]) => Math.round(g * rate);
export const netToGross = (n: number, s: Statut = "cadre", rate = RATE[s]) => Math.round(n / rate);
