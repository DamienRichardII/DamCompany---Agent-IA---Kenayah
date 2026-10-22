import { PageHeader, EmptyState } from "@/components/ui/primitives";
export default function Page() { return (<><PageHeader title="Rapports quotidiens" /><EmptyState title="Aucun rapport généré" hint="Le premier rapport sera produit à 17h30 un jour ouvré après une exécution réelle (consultation, email, PDF, historique)." /></>); }
