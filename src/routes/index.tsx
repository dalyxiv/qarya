import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  Users,
  Network,
  Gauge,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
} from "lucide-react";
import eldalyLogo from "@/assets/eldaly-logo.png";
import lexelLogo from "@/assets/lexel-logo.png";
import uepLogo from "@/assets/uep-logo.png";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "QARYA — Hybrid Intelligence Design Allocator" },
      {
        name: "description",
        content:
          "QARYA orchestrates industrial design work across human designers, AI, and hybrid teams using a proprietary allocation algorithm.",
      },
    ],
  }),
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--hybrid)_30%,transparent),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 left-[-150px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)] blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--primary) 30%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 30%, transparent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5 shadow-[0_0_25px_-4px_var(--primary)]">
            <img src={eldalyLogo.url} alt="Eldaly" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-[0.25em] bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              QARYA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Hybrid Intelligence
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#metrics" className="hover:text-foreground transition-colors">Metrics</a>
        </nav>
        <Button
          asChild
          size="sm"
          className="gap-1.5 shadow-[0_0_30px_-6px_var(--primary)] hover:shadow-[0_0_40px_-4px_var(--primary)] transition-shadow"
        >
          <Link to="/dashboard">
            Launch Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-28 text-center md:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Proprietary allocation algorithm · v2026.3
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="mx-auto mb-8 flex flex-col items-center gap-2"
        >
          <img src={uepLogo.url} alt="Poznań University of Economics and Business" className="h-14 w-auto object-contain opacity-90" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Master Thesis Project · Poznań University of Economics & Business
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          The intelligence layer for{" "}
          <span className="bg-gradient-to-r from-primary via-[color-mix(in_oklab,var(--primary)_70%,var(--hybrid))] to-[color-mix(in_oklab,var(--hybrid)_80%,white)] bg-clip-text text-transparent">
            industrial design
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          QARYA allocates every design task to its optimal executor — Human, AI, or a Hybrid team —
          using a real-time decision network engineered for the machinery sector.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 shadow-[0_0_40px_-6px_var(--primary)] hover:shadow-[0_0_60px_-4px_var(--primary)] transition-all hover:-translate-y-0.5"
          >
            <Link to="/dashboard">
              Enter the Allocator <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 border-primary/40 bg-primary/5 backdrop-blur-md hover:bg-primary/10 shadow-[0_0_30px_-10px_var(--primary)]"
          >
            <Link to="/compare">
              <Sparkles className="h-4 w-4" />
              Human vs AI
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.06]">
            <a href="#how">See how it works</a>
          </Button>
        </motion.div>

        {/* Animated triad */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={4}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4"
        >
          {[
            { label: "Human", icon: Users, color: "var(--human)" },
            { label: "Hybrid", icon: Network, color: "var(--hybrid)" },
            { label: "AI", icon: Cpu, color: "var(--ai)" },
          ].map((n, i) => (
            <motion.div
              key={n.label}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="group relative rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-xl"
              style={{ boxShadow: `0 0 60px -20px ${n.color}` }}
            >
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in oklab, ${n.color} 18%, transparent)`, color: n.color }}
              >
                <n.icon className="h-6 w-6" />
              </div>
              <div className="mt-3 text-sm font-semibold tracking-wide">{n.label}</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Cluster</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Capabilities</div>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built for the machinery sector</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: BrainCircuit, title: "Neural Decision Network", desc: "Real-time visualization of how every project parameter influences the final allocation." },
            { icon: Gauge, title: "5-axis Task Footprint", desc: "Empathy, concept-space, optimization, speed, and budget mapped to a live radar chart." },
            { icon: Layers, title: "Hybrid Orchestration", desc: "Spin up blended teams of human designers and AI agents tuned to each brief." },
            { icon: Zap, title: "Instant Re-allocation", desc: "Move sliders, watch resources rebalance with smooth, deterministic animations." },
            { icon: ShieldCheck, title: "Auditable Logic", desc: "Every recommendation comes with a transparent, deterministic justification." },
            { icon: Network, title: "Resource Pool Vision", desc: "Track utilization across human, AI, and hybrid units from a single console." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_var(--primary)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-primary">How it works</div>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Three steps to optimal allocation</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { n: "01", t: "Describe the brief", d: "Tune five sliders that characterize the project's empathy, novelty, optimization, urgency, and budget profile." },
            { n: "02", t: "Watch the network", d: "The neural decision graph lights up clusters and edges in real time as parameters change." },
            { n: "03", t: "Deploy the team", d: "Receive a deterministic Human / AI / Hybrid split with a written justification ready for execution." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-card/60 to-card/20 p-6 backdrop-blur-xl"
            >
              <div className="font-mono text-3xl font-bold text-primary/80">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-card/60 via-card/30 to-transparent p-10 backdrop-blur-xl shadow-[0_0_80px_-30px_var(--primary)]">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { k: "3.2x", l: "Throughput uplift" },
              { k: "−47%", l: "Iteration cycles" },
              { k: "98.6%", l: "Allocation accuracy" },
              { k: "24/7", l: "Live decisioning" },
            ].map((m, i) => (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="bg-gradient-to-b from-foreground to-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  {m.k}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{m.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold md:text-5xl"
        >
          Ready to allocate{" "}
          <span className="bg-gradient-to-r from-primary to-[color-mix(in_oklab,var(--hybrid)_80%,white)] bg-clip-text text-transparent">
            intelligently?
          </span>
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Step inside the QARYA control room and experience hybrid intelligence in motion.
        </p>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            className="gap-2 shadow-[0_0_40px_-6px_var(--primary)] hover:shadow-[0_0_60px_-4px_var(--primary)] transition-all hover:-translate-y-0.5"
          >
            <Link to="/dashboard">
              Enter Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-card/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <img src={lexelLogo.url} alt="LEXEL" className="h-5 w-auto object-contain opacity-80" />
            <span>A LEXEL company</span>
          </div>
          <div className="flex items-center gap-3 text-center">
            <img src={uepLogo.url} alt="UEP" className="h-6 w-auto object-contain opacity-80" />
            <span>Master Thesis · Poznań University of Economics & Business</span>
          </div>
          <div className="font-mono">Developed by DALY · 2026 : 314</div>
        </div>
      </footer>
    </div>
  );
}