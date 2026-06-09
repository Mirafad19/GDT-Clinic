import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Platform settings</h1>
        <p className="text-sm text-muted-foreground">Configure clinic-wide preferences</p>
      </div>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Clinic profile</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>Clinic name</Label><Input defaultValue="Gilead Digital Therapy Clinic" /></div>
          <div className="space-y-1.5"><Label>Address</Label><Input defaultValue="Lekki Phase 1, Lagos" /></div>
          <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+234 803 555 1247" /></div>
          <div className="space-y-1.5"><Label>Currency</Label><Input defaultValue="NGN – ₦" /></div>
        </div>
      </Card>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Notifications</h2>
        <div className="mt-4 divide-y divide-border">
          {[
            { label: "Email appointment reminders", on: true },
            { label: "SMS reminders", on: true },
            { label: "WhatsApp confirmations", on: true },
            { label: "Daily exercise nudges", on: false },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-3">
              <span className="text-sm">{s.label}</span>
              <Switch defaultChecked={s.on} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Security</h2>
        <div className="mt-4 divide-y divide-border">
          {[
            { label: "Two-factor authentication", on: true },
            { label: "End-to-end encryption for messages", on: true },
            { label: "Session recording (telehealth)", on: false },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-3">
              <span className="text-sm">{s.label}</span>
              <Switch defaultChecked={s.on} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end"><Button>Save changes</Button></div>
    </div>
  );
}
