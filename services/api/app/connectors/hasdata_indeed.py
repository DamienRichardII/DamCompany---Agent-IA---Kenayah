import httpx
from ..config import settings
from .base import JobConnector, RawOffer

class HasDataIndeedConnector(JobConnector):
    """Indeed via HasData (API payante, clé x-api-key). Données publiques scrapées par le fournisseur :
    les CGU d'Indeed peuvent restreindre l'accès automatisé -> lecture seule, JAMAIS de candidature automatique."""
    key = "indeed_hasdata"
    allows_auto_apply = False
    BASE = "https://api.hasdata.com/scrape/indeed/listing"

    def __init__(self, api_key: str | None = None, client: httpx.AsyncClient | None = None):
        self.api_key = api_key or getattr(settings, "hasdata_api_key", "")
        self.client = client

    async def search(self, titles: list[str], regions: list[str]) -> list[RawOffer]:
        if not self.api_key:
            raise RuntimeError("HASDATA_API_KEY manquante")
        out: list[RawOffer] = []
        c = self.client or httpx.AsyncClient(timeout=30)
        for t in titles:
            for r in regions:
                resp = await c.get(self.BASE, params={"keyword": t, "location": r, "domain": "fr.indeed.com", "datePosted": "3"}, headers={"x-api-key": self.api_key})
                resp.raise_for_status()
                for j in resp.json().get("jobs", []):
                    out.append(RawOffer(external_id=str(j.get("jobKey") or j.get("id") or j["url"]), url=j["url"], title=j.get("title", ""),
                        company=j.get("company"), location=j.get("location"), description=j.get("description"), salary_text=j.get("salary")))
        return out
