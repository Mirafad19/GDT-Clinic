import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminStats, revenueSeries, formatNaira } from "@/lib/mock-data";
import { Users, CalendarCheck, AlertCircle, Wallet, TrendingUp, UserPlus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Platform overview</h1>
        <p className="text-sm text-muted-foreground">June 2026 • Lagos & online</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total patients", value: adminStats.totalPatients.toLocaleString(), icon: Users, sub: `${adminStats.active} active` },
          { label: "New this month", value: adminStats.newThisMonth, icon: UserPlus, sub: "+12% vs May", tone: "text-success" },
          { label: "Sessions completed", value: adminStats.completed.toLocaleString(), icon: CalendarCheck, sub: `${adminStats.missed} missed`, tone: "text-foreground" },
          { label: "Revenue (MTD)", value: formatNaira(adminStats.revenueMonth), icon: Wallet, sub: `${formatNaira(adminStats.outstanding)} outstanding`, tone: "text-primary" },
        ].map((s) => (
          <Card key={s.label} className="p-5 shadow-card">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">{s.label}</span>
              <s.icon className="h-4 w-4" />
            </div>
            <p className={`mt-2 font-display text-2xl ${s.tone ?? ""}`}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg">Revenue • 2026</h3>
              <p className="text-xs text-muted-foreground">In millions of Naira</p>
            </div>
            <Badge variant="outline" className="gap-1 text-success"><TrendingUp className="h-3 w-3" /> +9.3%</Badge>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} formatter={(v: number) => `₦${v}M`} />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 shadow-card">
          <h3 className="font-display text-lg">Today</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span>New registrations</span><span className="font-display text-lg">7</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span>Telehealth sessions</span><span className="font-display text-lg">18</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span>Payments processed</span><span className="font-display text-lg">{formatNaira(245_000)}</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-warning/30 bg-warning/10 p-3 text-warning">
              <span className="flex items-center gap-1.5"><AlertCircle className="h-4 w-4" /> Open support tickets</span>
              <span className="font-display text-lg">3</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
