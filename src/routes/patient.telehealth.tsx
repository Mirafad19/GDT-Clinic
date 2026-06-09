import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { physiotherapist, currentPatient } from "@/lib/mock-data";
import { Mic, MicOff, Video, VideoOff, PhoneOff, ScreenShare, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/patient/telehealth")({
  component: TelehealthPage,
});

function TelehealthPage() {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Telehealth session</h1>
          <p className="text-sm text-muted-foreground">With {physiotherapist.name}</p>
        </div>
        <Badge className="bg-success text-success-foreground">● Live • 04:12</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="relative overflow-hidden bg-slate-900 p-0 shadow-elevated">
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <span className="font-display text-3xl">TB</span>
              </div>
            </div>
            <p className="absolute bottom-16 left-1/2 -translate-x-1/2 font-display text-xl text-white/80">Dr. Tunde Bakare</p>
            <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-white/60">HD • End-to-end encrypted</p>
            {/* Self preview */}
            <div className="absolute bottom-4 right-4 h-32 w-44 overflow-hidden rounded-lg border border-white/10 bg-slate-800 shadow-elevated">
              <div className="flex h-full items-center justify-center text-white/70">
                <span className="font-display text-lg">{currentPatient.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">You</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-white/5 bg-slate-950 p-4">
            <Button onClick={() => setMuted((m) => !m)} variant={muted ? "destructive" : "secondary"} size="icon" className="rounded-full">
              {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button onClick={() => setCamOff((c) => !c)} variant={camOff ? "destructive" : "secondary"} size="icon" className="rounded-full">
              {camOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full"><ScreenShare className="h-4 w-4" /></Button>
            <Button variant="secondary" size="icon" className="rounded-full"><MessageSquare className="h-4 w-4" /></Button>
            <Button variant="destructive" size="icon" className="rounded-full"><PhoneOff className="h-4 w-4" /></Button>
          </div>
        </Card>

        <Card className="flex flex-col p-5 shadow-card">
          <h3 className="font-display text-lg">Session notes</h3>
          <p className="mt-1 text-xs text-muted-foreground font-sans">Auto-saved by your physiotherapist</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground font-sans">10:02</p>
              <p>Reports pain 3/10, slept well. No new flare overnight.</p>
            </li>
            <li className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground font-sans">10:05</p>
              <p>Lumbar flexion improved ~10° vs last session.</p>
            </li>
            <li className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground font-sans">10:08</p>
              <p>Progress bird-dog to 3×10; add side-blank knee taps.</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
