import { motion } from "framer-motion";

type Props = {
  humanScore: number; // 0..1
  aiScore: number;
  hybridScore: number;
  winner: "human" | "ai" | "hybrid";
};

const HUMAN = "#3b82f6";
const AI = "#10b981";
const HYBRID = "#8b5cf6";

const humanNodes = [
  { id: "h1", x: 40, y: 50 },
  { id: "h2", x: 110, y: 30 },
  { id: "h3", x: 110, y: 90 },
  { id: "h4", x: 180, y: 60 },
];
const aiNodes = [
  { id: "a1", x: 40, y: 230 },
  { id: "a2", x: 110, y: 210 },
  { id: "a3", x: 110, y: 260 },
  { id: "a4", x: 180, y: 230 },
];
const hybridNodes = [
  { id: "y1", x: 260, y: 140 },
  { id: "y2", x: 330, y: 110 },
  { id: "y3", x: 330, y: 170 },
  { id: "y4", x: 400, y: 140 },
];

const humanEdges: [string, string][] = [
  ["h1", "h2"], ["h1", "h3"], ["h2", "h4"], ["h3", "h4"],
];
const aiEdges: [string, string][] = [
  ["a1", "a2"], ["a1", "a3"], ["a2", "a4"], ["a3", "a4"],
];
const hybridEdges: [string, string][] = [
  ["y1", "y2"], ["y1", "y3"], ["y2", "y4"], ["y3", "y4"],
];
const crossEdges: [string, string][] = [
  ["h4", "y1"], ["a4", "y1"], ["h4", "y2"], ["a4", "y3"],
];

const all = [...humanNodes, ...aiNodes, ...hybridNodes];
const nodeMap = Object.fromEntries(all.map((n) => [n.id, n]));

export function NeuralNetwork({ humanScore, aiScore, hybridScore, winner }: Props) {
  const sz = (s: number, base = 5, max = 14) => base + Math.max(0, Math.min(1, s)) * (max - base);
  const op = (active: boolean) => (active ? 1 : 0.18);
  const crossActive = winner === "hybrid";

  const renderEdges = (
    edges: [string, string][],
    color: string,
    opacity: number,
    glow: boolean,
  ) =>
    edges.map(([a, b], i) => {
      const A = nodeMap[a];
      const B = nodeMap[b];
      return (
        <motion.line
          key={`${a}-${b}-${i}`}
          x1={A.x}
          y1={A.y}
          x2={B.x}
          y2={B.y}
          stroke={color}
          strokeWidth={glow ? 2.2 : 1.2}
          initial={false}
          animate={{ opacity }}
          transition={{ duration: 0.45 }}
          style={glow ? { filter: `drop-shadow(0 0 6px ${color})` } : undefined}
        />
      );
    });

  const renderNodes = (
    nodes: typeof humanNodes,
    color: string,
    score: number,
    active: boolean,
  ) =>
    nodes.map((n, i) => (
      <motion.circle
        key={n.id}
        cx={n.x}
        cy={n.y}
        fill={color}
        initial={false}
        animate={{ r: sz(score) + (i % 2 === 0 ? 1 : 0), opacity: active ? 1 : 0.55 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 ${active ? 8 : 3}px ${color})` }}
      />
    ));

  return (
    <svg
      viewBox="0 0 440 290"
      className="w-full h-[260px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="nn-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="440" height="290" fill="url(#nn-bg)" rx="12" />

      {renderEdges(humanEdges, HUMAN, op(winner === "human"), winner === "human")}
      {renderEdges(aiEdges, AI, op(winner === "ai"), winner === "ai")}
      {renderEdges(hybridEdges, HYBRID, op(winner === "hybrid"), winner === "hybrid")}
      {renderEdges(crossEdges, HYBRID, crossActive ? 0.9 : 0.15, crossActive)}

      {renderNodes(humanNodes, HUMAN, humanScore, winner !== "ai")}
      {renderNodes(aiNodes, AI, aiScore, winner !== "human")}
      {renderNodes(hybridNodes, HYBRID, hybridScore, true)}

      <text x="20" y="20" fill={HUMAN} fontSize="10" fontFamily="monospace" opacity="0.8">HUMAN</text>
      <text x="20" y="280" fill={AI} fontSize="10" fontFamily="monospace" opacity="0.8">AI</text>
      <text x="380" y="20" fill={HYBRID} fontSize="10" fontFamily="monospace" opacity="0.8">HYBRID</text>
    </svg>
  );
}