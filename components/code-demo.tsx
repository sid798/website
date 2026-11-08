"use client";

import { useEffect, useRef, useState } from "react";

const prompt = "Make the project row scroll sideways and ease to a stop.";

const code = [
  "const row = useRef(null);",
  "",
  "<div",
  "  ref={row}",
  '  className="flex gap-3 overflow-x-auto"',
  '  style={{ scrollSnapType: "x proximity" }}',
  ">",
  "  {projects.map((p) => <Card key={p.slug} {...p} />)}",
  "</div>",
];

/** A prompt types out, then the code it produced appears line by line. */
export function CodeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [chars, setChars] = useState(prompt.length);
  const [lines, setLines] = useState(code.length);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;

    const play = () => {
      setChars(0);
      setLines(0);
      let c = 0;
      let l = 0;
      timer = setInterval(() => {
        if (c < prompt.length) {
          c += 1;
          setChars(c);
        } else if (l < code.length) {
          l += 1;
          setLines(l);
        } else {
          clearInterval(timer);
        }
      }, 28);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [run]);

  return (
    <div ref={root} className="overflow-hidden rounded-lg border border-line bg-[#fafafa] font-mono text-[11.5px] leading-[1.65]">
      <div className="flex items-center justify-between border-b border-line px-3 py-2 text-muted">
        <span>Prompt</span>
        <button type="button" onClick={() => setRun((r) => r + 1)} className="transition-colors hover:text-ink">
          Replay
        </button>
      </div>
      <p className="min-h-[3.3em] border-b border-line px-3 py-2.5">
        {prompt.slice(0, chars)}
        {chars < prompt.length ? <span className="text-muted">▍</span> : null}
      </p>
      <pre className="overflow-x-auto px-3 py-2.5 text-[#555]">
        {code.map((line, i) => (
          <div key={i} className="flex gap-3 transition-opacity duration-200" style={{ opacity: i < lines ? 1 : 0 }}>
            <span className="w-3 shrink-0 select-none text-right text-[#c4c4c4]">{i + 1}</span>
            <code>{line || " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
