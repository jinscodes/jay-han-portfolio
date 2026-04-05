"use client";
import { useEffect, useRef } from "react";

const NEON_COLORS = ["#00ffcc", "#ff44ff", "#88ff00", "#00aaff", "#ffcc00"];
const NEON_RATIO = 0.08; // 8% of flakes are neon
const COUNT = 160;

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  driftSpeed: number;
  driftOffset: number;
  neon: string | null;
  opacity: number;
}

function makeFlake(w: number, h: number, fromTop = false): Flake {
  const isNeon = Math.random() < NEON_RATIO;
  return {
    x: Math.random() * w,
    y: fromTop ? Math.random() * -h : Math.random() * h,
    r: isNeon ? 1.2 + Math.random() * 1.6 : 0.6 + Math.random() * 2.2,
    speed: 0.4 + Math.random() * 1.2,
    drift: 0,
    driftSpeed: 0.002 + Math.random() * 0.006,
    driftOffset: Math.random() * Math.PI * 2,
    neon: isNeon
      ? NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
      : null,
    opacity: isNeon ? 0.85 + Math.random() * 0.15 : 0.25 + Math.random() * 0.55,
  };
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const flakes: Flake[] = Array.from({ length: COUNT }, () =>
      makeFlake(w, h),
    );

    let frame = 0;
    let raf: number;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      for (const f of flakes) {
        f.y += f.speed;
        f.drift = Math.sin(frame * f.driftSpeed + f.driftOffset) * 0.6;
        f.x += f.drift;

        if (f.y > h + f.r * 2) {
          Object.assign(f, makeFlake(w, h, true));
          f.y = -f.r * 2;
        }
        if (f.x < -f.r * 4) f.x = w + f.r;
        if (f.x > w + f.r * 4) f.x = -f.r;

        ctx.save();
        if (f.neon) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = f.neon;
          ctx.fillStyle = f.neon;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        }
        ctx.globalAlpha = f.neon ? f.opacity : 1;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
