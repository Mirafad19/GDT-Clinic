import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { appointmentTypes, formatNaira, physiotherapist } from "@/lib/mock-data";
import { Check, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/book")({
  component: BookPage,
});

const slots = ["08:00", "09:00", "10:30", "11:30", "13:00", "14:30", "16:00", "17:30"];
const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(2026, 5, 12 + i);
  return { iso: d.toISOString().slice(0, 10), label: d.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" }) };
});

function BookPage() {
  const [type, setType] = useState(appointmentTypes[0].id);
  const [date, setDate] = useState(dates[0].iso);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const selected = appointmentTypes.find((t) => t.id === type)!;

  const confirm = () => {
    if (!time) return;
    const ref = `PT-2026-00${Math.floor(100 + Math.random() * 900)}`;
    setConfirmed(ref);
    toast.success("Booking confirmed", { description: `Reference ${ref}` });
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl">
        <Card className="p-8 text-center shadow-elevated">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground">
            <Check className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-3xl">Booking confirmed</h2>
          <p className="mt-2 text-sm text-muted-foreground">A confirmation email and WhatsApp notification are on the way.</p>
          <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4 text-left">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Reference</p>
            <p className="font-display text-2xl">{confirmed}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div><p className="text-muted-foreground">Type</p><p className="font-medium">{selected.label}</p></div>
              <div><p className="text-muted-foreground">Date</p><p className="font-medium">{date} • {time}</p></div>
              <div><p className="text-muted-foreground">Clinician</p><p className="font-medium">{physiotherapist.name}</p></div>
              <div><p className="text-muted-foreground">Amount</p><p className="font-medium">{formatNaira(selected.price)}</p></div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <Button onClick={() => setConfirmed(null)} variant="outline">Book another</Button>
            <Button>Proceed to payment <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Book a session</h1>
        <p className="text-sm text-muted-foreground">Pick a session type, then a time that works for you.</p>
      </div>

      {/* Step 1 - type */}
      <Card className="p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step 1 — Session type</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {appointmentTypes.map((t) => {
            const active = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`flex items-start justify-between rounded-lg border p-4 text-left transition ${active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"}`}
              >
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.duration} • with {physiotherapist.name.split(",")[0]}</p>
                </div>
                <p className="font-display text-lg">{formatNaira(t.price)}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Step 2 - date */}
      <Card className="p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> Step 2 — Date</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {dates.map((d) => {
            const active = date === d.iso;
            return (
              <button
                key={d.iso}
                onClick={() => { setDate(d.iso); setTime(null); }}
                className={`shrink-0 rounded-lg border px-4 py-3 text-sm transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"}`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Step 3 - time */}
      <Card className="p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Step 3 — Available slots</p>
        <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {slots.map((s) => {
            const taken = ["10:30", "13:00"].includes(s);
            const active = time === s;
            return (
              <button
                key={s}
                disabled={taken}
                onClick={() => setTime(s)}
                className={`rounded-lg border py-2.5 text-sm transition ${taken ? "border-border bg-muted text-muted-foreground line-through" : active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Summary */}
      <Card className="flex flex-wrap items-center justify-between gap-4 p-5 shadow-card">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Booking summary</p>
          <p className="mt-1 font-medium">{selected.label} • {date} {time ?? "— pick a time"}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-display text-2xl">{formatNaira(selected.price)}</p>
          <Button onClick={confirm} disabled={!time} size="lg">Confirm booking</Button>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">After confirmation a reference like <Badge variant="outline">PT-2026-00125</Badge> is generated and you'll be taken to payment.</p>
    </div>
  );
}
