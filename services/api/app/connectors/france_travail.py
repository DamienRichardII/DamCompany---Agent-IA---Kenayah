from .base import JobConnector, RawOffer

class FranceTravailConnector(JobConnector):
    """API officielle « Offres d'emploi » de France Travail (OAuth2 client_credentials).
    À implémenter en phase 2 avec identifiants fournis via variables d'environnement.
    Non testé → statut « non_teste »."""
    key = "france_travail"
    async def search(self, titles, regions) -> list[RawOffer]:
        raise NotImplementedError("Phase 2 : nécessite FRANCE_TRAVAIL_CLIENT_ID / FRANCE_TRAVAIL_CLIENT_SECRET")
