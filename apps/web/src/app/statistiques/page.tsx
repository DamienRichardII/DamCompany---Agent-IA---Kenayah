import { PageHeader, EmptyState } from "@/components/ui/primitives"; import { getDataset } from "@/data"; import { WeekChart } from "@/components/dashboard/Charts"; import { Card } from "@/components/ui/primitives";
export default function Page() { const d = getDataset(); return (<><PageHeader title="Statistiques" subtitle="Taux de réponse, secteurs, entreprises, délais, funnel." />
  <Card><h2 className="mb-4 font-semibold">Activité quotidienne</h2><WeekChart daily={d.daily} /></Card>
  {d.applications.length === 0 && <div className="mt-4"><EmptyState title="Analyses indisponibles" hint="ANALYST calculera répartition par secteur/entreprise, funnel et délais uniquement à partir de données réelles." /></div>}</>); }
