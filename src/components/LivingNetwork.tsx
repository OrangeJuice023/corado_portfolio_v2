"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
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
import { ACCENT } from "@/lib/domain-style";
import { profile } from "@/lib/content/profile";

/**
 * THE LIVING NETWORK — signature hero visualization.
 *
 * FIELD → PATH → CONNECTION → SYSTEM. The system is not conjured from noise;
 * it emerges from the landscape:
 *
 *   0.00–0.20  FIELD     contour-map terrain, three pairs of people talking
 *   0.20–0.40  MOVEMENT  pairs split up; each person walks a route, paths branch
 *   0.40–0.60  TRACE     routes cross; data begins to flow along the trails
 *   0.60–0.80  BUILD     dashed trails merge into solid edges; data points
 *                        detach into six force-directed domain clusters
 *   0.80–1.00  CLARITY   domains stamped + labeled, one connected system
 *
 * 2D canvas + d3-force (no WebGL). The loop pauses offscreen / in background
 * tabs. prefers-reduced-motion renders the settled CLARITY frame, static.
 * Entirely decorative (aria-hidden) — every real fact lives in the DOM.
 */

type Pt = { x: number; y: number };

const CLUSTERS = [
  { label: "Software", color: ACCENT.forest, x: 0.18, y: 0.1 },
  { label: "Analytics", color: ACCENT.ochre, x: 0.53, y: 0.05 },
  { label: "Data", color: ACCENT.dusk, x: 0.87, y: 0.13 },
  { label: "AI", color: ACCENT.terracotta, x: 0.1, y: 0.46 },
  { label: "Operations", color: ACCENT.umber, x: 0.49, y: 0.42 },
  { label: "Research", color: ACCENT.sage, x: 0.88, y: 0.49 },
] as const;

/** Three pairs of people in the field; each pair splits toward two domains. */
const GROUPS = [
  { x: 0.12, y: 0.97, to: [0, 4] },
  { x: 0.5, y: 0.99, to: [3, 5] },
  { x: 0.86, y: 0.95, to: [1, 2] },
] as const;

const SHIRTS = [ACCENT.emerald, ACCENT.terracotta, ACCENT.dusk, ACCENT.ochre, "#8a9a6e", ACCENT.umber];

type EdgeStyle = "solid" | "dashed" | "dotted";
const HUB_EDGES: [number, number, EdgeStyle][] = [
  [0, 1, "solid"],
  [1, 2, "dashed"],
  [0, 3, "dashed"],
  [3, 4, "solid"],
  [4, 5, "dashed"],
  [2, 5, "solid"],
  [1, 4, "solid"],
  [0, 4, "dotted"],
  [4, 2, "dotted"],
  [3, 1, "dotted"],
];

const INK = "#1b4332";
const NOTE = "#2d6a4f";
const N_SAMPLES = 64;

function phase(p: number, from: number, to: number): number {
  const t = Math.min(1, Math.max(0, (p - from) / (to - from)));
  return t * t * (3 - 2 * t);
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });

function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Catmull-Rom through control points, then resampled by arc length. */
function smoothRoute(ctrl: Pt[], jitter: () => number): Pt[] {
  const dense: Pt[] = [];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = ctrl[Math.max(0, i - 1)];
    const p1 = ctrl[i];
    const p2 = ctrl[i + 1];
    const p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
    for (let k = 0; k < 20; k++) {
      const t = k / 20;
      const t2 = t * t;
      const t3 = t2 * t;
      dense.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  dense.push(ctrl[ctrl.length - 1]);
  const out = resample(dense, N_SAMPLES);
  // A slightly unsteady hand — never perfectly smooth.
  for (let i = 1; i < out.length - 1; i++) {
    out[i].x += (jitter() - 0.5) * 1.2;
    out[i].y += (jitter() - 0.5) * 1.2;
  }
  return out;
}

function resample(pts: Pt[], n: number): Pt[] {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  const total = cum[cum.length - 1] || 1;
  const out: Pt[] = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    const target = (i / (n - 1)) * total;
    while (j < cum.length - 2 && cum[j + 1] < target) j++;
    const seg = cum[j + 1] - cum[j] || 1;
    out.push(lerpPt(pts[j], pts[j + 1], (target - cum[j]) / seg));
  }
  return out;
}

function segIntersect(a: Pt, b: Pt, c: Pt, d: Pt): { t: number; u: number } | null {
  const den = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
  if (Math.abs(den) < 1e-6) return null;
  const t = ((c.x - a.x) * (d.y - c.y) - (c.y - a.y) * (d.x - c.x)) / den;
  const u = ((c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x)) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? { t, u } : null;
}

