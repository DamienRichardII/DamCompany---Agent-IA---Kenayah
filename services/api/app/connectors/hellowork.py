from .base import JobConnector, RawOffer

class HelloworkConnector(JobConnector):
    """ATTENTION : l'API https://ats-partner.hellowork.com/v1/api est une API « ATS partner » (signin JWT + mise à jour du statut
    de candidatures). Elle ne permet PAS de rechercher des offres. Inutilisable pour SCOUT ; à ne contacter que pour un éventuel
    partenariat. Connecteur volontairement non implémenté."""
    key = "hellowork"
    async def search(self, titles, regions) -> list[RawOffer]:
        raise NotImplementedError("API Hellowork ATS partner : pas de recherche d'offres.")
