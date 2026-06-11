"use client";

import { useEffect, useRef } from "react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
  forceCollide,
  type Simulation,
  type SimulationNodeDatum,
} from "d3-force";

/**
 * THE LIVING NETWORK — signature hero visualization.
 * Scroll narrative: noise (0–0.25) → six labeled clusters (0.25–0.7)
 * → one connected ecosystem (0.7–1). 2D canvas + d3-force for performance.
 * Respects prefers-reduced-motion with a settled static frame.
 */

const CLUSTERS = [
  { label: "Software", x: 0.22, y: 0.3 },
  { label: "Analytics", x: 0.5, y: 0.22 },
  { label: "Data", x: 0.78, y: 0.3 },
  { label: "AI", x: 0.24, y: 0.72 },
  { label: "Operations", x: 0.5, y: 0.8 },
  { label: "Research", x: 0.76, y: 0.72 },
] as const;

const COLORS = {
  node: "#2d6a4f",
  nodeSoft: "#a3b18a",
  link: "rgba(45, 106, 79, 0.16)",
  linkStrong: "rgba(27, 67, 50, 0.34)",
  label: "#1b4332",
};

interface NetNode extends SimulationNodeDatum {
  cluster: number;
  r: number;
}

interface NetLink {
  source: NetNode;
  target: NetNode;
  cross: boolean;
}

function phase(progress: number, from: number, to: number): number {
  const t = Math.min(1, Math.max(0, (progress - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

export function LivingNetwork({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  progressRef.current = progress;

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 90 : 180;

    const nodes: NetNode[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
      cluster: i % CLUSTERS.length,
      r: 1.5 + Math.random() * 2.2,
      x: Math.random(),
      y: Math.random(),
    }));

    const links: NetLink[] = [];
    for (let c = 0; c < CLUSTERS.length; c++) {
      const members = nodes.filter((n) => n.cluster === c);
      for (let i = 0; i < members.length; i++) {
        const a = members[i];
        const b = members[(i + 1 + Math.floor(Math.random() * 3)) % members.length];
        if (a !== b) links.push({ source: a, target: b, cross: false });
      }
    }
    const crossCount = Math.floor(NODE_COUNT * 0.35);
    for (let i = 0; i < crossCount; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a !== b && a.cluster !== b.cluster) {
        links.push({ source: a, target: b, cross: true });
      }
    }

    const fx = forceX<NetNode>().strength(0);
    const fy = forceY<NetNode>().strength(0);

    const sim: Simulation<NetNode, undefined> = forceSimulation(nodes)
      .force("charge", forceManyBody<NetNode>().strength(-6))
      .force("link", forceLink<NetNode, NetLink>(links).strength(0).distance(46))
      .force("collide", forceCollide<NetNode>().radius((d) => d.r + 2))
      .force("x", fx)
      .force("y", fy)
      .alphaDecay(0)
      .velocityDecay(0.32);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const n of nodes) {
        if (n.x !== undefined && n.x <= 1) n.x = n.x * width;
        if (n.y !== undefined && n.y <= 1) n.y = n.y * height;
      }
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() {
      mouseRef.current = null;
    }
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;

    function tickForces(p: number) {
      const clusterPull = phase(p, 0.25, 0.7);
      const linkForce = sim.force("link") as ReturnType<typeof forceLink>;

      fx.strength(0.02 + clusterPull * 0.1).x((d: NetNode) => {
        const c = CLUSTERS[d.cluster];
        return clusterPull > 0.01 ? c.x * width : width / 2;
      });
      fy.strength(0.02 + clusterPull * 0.1).y((d: NetNode) => {
        const c = CLUSTERS[d.cluster];
        return clusterPull > 0.01 ? c.y * height : height / 2;
      });
      linkForce.strength(clusterPull * 0.08);

      const m = mouseRef.current;
      if (m) {
        for (const n of nodes) {
          const dx = (n.x ?? 0) - m.x;
          const dy = (n.y ?? 0) - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 90 * 90 && d2 > 0.01) {
            const f = (1 - Math.sqrt(d2) / 90) * 0.6;
            n.vx = (n.vx ?? 0) + (dx / Math.sqrt(d2)) * f;
            n.vy = (n.vy ?? 0) + (dy / Math.sqrt(d2)) * f;
          }
        }
      }
    }

    function draw(p: number) {
      ctx.clearRect(0, 0, width, height);
      const clusterPull = phase(p, 0.25, 0.7);
      const converge = phase(p, 0.7, 1.0);

      for (const l of links) {
        const sx = l.source.x ?? 0;
        const sy = l.source.y ?? 0;
        const tx = l.target.x ?? 0;
        const ty = l.target.y ?? 0;
        const dist = Math.hypot(tx - sx, ty - sy);
        if (dist > 170) continue;

        let alpha: number;
        if (l.cross) {
          alpha = converge * 0.5;
        } else {
          alpha = 0.08 + clusterPull * 0.3;
        }
        if (alpha < 0.02) continue;

        ctx.strokeStyle = l.cross ? COLORS.linkStrong : COLORS.link;
        ctx.globalAlpha = alpha * (1 - dist / 200);
        ctx.lineWidth = l.cross ? 0.9 : 0.6;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = n.r > 2.6 ? COLORS.node : COLORS.nodeSoft;
        ctx.globalAlpha = 0.55 + clusterPull * 0.35;
        ctx.arc(n.x ?? 0, n.y ?? 0, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (clusterPull > 0.35) {
        const labelAlpha = phase(p, 0.4, 0.62);
        ctx.font = "600 11px var(--font-geist-mono, ui-monospace), monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = COLORS.label;
        ctx.globalAlpha = labelAlpha * 0.85;
        for (const c of CLUSTERS) {
          ctx.fillText(c.label.toUpperCase(), c.x * width, c.y * height - 52);
        }
        ctx.globalAlpha = 1;
      }
    }

    if (reducedMotion) {
      tickForces(0.85);
      sim.alphaDecay(0.05);
      for (let i = 0; i < 300; i++) sim.tick();
      draw(0.85);
    } else {
      sim.stop();
      const loop = () => {
        tickForces(progressRef.current);
        sim.tick();
        draw(progressRef.current);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      sim.stop();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
