from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Toutes les valeurs sensibles viennent de l'environnement (jamais du code). Voir .env.example."""
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    env: str = "production"                 # "demo" autorise les données fictives
    supabase_url: str = ""
    supabase_service_key: str = ""
    anthropic_api_key: str = ""
    redis_url: str = "redis://localhost:6379/0"
    timezone: str = "Europe/Paris"
    schedule_times: str = "07:00,09:00,11:00,14:00,17:30"
    hasdata_api_key: str = ""
    mantiks_api_key: str = ""

settings = Settings()
