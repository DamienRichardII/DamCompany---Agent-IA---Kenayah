"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import type { Dataset } from "@/data/types";
import { EmptyState } from "@/components/ui/primitives";
export function WeekChart({ daily }: { daily: Dataset["daily"] }) {
  if (!daily.length) return <EmptyState title="Pas encore de données" hint="Le graphique se remplira avec l'activité réelle des agents." />;
  return (<div className="h-64" role="img" aria-label="Offres découvertes et candidatures envoyées par jour"><ResponsiveContainer>
    <BarChart data={daily}><CartesianGrid stroke="#E8E7E2" vertical={false} /><XAxis dataKey="day" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} />
      <Tooltip cursor={{ fill: "#F7F6F2" }} contentStyle={{ borderRadius: 12, border: "1px solid #E8E7E2" }} /><Legend formatter={(v) => <span style={{ color: "#0A0A0A" }}>{v}</span>} />
      <Bar dataKey="discovered" name="Offres découvertes" fill="#EFFF00" stroke="#0A0A0A" strokeWidth={.5} radius={[4,4,0,0]} />
      <Bar dataKey="sent" name="Candidatures envoyées" fill="#0A0A0A" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>);
}
