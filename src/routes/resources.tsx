import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, Sparkles } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: "Resource Pool — QARYA" }] }),
});

const pools = [
  { label: "Human Designers", count: 12, util: 78, icon: Brain, color: "var(--human)" },
  { label: "AI Compute Nodes", count: 8, util: 91, icon: Cpu, color: "var(--ai)" },
  { label: "Hybrid Teams", count: 5, util: 64, icon: Sparkles, color: "var(--hybrid)" },
];

function ResourcesPage() {
  return (
    <DashboardLayout title="Resource Pool">
      <div className="grid gap-4 md:grid-cols-3">
        {pools.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.label} className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{p.label}</CardTitle>
                  <Icon className="h-5 w-5" style={{ color: p.color, filter: `drop-shadow(0 0 6px ${p.color})` }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold" style={{ color: p.color }}>{p.count}</div>
                <div className="text-xs text-muted-foreground mt-1">Active units</div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-mono" style={{ color: p.color }}>{p.util}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.util}%`, background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
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