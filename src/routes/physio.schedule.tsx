import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { appointments } from "@/lib/mock-data";

export const Route = createFileRoute("/physio/schedule")({
  component: Schedule,
});

const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const days = ["Mon 09", "Tue 10", "Wed 11", "Thu 12", "Fri 13", "Sat 14"];

function Schedule() {
  const placed: Record<string, { time: string; label: string; mode: string }[]> = {
    "Thu 12": appointments.filter((a) => a.date === "2026-06-12").map((a) => ({
      time: a.time.slice(0, 5),
      label: a.patient,
      mode: a.mode,
    })),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Schedule</h1>
        <p className="text-sm text-muted-foreground">Week view • drag to reschedule (prototype)</p>
      </div>

      <Card className="overflow-x-auto p-0 shadow-card">
        <div className="grid min-w-[820px]" style={{ gridTemplateColumns: `80px repeat(${days.length}, 1fr)` }}>
          <div className="border-b border-r border-border bg-muted/40" />
          {days.map((d) => (
            <div key={d} className="border-b border-r border-border bg-muted/40 p-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground last:border-r-0">
              {d}
            </div>
          ))}
          {hours.map((h) => (
            <Fragment key={h}>
              <div className="border-b border-r border-border p-2 text-xs text-muted-foreground">{h}</div>
              {days.map((d) => {
                const slot = placed[d]?.find((s) => s.time.startsWith(h.slice(0, 2)));
                return (
                  <div key={`${d}-${h}`} className="relative h-16 border-b border-r border-border last:border-r-0">
                    {slot && (
                      <div className="absolute inset-1 rounded-md bg-primary/10 p-2 text-xs">
                        <p className="font-medium text-foreground">{slot.label}</p>
                        <Badge variant="outline" className="mt-1 h-4 px-1 text-[10px]">{slot.mode}</Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
}
