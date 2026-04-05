"use client";

import { useEffect, useState } from "react";
import st from "./fireworks.module.scss";

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 4294967295;
  };
}

interface Spoke {
  angle: number;
  len: number;
  width: number;
}

function buildFirework(
  seed: number,
  count: number,
  rMin: number,
  rMax: number,
  baseW: number,
): Spoke[] {
  const rng = makeRng(seed);
  return Array.from({ length: count }, (_, i) => {
    const baseAngle = (2 * Math.PI * i) / count;
    const jitter = (rng() - 0.5) * ((Math.PI / count) * 0.5);
    const frac = rng();
    const len = rMin + frac * (rMax - rMin);
    return {
      angle: baseAngle + jitter,
      len,
      width: Math.max(0.3, baseW * (0.25 + frac * 0.75)),
    };
  });
}

interface FwConfig {
  seed: number;
  spokes: number;
  rMin: number;
  rMax: number;
  baseW: number;
  neon: string;
  top: string;
  left: string;
  size: number;
  animDur: string;
  animDelay: string;
  filterId: string;
}

const FIREWORKS: FwConfig[] = [
  // top row
  { seed: 42,  spokes: 46, rMin: 32, rMax: 90,  baseW: 1.1, neon: "#ffcc00", top: "8%",  left: "4%",  size: 190, animDur: "11s", animDelay: "0s",    filterId: "fw0"  },
  { seed: 211, spokes: 52, rMin: 20, rMax: 60,  baseW: 0.7, neon: "#00ffcc", top: "4%",  left: "22%", size: 130, animDur: "14s", animDelay: "0.4s",   filterId: "fw1"  },
  { seed: 77,  spokes: 40, rMin: 26, rMax: 75,  baseW: 0.9, neon: "#ff44ff", top: "6%",  left: "44%", size: 160, animDur: "9s",  animDelay: "0.8s",   filterId: "fw2"  },
  { seed: 310, spokes: 58, rMin: 18, rMax: 54,  baseW: 0.6, neon: "#88ff00", top: "3%",  left: "64%", size: 115, animDur: "12s", animDelay: "0.2s",   filterId: "fw3"  },
  { seed: 53,  spokes: 35, rMin: 28, rMax: 80,  baseW: 1.0, neon: "#ff8800", top: "7%",  left: "82%", size: 170, animDur: "15s", animDelay: "0.6s",   filterId: "fw4"  },
  // middle row
  { seed: 174, spokes: 44, rMin: 24, rMax: 70,  baseW: 0.8, neon: "#aa44ff", top: "40%", left: "2%",  size: 150, animDur: "13s", animDelay: "0.35s",  filterId: "fw5"  },
  { seed: 88,  spokes: 60, rMin: 16, rMax: 50,  baseW: 0.6, neon: "#ff0088", top: "36%", left: "28%", size: 110, animDur: "10s", animDelay: "0.9s",   filterId: "fw6"  },
  { seed: 319, spokes: 42, rMin: 30, rMax: 88,  baseW: 1.1, neon: "#00aaff", top: "42%", left: "56%", size: 185, animDur: "16s", animDelay: "0.15s",  filterId: "fw7"  },
  { seed: 137, spokes: 36, rMin: 22, rMax: 65,  baseW: 0.8, neon: "#ffcc00", top: "38%", left: "80%", size: 140, animDur: "11s", animDelay: "0.55s",  filterId: "fw8"  },
  // bottom row
  { seed: 99,  spokes: 50, rMin: 26, rMax: 78,  baseW: 0.9, neon: "#00ffcc", top: "72%", left: "8%",  size: 160, animDur: "13s", animDelay: "0.7s",   filterId: "fw9"  },
  { seed: 201, spokes: 38, rMin: 20, rMax: 62,  baseW: 0.7, neon: "#ff44ff", top: "70%", left: "36%", size: 130, animDur: "9s",  animDelay: "0.25s",  filterId: "fw10" },
  { seed: 65,  spokes: 55, rMin: 28, rMax: 84,  baseW: 1.0, neon: "#88ff00", top: "75%", left: "62%", size: 175, animDur: "14s", animDelay: "0.45s",  filterId: "fw11" },
  { seed: 255, spokes: 32, rMin: 18, rMax: 56,  baseW: 0.6, neon: "#ff8800", top: "68%", left: "86%", size: 120, animDur: "11s", animDelay: "0.85s",  filterId: "fw12" },
];

const BUILT = FIREWORKS.map((fw) => ({
  ...fw,
  lines: buildFirework(fw.seed, fw.spokes, fw.rMin, fw.rMax, fw.baseW),
}));

function parseHex(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

const Fireworks = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      {/* SVG defs (filters) — shared, hidden */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {BUILT.map((fw) => {
            const [r, g, b] = parseHex(fw.neon);
            return (
              <filter key={fw.filterId} id={fw.filterId} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur" type="matrix"
                  values={`0 0 0 0 ${r/255}  0 0 0 0 ${g/255}  0 0 0 0 ${b/255}  0 0 0 2.5 0`}
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}
        </defs>
      </svg>

      {BUILT.map((fw, fi) => {
        const isHovered = hoveredIdx === fi;
        const half = fw.size / 2;
        const maxLen = Math.max(...fw.lines.map((l) => l.len));

        return (
          <svg
            key={fi}
            className={st.fw}
            viewBox={`${-half} ${-half} ${fw.size} ${fw.size}`}
            width={fw.size}
            height={fw.size}
            style={{
              top: fw.top,
              left: fw.left,
              animationDuration: fw.animDur,
              animationDelay: fw.animDelay,
            }}
            onMouseEnter={() => setHoveredIdx(fi)}
            onMouseLeave={() => setHoveredIdx(null)}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Invisible hover zone */}
            <circle r={maxLen * 1.1} fill="transparent" />

            {/* Base layer — always dim */}
            <g>
              {fw.lines.map((l, i) => (
                <line
                  key={i}
                  x1={0} y1={0}
                  x2={Math.cos(l.angle) * l.len}
                  y2={Math.sin(l.angle) * l.len}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={l.width}
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Neon layer — fades outward from center */}
            <g filter={`url(#${fw.filterId})`}>
              {fw.lines.map((l, i) => {
                const norm = l.len / maxLen; // 0=short →  1=longest
                const delayIn  = (norm * 1.4).toFixed(3);
                const delayOut = ((1 - norm) * 0.8).toFixed(3);
                return (
                  <line
                    key={i}
                    x1={0} y1={0}
                    x2={Math.cos(l.angle) * l.len}
                    y2={Math.sin(l.angle) * l.len}
                    stroke={fw.neon}
                    strokeWidth={l.width}
                    strokeLinecap="round"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: `opacity 0.9s cubic-bezier(0.25,0,0,1) ${isHovered ? delayIn : delayOut}s`,
                    }}
                  />
                );
              })}
            </g>
          </svg>
        );
      })}
    </>
  );
};

export default Fireworks;
