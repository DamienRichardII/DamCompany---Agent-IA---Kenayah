"""Garde-fous métier appliqués côté serveur avant toute soumission."""
from dataclasses import dataclass

@dataclass
class SubmitContext:
    mode: str                   # manuel | assiste | automatique_encadre
    profile_verified: bool
    salary_confirmed: bool
    auto_paused: bool
    channel_authorized: bool    # canal explicitement approuvé ET conditions d'utilisation vérifiées
    approved_by_user: bool
    already_applied: bool
    development_mode: bool = False

def can_submit(c: SubmitContext) -> tuple[bool, str]:
    if c.development_mode: return False, "Mode développement : aucune candidature réelle."
    if c.already_applied: return False, "Candidature déjà envoyée (anti-doublon)."
    if not c.profile_verified: return False, "Profil non confirmé par la candidate."
    if not c.salary_confirmed: return False, "Salaire net/brut non confirmé."
    if c.mode == "manuel": return False, "Mode manuel : la candidate soumet elle-même."
    if not c.channel_authorized: return False, "Canal non autorisé : préparation seulement."
    if c.mode == "assiste" and not c.approved_by_user: return False, "Validation de la candidate requise."
    if c.mode == "automatique_encadre" and c.auto_paused: return False, "Soumissions automatiques en pause."
    return True, "ok"

def mark_sent_allowed(proof: dict | None) -> bool:
    """Une candidature ne passe 'envoyée' qu'avec une preuve fiable."""
    return bool(proof and proof.get("channel") and (proof.get("confirmation_id") or proof.get("screenshot_path") or proof.get("email_message_id")))
