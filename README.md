# KENAYAH AI — Powered by DamCompany
*Your Career. Our Intelligence.* · Application privée — assistante IA de Sandrine.

Monorepo : `apps/web` (Next.js 15, TS strict, Tailwind, Motion) · `services/api` (FastAPI, agents, scheduler) · `supabase/` (migrations SQL) · `docs/`.

## Démarrer
```bash
cd apps/web && npm install && NEXT_PUBLIC_KENAYAH_ENV=demo npm run dev   # UI avec données fictives étiquetées
cd services/api && pip install -r requirements.txt && pytest && uvicorn app.main:app
```
Production : sans `NEXT_PUBLIC_KENAYAH_ENV=demo`, aucun compteur ne montre de données fictives. Voir `docs/ARCHITECTURE.md` pour l'état réel (ce qui est fait / simulé / à faire).
