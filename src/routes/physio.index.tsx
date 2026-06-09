import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments, physioPatients } from "@/lib/mock-data";
import { Users, CalendarCheck, MessageSquare, TrendingUp, Video } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/physio/")({
  component: PhysioDashboard,
});

const week = [
  { day: "Mon", sessions: 8 }, { day: "Tue", sessions: 10 }, { day: "Wed", sessions: 7 },
  { day: "Thu", sessions: 12 }, { day: "Fri", sessions: 9 }, { day: "Sat", sessions: 5 }, { day: "Sun", sessions: 0 },
];

function PhysioDashboard() {
  const today = appointments.filter((a) => a.date === "2026-06-12");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Good morning, Dr. Bakare</h1>
          <p className="text-sm text-muted-foreground">You have {today.length} sessions today.</p>
        </div>
        <Button asChild><Link to="/physio/schedule">View schedule</Link></Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active patients", value: 28, icon: Users, tone: "text-foreground" },
          { label: "Sessions this week", value: 51, icon: CalendarCheck, tone: "text-primary" },
          { label: "Unread messages", value: 6, icon: MessageSquare, tone: "text-warning" },
          { label: "Avg. recovery", value: "+14%", icon: TrendingUp, tone: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="p-5 shadow-card">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">{s.label}</span>
              <s.icon className="h-4 w-4" />
            </div>
            <p className={`mt-2 font-display text-3xl ${s.tone}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Today's schedule</h3>
          <div className="mt-4 space-y-3">
            {today.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-14 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                    <span className="font-display text-sm">{a.time}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{a.patient}</p>
                    <p className="text-xs text-muted-foreground">{a.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">{a.mode === "Telehealth" && <Video className="h-3 w-3" />}{a.mode}</Badge>
                  <Button size="sm" variant={a.mode === "Telehealth" ? "default" : "outline"}>{a.mode === "Telehealth" ? "Start" : "Check-in"}</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Sessions • this week</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={week} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="sessions" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="shadow-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="font-display text-lg">Patients needing attention</h3>
          <Button asChild variant="ghost" size="sm"><Link to="/physio/patients">View all</Link></Button>
        </div>
        <div className="divide-y divide-border">
          {physioPatients.slice(0, 4).map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.complaint} • {p.phase}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Compliance</p>
                  <p className={`text-sm font-medium ${p.compliance < 70 ? "text-warning" : "text-success"}`}>{p.compliance}%</p>
                </div>
                <Button size="sm" variant="outline">Open</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