interface Route {
  org: Pt[]; // organic footpath
  str: Pt[]; // straightened system edge (start → fork → hub)
  cluster: number;
  fork: Pt;
  forkFrac: number; // share of the route before the fork (the "roots")
}

interface Walker {
  route: number;
  group: number;
  k: number;
  x: number;
  y: number;
  dir: number;
  stride: number;
  amp: number;
  shirt: string;
  pack: boolean;
}

interface NetNode extends SimulationNodeDatum {
  cluster: number;
  r: number;
  u: number; // position along its route while flowing
  d: number; // stagger for detaching
  hub: boolean;
}

interface NetLink {
  source: NetNode;
  target: NetNode;
}

export function LivingNetwork({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const monoFamily = rootStyle.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace";
    const handFamily = rootStyle.getPropertyValue("--font-caveat").trim() || "cursive";

    let width = 0;
    let height = 0;
    let dpr = 1;
    let desktop = true;
    let sc = 1; // person scale
    let R = 14; // hub stamp radius
    let hubs: Pt[] = [];
    let routes: Route[] = [];
    let routeOfCluster: number[] = [];
    let walkers: Walker[] = [];
    let crossings: { pt: Pt; a: number; b: number; fa: number; fb: number }[] = [];
    let wanderLines: [Pt, Pt][] = [];
    let terrain: HTMLCanvasElement | null = null;
    let stamps: { img: HTMLCanvasElement; size: number }[] = [];
    let placed = false;

    // ---- network (built once; hub positions follow layout) ------------------
    const perCluster = window.innerWidth < 768 ? 11 : 22;
    const nodes: NetNode[] = [];
    const hubNodes: NetNode[] = CLUSTERS.map((_, c) => ({ cluster: c, r: 0, u: 0, d: 0, hub: true }));
    nodes.push(...hubNodes);
    const rnd = prng(20260925);
    for (let c = 0; c < CLUSTERS.length; c++) {
      for (let i = 0; i < perCluster; i++) {
        nodes.push({ cluster: c, r: 1.3 + rnd() * 1.9, u: rnd(), d: rnd(), hub: false });
      }
    }
    const links: NetLink[] = [];
    for (let c = 0; c < CLUSTERS.length; c++) {
      const members = nodes.filter((n) => n.cluster === c && !n.hub);
      members.forEach((a, i) => {
        const b = members[(i + 1 + Math.floor(rnd() * 3)) % members.length];
        if (a !== b) links.push({ source: a, target: b });
        if (i % 3 === 0) links.push({ source: a, target: hubNodes[c] });
      });
    }

    const fx = forceX<NetNode>((d) => hubs[d.cluster]?.x ?? 0).strength(0.09);
    const fy = forceY<NetNode>((d) => hubs[d.cluster]?.y ?? 0).strength(0.09);
    const sim: Simulation<NetNode, undefined> = forceSimulation(nodes)
      .force("charge", forceManyBody<NetNode>().strength((d) => (d.hub ? -30 : -6)))
      .force("link", forceLink<NetNode, NetLink>(links).strength(0.07).distance(24))
      .force("collide", forceCollide<NetNode>().radius((d) => (d.hub ? R + 7 : d.r + 1.6)))
      .force("x", fx)
      .force("y", fy)
      .alphaDecay(0)
      .velocityDecay(0.34)
      .stop();

    // ---- layout ---------------------------------------------------------------
    function layout() {
      const rect = canvas.getBoundingClientRect();
      const prevW = width || rect.width;
      const prevH = height || rect.height;
      width = rect.width;
      height = rect.height;
      if (width < 10 || height < 10) return;
      desktop = width >= 1024;
      dpr = Math.min(window.devicePixelRatio || 1, desktop ? 2 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sc = desktop ? 1.35 : 1.05;
      R = desktop ? 15 : 11;
      const top = desktop ? height * 0.17 : Math.max(52, height * 0.1);
      const region = desktop
        ? { x: width * 0.5, y: top, w: width * 0.44, h: height * 0.6 }
        : { x: width * 0.13, y: top, w: width * 0.74, h: height - top - 170 };
      if (!desktop && width >= 600 && region.h > region.w * 1.2) {
        const capped = region.w * 1.2;
        region.y += (region.h - capped) / 2;
        region.h = capped;
      }
      const at = (nx: number, ny: number): Pt => ({ x: region.x + nx * region.w, y: region.y + ny * region.h });

      hubs = CLUSTERS.map((c) => at(c.x, c.y));
      hubNodes.forEach((h, c) => {
        h.fx = hubs[c].x;
        h.fy = hubs[c].y;
      });
      const scaleX = width / prevW;
      const scaleY = height / prevH;
      (sim.force("collide") as ReturnType<typeof forceCollide<NetNode>>).radius((d) =>
        d.hub ? R + 7 : d.r + 1.6,
      );
      // forceX/forceY cache their targets on initialize — refresh them.
      fx.x((d) => hubs[d.cluster].x);
      fy.y((d) => hubs[d.cluster].y);
      for (const n of nodes) {
        if (n.hub) continue;
        if (!placed) {
          n.x = hubs[n.cluster].x + (rnd() - 0.5) * 40;
          n.y = hubs[n.cluster].y + (rnd() - 0.5) * 40;
          n.vx = 0;
          n.vy = 0;
        } else {
          n.x = (n.x ?? 0) * scaleX;
          n.y = (n.y ?? 0) * scaleY;
        }
      }
      placed = true;

      const rr = prng(7);
      routes = [];
      routeOfCluster = [];
      walkers = [];
      const personH = 21 * sc;
      GROUPS.forEach((g, gi) => {
        const base = at(g.x, g.y);
        const fork = { x: base.x + (rr() - 0.5) * region.w * 0.08, y: base.y - region.h * 0.22 };
        g.to.forEach((ci, k) => {
          const start = { x: base.x + (k === 0 ? -7 : 7) * sc, y: base.y };
          const hub = hubs[ci];
          const end = { x: hub.x, y: hub.y + R + 4 + personH };
          const dx = end.x - fork.x;
          const dy = end.y - fork.y;
          const len = Math.hypot(dx, dy) || 1;
          const off = (rr() - 0.5) * len * 0.34;
          const mid = lerpPt(fork, end, 0.5);
          const wp = { x: mid.x + (-dy / len) * off, y: mid.y + (dx / len) * off };
          const lead = { x: lerp(start.x, fork.x, 0.5) + (rr() - 0.5) * 14, y: lerp(start.y, fork.y, 0.5) };
          const org = smoothRoute([start, lead, fork, wp, end], rr);
          const str = resample([start, fork, end], N_SAMPLES);
          routeOfCluster[ci] = routes.length;
          walkers.push({
            route: routes.length,
            group: gi,
            k,
            x: start.x,
            y: start.y,
            dir: k === 0 ? 1 : -1,
            stride: rr() * 6,
            amp: 0,
            shirt: SHIRTS[routes.length % SHIRTS.length],
            pack: (gi + k) % 2 === 0,
          });
          const rootLen = Math.hypot(fork.x - start.x, fork.y - start.y);
          const forkFrac = rootLen / (rootLen + Math.hypot(end.x - fork.x, end.y - fork.y));
          routes.push({ org, str, cluster: ci, fork, forkFrac });
        });
      });

      // Where footpaths from different groups cross — the TRACE moment.
      crossings = [];
      for (let a = 0; a < routes.length; a++) {
        for (let b = a + 1; b < routes.length; b++) {
          if (walkers[a].group === walkers[b].group) continue;
          const A = routes[a].org;
          const B = routes[b].org;
          outer: for (let i = 0; i < A.length - 1; i += 1) {
            for (let j = 0; j < B.length - 1; j += 1) {
              const hit = segIntersect(A[i], A[i + 1], B[j], B[j + 1]);
              if (hit) {
                crossings.push({
                  pt: lerpPt(A[i], A[i + 1], hit.t),
                  a,
                  b,
                  fa: (i + hit.t) / (N_SAMPLES - 1),
                  fb: (j + hit.u) / (N_SAMPLES - 1),
                });
                break outer;
              }
            }
          }
        }
      }

      wanderLines = desktop
        ? [
            [at(0.22, 1.02), at(0.37, 1.0)],
            [at(0.62, 1.01), at(0.76, 1.03)],
          ]
        : [[at(0.2, 1.03), at(0.36, 1.03)]];

      terrain = buildTerrain(region);
      stamps = CLUSTERS.map((c, i) => buildStamp(c.color, prng(100 + i)));

      // Settle the clusters before they are ever revealed.
      for (let i = 0; i < 160; i++) sim.tick();
    }

    function buildTerrain(region: { x: number; y: number; w: number; h: number }) {
      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const t = off.getContext("2d");
      if (!t) return null;
      t.setTransform(dpr, 0, 0, dpr, 0, 0);
      const tr = prng(42);

      // Contour lines — the landscape everything grows out of.
      const hills = desktop
        ? [
            { x: region.x + region.w * 0.34, y: region.y + region.h * 0.74, gap: 24, n: 9 },
            { x: region.x + region.w * 1.02, y: region.y + region.h * 0.05, gap: 22, n: 8 },
            { x: width * 0.16, y: height * 0.96, gap: 26, n: 7 },
          ]
        : [
            { x: width * 0.3, y: region.y + region.h * 0.8, gap: 17, n: 8 },
            { x: width * 0.95, y: region.y + region.h * 0.1, gap: 16, n: 7 },
            { x: width * 0.18, y: region.y + region.h * 0.28, gap: 15, n: 6 },
          ];
      t.lineWidth = 0.9;
      for (const h of hills) {
        const wob = [2, 3, 5].map((k) => ({ k, a: 0.05 + tr() * 0.08, p: tr() * 6.28 }));
        for (let i = 1; i <= h.n; i++) {
          const r = 8 + i * h.gap;
          t.beginPath();
          for (let s = 0; s <= 90; s++) {
            const a = (s / 90) * Math.PI * 2;
            let rad = r;
            for (const w of wob) rad += r * w.a * Math.sin(w.k * a + w.p);
            const x = h.x + Math.cos(a) * rad * 1.3;
            const y = h.y + Math.sin(a) * rad * 0.85;
            if (s === 0) t.moveTo(x, y);
            else t.lineTo(x, y);
          }
          t.closePath();
          t.setLineDash(i % 4 === 0 ? [3, 5] : []);
          t.strokeStyle = `rgba(111, 130, 87, ${0.34 - i * 0.018})`;
          t.stroke();
        }
      }
      t.setLineDash([]);

      // Graph-paper patch.
      const gx = region.x + region.w * (desktop ? 0.7 : 0.62);
      const gy = region.y + region.h * 0.66;
      const gw = desktop ? 120 : 80;
      const gh = desktop ? 84 : 56;
      t.strokeStyle = "rgba(26, 26, 26, 0.06)";
      t.lineWidth = 1;
      for (let x = 0; x <= gw; x += 12) {
        t.beginPath();
        t.moveTo(gx + x, gy);
        t.lineTo(gx + x, gy + gh);
        t.stroke();
      }
      for (let y = 0; y <= gh; y += 12) {
        t.beginPath();
        t.moveTo(gx, gy + y);
        t.lineTo(gx + gw, gy + y);
        t.stroke();
      }

      // Trees around the gathering spots.
      const ts = desktop ? 1.25 : 1;
      for (const g of GROUPS) {
        const bx = region.x + g.x * region.w;
        const by = region.y + g.y * region.h;
        for (let i = 0; i < 3; i++) {
          const side = i % 2 === 0 ? -1 : 1;
          const x = Math.min(width - 18, Math.max(desktop ? region.x + 6 : 18, bx + side * (34 + tr() * 40) * ts));
          const y = by - 4 + (tr() - 0.5) * 16;
          drawTree(t, x, y, ts * (0.8 + tr() * 0.5));
        }
      }

      // Survey crosses.
      t.strokeStyle = "rgba(27, 67, 50, 0.3)";
      t.lineWidth = 1;
      for (let i = 0; i < (desktop ? 6 : 3); i++) {
        const x = region.x + tr() * region.w;
        const y = region.y + tr() * region.h * 0.9;
        t.beginPath();
        t.moveTo(x - 4, y);
        t.lineTo(x + 4, y);
        t.moveTo(x, y - 4);
        t.lineTo(x, y + 4);
        t.stroke();
      }

      // North arrow + city-level field reference (from profile.location).
      const nx = desktop ? width - 64 : 26;
      const ny = desktop ? height - 150 : region.y - 34;
      t.strokeStyle = "rgba(27, 67, 50, 0.5)";
      t.fillStyle = "rgba(27, 67, 50, 0.55)";
      t.lineWidth = 1.2;
      t.beginPath();
      t.moveTo(nx, ny + 16);
      t.lineTo(nx, ny - 8);
      t.moveTo(nx - 4, ny - 3);
      t.lineTo(nx, ny - 9);
      t.lineTo(nx + 4, ny - 3);
      t.stroke();
      t.font = `600 10px ${monoFamily}`;
      t.textAlign = "center";
      t.fillText("N", nx, ny - 14);
      if (desktop) {
        t.textAlign = "right";
        t.font = `500 9px ${monoFamily}`;
        t.fillStyle = "rgba(100, 116, 139, 0.8)";
        t.fillText(profile.location.toUpperCase(), nx - 12, ny + 34);
      }
      return off;
    }

    function drawTree(t: CanvasRenderingContext2D, x: number, y: number, s: number) {
      t.strokeStyle = "rgba(27, 67, 50, 0.45)";
      t.lineWidth = 1;
      t.beginPath();
      t.moveTo(x, y);
      t.lineTo(x, y - 8 * s);
      t.stroke();
      t.fillStyle = "rgba(111, 130, 87, 0.5)";
      t.beginPath();
      t.arc(x, y - 10 * s, 4.4 * s, 0, Math.PI * 2);
      t.fill();
      t.fillStyle = "rgba(27, 67, 50, 0.3)";
      t.beginPath();
      t.arc(x + 2.2 * s, y - 9 * s, 3 * s, 0, Math.PI * 2);
      t.fill();
    }

    /** A hand-stamped circle: slightly irregular edge, ink speckle. */
    function buildStamp(color: string, r: () => number) {
      const size = Math.ceil(R * 2 + 6);
      const c = document.createElement("canvas");
      c.width = Math.round(size * dpr);
      c.height = Math.round(size * dpr);
      const g = c.getContext("2d");
      if (!g) return { img: c, size };
      g.scale(dpr, dpr);
      const m = size / 2;
      g.beginPath();
      for (let i = 0; i <= 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        const rad = R * (1 + (r() - 0.5) * 0.07);
        const x = m + Math.cos(a) * rad;
        const y = m + Math.sin(a) * rad;
        if (i === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.closePath();
      g.globalAlpha = 0.9;
      g.fillStyle = color;
      g.fill();
      g.globalCompositeOperation = "destination-out";
      for (let i = 0; i < R * R * 1.1; i++) {
        g.globalAlpha = 0.12 + r() * 0.4;
        g.fillRect(m + (r() - 0.5) * R * 2, m + (r() - 0.5) * R * 2, 0.9, 0.9);
      }
      return { img: c, size };
    }

    // ---- geometry helpers ----------------------------------------------------
    function routePoint(route: Route, s: number, morph: number): Pt {
      const f = Math.min(1, Math.max(0, s)) * (N_SAMPLES - 1);
      const i = Math.min(N_SAMPLES - 2, Math.floor(f));
      const t = f - i;
      const a = lerpPt(route.org[i], route.str[i], morph);
      const b = lerpPt(route.org[i + 1], route.str[i + 1], morph);
      return lerpPt(a, b, t);
    }

    function traceRoute(route: Route, from: number, to: number, morph: number) {
      const i0 = Math.floor(from * (N_SAMPLES - 1));
      const i1 = Math.floor(to * (N_SAMPLES - 1));
      const s = routePoint(route, from, morph);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      for (let i = i0 + 1; i <= i1; i++) {
        const p = lerpPt(route.org[i], route.str[i], morph);
        ctx.lineTo(p.x, p.y);
      }
      const e = routePoint(route, to, morph);
      ctx.lineTo(e.x, e.y);
      ctx.stroke();
    }

    function walkerS(w: Walker, p: number) {
      return phase(p, 0.1 + w.group * 0.025 + w.k * 0.015, 0.8);
    }

    // ---- drawing -------------------------------------------------------------
    function drawPerson(
      x: number,
      y: number,
      dir: number,
      stride: number,
      amp: number,
      shirt: string,
      pack: boolean,
      alpha: number,
    ) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.scale(sc * dir, sc);
      const sw = Math.sin(stride) * 3.2 * amp;
      ctx.strokeStyle = "#2a2f2c";
      ctx.lineWidth = 1.7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(sw, 0);
      ctx.moveTo(0, -7);
      ctx.lineTo(-sw, 0);
      ctx.stroke();
      if (pack) {
        ctx.fillStyle = "#5c4d3c";
        ctx.beginPath();
        ctx.roundRect(-5.4, -14.6, 3.4, 6.4, 1.3);
        ctx.fill();
      }
      ctx.fillStyle = shirt;
      ctx.beginPath();
      ctx.roundRect(-2.9, -15.8, 5.8, 9.8, 2.7);
      ctx.fill();
      ctx.fillStyle = "#c99a78";
      ctx.beginPath();
      ctx.arc(0.5, -18.7, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#26211e";
      ctx.beginPath();
      ctx.arc(-0.3, -19.4, 2.5, Math.PI * 0.95, Math.PI * 2.1);
      ctx.fill();
      ctx.restore();
    }

    function drawEmphasis(x: number, y: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = ACCENT.terracotta;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - 6, y);
      ctx.lineTo(x - 8, y - 5);
      ctx.moveTo(x, y - 1);
      ctx.lineTo(x, y - 7);
      ctx.moveTo(x + 6, y);
      ctx.lineTo(x + 8, y - 5);
      ctx.stroke();
      ctx.restore();
    }

    function drawTape(text: string, x: number, y: number, rot: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, alpha * 1.6);
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.font = `600 ${desktop ? 10 : 9}px ${monoFamily}`;
      ctx.letterSpacing = "1.4px";
      const tw = ctx.measureText(text).width;
      const pw = tw + 14;
      const ph = desktop ? 18 : 16;
      ctx.fillStyle = "rgba(231, 221, 201, 0.95)";
      ctx.beginPath();
      ctx.moveTo(-pw / 2, -ph / 2 + 1);
      ctx.lineTo(pw / 2, -ph / 2);
      ctx.lineTo(pw / 2 + 1, ph / 2 - 1);
      ctx.lineTo(-pw / 2, ph / 2);
      ctx.closePath();
      ctx.fill();
      // Tape lands first, then the label is written on it.
      ctx.globalAlpha = phase(alpha, 0.15, 0.7);
      // Tape lands first, then the label is written on it.
      ctx.globalAlpha = phase(alpha, 0.45, 1);
      ctx.fillStyle = INK;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 0.7, 1);
      ctx.restore();
    }

    /** Handwritten margin note with a curved arrow toward what it describes. */
    function drawNote(text: string, anchor: Pt, dx: number, dy: number, alpha: number) {
      if (alpha < 0.02) return;
      const fs = desktop ? 22 : 17;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `600 ${fs}px ${handFamily}`;
      const tw = ctx.measureText(text).width;
      const tx = Math.min(width - tw - 18, Math.max(18, anchor.x + dx - (dx < 0 ? tw : 0)));
      // Mobile/tablet: stay above the phase legend and the floating assistant button.
      const ty = Math.min(height - (desktop ? 12 : 130), Math.max(fs + 70, anchor.y + dy));
      ctx.textBaseline = "alphabetic";
      // Paper halo so a note stays legible where it crosses a trail.
      ctx.strokeStyle = "rgba(248, 245, 240, 0.95)";
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.strokeText(text, tx, ty);
      ctx.fillStyle = NOTE;
      ctx.fillText(text, tx, ty);
      const sx = dx >= 0 ? tx - 5 : tx + tw + 5;
      const sy = ty - fs * 0.3;
      const ax = anchor.x + (dx >= 0 ? 8 : -8);
      const ay = anchor.y + (dy < 0 ? -6 : 6);
      const cx = (sx + ax) / 2;
      const cy = Math.min(sy, ay) - 16;
      ctx.strokeStyle = NOTE;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(cx, cy, ax, ay);
      const ang = Math.atan2(ay - cy, ax - cx);
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - Math.cos(ang - 0.5) * 7, ay - Math.sin(ang - 0.5) * 7);
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - Math.cos(ang + 0.5) * 7, ay - Math.sin(ang + 0.5) * 7);
      ctx.stroke();
      ctx.restore();
    }

    const windowed = (p: number, a: number, b: number) =>
      phase(p, a, a + 0.05) * (1 - phase(p, b - 0.05, b));

    function draw(p: number, time: number, moving: boolean) {
      ctx.clearRect(0, 0, width, height);
      ctx.setLineDash([]);
      const morph = phase(p, 0.58, 0.84) * 0.85;
      const build = phase(p, 0.62, 0.86);
      const clarity = phase(p, 0.8, 0.97);

      // 1. terrain
      if (terrain) {
        ctx.globalAlpha = 1 - 0.55 * phase(p, 0.55, 0.95);
        ctx.drawImage(terrain, 0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      const sOf = walkers.map((w) => walkerS(w, p));

      // 2. planned routes — faint dotted, like pencil on a map
      const planned = 0.3 * phase(p, 0.16, 0.3) * (1 - phase(p, 0.62, 0.78));
      if (planned > 0.01) {
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.setLineDash([1, 6]);
        ctx.globalAlpha = planned;
        routes.forEach((r, i) => traceRoute(r, sOf[i], 1, morph));
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // 3. system edges between domains
      if (clarity > 0.01) {
        ctx.lineCap = "round";
        for (const [a, b, style] of HUB_EDGES) {
          const A = hubs[a];
          const B = hubs[b];
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2;
          const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
          const bend = 0.08 * len;
          const cx = mx + (-(B.y - A.y) / len) * bend;
          const cy = my + ((B.x - A.x) / len) * bend;
          ctx.setLineDash(style === "solid" ? [] : style === "dashed" ? [7, 6] : [1, 5]);
          ctx.strokeStyle = INK;
          ctx.lineWidth = style === "solid" ? 1.4 : 1.2;
          ctx.globalAlpha = clarity * (style === "solid" ? 0.5 : 0.42);
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.quadraticCurveTo(cx, cy, B.x, B.y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // 4. trails: dashed footpaths that merge into solid system connections
      ctx.strokeStyle = INK;
      ctx.lineCap = "round";
      ctx.lineWidth = 1.3 + build * 0.3;
      routes.forEach((r, i) => {
        if (sOf[i] < 0.005) return;
        const base = 0.5 + 0.2 * build - 0.2 * clarity;
        ctx.setLineDash(build > 0.97 ? [] : [5 + build * 50, 5 * (1 - build) + 0.001]);
        // Roots (field → fork) settle back into the landscape at CLARITY.
        const cut = Math.min(sOf[i], r.forkFrac);
        ctx.globalAlpha = base * (1 - 0.7 * clarity);
        traceRoute(r, 0, cut, morph);
        if (sOf[i] > cut) {
          ctx.globalAlpha = base;
          traceRoute(r, cut, sOf[i], morph);
        }
      });
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // 5. fork points become source nodes
      const src = phase(p, 0.6, 0.78);
      if (src > 0.01) {
        ctx.globalAlpha = src;
        for (let g = 0; g < routes.length; g += 2) {
          const f = routes[g].fork;
          ctx.fillStyle = "#fcfaf6";
          ctx.strokeStyle = INK;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // 6. crossings
      const trace = phase(p, 0.36, 0.48) * (1 - phase(p, 0.7, 0.86));
      if (trace > 0.01) {
        for (const c of crossings) {
          if (sOf[c.a] < c.fa || sOf[c.b] < c.fb) continue;
          ctx.globalAlpha = trace;
          ctx.strokeStyle = ACCENT.terracotta;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(c.pt.x, c.pt.y, 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = ACCENT.terracotta;
          ctx.beginPath();
          ctx.arc(c.pt.x, c.pt.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // 7–8. data: flows along the trails, then detaches into clusters
      const pos = new Map<NetNode, { x: number; y: number; a: number; det: number }>();
      for (const n of nodes) {
        if (n.hub) {
          pos.set(n, { x: hubs[n.cluster].x, y: hubs[n.cluster].y, a: 1, det: 1 });
          continue;
        }
        const a = phase(p, 0.34 + n.d * 0.08, 0.48 + n.d * 0.08);
        const det = phase(p, 0.55 + n.d * 0.14, 0.72 + n.d * 0.14);
        const ri = routeOfCluster[n.cluster];
        const along = ((n.u + time * 0.035) % 1) * sOf[ri];
        const fp = routePoint(routes[ri], along, morph);
        pos.set(n, {
          x: lerp(fp.x, n.x ?? fp.x, det),
          y: lerp(fp.y, n.y ?? fp.y, det),
          a,
          det,
        });
      }

      if (build > 0.01) {
        ctx.strokeStyle = "rgba(45, 106, 79, 1)";
        ctx.lineWidth = 0.7;
        for (const l of links) {
          const A = pos.get(l.source);
          const B = pos.get(l.target);
          if (!A || !B) continue;
          const d = Math.hypot(B.x - A.x, B.y - A.y);
          if (d > 110) continue;
          const alpha = build * 0.36 * Math.min(A.det, B.det) * (1 - d / 130);
          if (alpha < 0.02) continue;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(B.x, B.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      for (const n of nodes) {
        if (n.hub) continue;
        const q = pos.get(n);
        if (!q || q.a < 0.02) continue;
        ctx.globalAlpha = q.a * (0.55 + 0.35 * q.det);
        ctx.fillStyle = n.r > 2.6 ? INK : CLUSTERS[n.cluster].color;
        ctx.beginPath();
        ctx.arc(q.x, q.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 9. domain stamps + tape labels
      const stampIn = phase(p, 0.74, 0.86);
      if (stampIn > 0.01) {
        hubs.forEach((h, c) => {
          const st = stamps[c];
          const k = 0.6 + 0.4 * stampIn;
          ctx.globalAlpha = stampIn;
          ctx.drawImage(st.img, h.x - (st.size / 2) * k, h.y - (st.size / 2) * k, st.size * k, st.size * k);
        });
        ctx.globalAlpha = 1;
      }
      const labels = phase(p, 0.76, 0.86);
      if (labels > 0.01) {
        hubs.forEach((h, c) => {
          drawTape(CLUSTERS[c].label.toUpperCase(), h.x, h.y - R - (desktop ? 17 : 14), (c % 2 ? 1 : -1) * 0.035, labels);
        });
      }

      // 10. people
      const wanderAlpha = 1 - phase(p, 0.28, 0.46);
      if (wanderAlpha > 0.01) {
        wanderLines.forEach(([a, b], i) => {
          const ph = time * 0.22 + i * 2.1;
          const u = (Math.sin(ph) + 1) / 2;
          const dir = Math.cos(ph) >= 0 ? 1 : -1;
          const x = lerp(a.x, b.x, u);
          const y = lerp(a.y, b.y, u);
          drawPerson(x, y, dir, time * 5.2 + i, reducedMotion ? 0 : 1, i ? ACCENT.ochre : "#8a9a6e", i === 0, wanderAlpha * 0.85);
        });
      }

      walkers.forEach((w, i) => {
        const pt = routePoint(routes[w.route], sOf[i], morph);
        const dx = pt.x - w.x;
        const dy = pt.y - w.y;
        const dist = Math.hypot(dx, dy);
        if (moving) {
          if (Math.abs(dx) > 0.15) w.dir = dx > 0 ? 1 : -1;
          w.stride += dist * 0.42;
          w.amp = lerp(w.amp, dist > 0.2 ? 1 : 0, 0.12);
        }
        w.x = pt.x;
        w.y = pt.y;
        drawPerson(w.x, w.y, w.dir, w.stride, w.amp, w.shirt, w.pack, 1);
      });

      // Conversation marks over the talking pairs.
      const talk = 1 - phase(p, 0.08, 0.16);
      if (talk > 0.01) {
        GROUPS.forEach((_, gi) => {
          const speaker = walkers[gi * 2 + (Math.floor(time / 2.4 + gi) % 2)];
          const on = reducedMotion ? 1 : Math.max(0, Math.sin(time * 1.4 + gi * 2.2));
          if (speaker && on > 0.05) drawEmphasis(speaker.x, speaker.y - 27 * sc, talk * Math.min(1, on * 1.6));
        });
      }

      // 11. margin notes, one per phase
      if (walkers.length === 6) {
        const g1 = walkers[2];
        drawNote("start in the field", { x: g1.x + 6, y: g1.y - 30 * sc }, desktop ? 34 : 24, desktop ? -46 : -70, windowed(p, -1, 0.2));
        drawNote("paths branch", routes[0].fork, desktop ? 26 : 34, desktop ? -2 : 20, windowed(p, 0.2, 0.38));
        if (crossings[0]) drawNote("where paths cross", crossings[0].pt, desktop ? 42 : 62, 42, windowed(p, 0.4, 0.58));
        const mid = routePoint(routes[routeOfCluster[4]], 0.55, morph);
        drawNote("flows become data", mid, desktop ? -40 : 30, desktop ? 30 : 40, windowed(p, 0.58, 0.73));
        drawNote("a system emerges", { x: hubs[4].x, y: hubs[4].y + R + 24 * sc }, desktop ? 16 : -16, 64, windowed(p, 0.74, 0.94));
      }
    }

    // ---- lifecycle ------------------------------------------------------------
    let raf = 0;
    let visible = true;
    let pointer: Pt | null = null;

    function onPointer(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onPointerLeave() {
      pointer = null;
    }

    function applyPointer() {
      if (!pointer) return;
      for (const n of nodes) {
        if (n.hub) continue;
        const dx = (n.x ?? 0) - pointer.x;
        const dy = (n.y ?? 0) - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 80 * 80 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / 80) * 0.5;
          n.vx = (n.vx ?? 0) + (dx / d) * f;
          n.vy = (n.vy ?? 0) + (dy / d) * f;
        }
      }
    }

    function frame(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      const p = progressRef.current.get();
      if (p > 0.45) {
        applyPointer();
        sim.tick();
      }
      draw(p, now / 1000, true);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (!raf && !reducedMotion) raf = requestAnimationFrame(frame);
    }

    function renderStatic() {
      for (let i = 0; i < 200; i++) sim.tick();
      draw(1, 0, false);
    }

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      if (reducedMotion) renderStatic();
    });
    ro.observe(canvas);

    let io: IntersectionObserver | null = null;
    const onVisibility = () => {
      if (!document.hidden) start();
    };

    if (reducedMotion) {
      renderStatic();
      document.fonts?.ready.then(renderStatic).catch(() => {});
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
        },
        { rootMargin: "120px" },
      );
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      sim.stop();
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
