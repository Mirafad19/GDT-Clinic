import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import { LayoutDashboard, Users, CalendarDays, ClipboardList, MessageSquare, FileText } from "lucide-react";
import { physiotherapist } from "@/lib/mock-data";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/physio", icon: LayoutDashboard },
  { label: "Patients", to: "/physio/patients", icon: Users },
  { label: "Schedule", to: "/physio/schedule", icon: CalendarDays },
  { label: "Treatment plans", to: "/physio/plans", icon: ClipboardList },
  { label: "Messages", to: "/physio/messages", icon: MessageSquare },
  { label: "Reports", to: "/physio/reports", icon: FileText },
];

export const Route = createFileRoute("/physio")({
  component: () => (
    <PortalShell brandLabel="Clinician" nav={nav} userName={physiotherapist.name} userMeta={physiotherapist.specialty}>
      <Outlet />
    </PortalShell>
  ),
});
