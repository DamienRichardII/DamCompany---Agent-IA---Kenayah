/** Pondérations par défaut du score MATCH (modifiables en administration). Somme = 100. */
export const DEFAULT_WEIGHTS = { competences: 30, missions: 25, localisation: 15, experience: 15, salaire: 10, secteur_avantages: 5 } as const;
export type Weights = Record<keyof typeof DEFAULT_WEIGHTS, number>;
export const sumWeights = (w: Weights) => Object.values(w).reduce((a, b) => a + b, 0);
export const tier = (s: number) => (s >= 85 ? "prioritaire" : s >= 70 ? "intéressante" : "à examiner");
export function globalScore(parts: Record<keyof Weights, number>, w: Weights = DEFAULT_WEIGHTS): number {
  const total = sumWeights(w); if (total === 0) return 0;
  return Math.round((Object.keys(w) as (keyof Weights)[]).reduce((acc, k) => acc + (Math.max(0, Math.min(100, parts[k])) * w[k]), 0) / total);
}
