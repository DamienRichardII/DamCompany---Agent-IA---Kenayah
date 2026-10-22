import type { Dataset, Application } from "@/data/types";
export interface ChatReply { text: string; cards?: Application[]; source: "donnees-systeme" }
/**
 * Moteur de chat LOCAL : répond uniquement à partir des vraies données du système (aucune invention).
 * Phase 2 : remplacé/complété par l'agent LLM (FastAPI + Claude, outils de lecture DB).
 */
export function answer(q: string, ds: Dataset): ChatReply {
  const s = q.toLowerCase();
  const apps = ds.applications;
  const mk = (text: string, cards?: Application[]): ChatReply => ({ text, cards, source: "donnees-systeme" });
  if (apps.length === 0 && /(opportunit|offre|score|candidature|répondu|reponse|écart|ecart)/.test(s))
    return mk("Je n'ai encore aucune offre en base : aucune recherche réelle n'a été exécutée. Lance une première recherche (une fois le backend connecté) et je pourrai répondre avec de vraies données.");
  const min = /(?:sup[ée]rieur|>|plus de|au moins)\D{0,12}(\d{2,3})/.exec(s)?.[1];
  const company = apps.map(a => a.company).find(c => s.includes(c.toLowerCase().replace(/^\[démo\]\s*/, "")));
  if (/(meilleur|opportunit|top|priorit)/.test(s) || min || company) {
    let list = [...apps]; if (min) list = list.filter(a => a.score >= Number(min)); if (company) list = list.filter(a => a.company === company);
    list.sort((a, b) => b.score - a.score); list = list.slice(0, 5);
    return list.length ? mk(`Voici ${list.length} offre(s) correspondant à ta demande, triées par score :`, list) : mk("Aucune offre ne correspond à ces critères pour le moment.");
  }
  if (/pourquoi.*(écart|ecart|rejet)/.test(s)) return mk("Je peux expliquer un écart dès que l'offre est identifiée : indique-moi l'entreprise ou le poste. Chaque décision est journalisée avec sa justification.");
  if (/(combien|nombre).*(répondu|reponse|réponse)/.test(s)) { const n = apps.filter(a => ["accuse","entretien","refus"].includes(a.status)).length; return mk(`${n} candidature(s) ont reçu une réponse (accusé, entretien ou refus) dans les données actuelles.`); }
  if (/(prépare|prepare).*candidature/.test(s)) return mk("Je prépare un CV et une lettre ciblés à partir de ton profil vérifié uniquement. Ouvre l'offre concernée et clique sur « Préparer » : tu valideras avant tout envoi.");
  return mk("Je peux te donner tes meilleures opportunités, filtrer par entreprise ou par score, compter les réponses reçues ou expliquer un écart. Que souhaites-tu savoir ?");
}
