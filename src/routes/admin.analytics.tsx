import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: Analytics,
});

const growth = [
  { m: "Jan", patients: 920 }, { m: "Feb", patients: 980 }, { m: "Mar", patients: 1050 },
  { m: "Apr", patients: 1130 }, { m: "May", patients: 1197 }, { m: "Jun", patients: 1284 },
];
const sessionMix = [
  { name: "Telehealth", value: 62 },
  { name: "In-clinic", value: 38 },
];
const colors = ["var(--color-primary)", "var(--color-secondary)"];

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Analytics</h1>
        <p className="text-sm text-muted-foreground">Growth, engagement and session mix</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg">Patient growth</h3>
            <Badge variant="outline" className="text-success">+39% YoY</Badge>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growth} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="patients" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Session mix</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sessionMix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {sessionMix.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Avg. compliance", value: "84%" },
          { label: "Avg. recovery time", value: "8.2 wks" },
          { label: "NPS", value: "72" },
        ].map((s) => (
          <Card key={s.label} className="p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl">{s.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
