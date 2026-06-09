import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity, CalendarCheck, MessageSquare, Video, LineChart as LineIcon, ShieldCheck,
  ArrowRight, Dumbbell, FileText, CreditCard, Stethoscope, UsersRound, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GDT Clinic — Physiotherapy & Telehealth in Lagos" },
      { name: "description", content: "Modern physiotherapy care for Lagos and beyond. Book consultations, follow guided exercise plans, message your physio and track recovery — all in one place." },
      { property: "og:title", content: "GDT Clinic — Physiotherapy & Telehealth in Lagos" },
      { property: "og:description", content: "Modern physiotherapy care for Lagos and beyond. Book consultations, follow guided exercise plans, message your physio and track recovery — all in one place." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: CalendarCheck, title: "Effortless booking", body: "Pick a session type, see live availability and confirm in under a minute." },
  { icon: Video, title: "HD telehealth", body: "Secure video consultations with screen sharing and session notes saved automatically." },
  { icon: Dumbbell, title: "Guided exercise plans", body: "Demonstration videos, sets and reps prescribed and tracked weekly." },
  { icon: LineIcon, title: "Recovery tracking", body: "Pain, function and compliance charts so progress is always visible." },
  { icon: MessageSquare, title: "Direct messaging", body: "Ask questions, share photos and get adjustments between sessions." },
  { icon: ShieldCheck, title: "Private by design", body: "End-to-end encrypted records — accessible only to you and your physio." },
];

const steps = [
  { n: "01", title: "Register", body: "Tell us about your history and current symptoms." },
  { n: "02", title: "Book a session", body: "Choose initial consult, follow-up, exercise review or post-op rehab." },
  { n: "03", title: "Pay securely", body: "Card, transfer, USSD or international cards — all in Naira." },
  { n: "04", title: "Start recovering", body: "Join the call, follow your plan and message your physio anytime." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">GDT Clinic</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Platform</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#roles" className="hover:text-foreground">Clinician Portals</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
            <Button asChild size="sm"><Link to="/login">Get started</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/40 via-background to-background" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit gap-1.5 rounded-full px-3 py-1">
              <Sparkles className="h-3 w-3" /> New: telehealth across Nigeria
            </Badge>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Physiotherapy that follows you,<br />
              <span className="text-primary">not the other way around.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              GDT Clinic connects patients in Lagos and beyond with expert physiotherapists. Book consultations, follow guided exercise plans and message your clinician — all from one secure portal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/login">Book your first session <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/login">I'm a clinician</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div><div className="font-display text-2xl text-foreground">1,200+</div>patients treated</div>
              <div><div className="font-display text-2xl text-foreground">4.9★</div>average rating</div>
              <div><div className="font-display text-2xl text-foreground">36</div>physiotherapists</div>
            </div>
          </div>

          {/* Hero card */}
          <Card className="relative overflow-hidden border-border/60 p-6 shadow-elevated">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Next session</p>
                <p className="mt-1 font-display text-xl">Follow-up consultation</p>
              </div>
              <Badge className="bg-success text-success-foreground">Confirmed</Badge>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-muted-foreground">Friday</p>
                <p className="font-display text-lg">12 Jun • 10:00</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-muted-foreground">Clinician</p>
                <p className="font-display text-lg">Dr. Bakare</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2 text-primary"><Dumbbell className="h-4 w-4" /></div>
                  <div>
                    <span className="text-sm font-medium">Today's exercises</span>
                    <p className="text-xs text-muted-foreground">4 of 6 complete</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-success">+12%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-accent text-accent-foreground p-2"><LineIcon className="h-4 w-4" /></div>
                  <div>
                    <span className="text-sm font-medium">Pain trend</span>
                    <p className="text-xs text-muted-foreground">8 ↓ 3 in 6 weeks</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">Improving</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Everything in one portal</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight">Built around the patient journey.</h2>
          <p className="mt-3 text-muted-foreground">From the first complaint to discharge, GDT Clinic keeps every detail organised and every party informed.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border/60 p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl tracking-tight">Care in four steps.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <span className="font-display text-5xl text-primary/30">{s.n}</span>
                <h3 className="mt-2 font-display text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: UsersRound, title: "For patients", body: "Book, pay, follow your plan and message your physio.", to: "/patient" },
            { icon: Stethoscope, title: "For physiotherapists", body: "Manage caseload, prescribe exercises and run telehealth.", to: "/physio" },
            { icon: FileText, title: "For administrators", body: "Oversee revenue, users and platform analytics.", to: "/admin" },
          ].map((r) => (
            <Card key={r.title} className="group border-border/60 p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl">{r.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.body}</p>
              <Link to={r.to} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                Open portal <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-display text-5xl tracking-tight">Recovery, on your schedule.</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Join GDT Clinic and put a full physiotherapy clinic in your pocket — wherever you are in Nigeria.</p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8">
          <Link to="/login">Create your account <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 Gilead Digital Therapy Clinic, Lagos.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
