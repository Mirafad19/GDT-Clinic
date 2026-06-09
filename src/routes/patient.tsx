import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import {
  LayoutDashboard, CalendarPlus, CalendarDays, ClipboardList,
  Dumbbell, LineChart, MessageSquare, Video, CreditCard,
} from "lucide-react";
import { currentPatient } from "@/lib/mock-data";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/patient", icon: LayoutDashboard },
  { label: "Book session", to: "/patient/book", icon: CalendarPlus },
  { label: "Appointments", to: "/patient/appointments", icon: CalendarDays },
  { label: "Treatment plan", to: "/patient/treatment", icon: ClipboardList },
  { label: "Exercises", to: "/patient/exercises", icon: Dumbbell },
  { label: "Progress", to: "/patient/progress", icon: LineChart },
  { label: "Messages", to: "/patient/messages", icon: MessageSquare },
  { label: "Telehealth", to: "/patient/telehealth", icon: Video },
  { label: "Payments", to: "/patient/payments", icon: CreditCard },
];

export const Route = createFileRoute("/patient")({
  component: () => (
    <PortalShell
      brandLabel="Patient"
      nav={nav}
      userName={currentPatient.name}
      userMeta={currentPatient.id}
    >
      <Outlet />
    </PortalShell>
  ),
});
