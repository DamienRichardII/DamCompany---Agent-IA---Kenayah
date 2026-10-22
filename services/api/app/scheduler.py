from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from .config import settings

JOBS = {"07:00": ["scout", "match"], "09:00": ["tailor"], "11:00": ["apply", "tracker"], "14:00": ["scout", "tracker"], "17:30": ["analyst", "orchestrator"]}

def idempotency_key(day: str, slot: str, agent: str) -> str:
    """Un créneau/agent/jour ne s'exécute qu'une fois : le rattrapage après incident ne renvoie jamais une candidature."""
    return f"{day}:{slot}:{agent}"

def build_scheduler(run_slot) -> AsyncIOScheduler:
    s = AsyncIOScheduler(timezone=settings.timezone)
    for slot in settings.schedule_times.split(","):
        h, m = map(int, slot.strip().split(":"))
        s.add_job(run_slot, CronTrigger(day_of_week="mon-fri", hour=h, minute=m, timezone=settings.timezone), args=[slot.strip()], id=f"slot-{slot}", misfire_grace_time=3600, coalesce=True)
    return s
