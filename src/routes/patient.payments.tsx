import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { payments, formatNaira } from "@/lib/mock-data";
import { CreditCard, Landmark, Smartphone, Globe } from "lucide-react";

export const Route = createFileRoute("/patient/payments")({
  component: PaymentsPage,
});

const methods = [
  { icon: CreditCard, label: "Debit / Credit card" },
  { icon: Landmark, label: "Bank transfer" },
  { icon: Smartphone, label: "USSD" },
  { icon: Globe, label: "Visa / PayPal" },
];

function PaymentsPage() {
  const due = payments.find((p) => p.status === "Due");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Payments</h1>
        <p className="text-sm text-muted-foreground">Pay in Naira via card, transfer or USSD. International cards supported.</p>
      </div>

      {due && (
        <Card className="flex flex-wrap items-center justify-between gap-4 p-5 shadow-card">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Outstanding</p>
            <p className="mt-1 font-display text-2xl">{formatNaira(due.amount)} <span className="text-base text-muted-foreground">• {due.desc}</span></p>
          </div>
          <Button size="lg">Pay now</Button>
        </Card>
      )}

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Choose a method</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => (
            <button key={m.label} className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition hover:border-primary hover:bg-primary/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <m.icon className="h-4 w-4" />
              </div> {/* wait! checking raw: bg-primary/10 text-primary"><m.icon... let's fix the closing tab! */}
              <span className="text-sm font-medium">{m.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="shadow-card">
        <div className="border-b border-border p-5"><h2 className="font-display text-lg">History</h2></div>
        <div className="divide-y divide-border">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{p.desc}</p>
                <p className="text-xs text-muted-foreground">{p.id} • {p.date} • {p.method}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-display text-lg">{formatNaira(p.amount)}</p>
                <Badge variant={p.status === "Paid" ? "secondary" : "outline"} className={p.status === "Paid" ? "text-success" : "text-warning"}>
                  {p.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
