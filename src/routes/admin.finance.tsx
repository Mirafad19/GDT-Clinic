import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminStats, formatNaira, revenueSeries } from "@/lib/mock-data";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/finance")({
  component: AdminFinance,
});

const txns = [
  { id: "PAY-9821", patient: "Adaeze Okafor", desc: "Initial Consultation", amount: 25000, status: "Paid", method: "Card" },
  { id: "PAY-9847", patient: "Adaeze Okafor", desc: "Post-Surgery Rehab", amount: 18000, status: "Paid", method: "Transfer" },
  { id: "PAY-9860", patient: "Adaeze Okafor", desc: "Follow-Up", amount: 15000, status: "Due", method: "—" },
  { id: "PAY-9871", patient: "Emeka Adebola", desc: "Initial Consultation", amount: 25000, status: "Paid", method: "USSD" },
  { id: "PAY-9880", patient: "Fatima Yusuf", desc: "Exercise Review", amount: 12000, status: "Paid", method: "PayPal" },
];

function AdminFinance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Finance</h1>
          <p className="text-sm text-muted-foreground">Revenue, transactions and outstanding balances</p>
        </div>
        <Button variant="outline"><Download className="mr-1 h-4 w-4" /> Export</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Daily revenue", value: formatNaira(245_000) },
          { label: "Weekly revenue", value: formatNaira(1_980_000) },
          { label: "Monthly revenue", value: formatNaira(adminStats.revenueMonth) },
          { label: "Outstanding", value: formatNaira(adminStats.outstanding), tone: "text-warning" },
        ].map((s) => (
          <Card key={s.label} className="p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className={`mt-2 font-display text-2xl ${s.tone ?? ""}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5 shadow-card">
        <h3 className="font-display text-lg">Revenue by month</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueSeries} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="currentColor" fontSize={12} className="text-muted-foreground" />
              <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} formatter={(v: number) => `₦${v}M`} />
              <Bar dataKey="revenue" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="shadow-card">
        <div className="border-b border-border p-5"><h3 className="font-display text-lg">Recent transactions</h3></div>
        <div className="divide-y divide-border">
          {txns.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{t.desc}</p>
                <p className="text-xs text-muted-foreground">{t.id} • {t.patient} • {t.method}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-display text-lg">{formatNaira(t.amount)}</p>
                <Badge variant={t.status === "Paid" ? "secondary" : "outline"} className={t.status === "Paid" ? "text-success" : "text-warning"}>{t.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
