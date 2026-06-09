import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import { LayoutDashboard, Users, BarChart3, CreditCard, Settings, LifeBuoy } from "lucide-react";

const nav: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Finance", to: "/admin/finance", icon: CreditCard },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Support", to: "/admin/support", icon: LifeBuoy },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: () => (
    <PortalShell brandLabel="Administrator" nav={nav} userName="Olamide Adeyemi" userMeta="Platform admin">
      <Outlet />
    </PortalShell>
  ),
});
