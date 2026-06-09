import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { physioPatients } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const physios = [
  { name: "Dr. Tunde Bakare", specialty: "MSK & Post-op", patients: 28, status: "Active" },
  { name: "Dr. Aisha Bello", specialty: "Sports", patients: 22, status: "Active" },
  { name: "Dr. Kola Adesina", specialty: "Neuro", patients: 17, status: "Active" },
  { name: "Dr. Ngozi Umeh", specialty: "Paediatrics", patients: 14, status: "On leave" },
];

function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Users</h1>
          <p className="text-sm text-muted-foreground">Patients and clinicians on the platform</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users…" className="pl-9" />
        </div>
      </div>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Physiotherapists</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Specialty</th>
                <th className="py-2 text-left">Patients</th>
                <th className="py-2 text-left">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {physios.map((p) => (
                <tr key={p.name}>
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.specialty}</td>
                  <td className="py-3">{p.patients}</td>
                  <td className="py-3">
                    <Badge variant={p.status === "Active" ? "secondary" : "outline"} className={p.status === "Active" ? "text-success" : "text-muted-foreground"}>{p.status}</Badge>
                  </td>
                  <td className="py-3 text-right"><Button size="sm" variant="ghost">Manage</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5 shadow-card">
        <h2 className="font-display text-lg">Recent patients</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2 text-left">Patient</th>
                <th className="py-2 text-left">Complaint</th>
                <th className="py-2 text-left">Phase</th>
                <th className="py-2 text-left">Last seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {physioPatients.map((p) => (
                <tr key={p.id}>
                  <td className="py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.id}</div>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.complaint}</td>
                  <td className="py-3"><Badge variant="secondary">{p.phase}</Badge></td>
                  <td className="py-3 text-muted-foreground">{p.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
