"""Conversion brut/net INDICATIVE (France). Ne sert jamais à exclure une offre ; les offres sans salaire restent éligibles."""
RATES = {"non-cadre": 0.78, "cadre": 0.75}
def gross_to_net(g: float, statut: str = "cadre") -> int: return round(g * RATES[statut])
def net_to_gross(n: float, statut: str = "cadre") -> int: return round(n / RATES[statut])

def salary_filter_active(basis: str, confirmed: bool) -> bool:
    """Le filtre salaire n'est actif qu'après confirmation explicite net/brut par la candidate."""
    return confirmed and basis in ("net_annuel", "brut_annuel")
