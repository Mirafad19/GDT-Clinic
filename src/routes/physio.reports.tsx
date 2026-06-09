import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/physio/reports")({
  component: Reports,
});

const reports = [
  { name: "Assessment report — Adaeze Okafor", type: "Clinical", date: "2026-06-09" },
  { name: "Progress report — Emeka Adebola", type: "Clinical", date: "2026-06-08" },
  { name: "Discharge report — Zainab Ibrahim", type: "Clinical", date: "2026-06-05" },
  { name: "Monthly revenue summary — May 2026", type: "Financial", date: "2026-06-01" },
];

function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Reports</h1>
        <p className="text-sm text-muted-foreground">Clinical and financial reports • export as PDF or Word</p>
      </div>

      <div className="grid gap-3">
        {reports.map((r) => (
          <Card key={r.name} className="flex items-center justify-between p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={r.type === "Clinical" ? "secondary" : "outline"}>{r.type}</Badge>
              <Button size="sm" variant="outline"><Download className="mr-1 h-3 w-3" /> PDF</Button>
              <Button size="sm" variant="ghost">Word</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
