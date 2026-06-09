import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { physioPatients, exercises, treatmentPlan } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/physio/plans")({
  component: Plans,
});

function Plans() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Treatment plans</h1>
          <p className="text-sm text-muted-foreground">Build and adjust plans per patient</p>
        </div>
        <Button><Plus className="mr-1 h-4 w-4" /> New plan</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="p-2 shadow-card">
          <ul className="space-y-1">
            {physioPatients.map((p, i) => (
              <li key={p.id}>
                <button className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${i === 0 ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.complaint}</div>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card className="p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">{physioPatients[0].name}</h2>
              <Badge variant="secondary">{treatmentPlan.phase}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{treatmentPlan.diagnosis}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {treatmentPlan.goals.map((g) => (
                <div key={g.label} className="rounded-md border border-border p-3 text-sm">
                  <div className="flex items-center justify-between"><span>{g.label}</span><span className="text-muted-foreground">{g.progress}%</span></div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Prescribed exercises</h3>
              <Button size="sm" variant="outline"><Plus className="mr-1 h-3 w-3" /> Add exercise</Button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {exercises.map((e) => (
                <div key={e.name} className="rounded-md border border-border p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium">{e.name}</p>
                    <Badge variant="outline" className="text-[10px]">{e.region}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{e.sets}×{e.reps} • {e.frequency}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
