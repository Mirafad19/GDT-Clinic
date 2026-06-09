import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments, currentPatient } from "@/lib/mock-data";
import { Video, MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/patient/appointments")({
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const mine = appointments.filter((a) => a.patient === currentPatient.name);
  const upcoming = mine.filter((a) => a.status === "Upcoming");
  const past = mine.filter((a) => a.status === "Completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Appointments</h1>
        <p className="text-sm text-muted-foreground">All upcoming and past sessions with your physiotherapist.</p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-xl">Upcoming</h2>
        <div className="grid gap-3">
          {upcoming.map((a) => (
            <Card key={a.id} className="flex flex-wrap items-center justify-between gap-4 p-5 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-[10px] uppercase tracking-wide">{a.date.slice(5, 7) === "06" ? "Jun" : "—"}</span>
                  <span className="font-display text-lg leading-none">{a.date.slice(-2)}</span>
                </div>
                <div>
                  <p className="font-medium">{a.type}</p>
                  <p className="text-xs text-muted-foreground">{a.time} • {a.mode}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  {a.mode === "Telehealth" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />} {a.mode}
                </Badge>
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button size="sm">{a.mode === "Telehealth" ? "Join" : "Details"}</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl">History</h2>
        <Card className="divide-y divide-border shadow-card">
          {past.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{a.type}</p>
                  <p className="text-xs text-muted-foreground">{a.date} • {a.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{a.status}</Badge>
                <Button size="sm" variant="ghost">Session notes</Button>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
