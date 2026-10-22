import { getDataset } from "@/data"; import { PageHeader } from "@/components/ui/primitives"; import { ApplicationsTable } from "@/components/ui/ApplicationsTable";
export default function Page() { return (<><PageHeader title="Opportunités prioritaires" subtitle="Score ≥ 85 : à traiter en premier." /><ApplicationsTable rows={getDataset().applications} minScore={85} /></>); }
