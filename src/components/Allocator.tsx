import { useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Brain, Cpu, Sparkles } from "lucide-react";

type Params = {
  empathy: number;
  concept: number;
  optimization: number;
  speed: number;
  budget: number;
};

const sliderDefs: { key: keyof Params; label: string; symbol: string; tip: string }[] = [
  {
    key: "empathy",
    label: "Empathy & Inclusion Index",
    symbol: "Eᵢ",
    tip: "Need for human-centric design, contextual understanding, and designing for vulnerable groups.",
  },
  {
    key: "concept",
    label: "Concept-Space Expansion",
    symbol: "C_exp",
    tip: "Need for radical innovation and abstract problem solving (C-K Theory).",
  },
  {
    key: "optimization",
    label: "Algorithmic Optimization",
    symbol: "A_opt",
    tip: "Need to process vast datasets, generate rapid variations, or reduce raw material costs.",
  },
  {
    key: "speed",
    label: "Speed & Efficiency",
    symbol: "S_eff",
    tip: "Requirement for rapid prototyping and short iteration cycles.",
  },
  {
    key: "budget",
    label: "Budget & Resource Constraints",
    symbol: "B_con",
    tip: "Strictness of financial and operational limits.",
  },
];

function computeAllocation(p: Params) {
  const human = p.empathy * 1.5 + p.concept * 1.2;
  const ai = p.optimization * 1.5 + p.speed * 1.2 + p.budget * 0.8;
  const hybrid =
    p.empathy * 0.8 + p.concept * 0.8 + p.optimization * 0.8 + p.speed * 0.8;
  const total = human + ai + hybrid;
  if (total === 0) return { human: 0, ai: 0, hybrid: 0 };
  return {
    human: (human / total) * 100,
    ai: (ai / total) * 100,
    hybrid: (hybrid / total) * 100,
  };
}

export function Allocator() {
  const [params, setParams] = useState<Params>({
    empathy: 50,
    concept: 50,
    optimization: 50,
    speed: 50,
    budget: 50,
  });

  const alloc = useMemo(() => computeAllocation(params), [params]);

  const winner = useMemo(() => {
    const entries: Array<["human" | "ai" | "hybrid", number]> = [
      ["human", alloc.human],
      ["ai", alloc.ai],
      ["hybrid", alloc.hybrid],
    ];
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [alloc]);

  const winnerMeta = {
    human: {
      label: "HUMAN DESIGNER",
      icon: Brain,
      color: "var(--human)",
      text: "Algorithm recommends Human Designer. High ambiguity and empathy requirements demand human intuition and radical conceptualization.",
    },
    ai: {
      label: "ARTIFICIAL INTELLIGENCE",
      icon: Cpu,
      color: "var(--ai)",
      text: "Algorithm recommends AI due to high optimization potential and strict efficiency constraints, overriding the need for empathetic design.",
    },
    hybrid: {
      label: "HYBRID INTELLIGENCE",
      icon: Sparkles,
      color: "var(--hybrid)",
      text: "Algorithm recommends Hybrid Intelligence. The task requires both rapid algorithmic generation and deep human contextual vetting.",
    },
  }[winner];

  const radarData = [
    { axis: "Empathy", value: params.empathy },
    { axis: "Concept-Space", value: params.concept },
    { axis: "Optimization", value: params.optimization },
    { axis: "Speed", value: params.speed },
    { axis: "Budget", value: params.budget },
  ];

  const WinnerIcon = winnerMeta.icon;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* INPUTS */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Project Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-7">
            {sliderDefs.map((def) => (
              <div key={def.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    {def.label}
                    <span className="text-xs font-mono text-muted-foreground">
                      ({def.symbol})
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">{def.tip}</TooltipContent>
                    </Tooltip>
                  </Label>
                  <span className="text-sm font-semibold tabular-nums">
                    {params[def.key]}
                  </span>
                </div>
                <Slider
                  value={[params[def.key]]}
                  onValueChange={(v) =>
                    setParams((prev) => ({ ...prev, [def.key]: v[0] }))
                  }
                  max={100}
                  step={1}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* OUTPUTS */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div
                className="flex items-center gap-3 rounded-lg border p-4"
                style={{
                  borderColor: winnerMeta.color,
                  backgroundColor: `color-mix(in oklab, ${winnerMeta.color} 8%, transparent)`,
                }}
              >
                <WinnerIcon
                  className="h-6 w-6"
                  style={{ color: winnerMeta.color }}
                />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Recommended
                  </div>
                  <div
                    className="text-lg font-bold tracking-wide"
                    style={{ color: winnerMeta.color }}
                  >
                    {winnerMeta.label}
                  </div>
                </div>
              </div>

              <AllocBar label="Human" value={alloc.human} color="var(--human)" />
              <AllocBar label="AI" value={alloc.ai} color="var(--ai)" />
              <AllocBar label="Hybrid" value={alloc.hybrid} color="var(--hybrid)" />

              <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground border-l-4"
                style={{ borderLeftColor: winnerMeta.color }}>
                {winnerMeta.text}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Footprint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="75%">
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="axis"
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                    />
                    <Radar
                      name="Task"
                      dataKey="value"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.35}
                      isAnimationActive
                      animationDuration={400}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}

function AllocBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-semibold tabular-nums" style={{ color }}>
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}