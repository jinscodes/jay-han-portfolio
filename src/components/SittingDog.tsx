"use client";
import { useEffect, useState } from "react";
import st from "./sittingDog.module.scss";

const NEON = "#00ffcc";

export default function SittingDog() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const dim = "rgba(255,255,255,0.10)";
  const neonOpacity = hovered ? 1 : 0;

  const strokeProps = {
    fill: "none" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.5,
  };

  // All paths describing a Doberman in side profile facing right
  const paths = [
    // Back topline: rump → withers → neck base
    "M 26,82 C 55,76 100,72 142,70 C 148,69 153,66 158,58",
    // Neck: rises from withers up to poll
    "M 158,58 C 160,50 162,40 163,34",
    // Back ear (left)
    "M 163,34 C 160,26 155,14 152,6 C 153,6 158,16 162,28",
    // Forehead between ears
    "M 162,28 C 163,26 164,24 165,22",
    // Front ear (right)
    "M 165,22 C 165,14 168,6 170,4 C 171,4 173,14 172,24",
    // Head top down to muzzle
    "M 172,24 C 177,24 183,28 188,34 C 193,40 197,48 198,54",
    // Muzzle tip / nose
    "M 198,54 C 198,58 196,62 193,64",
    // Jaw / lower muzzle back
    "M 193,64 C 188,67 180,68 173,67 C 167,66 162,64 160,60",
    // Throat / under-neck
    "M 160,60 C 157,68 154,80 152,98 C 151,106 150,116 150,128",
    // Chest front → front leg nearer (A)
    "M 150,128 L 147,208",
    // Paw A
    "M 141,208 L 154,208",
    // Front leg farther (B)
    "M 158,126 L 162,208",
    // Paw B
    "M 156,208 L 168,208",
    // Belly tuck: from chest junction up toward rear
    "M 150,128 C 132,122 108,112 82,104 C 62,98 44,98 34,96",
    // Haunch connects belly to rump
    "M 34,96 C 30,92 26,88 26,82",
    // Rear leg farther (C): hip → stifle → hock → paw
    "M 22,96 C 14,116 10,138 16,160 C 18,170 26,182 30,208",
    // Paw C
    "M 24,208 L 37,208",
    // Rear leg nearer (D): hip → stifle → hock → paw
    "M 36,98 C 44,122 48,146 46,165 C 44,180 44,196 46,208",
    // Paw D
    "M 40,208 L 54,208",
    // Short docked tail
    "M 26,82 C 21,72 18,62 22,54",
    // Chest muscle line (sternum sweep)
    "M 152,98 C 148,106 148,116 150,128",
  ];

  // Small details
  const eye = { cx: 182, cy: 40, r: 2.2 };

  return (
    <div
      className={st.wrap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 210 220"
        width="200"
        height="210"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="dogGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 2 2 0 0   2 2 2 0 1   2 2 2 0 1   0 0 0 20 -7"
              result="bloom"
            />
            <feMerge>
              <feMergeNode in="bloom" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* hit zone */}
        <rect x="0" y="0" width="210" height="220" fill="transparent" />

        {/* === DIM BASE LAYER === */}
        <g stroke={dim} {...strokeProps}>
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
          <circle cx={eye.cx} cy={eye.cy} r={eye.r} fill={dim} stroke="none" />
        </g>

        {/* === NEON COLOR LAYER === */}
        <g
          stroke={NEON}
          filter="url(#dogGlow)"
          style={{
            opacity: neonOpacity,
            transition: "opacity 0.7s cubic-bezier(0.25,0,0,1)",
          }}
          {...strokeProps}
        >
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
          <circle cx={eye.cx} cy={eye.cy} r={eye.r} fill={NEON} stroke="none" />
        </g>
      </svg>
    </div>
  );
}
