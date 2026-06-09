import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/support")({
  component: Support,
});

const tickets = [
  { id: "TKT-1042", subject: "Couldn't join telehealth call", user: "Emeka Adebola", priority: "High", status: "Open", time: "12m ago" },
  { id: "TKT-1041", subject: "Payment receipt missing", user: "Fatima Yusuf", priority: "Med", status: "Open", time: "1h ago" },
  { id: "TKT-1039", subject: "Wrong booking date", user: "Chinedu Eze", priority: "Low", status: "Open", time: "3h ago" },
  { id: "TKT-1032", subject: "Password reset", user: "Zainab Ibrahim", priority: "Low", status: "Resolved", time: "Yesterday" },
];

function Support() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Support</h1>
        <p className="text-sm text-muted-foreground">Tickets from patients and clinicians</p>
      </div>

      <Card className="shadow-card">
        <div className="divide-y divide-border">
          {tickets.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.id} • {t.user} • {t.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={t.priority === "High" ? "text-destructive" : t.priority === "Med" ? "text-warning" : "text-muted-foreground"}>{t.priority}</Badge>
                <Badge variant="secondary">{t.status}</Badge>
                <Button size="sm" variant="outline">Open</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
