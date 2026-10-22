from abc import ABC, abstractmethod
from datetime import datetime
from pydantic import BaseModel

class RawOffer(BaseModel):
    external_id: str; url: str; title: str; company: str | None = None; location: str | None = None
    description: str | None = None; salary_text: str | None = None; published_at: datetime | None = None

class JobConnector(ABC):
    key: str
    terms_checked: bool = False     # CGU/API vérifiées
    tested: bool = False            # jamais « opérationnel » avant test réel
    allows_auto_apply: bool = False

    @abstractmethod
    async def search(self, titles: list[str], regions: list[str]) -> list[RawOffer]: ...

    @property
    def status(self) -> str:
        return "operationnel" if (self.terms_checked and self.tested) else "non_teste"
