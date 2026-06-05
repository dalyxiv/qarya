import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid } from "recharts";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
  head: () => ({ meta: [{ title: "Analytics | QARYA" }] }),
});

const allocByMonth = [
  { m: "Jan", human: 40, ai: 35, hybrid: 25 },
  { m: "Feb", human: 38, ai: 38, hybrid: 24 },
  { m: "Mar", human: 32, ai: 42, hybrid: 26 },
  { m: "Apr", human: 28, ai: 45, hybrid: 27 },
  { m: "May", human: 30, ai: 40, hybrid: 30 },
  { m: "Jun", human: 26, ai: 41, hybrid: 33 },
];
const efficiency = [
  { m: "Jan", v: 62 }, { m: "Feb", v: 68 }, { m: "Mar", v: 71 },
  { m: "Apr", v: 75 }, { m: "May", v: 79 }, { m: "Jun", v: 84 },
];

function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
          <CardHeader><CardTitle>Allocation Mix (6 months)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer>
                <BarChart data={allocByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} />
                  <Bar dataKey="human" stackId="a" fill="var(--human)" />
                  <Bar dataKey="ai" stackId="a" fill="var(--ai)" />
                  <Bar dataKey="hybrid" stackId="a" fill="var(--hybrid)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
          <CardHeader><CardTitle>Decision Efficiency Score</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer>
                <LineChart data={efficiency}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} />
                  <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} dot={{ fill: "var(--primary)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}