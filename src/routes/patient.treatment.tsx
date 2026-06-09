import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { currentPatient, treatmentPlan, exercises, physiotherapist } from "@/lib/mock-data";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/patient/treatment")({
  component: TreatmentPage,
});

function TreatmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Treatment plan</h1>
          <p className="text-sm text-muted-foreground">{treatmentPlan.phase} • Reviewed {treatmentPlan.reviewDate} by {physiotherapist.name}</p>
        </div>
        <Badge variant="outline" className="gap-1"><FileText className="h-3 w-3" /> v2.1</Badge>
      </div>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Clinical summary</h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Main complaint</dt><dd className="mt-1 text-sm">{currentPatient.mainComplaint}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Location</dt><dd className="mt-1 text-sm">{currentPatient.painLocation}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Duration</dt><dd className="mt-1 text-sm">{currentPatient.duration}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Diagnosis</dt><dd className="mt-1 text-sm">{treatmentPlan.diagnosis}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Conditions</dt><dd className="mt-1 flex flex-wrap gap-1">{currentPatient.conditions.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Medications</dt><dd className="mt-1 flex flex-wrap gap-1">{currentPatient.medications.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}</dd></div>
        </dl>
      </Card>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Goals</h2>
        <div className="mt-4 space-y-4">
          {treatmentPlan.goals.map((g) => (
            <div key={g.label}>
              <div className="flex justify-between text-sm"><span>{g.label}</span><span className="text-muted-foreground">{g.progress}%</span></div>
              <Progress value={g.progress} className="mt-1.5" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Prescribed exercises</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {exercises.map((e) => (
            <div key={e.name} className="rounded-lg border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.region}</p>
                </div>
                <Badge variant="outline">{e.frequency}</Badge>
              </div>
              <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                <span><b className="text-foreground">{e.sets}</b> sets</span>
                <span><b className="text-foreground">{e.reps}</b> reps</span>
                {e.duration !== "—" && <span><b className="text-foreground">{e.duration}</b></span>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
