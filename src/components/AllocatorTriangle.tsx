import { User, Cpu, Sparkles } from "lucide-react";

type Alloc = { human: number; ai: number; hybrid: number };

export function AllocatorTriangle({
  alloc,
  winner,
  justification,
}: {
  alloc: Alloc;
  winner: "human" | "ai" | "hybrid";
  justification: string;
}) {
  const W = 520;
  const H = 360;
  // triangle vertices
  const nodes = [
    { key: "human" as const, label: "HUMAN", color: "var(--human)", Icon: User, x: W / 2, y: 70, value: alloc.human },
    { key: "ai" as const, label: "AI", color: "var(--ai)", Icon: Cpu, x: 90, y: 270, value: alloc.ai },
    { key: "hybrid" as const, label: "HYBRID", color: "var(--hybrid)", Icon: Sparkles, x: W - 90, y: 270, value: alloc.hybrid },
  ];
  const cx = W / 2;
  const cy = (70 + 270 + 270) / 3;

  const stats: Array<{ label: string; value: string; color?: string }> = [
    { label: "AI SHARE", value: `${alloc.ai.toFixed(0)}%`, color: "var(--ai)" },
    { label: "HUMAN SHARE", value: `${alloc.human.toFixed(0)}%`, color: "var(--human)" },
    { label: "HYBRID SHARE", value: `${alloc.hybrid.toFixed(0)}%`, color: "var(--hybrid)" },
    { label: "RECOMMENDATION", value: winner.toUpperCase(), color: nodes.find((n) => n.key === winner)!.color },
  ];

  return (
    <div className="space-y-5">
      {/* stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[10px] tracking-[0.15em] text-muted-foreground font-medium">
              {s.label}
            </div>
            <div className="text-xl font-bold tabular-nums" style={{ color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{justification}</p>

      {/* triangle */}
      <div className="relative rounded-xl border border-white/5 bg-background/40 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <defs>
            {nodes.map((n) => (
              <radialGradient key={n.key} id={`grad-${n.key}`}>
                <stop offset="0%" stopColor={n.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0.1" />
              </radialGradient>
            ))}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* connecting triangle */}
          <polygon
            points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
            fill="none"
            stroke="oklch(1 0 0 / 0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* center pivot */}
          <circle cx={cx} cy={cy} r="6" fill="none" stroke="oklch(1 0 0 / 0.3)" strokeWidth="1" />

          {/* lines from center to each node */}
          {nodes.map((n) => (
            <line
              key={`l-${n.key}`}
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeOpacity={0.25 + (n.value / 100) * 0.5}
              strokeWidth={1 + (n.value / 100) * 2}
            />
          ))}

          {/* nodes */}
          {nodes.map((n) => {
            const isWinner = n.key === winner;
            const r = 30 + (n.value / 100) * 24;
            return (
              <g key={n.key} style={{ transition: "all .5s ease" }}>
                {/* outer glow */}
                <circle cx={n.x} cy={n.y} r={r + 14} fill={`url(#grad-${n.key})`} opacity={isWinner ? 0.7 : 0.35} />
                {/* solid */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={n.color}
                  filter="url(#glow)"
                  opacity={0.95}
                />
                {/* icon */}
                <foreignObject x={n.x - 14} y={n.y - 14} width="28" height="28">
                  <div className="flex h-full w-full items-center justify-center text-background">
                    <n.Icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                </foreignObject>
                {/* label pill */}
                <g transform={`translate(${n.x}, ${n.y + r + 14})`}>
                  <rect
                    x={-38}
                    y={-11}
                    width={76}
                    height={22}
                    rx={11}
                    fill="oklch(0.09 0.01 260)"
                    stroke={n.color}
                    strokeWidth={isWinner ? 1.5 : 1}
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fontSize="11"
                    fontWeight="700"
                    fill={n.color}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {n.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* gradient bar */}
        <div className="mt-4">
          <div className="flex h-2.5 w-full overflow-hidden rounded-full ring-1 ring-white/5">
            <div
              style={{
                width: `${alloc.ai}%`,
                background: "var(--ai)",
                boxShadow: "0 0 12px var(--ai)",
              }}
            />
            <div
              style={{
                width: `${alloc.human}%`,
                background: "var(--human)",
                boxShadow: "0 0 12px var(--human)",
              }}
            />
            <div
              style={{
                width: `${alloc.hybrid}%`,
                background: "var(--hybrid)",
                boxShadow: "0 0 12px var(--hybrid)",
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span style={{ color: "var(--ai)" }}>AI {alloc.ai.toFixed(0)}%</span>
            <span style={{ color: "var(--human)" }}>Human {alloc.human.toFixed(0)}%</span>
            <span style={{ color: "var(--hybrid)" }}>Hybrid {alloc.hybrid.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}