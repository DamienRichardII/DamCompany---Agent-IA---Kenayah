export interface Guide { title: string; hello: string; features: { label: string; text: string }[]; tip?: string }
/** Guides contextuels de Kenayah : ton pro mais jeune, tutoiement. Ne décrivent que ce qui existe réellement. */
export const GUIDES: Record<string, Guide> = {
  "/": { title: "Ton tableau de bord", hello: "Hello Sandrine ! Ici, c'est ton QG : tout ce que je fais pour toi, en un coup d'œil.",
    features: [
      { label: "Les 8 compteurs", text: "Offres trouvées, qualifiées, candidatures préparées/envoyées, réponses, refus, entretiens. Les cartes à bordure jaune sont les plus importantes." },
      { label: "Le graphique de la semaine", text: "Jaune = offres découvertes, noir = candidatures envoyées, jour par jour." },
      { label: "Dernières candidatures", text: "Les derniers dossiers avec leur statut." },
      { label: "Le point « — »", text: "Si tu vois un tiret, c'est que je n'ai pas encore de vraie donnée. Je n'invente jamais de chiffres." }],
    tip: "Le bouton « Lancer une recherche » s'activera dès que mon moteur de recherche sera branché." },
  "/offres": { title: "Offres découvertes", hello: "Toutes les offres que j'ai dénichées, triées par pertinence.",
    features: [
      { label: "Recherche", text: "Tape une entreprise ou un poste pour filtrer la liste." },
      { label: "Score IA", text: "Note sur 100 : 85+ = prioritaire (jaune), 70-84 = intéressante (noir), en dessous = à examiner." },
      { label: "Tri", text: "Le bouton « Tri score » inverse l'ordre croissant/décroissant." },
      { label: "Export CSV", text: "Télécharge le tableau pour l'ouvrir dans Excel." },
      { label: "Clic sur une entreprise", text: "Ouvre la fiche détaillée de l'offre." }] },
  "/opportunites": { title: "Opportunités prioritaires", hello: "Ici, uniquement le haut du panier : les offres notées 85 ou plus.",
    features: [
      { label: "Pourquoi cette sélection ?", text: "Ce sont les offres les plus alignées avec ton profil, ta zone et tes missions." },
      { label: "À faire en premier", text: "Ouvre-les une par une, vérifie, puis valide la candidature." },
      { label: "Tableau complet", text: "Recherche, tri et export CSV comme sur « Offres »." }],
    tip: "Pas d'offre ? Normal au début : on a besoin de la première recherche réelle." },
  "/candidatures": { title: "Tes candidatures", hello: "Le suivi de tout ce qui est préparé, envoyé ou en attente de réponse.",
    features: [
      { label: "Statuts", text: "À valider (jaune), Envoyée, Accusé, Entretien, Refus… un coup d'œil suffit." },
      { label: "Prochaine action", text: "Je te dis ce qu'il reste à faire pour chaque dossier." },
      { label: "Règle d'or", text: "Une candidature n'est « envoyée » que si j'ai une preuve (confirmation, mail…)." },
      { label: "Export CSV", text: "Pour garder une trace de ton côté." }] },
  "/candidatures/[id]": { title: "Fiche candidature", hello: "Le dossier complet d'une offre.",
    features: [
      { label: "Lien original", text: "Va voir l'annonce chez l'entreprise." },
      { label: "Score & statut", text: "Mon analyse de compatibilité et où en est le dossier." },
      { label: "Approuver / Refuser", text: "C'est toi qui décides : sans ton feu vert en mode assisté, rien ne part." },
      { label: "CV, lettre, preuves", text: "Ils apparaîtront ici dès que mon module de candidature sera branché." }] },
  "/entretiens": { title: "Entretiens", hello: "Là où je regroupe tes invitations à des entretiens.",
    features: [
      { label: "Détection", text: "Quand ta messagerie sera connectée (avec ton accord), je repérerai les invitations dans tes mails." },
      { label: "Rien sans ton accord", text: "Je ne confirme aucun entretien et ne crée aucun événement sans ton autorisation." }] },
  "/documents": { title: "Documents & CV", hello: "Ton CV et les versions ciblées pour chaque offre.",
    features: [
      { label: "CV & portfolio", text: "Ton CV (consultable et téléchargeable, accès privé) et ton portfolio sont ici. Le CV est importé : tu dois encore le confirmer, je n'utilise que ce qui est vrai et validé." },
      { label: "Versions ciblées", text: "Un CV et une lettre adaptés à chaque offre, gardés en historique." },
      { label: "Zéro invention", text: "Je ne rajoute jamais d'expérience ou de compétence que tu n'as pas." }] },
  "/centre-de-controle": { title: "Centre de contrôle", hello: "Mon équipe de 7 agents, et tu es la boss.",
    features: [
      { label: "Les 7 cartes", text: "Scout (cherche), Match (note), Tailor (adapte CV/lettre), Apply (envoie), Tracker (suit les mails), Analyst (analyse), Orchestrator (coordonne)." },
      { label: "Voir les logs", text: "Déplie le journal d'un agent pour voir ce qu'il a fait." },
      { label: "Indicateur jaune qui pulse", text: "L'agent travaille en ce moment." },
      { label: "Boutons Pause / Lancer", text: "Ils seront actifs quand le moteur sera branché (pour l'instant ils sont grisés)." }] },
  "/chat": { title: "Chat avec moi", hello: "Pose-moi tes questions, comme à une collègue.",
    features: [
      { label: "Exemples", text: "« Quelles sont mes meilleures opportunités ? », « offres avec un score supérieur à 85 », « combien d'entreprises m'ont répondu ? »." },
      { label: "Suggestions", text: "Clique sur une bulle pour poser la question en un tap." },
      { label: "Mes réponses", text: "Elles viennent uniquement de tes vraies données. Si j'ai rien, je te le dis." }] },
  "/statistiques": { title: "Statistiques", hello: "Les chiffres qui montrent ce qui marche (ou pas).",
    features: [
      { label: "Activité quotidienne", text: "Offres trouvées vs candidatures envoyées." },
      { label: "Bientôt", text: "Taux de réponse, secteurs, entreprises, délais : calculés seulement avec de vraies données." }] },
  "/rapports": { title: "Rapports quotidiens", hello: "Chaque jour ouvré, je te prépare un résumé.",
    features: [
      { label: "Contenu", text: "Offres analysées, candidatures envoyées, réponses, entretiens, erreurs et actions conseillées." },
      { label: "Quand ?", text: "Prévu vers 17h30, du lundi au vendredi, dès que l'automatisation sera active." },
      { label: "Formats", text: "Consultation ici, par email et en PDF (à venir)." }] },
  "/notifications": { title: "Notifications", hello: "Tout ce qui demande ton attention.",
    features: [
      { label: "Ce que tu verras", text: "Candidatures à valider, entretiens détectés, erreurs importantes." },
      { label: "Pour l'instant", text: "C'est vide : rien ne tourne encore en vrai." }] },
  "/parametres": { title: "Paramètres de recherche", hello: "C'est ici que tu me dis ce que tu veux vraiment.",
    features: [
      { label: "Salaire net ou brut", text: "Choisis net ou brut : je te montre l'équivalent estimé. Tant que c'est pas confirmé, le filtre salaire reste éteint." },
      { label: "Pondération du score", text: "Règle l'importance de chaque critère. Le total doit faire 100 %." },
      { label: "Niveau d'automatisation", text: "Manuel (tu envoies), Assisté (je prépare, tu valides) ou Automatique encadré (canaux autorisés uniquement)." }],
    tip: "Pour l'instant, les réglages ne sont pas encore enregistrés côté serveur." },
  "/integrations": { title: "Intégrations", hello: "Les services que je peux brancher : sources d'offres, Gmail, agenda.",
    features: [
      { label: "Statut honnête", text: "« Non connecté » tant que je ne l'ai pas testé pour de vrai." },
      { label: "Ton contrôle", text: "Gmail/Agenda : uniquement avec ton autorisation, révocable à tout moment." },
      { label: "Plateformes", text: "Certaines n'autorisent pas la candidature automatique : dans ce cas, je prépare et c'est toi qui envoies." }] },
  "/securite": { title: "Sécurité & confidentialité", hello: "Tes données perso, c'est sérieux.",
    features: [
      { label: "Ce qui est en place", text: "Accès protégé par compte, données cloisonnées par utilisatrice, journal des actions." },
      { label: "Annonces & mails", text: "Je les considère comme non fiables : aucune consigne cachée dedans ne peut me détourner." },
      { label: "Ton droit", text: "Export et suppression de tes données (à venir dans l'interface)." }] },
  "/onboarding": { title: "Onboarding", hello: "Bienvenue ! On configure tout ensemble, en 7 étapes.",
    features: [
      { label: "Ordre conseillé", text: "Importer ton CV → vérifier → préférences → net/brut → connexions → niveau d'automatisation → test à blanc." },
      { label: "Test à blanc", text: "On simule une candidature avant d'activer quoi que ce soit." }] },
  "/connexion": { title: "Connexion", hello: "Coucou ! Connecte-toi pour accéder à ton espace privé.",
    features: [{ label: "Accès", text: "Email + mot de passe fournis par DamCompany." }] },
};
export function guideFor(path: string): Guide {
  if (GUIDES[path]) return GUIDES[path]!;
  if (path.startsWith("/candidatures/")) return GUIDES["/candidatures/[id]"]!;
  return { title: "Cette page", hello: "Hello ! Je suis là si tu as une question.", features: [{ label: "Chat", text: "Clique sur l'onglet « Discuter » pour me parler." }] };
}
