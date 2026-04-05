"use client";

import { useEffect, useRef, useState } from "react";
import st from "./tree.module.scss";

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 4294967295;
  };
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w: number;
}

interface TreeCfg {
  spreadBase: number; // base split angle (° each side)
  jitterScale: number; // jitter amount (°)
  lRatio: number; // left-branch length ratio base
  rRatio: number; // right-branch length ratio base
  widthDecay: number; // how fast branches thin (0.55–0.72)
  thirdProb: number; // probability of 3rd branch (0 = never)
  minLen: number; // stop branching below this length
  leanBias: number; // constant angle bias added each level (+ = right lean)
  asymmetry: number; // extra angle added to right spread (negative = left bias)
}

function grow(
  rng: () => number,
  x: number,
  y: number,
  angleDeg: number,
  len: number,
  width: number,
  depth: number,
  out: Line[],
  cfg: TreeCfg,
) {
  if (len < cfg.minLen || depth <= 0) return;

  const rad = (angleDeg * Math.PI) / 180;
  const x2 = x + Math.sin(rad) * len;
  const y2 = y - Math.cos(rad) * len;
  out.push({ x1: x, y1: y, x2, y2, w: Math.max(0.4, width) });

  const spread = cfg.spreadBase + rng() * 10;
  const jL = (rng() - 0.5) * cfg.jitterScale;
  const jR = (rng() - 0.5) * cfg.jitterScale;
  const lr = cfg.lRatio + rng() * 0.06;
  const rr = cfg.rRatio + rng() * 0.06;
  const bias = cfg.leanBias;

  grow(
    rng,
    x2,
    y2,
    angleDeg - spread + jL + bias,
    len * lr,
    width * cfg.widthDecay,
    depth - 1,
    out,
    cfg,
  );
  grow(
    rng,
    x2,
    y2,
    angleDeg + spread + cfg.asymmetry + jR + bias,
    len * rr,
    width * cfg.widthDecay,
    depth - 1,
    out,
    cfg,
  );

  if (cfg.thirdProb > 0 && depth > 3 && rng() < cfg.thirdProb) {
    grow(
      rng,
      x2,
      y2,
      angleDeg + (rng() - 0.5) * spread * 0.6 + bias,
      len * 0.55,
      width * 0.5,
      depth - 2,
      out,
      cfg,
    );
  }
}

interface BBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface TreeDef {
  lines: Line[];
  neon: string;
  glow: string;
  filterId: string;
  bbox: BBox;
}

function buildTree(
  cfg: TreeCfg,
  seed: number,
  ...args: [number, number, number, number, number, number]
): Line[] {
  const lines: Line[] = [];
  const rng = makeRng(seed);
  grow(rng, args[0], args[1], args[2], args[3], args[4], args[5], lines, cfg);
  return lines;
}

// ── 1. Center: classic balanced ──────────────────────────────────────────
const cfgCenter: TreeCfg = {
  spreadBase: 26,
  jitterScale: 8,
  lRatio: 0.68,
  rRatio: 0.68,
  widthDecay: 0.63,
  thirdProb: 0.35,
  minLen: 3.5,
  leanBias: 0,
  asymmetry: 0,
};
// ── 2. Left-medium: wide & bushy ─────────────────────────────────────────
const cfgBushy: TreeCfg = {
  spreadBase: 40,
  jitterScale: 14,
  lRatio: 0.6,
  rRatio: 0.62,
  widthDecay: 0.6,
  thirdProb: 0.55,
  minLen: 4.5,
  leanBias: 1,
  asymmetry: -6,
};
// ── 3. Far-left: gnarled / twisted ───────────────────────────────────────
const cfgGnarled: TreeCfg = {
  spreadBase: 18,
  jitterScale: 22,
  lRatio: 0.72,
  rRatio: 0.58,
  widthDecay: 0.65,
  thirdProb: 0.2,
  minLen: 3.0,
  leanBias: 3,
  asymmetry: 12,
};
// ── 4. Right-medium: slender cypress ─────────────────────────────────────
const cfgSlender: TreeCfg = {
  spreadBase: 13,
  jitterScale: 5,
  lRatio: 0.7,
  rRatio: 0.7,
  widthDecay: 0.67,
  thirdProb: 0.1,
  minLen: 4.0,
  leanBias: 0,
  asymmetry: 2,
};
// ── 5. Far-right: windswept ───────────────────────────────────────────────
const cfgWind: TreeCfg = {
  spreadBase: 24,
  jitterScale: 10,
  lRatio: 0.64,
  rRatio: 0.74,
  widthDecay: 0.61,
  thirdProb: 0.25,
  minLen: 3.5,
  leanBias: 5,
  asymmetry: 18,
};

