import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { physioPatients } from "@/lib/mock-data";
import { Search, MessageSquare, FileText } from "lucide-react";

export const Route = createFileRoute("/physio/patients")({
  component: PhysioPatients,
});

function PhysioPatients() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Patients</h1>
          <p className="text-sm text-muted-foreground">{physioPatients.length} active in your caseload</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search patients…" className="pl-9" />
        </div>
      </div>

      <Card className="overflow-hidden shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left">Patient</th>
              <th className="px-5 py-3 text-left">Complaint</th>
              <th className="px-5 py-3 text-left">Phase</th>
              <th className="px-5 py-3 text-left">Last seen</th>
              <th className="px-5 py-3 text-left">Compliance</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {physioPatients.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30">
                <td className="px-5 py-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.id}</div>
                </td>
                <td className="px-5 py-4">{p.complaint}</td>
                <td className="px-5 py-4"><Badge variant="secondary">{p.phase}</Badge></td>
                <td className="px-5 py-4 text-muted-foreground">{p.lastSeen}</td>
                <td className="px-5 py-4">
                  <span className={p.compliance < 70 ? "text-warning" : "text-success"}>{p.compliance}%</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost"><MessageSquare className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost"><FileText className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline">Open</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
