import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Brain, Cpu, Sparkles } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({ meta: [{ title: "Active Projects — QARYA" }] }),
});

const projects = [
  { id: "QR-001", name: "CNC Lathe Enclosure Redesign", allocation: "Hybrid", progress: 72, icon: Sparkles, color: "var(--hybrid)" },
  { id: "QR-002", name: "Operator HMI Empathy Pass", allocation: "Human", progress: 38, icon: Brain, color: "var(--human)" },
  { id: "QR-003", name: "Hydraulic Manifold Topology Opt.", allocation: "AI", progress: 91, icon: Cpu, color: "var(--ai)" },
  { id: "QR-004", name: "Assembly Line Ergonomics Study", allocation: "Human", progress: 54, icon: Brain, color: "var(--human)" },
  { id: "QR-005", name: "Cost-Down Bracket Generation", allocation: "AI", progress: 22, icon: Cpu, color: "var(--ai)" },
];

function ProjectsPage() {
  return (
    <DashboardLayout
      title="Active Projects"
      actions={
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.id} className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5 hover:scale-[1.01] transition-transform">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{p.id}</div>
                    <CardTitle className="text-base mt-1">{p.name}</CardTitle>
                  </div>
                  <Icon className="h-5 w-5" style={{ color: p.color, filter: `drop-shadow(0 0 6px ${p.color})` }} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" style={{ borderColor: p.color, color: p.color }}>{p.allocation}</Badge>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono" style={{ color: p.color }}>{p.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}