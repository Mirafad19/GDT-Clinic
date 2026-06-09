import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  currentPatient,
  physiotherapist,
  appointments,
  treatmentPlan,
  painTrend,
  exercises,
} from "@/lib/mock-data";
import {
  CalendarDays,
  Dumbbell,
  LineChart as LineIcon,
  Video,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/patient/")({
  component: PatientDashboard,
});

function PatientDashboard() {
  const upcoming = appointments.find((a) => a.status === "Upcoming" && a.patient === currentPatient.name);
  const completedToday = 4;
  const totalToday = exercises.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="font-display text-3xl">{currentPatient.name.split(" ")[0]} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">{treatmentPlan.phase} • Reviewed {treatmentPlan.reviewDate}</p>
        </div>
        <Button asChild><Link to="/patient/book">Book a session</Link></Button>
      </div>

      {/* Top grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Next appointment */}
        <Card className="lg:col-span-2 overflow-hidden p-0 shadow-card">
          <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/80 p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider opacity-80">Next appointment</p>
              <Badge className="bg-white/20 text-white hover:bg-white/30">{upcoming?.mode}</Badge>
            </div>
            <h2 className="mt-3 font-display text-3xl">{upcoming?.type}</h2>
            <p className="mt-1 text-white/85">{upcoming?.date} at {upcoming?.time} • {physiotherapist.name}</p>
            <div className="mt-5 flex gap-2">
              <Button asChild variant="secondary" className="rounded-full">
                <Link to="/patient/telehealth"><Video className="mr-1.5 h-4 w-4" /> Join session</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full text-white hover:bg-white/15 hover:text-white">
                <Link to="/patient/appointments">View all</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Today's exercises */}
        <Card className="p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Today's exercises</p>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 font-display text-3xl">{completedToday}<span className="text-muted-foreground text-lg">/{totalToday}</span></p>
          <Progress value={(completedToday / totalToday) * 100} className="mt-3" />
          <Button asChild variant="ghost" size="sm" className="mt-3 -ml-2 text-primary">
            <Link to="/patient/exercises">Continue <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Pain (today)", value: "3/10", trend: "↓ from 8", icon: LineIcon, tone: "text-success" },
          { label: "Recovery", value: "62%", trend: "+8% this week", icon: LineIcon, tone: "text-success" },
          { label: "Compliance", value: "86%", trend: "Great", icon: Dumbbell, tone: "text-primary" },
          { label: "Sessions left", value: "4", trend: "of 8 booked", icon: CalendarDays, tone: "text-foreground" },
        ].map((s) => (
          <Card key={s.label} className="p-5 shadow-card">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">{s.label}</span>
              <s.icon className="h-4 w-4" />
            </div>
            <p className="mt-2 font-display text-2xl">{s.value}</p>
            <p className={`mt-1 text-xs ${s.tone}`}>{s.trend}</p>
          </Card>
        ))}
      </div>

      {/* Charts + plan */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg">Recovery trend</h3>
              <p className="text-xs text-muted-foreground">Pain score vs. functional score over 6 weeks</p>
            </div>
            <Badge variant="outline" className="text-success">Improving</Badge>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={painTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <XAxis dataKey="week" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="pain" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} name="Pain" />
                <Line type="monotone" dataKey="fn" stroke="var(--color-secondary)" strokeWidth={2.5} dot={{ r: 3 }} name="Function" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Treatment goals</h3>
          <div className="mt-4 space-y-4">
            {treatmentPlan.goals.map((g) => (
              <div key={g.label}>
                <div className="flex justify-between text-sm">
                  <span>{g.label}</span>
                  <span className="text-muted-foreground">{g.progress}%</span>
                </div>
                <Progress value={g.progress} className="mt-1.5" />
              </div>
            ))}
          </div>
          <Button asChild variant="outline" size="sm" className="mt-5 w-full">
            <Link to="/patient/treatment">View full plan</Link>
          </Button>
        </Card>
      </div>

      {/* Latest message */}
      <Card className="flex items-start gap-4 p-5 shadow-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{physiotherapist.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">"Excellent. Let's progress to 3×10 and add side-blank knee taps. I'll update the plan now."</p>
        </div>
        <Button asChild variant="outline" size="sm"><Link to="/patient/messages">Reply</Link></Button>
      </Card>
    </div>
  );
}
