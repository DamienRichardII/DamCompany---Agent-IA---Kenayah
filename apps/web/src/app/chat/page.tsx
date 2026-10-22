import { PageHeader } from "@/components/ui/primitives"; import { ChatPanel } from "@/components/chat/ChatPanel";
export default function Page() { return (<><PageHeader title="Chat KENAYAH" subtitle="Réponses calculées à partir des données réelles du système." /><div className="h-[70vh] overflow-hidden rounded-card border border-line bg-paper"><ChatPanel /></div></>); }
