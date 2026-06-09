import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { physioPatients } from "@/lib/mock-data";
import { Search, Send } from "lucide-react";

export const Route = createFileRoute("/physio/messages")({
  component: PhysioMessages,
});

const threads = physioPatients.map((p, i) => ({
  ...p,
  preview: [
    "Slept much better — pain was about 3/10 on waking.",
    "Shoulder feels tight after the gym session.",
    "Can I push my Friday appointment by an hour?",
    "The neck exercises are helping a lot.",
    "Heel pain is almost gone — should I stop the icing?",
  ][i] ?? "Thanks doctor.",
  unread: i < 2,
}));

function PhysioMessages() {
  const [active, setActive] = useState(threads[0].id);
  const current = threads.find((t) => t.id === active)!;
  return (
    <div className="grid h-[calc(100vh-140px)] gap-4 lg:grid-cols-[320px_1fr]">
      <Card className="flex flex-col overflow-hidden shadow-card">
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="pl-9" />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {threads.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => setActive(t.id)}
                className={`flex w-full flex-col gap-0.5 border-b border-border p-3 text-left transition ${active === t.id ? "bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  {t.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <span className="truncate text-xs text-muted-foreground">{t.preview}</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex flex-col shadow-card">
        <div className="border-b border-border p-4">
          <p className="font-medium">{current.name}</p>
          <p className="text-xs text-muted-foreground">{current.complaint}</p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-2xl bg-muted px-4 py-2 text-sm">{current.preview}</div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground">Thanks for the update — let's review on Friday.</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-border p-3">
          <Input placeholder="Write a reply…" />
          <Button size="icon"><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
