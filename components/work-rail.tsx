"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ratioClass: Record<Project["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 128;
}

export function WorkRail({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section id="work" ref={section} className="flex min-h-svh flex-col justify-center overflow-hidden py-24">
      <div className="mb-10 flex items-end justify-between px-5 sm:px-10">
        <h2 className="flex items-baseline gap-3 text-sm">
          <span>Selected work</span>
          <span className="font-mono text-xs text-muted">({String(projects.length).padStart(2, "0")})</span>
        </h2>
        <p className="font-mono text-xs text-muted">
          <span className="hidden md:inline">Scroll</span>
          <span className="md:hidden">Swipe</span> →
        </p>
      </div>

      <ul
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 will-change-transform sm:px-10 md:snap-none md:gap-8 md:overflow-visible"
      >
        {projects.map((project, i) => {
          const dark = isDark(project.tone);
          return (
            <li key={project.slug} className="shrink-0 snap-start">
              <Link href={`/work/${project.slug}`} className="group block">
                <div
                  className={`relative w-[78vw] overflow-hidden md:h-[58svh] md:w-auto ${ratioClass[project.ratio]}`}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                    style={{ background: project.tone }}
                  />
                  <span
                    className={`absolute left-4 top-4 font-mono text-[11px] ${dark ? "text-paper/60" : "text-ink/50"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{project.name}</h3>
                    <p className="text-sm text-muted">{project.kind}</p>
                  </div>
                  <span className="-translate-x-2 text-sm opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100">
                    View →
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mx-5 mt-10 hidden h-px bg-line sm:mx-10 md:block">
        <div ref={bar} className="h-px origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  );
}