const TREES: TreeDef[] = [
  {
    lines: buildTree(cfgCenter, 137, 700, 482, -1, 118, 9.5, 10),
    neon: "#ffcc00",
    glow: "255,204,0",
    filterId: "glow0",
    bbox: { x: 460, y: 60, w: 500, h: 430 },
  }, // amber
  {
    lines: buildTree(cfgBushy, 211, 290, 486, 4, 95, 8.0, 9),
    neon: "#00ffcc",
    glow: "0,255,204",
    filterId: "glow1",
    bbox: { x: 50, y: 100, w: 480, h: 395 },
  }, // cyan
  {
    lines: buildTree(cfgGnarled, 53, 105, 489, 8, 75, 6.0, 9),
    neon: "#ff44ff",
    glow: "255,68,255",
    filterId: "glow2",
    bbox: { x: 0, y: 130, w: 300, h: 365 },
  }, // magenta
  {
    lines: buildTree(cfgSlender, 174, 1075, 485, -2, 100, 7.5, 10),
    neon: "#88ff00",
    glow: "136,255,0",
    filterId: "glow3",
    bbox: { x: 940, y: 80, w: 290, h: 412 },
  }, // lime
  {
    lines: buildTree(cfgWind, 319, 1295, 488, -6, 78, 6.0, 9),
    neon: "#00aaff",
    glow: "0,170,255",
    filterId: "glow4",
    bbox: { x: 1130, y: 120, w: 270, h: 372 },
  }, // electric blue
];

// Grass blades — full width, dense
interface Blade {
  x: number;
  h: number;
  lean: number;
}
const rngG = makeRng(42);
const GRASS: Blade[] = Array.from({ length: 600 }, () => ({
  x: rngG() * 1400,
  h: 5 + rngG() * 20,
  lean: (rngG() - 0.5) * 30,
}));

// Lerp between two hex colors as rgb strings
function lerpColor(hexA: string, hexB: string, t: number): string {
  const pa = parseInt(hexA.slice(1), 16);
  const pb = parseInt(hexB.slice(1), 16);
  const ar = (pa >> 16) & 0xff,
    ag = (pa >> 8) & 0xff,
    ab = pa & 0xff;
  const br = (pb >> 16) & 0xff,
    bg = (pb >> 8) & 0xff,
    bb = pb & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${b})`;
}

const Tree = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxWidths = useRef<number[]>([]);

  useEffect(() => {
    setMounted(true);
    maxWidths.current = TREES.map((t) => Math.max(...t.lines.map((l) => l.w)));
  }, []);

  if (!mounted) return null;

  return (
    <div className={st.wrapper}>
      <svg
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMax meet"
        className={st.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="grassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1.5"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.2  0 0 0 0 1  0 0 0 0 0.2  0 0 0 2.5 0"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {TREES.map((tree) => (
            <filter
              key={tree.filterId}
              id={tree.filterId}
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values={`0 0 0 0 ${parseInt(tree.neon.slice(1, 3), 16) / 255}
                          0 0 0 0 ${parseInt(tree.neon.slice(3, 5), 16) / 255}
                          0 0 0 0 ${parseInt(tree.neon.slice(5, 7), 16) / 255}
                          0 0 0 2 0`}
                result="coloredBlur"
              />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Trees */}
        {TREES.map((tree, ti) => {
          const isHovered = hoveredIdx === ti;
          const maxW = maxWidths.current[ti] ?? 9.5;
          return (
            <g
              key={ti}
              onMouseEnter={() => setHoveredIdx(ti)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "none" }}
            >
              {/* Invisible hit zone */}
              <rect
                x={tree.bbox.x}
                y={tree.bbox.y}
                width={tree.bbox.w}
                height={tree.bbox.h}
                fill="transparent"
                stroke="none"
              />

              {/* Base layer — always dim */}
              <g>
                {tree.lines.map((l, i) => (
                  <line
                    key={i}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    strokeWidth={l.w}
                    className={st.branch}
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* Color layer — fades in on hover */}
              <g
                filter={`url(#${tree.filterId})`}
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.8s ease",
                }}
              >
                {tree.lines.map((l, i) => {
                  const t = Math.min(1, l.w / maxW);
                  return (
                    <line
                      key={i}
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      strokeWidth={l.w}
                      stroke={lerpColor(tree.neon, "#ffffff", t)}
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            </g>
          );
        })}

        {/* Grass — base layer */}
        <g>
          {GRASS.map((b, i) => {
            const tipX = b.x + Math.sin((b.lean * Math.PI) / 180) * b.h;
            const tipY = 497 - b.h;
            return (
              <path
                key={`g-${i}`}
                d={`M${b.x},498 Q${b.x + b.lean * 0.4},${498 - b.h * 0.5} ${tipX},${tipY}`}
                className={st.grass}
              />
            );
          })}
        </g>

        {/* Grass — neon green overlay per tree, fades in only under hovered tree */}
        {TREES.map((tree, ti) => {
          const isHovered = hoveredIdx === ti;
          const x0 = tree.bbox.x;
          const x1 = tree.bbox.x + tree.bbox.w;
          return (
            <g
              key={`grassNeon-${ti}`}
              filter="url(#grassGlow)"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            >
              {GRASS.filter((b) => b.x >= x0 && b.x <= x1).map((b, i) => {
                const tipX = b.x + Math.sin((b.lean * Math.PI) / 180) * b.h;
                const tipY = 497 - b.h;
                return (
                  <path
                    key={`ng-${ti}-${i}`}
                    d={`M${b.x},498 Q${b.x + b.lean * 0.4},${498 - b.h * 0.5} ${tipX},${tipY}`}
                    stroke="#44ff66"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Tree;
