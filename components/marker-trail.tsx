"use client";

import { useEffect, useRef } from "react";

const colours = ["#F5D33B", "#FF6B4A", "#5B8CFF", "#3FBF7F", "#FF7AC6"];
const LIFE = 3000;
const WIDTH = 26;

type Point = { x: number; y: number; t: number; c: string; stroke: number };

/** The cursor becomes a fat marker. Its trail fades out after a few seconds; click to change colour. */
export function MarkerTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const points: Point[] = [];
    let colour = 0;
    let stroke = 0;
    let tip: { x: number; y: number; big: boolean } | null = null;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      el.width = innerWidth * dpr;
      el.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const now = performance.now();
      while (points.length && now - points[0].t > LIFE) points.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = WIDTH;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        if (a.stroke !== b.stroke) continue;
        const age = (now - b.t) / LIFE;
        ctx.globalAlpha = age < 0.5 ? 0.9 : 0.9 * (1 - (age - 0.5) / 0.5);
        ctx.strokeStyle = b.c;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      if (tip) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = colours[colour];
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, tip.big ? WIDTH * 0.75 : WIDTH / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = points.length || tip ? requestAnimationFrame(draw) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const big = !!(e.target as Element).closest?.("a, button");
      tip = { x: e.clientX, y: e.clientY, big };
      points.push({ x: e.clientX, y: e.clientY, t: performance.now(), c: colours[colour], stroke });
      wake();
    };
    const onDown = () => {
      colour = (colour + 1) % colours.length;
      stroke += 1;
      wake();
    };
    const onLeave = () => {
      tip = null;
      stroke += 1;
    };

    resize();
    document.documentElement.classList.add("marker-on");
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("marker-on");
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 size-full mix-blend-multiply"
    />
  );
}
