from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone

@dataclass
class AgentResult:
    ok: bool; actions: int = 0; message: str = ""; decisions: list[dict] = field(default_factory=list)

class Agent(ABC):
    name: str; fn: str
    @abstractmethod
    async def run(self, ctx: dict) -> AgentResult: ...

class NotImplementedAgent(Agent):
    """Agent déclaré mais non encore implémenté : il le DIT au lieu de simuler un résultat."""
    async def run(self, ctx: dict) -> AgentResult:
        return AgentResult(ok=False, message=f"{self.name}: non implémenté (aucune simulation).")

def _mk(n: str, f: str) -> type[Agent]: return type(n.capitalize() + "Agent", (NotImplementedAgent,), {"name": n, "fn": f})
REGISTRY: dict[str, type[Agent]] = {n: _mk(n, f) for n, f in {
    "scout": "Recherche et normalisation des offres", "match": "Score de compatibilité /100", "tailor": "CV et lettres ciblés vérifiés",
    "apply": "Soumission sur canaux autorisés", "tracker": "Suivi des emails et statuts", "analyst": "Analyses et recommandations",
    "orchestrator": "Supervision, limites, validations"}.items()}
