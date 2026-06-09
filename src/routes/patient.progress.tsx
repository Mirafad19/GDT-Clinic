import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { painTrend } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

export const Route = createFileRoute("/patient/progress")({
  component: ProgressPage,
});

const functional = [
  { name: "Walking", score: 82 },
  { name: "Sitting", score: 70 },
  { name: "Standing", score: 75 },
  { name: "Lifting", score: 55 },
  { name: "ADLs", score: 88 },
];

const compliance = [
  { day: "Mon", pct: 100 }, { day: "Tue", pct: 80 }, { day: "Wed", pct: 100 },
  { day: "Thu", pct: 60 }, { day: "Fri", pct: 100 }, { day: "Sat", pct: 90 }, { day: "Sun", pct: 70 },
];

function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Recovery progress</h1>
        <p className="text-sm text-muted-foreground">Pain, function and compliance — measured weekly.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Recovery", value: "62%", tone: "text-success", sub: "+8% week" },
          { label: "Pain trend", value: "8 ↓ 3", tone: "text-success", sub: "6 weeks" },
          { label: "Compliance", value: "86%", tone: "text-primary", sub: "Past 7 days" },
          { label: "Function", value: "82/100", tone: "text-foreground", sub: "WOMAC-style" },
        ].map((s) => (
          <Card key={s.label} className="p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl">{s.value}</p>
            <p className={`mt-1 text-xs ${s.tone}`}>{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Pain & function trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={painTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="pain" stroke="var(--color-primary)" strokeWidth={2.5} name="Pain" />
                <Line type="monotone" dataKey="fn" stroke="var(--color-secondary)" strokeWidth={2.5} name="Function" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Exercise compliance • this week</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compliance} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="pct" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg">Functional improvement</h3>
          <Badge variant="outline" className="text-success">+14 pts since start</Badge>
        </div>
        <div className="mt-4 space-y-4">
          {functional.map((f) => (
            <div key={f.name}>
              <div className="flex justify-between text-sm"><span>{f.name}</span><span className="text-muted-foreground">{f.score}/100</span></div>
              <Progress value={f.score} className="mt-1.5" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
