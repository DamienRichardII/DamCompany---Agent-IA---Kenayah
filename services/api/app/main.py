from fastapi import FastAPI
from .agents.base import REGISTRY
from .config import settings
from .scoring import DEFAULT_WEIGHTS

app = FastAPI(title="KENAYAH AI API", version="0.1.0", description="Powered by DamCompany")

@app.get("/health")
def health(): return {"status": "ok", "env": settings.env}

@app.get("/agents")
def agents(): return [{"id": k, "fn": v.fn, "implemented": False} for k, v in REGISTRY.items()]

@app.get("/scoring/weights")
def weights(): return DEFAULT_WEIGHTS
