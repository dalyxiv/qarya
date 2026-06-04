import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, Sparkles, Loader2, Scale, Zap, DollarSign, Clock } from "lucide-react";
import { compareHumanVsAi, type CompareResult } from "@/lib/compare.functions";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "Human vs AI — QARYA" },
      { name: "description", content: "Compare human and AI cost, speed and quality for any industrial design task." },
    ],
  }),
});

function ComparePage() {
  const [task, setTask] = useState("");
  const run = useServerFn(compareHumanVsAi);
  const mutation = useMutation({
    mutationFn: (t: string) => run({ data: { task: t } }),
  });

  const result = mutation.data as CompareResult | undefined;
  const verdictMeta = result
    ? {
        HUMAN: { color: "var(--human)", icon: Brain, label: "HUMAN DESIGNER" },
        AI: { color: "var(--ai)", icon: Cpu, label: "ARTIFICIAL INTELLIGENCE" },
        HYBRID: { color: "var(--hybrid)", icon: Sparkles, label: "HYBRID INTELLIGENCE" },
      }[result.verdict]
    : null;
  const VerdictIcon = verdictMeta?.icon ?? Scale;

  return (
    <DashboardLayout title="Human vs AI Comparator">
      <div className="grid gap-6">
        <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Describe the task
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Design a 5-axis CNC fixture for an aluminum impeller, including CAD model, FEA validation, and manufacturing drawings."
              className="min-h-[120px] bg-background/40 border-white/10"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                QARYA searches current market rates and AI token pricing to produce a verdict.
              </p>
              <Button
                onClick={() => mutation.mutate(task)}
                disabled={task.trim().length < 5 || mutation.isPending}
                className="gap-1.5 shadow-[0_0_30px_-6px_var(--primary)]"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Compare
                  </>
                )}
              </Button>
            </div>
            {mutation.isError && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {(mutation.error as Error).message}
              </div>
            )}
          </CardContent>
        </Card>

        {result && verdictMeta && (
          <>
            <Card
              className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5"
              style={{
                boxShadow: `0 0 0 1px ${verdictMeta.color}, 0 0 60px -10px color-mix(in oklab, ${verdictMeta.color} 70%, transparent)`,
              }}
            >
              <CardContent className="pt-6 flex items-start gap-4">
                <VerdictIcon
                  className="h-10 w-10 shrink-0"
                  style={{ color: verdictMeta.color, filter: `drop-shadow(0 0 10px ${verdictMeta.color})` }}
                />
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Final Verdict</div>
                  <div className="text-xl font-bold" style={{ color: verdictMeta.color }}>
                    {result.verdictHeadline}
                  </div>
                  <div className="text-sm text-muted-foreground">{result.verdictReasoning}</div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <SideCard
                title="Human Designer"
                icon={Brain}
                color="var(--human)"
                rows={[
                  { label: "Role", value: result.human.role },
                  { label: "Hourly rate", value: `$${result.human.hourlyRateUsd}/hr` },
                  { label: "Estimated time", value: `${result.human.estimatedHours} hrs · ${result.human.estimatedDurationDays} days` },
                  { label: "Total cost", value: `$${result.human.totalCostUsd.toLocaleString()}`, big: true },
                ]}
                strengths={result.human.strengths}
                weaknesses={result.human.weaknesses}
              />
              <SideCard
                title="Artificial Intelligence"
                icon={Cpu}
                color="var(--ai)"
                rows={[
                  { label: "Model class", value: result.ai.model },
                  { label: "Token usage", value: `${result.ai.estimatedTokens.toLocaleString()} tokens` },
                  { label: "Price", value: `$${result.ai.pricePerMillionTokensUsd}/M · ${result.ai.estimatedDurationMinutes} min` },
                  { label: "Total cost", value: `$${result.ai.totalCostUsd.toFixed(2)}`, big: true },
                ]}
                strengths={result.ai.strengths}
                weaknesses={result.ai.weaknesses}
              />
            </div>

            <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
              <CardHeader>
                <CardTitle>Head to head</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <Metric icon={DollarSign} label="Cost" value={result.comparison.costRatio} />
                <Metric icon={Clock} label="Speed" value={result.comparison.speedRatio} />
                <Metric icon={Sparkles} label="Quality" value={result.comparison.qualityNote} />
                <div className="sm:col-span-3 text-xs text-muted-foreground border-t border-white/5 pt-3">
                  {result.marketNote}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function SideCard({
  title,
  icon: Icon,
  color,
  rows,
  strengths,
  weaknesses,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  rows: { label: string; value: string; big?: boolean }[];
  strengths: string[];
  weaknesses: string[];
}) {
  return (
    <Card
      className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5"
      style={{ boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${color} 35%, transparent), 0 0 40px -16px ${color}` }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color, filter: `drop-shadow(0 0 6px ${color})` }} />
          <span style={{ color }}>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{r.label}</span>
              <span
                className={r.big ? "text-2xl font-bold tabular-nums" : "text-sm font-medium tabular-nums text-right"}
                style={r.big ? { color } : undefined}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 pt-3 border-t border-white/5">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Strengths</div>
            <ul className="space-y-1 text-xs">
              {strengths.map((s, i) => (
                <li key={i} className="flex gap-2"><span style={{ color }}>▸</span>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Weaknesses</div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {weaknesses.map((s, i) => (
                <li key={i} className="flex gap-2">▸ {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-background/40 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}