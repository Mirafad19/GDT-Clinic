import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { exercises } from "@/lib/mock-data";
import { PlayCircle } from "lucide-react";

export const Route = createFileRoute("/patient/exercises")({
  component: ExercisesPage,
});

function ExercisesPage() {
  const [done, setDone] = useState<Record<string, boolean>>({
    "Neck retraction": true,
    "Cat-cow mobilisation": true,
    "Bird-dog hold": true,
    "Glute bridge": true,
  });
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Exercise library</h1>
          <p className="text-sm text-muted-foreground">{completed} of {exercises.length} complete today</p>
        </div>
        <Button variant="outline">Upload progress video</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {exercises.map((e) => {
          const isDone = !!done[e.name];
          return (
            <Card key={e.name} className={`overflow-hidden shadow-card transition ${isDone ? "ring-1 ring-success/40" : ""}`}>
              <div className="relative aspect-video bg-gradient-to-br from-primary/15 via-accent/40 to-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-primary/80" />
                </div>
                <Badge className="absolute right-3 top-3 bg-background/90 text-foreground hover:bg-background">{e.region}</Badge>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg">{e.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{e.frequency}</p>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    Done
                    <Checkbox checked={isDone} onCheckedChange={(v) => setDone((d) => ({ ...d, [e.name]: !!v }))} />
                  </label>
                </div>
                <div className="mt-4 flex gap-4 text-sm">
                  <div><p className="text-xs text-muted-foreground">Sets</p><p className="font-display text-lg">{e.sets}</p></div>
                  <div><p className="text-xs text-muted-foreground">Reps</p><p className="font-display text-lg">{e.reps}</p></div>
                  {e.duration !== "—" && (<div><p className="text-xs text-muted-foreground">Duration</p><p className="font-display text-lg">{e.duration}</p></div>)}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
