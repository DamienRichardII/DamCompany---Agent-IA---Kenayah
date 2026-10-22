import { isDemo } from "@/lib/env";
import { DEMO, EMPTY } from "./demo";
/** Point d'accès unique. TODO(phase 2): remplacer par appels API réels (FastAPI/Supabase). */
export const getDataset = () => (isDemo ? DEMO : EMPTY);
