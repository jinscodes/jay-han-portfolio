"use client";
import { useEffect, useState } from "react";
import st from "./sittingDog.module.scss";

const NEON = "#ffffff";

// All drawing logic in one place, re-used for dim + neon layers
function SnowmanPaths({ c, f }: { c: string; f: string }) {
  // c = stroke color, f = fill color
  // viewBox 0 0 160 220
  // Body  cx=80 cy=162 r=50
  // Head  cx=80 cy=90  r=36
  return (
    <g strokeLinecap="round" strokeLinejoin="round">

      {/* ───── BODY ───── */}
      <circle cx="80" cy="162" r="50" stroke={c} strokeWidth="1.6" fill="none" />

      {/* ───── HEAD ───── */}
      <circle cx="80" cy="90" r="36" stroke={c} strokeWidth="1.6" fill="none" />

      {/* ───── SANTA HAT ───── */}
      {/* brim — rounded rectangle sitting on head */}
      <path
        d="M 48,58 Q 48,51 56,51 L 104,51 Q 112,51 112,58 Q 112,65 104,65 L 56,65 Q 48,65 48,58 Z"
        stroke={c} strokeWidth="1.4" fill="none"
      />
      {/* hat body: tapers from brim up to tip, leaning slightly right */}
      <path
        d="M 54,60 C 56,42 64,20 74,8 C 76,4 84,4 86,8 C 96,20 104,42 106,60"
        stroke={c} strokeWidth="1.4" fill="none"
      />
      {/* hat top closing line */}
      <path d="M 74,8 Q 80,6 86,8" stroke={c} strokeWidth="1.4" fill="none" />
      {/* pom-pom */}
      <circle cx="80" cy="5" r="6" stroke={c} strokeWidth="1.3" fill="none" />
      {/* pom-pom texture */}
      <path d="M 75,3 Q 80,8 85,3" stroke={c} strokeWidth="0.7" fill="none" strokeOpacity="0.6" />
      <path d="M 76,7 Q 80,2 84,7" stroke={c} strokeWidth="0.7" fill="none" strokeOpacity="0.6" />

      {/* ───── SCARF ───── */}
      {/* main wrap — thick band around neck */}
      <path
        d="M 46,120 C 52,126 66,130 80,130 C 94,130 108,126 114,120"
        stroke={c} strokeWidth="5.5" fill="none"
      />
      {/* scarf overlap knot area */}
      <path
        d="M 46,120 C 52,114 66,110 80,110 C 94,110 108,114 114,120"
        stroke={c} strokeWidth="5.5" fill="none"
      />
      {/* scarf stripe lines on upper wrap */}
      <path
        d="M 50,113 C 60,109 72,108 80,108 C 88,108 100,109 110,113"
        stroke={f} strokeWidth="0.9" fill="none" strokeOpacity="0.35"
      />
      {/* scarf stripe lines on lower wrap */}
      <path
        d="M 49,123 C 59,127 70,129 80,129 C 90,129 101,127 111,123"
        stroke={f} strokeWidth="0.9" fill="none" strokeOpacity="0.35"
      />
      {/* hanging tail — left side, goes down with fringes */}
      <path
        d="M 50,118 C 44,128 42,142 44,156 C 45,162 47,168 48,174"
        stroke={c} strokeWidth="4" fill="none"
      />
      {/* tail stripe */}
      <path
        d="M 52,118 C 46,128 44,142 46,156 C 47,162 49,168 50,174"
        stroke={f} strokeWidth="0.8" fill="none" strokeOpacity="0.35"
      />
      {/* fringe ends */}
      <path d="M 44,172 L 42,180" stroke={c} strokeWidth="2" fill="none" />
      <path d="M 48,174 L 48,182" stroke={c} strokeWidth="2" fill="none" />
      <path d="M 52,173 L 54,181" stroke={c} strokeWidth="2" fill="none" />

      {/* ───── EYES ───── */}
      <circle cx="68" cy="84" r="3.2" fill={f} stroke="none" />
      <circle cx="92" cy="84" r="3.2" fill={f} stroke="none" />

      {/* ───── CARROT NOSE ───── */}
      {/* pointed cone going right */}
      <path
        d="M 80,90 L 95,93 L 80,97 Z"
        stroke={c} strokeWidth="1.1" fill="none"
      />
      {/* nose ridge line */}
      <path d="M 80,90 L 95,93" stroke={c} strokeWidth="1.3" fill="none" strokeOpacity="0.5" />

      {/* ───── SMILE (dot arc) ───── */}
      <circle cx="68" cy="104" r="1.8" fill={f} stroke="none" />
      <circle cx="73" cy="109" r="1.8" fill={f} stroke="none" />
      <circle cx="80" cy="111" r="1.8" fill={f} stroke="none" />
      <circle cx="87" cy="109" r="1.8" fill={f} stroke="none" />
      <circle cx="92" cy="104" r="1.8" fill={f} stroke="none" />

      {/* ───── ROSY CHEEKS ───── */}
      <ellipse cx="57" cy="98" rx="9" ry="7" stroke={c} strokeWidth="0.9" fill="none" strokeOpacity="0.45" />
      <ellipse cx="103" cy="98" rx="9" ry="7" stroke={c} strokeWidth="0.9" fill="none" strokeOpacity="0.45" />
      {/* cheek inner hatch */}
      <path d="M 52,96 Q 57,101 62,96" stroke={c} strokeWidth="0.7" fill="none" strokeOpacity="0.3" />
      <path d="M 98,96 Q 103,101 108,96" stroke={c} strokeWidth="0.7" fill="none" strokeOpacity="0.3" />

      {/* ───── BUTTONS ───── */}
      <circle cx="80" cy="146" r="3.5" fill={f} stroke="none" />
      <circle cx="80" cy="159" r="3.5" fill={f} stroke="none" />
      <circle cx="80" cy="172" r="3.5" fill={f} stroke="none" />

      {/* ───── ARMS ───── */}
      {/* left arm — main branch */}
      <path d="M 32,152 C 20,144 10,136 4,124" stroke={c} strokeWidth="1.6" fill="none" />
      {/* left twig up */}
      <path d="M 14,132 C 12,126 8,122 6,118" stroke={c} strokeWidth="1.1" fill="none" />
      {/* left twig down */}
      <path d="M 18,138 C 14,138 10,140 8,144" stroke={c} strokeWidth="1.1" fill="none" />

      {/* right arm — main branch */}
      <path d="M 128,152 C 140,144 150,136 156,124" stroke={c} strokeWidth="1.6" fill="none" />
      {/* right twig up */}
      <path d="M 146,132 C 148,126 152,122 154,118" stroke={c} strokeWidth="1.1" fill="none" />
      {/* right twig down */}
      <path d="M 142,138 C 146,138 150,140 152,144" stroke={c} strokeWidth="1.1" fill="none" />

      {/* ───── GROUND SNOW MOUND ───── */}
      <path
        d="M 10,212 Q 30,200 80,202 Q 130,200 150,212"
        stroke={c} strokeWidth="1.2" fill="none"
      />
      <ellipse cx="80" cy="212" rx="70" ry="6" stroke={c} strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
    </g>
  );
}

export default function Snowman() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const dim = "rgba(255,255,255,0.14)";
  const glow = hovered ? 1 : 0;

  return (
    <div
      className={st.wrap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 160 220" width="160" height="220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="snowmanGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur" type="matrix"
              values="5 5 5 0 1  5 5 5 0 1  5 5 5 0 1  0 0 0 28 -10"
              result="bloom"
            />
            <feMerge>
              <feMergeNode in="bloom" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* hit zone */}
        <rect x="0" y="0" width="160" height="220" fill="transparent" />

        {/* dim base layer */}
        <SnowmanPaths c={dim} f={dim} />

        {/* neon glow layer */}
        <g
          filter="url(#snowmanGlow)"
          style={{ opacity: glow, transition: "opacity 0.65s cubic-bezier(0.25,0,0,1)" }}
        >
          <SnowmanPaths c={NEON} f={NEON} />
        </g>
      </svg>
    </div>
  );
}

