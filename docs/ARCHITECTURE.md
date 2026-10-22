# KENAYAH AI — Architecture & état d'avancement (Phase 1)

## 1. Décisions d'architecture

| Couche | Choix | Pourquoi |
|---|---|---|
| Front | Next.js 15 (App Router), TypeScript strict, Tailwind, Motion, Recharts | Vercel natif, SSR léger, design tokens centralisés (`src/design/tokens.ts`) |
| API / agents | FastAPI (Python 3.13) | Écosystème IA (LangGraph, embeddings), typage Pydantic |
| Données | Supabase (Postgres + Auth + Storage + pgvector) | RLS native, MFA, stockage chiffré, un seul fournisseur |
| Asynchrone | Redis + worker + APScheduler (Europe/Paris, lun–ven) | Jamais de navigation longue en serverless |
| LLM | Anthropic Claude (sorties structurées) | Choix validé par DamCompany |
| Navigation web | Playwright, **uniquement** canaux autorisés | Pas de contournement CAPTCHA/MFA/antibot |
| Hébergement | Vercel (front) · conteneur Docker longue durée (API + worker : Fly.io / Railway / VPS) | Séparation front / API / workers |

Flux : `Scheduler → ORCHESTRATOR → SCOUT → MATCH → TAILOR → (validation Sandrine) → APPLY → TRACKER → ANALYST → rapport 17h30`.

## 2. Règles d'intégrité (implémentées et testées)
- **Pas de preuve, pas d'« envoyée »** : contrainte SQL `sent_requires_proof` + `guards.mark_sent_allowed`.
- **Anti-doublon** : `unique (user_id, job_offer_id)` sur `applications` ; clés d'idempotence par créneau/agent/jour.
- **Aucune soumission sans garde-fous** : `guards.can_submit` (profil confirmé, salaire net/brut confirmé, canal autorisé, mode, pause, validation).
- **Salaire** : le filtre reste inactif tant que net/brut n'est pas confirmé ; offres sans salaire jamais exclues ; conversion indicative.
- **Contenus non fiables** : `security.scan_untrusted` / `wrap_untrusted` pour annonces et emails.
- **Pas de données fictives en production** : `NEXT_PUBLIC_KENAYAH_ENV=demo` requis, bandeau « MODE DÉMO » permanent.
- **Aucune expérience inventée** : `professional_profiles.verified_at`, `verified` par expérience/diplôme/compétence.

## 3. État réel
| Élément | État |
|---|---|
| Design system DamCompany (tokens, composants, mascotte originale) | ✅ fait |
| 17 pages UI + chat intégré (page + bulle flottante) | ✅ UI faite ; données = états vides (prod) ou démo étiquetée |
| Chat : réponses calculées sur les données réelles | ✅ moteur **local** par règles ; agent LLM = phase 2 |
| Schéma SQL : 27 tables, RLS, contraintes | ✅ exécuté sur Postgres embarqué (hors pgvector, non exécuté localement) |
| Scoring pondéré, conversion salaire, garde-fous, anti-injection | ✅ testés (vitest + pytest) |
| Scheduler lun–ven Europe/Paris | ⚠️ code écrit, non démarré ni testé en conditions réelles |
| Projet Supabase « DamCompany Agent IA - Kenayah » : 27 tables + RLS + trigger de création de profil | ✅ appliqué (migrations 0001, 0002) ; aucune donnée utilisateur encore |
| Connexion email/mot de passe (Supabase Auth) + garde de session | ✅ codée ; aucun compte créé pour Sandrine ; persistance des paramètres ⛔ à brancher |
| Connecteurs d'offres | ⚠️ HasData/Indeed : code + test unitaire (mock), jamais testé en réel (clé manquante). Hellowork : **API non adaptée** (voir §4). Mantiks/WTTJ, France Travail : ⛔ à faire |
| Agents SCOUT…ORCHESTRATOR | ⛔ déclarés, retournent « non implémenté » (aucune simulation) |
| Gmail / Calendar / Outlook OAuth | ⛔ à faire (phase 4) |
| Génération CV/lettres PDF, rapports PDF/email | ⛔ phases 3–4 |

## 4. Accès nécessaires de la part de DamCompany / Sandrine
1. ~~Projet Supabase~~ ✅ fourni (clé *service_role* encore nécessaire pour le worker, à ne jamais mettre dans Git) · 2. clé API Anthropic · 3. identifiants API France Travail · 4. consentements OAuth Gmail/Calendar (Sandrine) · 5. confirmation du CV importé par Sandrine · 6. salaire **net** indiqué par DamCompany, à confirmer par Sandrine dans l'interface · 7. choix de l'hébergeur du worker.

## 4bis. Fournisseurs d'offres indiqués (analyse de leur documentation)
- **Hellowork** `ats-partner.hellowork.com/v1/api` : API *ATS partner* (signin JWT + mise à jour du statut de candidatures). **Elle ne permet pas de rechercher des offres.** Inutilisable pour SCOUT en l'état.
- **Welcome to the Jungle via Mantiks** : API de données (endpoints jobs/companies, filtres contrat/télétravail/département, solde de crédits). Clé API et tarifs à obtenir ; auth non documentée sur la page consultée.
- **Indeed via HasData** : `GET /scrape/indeed/listing` (keyword + location + domain), clé `x-api-key`, ~1 000 crédits gratuits/mois, payant ensuite (dès 59 $/mois). HasData indique que les CGU d'Indeed peuvent restreindre l'accès automatisé : usage **lecture seule**, jamais de candidature automatique sur Indeed.

## 5. Points d'attention produit
- Le portfolio de Sandrine (M2 EMLV 2024–2026, ~3 ans d'alternance) correspond à un profil **junior/confirmé débutant**. Des intitulés comme *Global Brand Manager* ou *Cheffe de produit* seront probablement mal notés sur « niveau d'expérience » ; le moteur ne les favorise pas artificiellement.
- 40–45 k€ **nets** ≈ 53–60 k€ bruts : ambitieux pour ce niveau d'expérience. KENAYAH affichera l'écart et laissera Sandrine décider ; les offres sans salaire ne sont pas exclues.
- Le portfolio mentionne un poste d'*Assistante collecte 360* ; la mention « Directrice adjointe » (maquette) n'y figure pas : à clarifier lors de l'onboarding avant tout usage dans un CV.
- Cible 5–10 candidatures/jour : objectif de fonctionnement, pas une garantie.

## 6. Prochaines étapes (Phase 2)
Brancher Supabase Auth + persistance, import/validation du CV (`docs/profile-seed.json` comme pré-remplissage), premier connecteur France Travail testé, agents SCOUT et MATCH réels, agent LLM du chat avec outils de lecture DB.
