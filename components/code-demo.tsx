"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const prompt = "Make the project row feel physical: scroll moves it sideways and it eases to a stop.";

type Token = [text: string, tone?: "key" | "str" | "fn" | "num" | "dim"];

const code: Token[][] = [
  [["gsap", "fn"], [".to(track, {"]],
  [["  x: "], ["() => -distance()", "fn"], [","]],
  [["  ease: "], ['"none"', "str"], [","]],
  [["  scrollTrigger: {"]],
  [["    trigger: "], ["section", "key"], [","]],
  [["    start: "], ['"top top"', "str"], [","]],
  [["    pin: "], ["true", "num"], [", scrub: "], ["true", "num"], [","]],
  [["    end: "], ["() => `+=${distance()}`", "fn"], [","]],
  [["  },"]],
  [["});"]],
];

const toneClass = {
  key: "text-[#9ecbff]",
  str: "text-[#ffb38a]",
  fn: "text-[#e9e5db]",
  num: "text-signal",
  dim: "text-white/35",
};

const tiles = ["#D9D3C7", "#C9CFC8", "#3a3a37", "#E4D6C3", "#BFC6CC"];

export function CodeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const typed = root.current!.querySelector<HTMLElement>("[data-typed]")!;
      const caret = root.current!.querySelector<HTMLElement>("[data-caret]")!;
      const lines = root.current!.querySelectorAll<HTMLElement>("[data-line]");
      const rail = root.current!.querySelector<HTMLElement>("[data-rail]")!;
      const status = root.current!.querySelector<HTMLElement>("[data-status]")!;
      const chars = { n: 0 };

      tl.current = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } })
        .set(typed, { textContent: "" })
        .set(lines, { clipPath: "inset(0 100% 0 0)" })
        .set(rail, { x: 0 })
        .set(status, { textContent: "thinking…" })
        .set(caret, { opacity: 1 })
        .to(chars, {
          n: prompt.length,
          duration: prompt.length * 0.028,
          ease: "none",
          onUpdate: () => {
            typed.textContent = prompt.slice(0, Math.round(chars.n));
          },
        })
        .to(caret, { opacity: 0, duration: 0.1 }, "+=0.3")
        .to(lines, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "steps(18)", stagger: 0.12 }, "+=0.2")
        .set(status, { textContent: "applied" })
        .to(rail, { x: "-38%", duration: 2.2, ease: "power3.inOut" }, "+=0.15");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden rounded-[10px] border border-white/10 bg-[#1b1b19] font-mono text-[12.5px] leading-[1.7] sm:text-[13px]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[11px] text-white/45">
        <span>work-rail.tsx</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-signal" />
          <span data-status>applied</span>
        </span>
      </div>

      <div className="border-b border-white/10 px-4 py-4">
        <p className="mb-1 text-[11px] text-white/40">Prompt</p>
        <p className="text-white/90">
          <span data-typed>{prompt}</span>
          <span data-caret className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-signal opacity-0" />
        </p>
      </div>

      <pre className="overflow-x-auto px-4 py-4 text-white/70">
        {code.map((line, i) => (
          <div key={i} data-line className="flex gap-4">
            <span className="w-4 shrink-0 select-none text-right text-white/25">{i + 1}</span>
            <code>
              {line.map(([text, tone], j) => (
                <span key={j} className={tone ? toneClass[tone] : undefined}>
                  {text}
                </span>
              ))}
            </code>
          </div>
        ))}
      </pre>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-4">
        <div className="relative h-14 flex-1 overflow-hidden">
          <div data-rail className="flex h-full gap-2" style={{ transform: "translateX(-38%)" }}>
            {[...tiles, ...tiles, ...tiles].map((tone, i) => (
              <div key={i} className="h-full w-16 shrink-0 rounded-[3px]" style={{ background: tone }} />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => tl.current?.restart()}
          className="press shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70 transition-colors hover:border-white/40 hover:text-white"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
