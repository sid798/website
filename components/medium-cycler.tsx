"use client";

import { useEffect, useState } from "react";

/** Steps through each medium once, then rests on the last line. */
export function MediumCycler({ words, final }: { words: string[]; final: string }) {
  const all = [...words, final];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const last = all.length - 1;
    if (index >= last) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(
      () => setIndex(reduced ? last : index + 1),
      reduced ? 0 : index === 0 ? 1600 : 900,
    );
    return () => clearTimeout(id);
  }, [index, all.length]);

  return (
    <span className="relative inline-grid align-baseline">
      <span className="sr-only">{final}</span>
      {all.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap font-serif italic transition-[transform,opacity,filter] duration-500 ease-[var(--ease-out)] motion-reduce:transition-none"
          style={{
            opacity: i === index ? 1 : 0,
            transform: `translateY(${i === index ? 0 : i < index ? -40 : 40}%)`,
            filter: i === index ? "none" : "blur(4px)",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
