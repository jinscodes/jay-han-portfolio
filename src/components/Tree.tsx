"use client";

import { useEffect, useState } from "react";
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

const LINES: Line[] = [];

// ── 1. Center tree: classic, tall, balanced, moderate spread ──────────────
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
const rngC = makeRng(137);
grow(rngC, 700, 482, -1, 118, 9.5, 10, LINES, cfgCenter);

// ── 2. Left-medium tree: wide & bushy, large spread, frequent 3rd branch ──
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
const rngB = makeRng(211);
grow(rngB, 290, 486, 4, 95, 8, 9, LINES, cfgBushy);

// ── 3. Far-left tree: gnarled / twisted, strong lean, irregular ───────────
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
const rngG2 = makeRng(53);
grow(rngG2, 105, 489, 8, 75, 6, 9, LINES, cfgGnarled);

// ── 4. Right-medium tree: slender / upright like a cypress ────────────────
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
const rngS = makeRng(174);
grow(rngS, 1075, 485, -2, 100, 7.5, 10, LINES, cfgSlender);

// ── 5. Far-right tree: windswept, heavy rightward lean ────────────────────
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
const rngW = makeRng(319);
grow(rngW, 1295, 488, -6, 78, 6, 9, LINES, cfgWind);

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

const Tree = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
  <div className={st.wrapper}>
    <svg
      viewBox="0 0 1400 500"
      preserveAspectRatio="xMidYMax meet"
      className={st.svg}
      xmlns="http://www.w3.org/2000/svg"
    >
      {LINES.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          strokeWidth={l.w}
          className={st.branch}
        />
      ))}

      {/* Grass */}
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
    </svg>
  </div>
  );
};

export default Tree;
