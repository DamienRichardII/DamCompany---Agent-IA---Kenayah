DEFAULT_WEIGHTS = {"competences": 30, "missions": 25, "localisation": 15, "experience": 15, "salaire": 10, "secteur_avantages": 5}

def global_score(parts: dict[str, float], weights: dict[str, int] | None = None) -> int:
    w = weights or DEFAULT_WEIGHTS
    total = sum(w.values())
    if total != 100:
        raise ValueError("La somme des pondérations doit être égale à 100")
    return round(sum(max(0, min(100, parts[k])) * w[k] for k in w) / total)

def tier(score: int) -> str:
    return "prioritaire" if score >= 85 else "intéressante" if score >= 70 else "à examiner"
