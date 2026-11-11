"use client";

import { useEffect, useRef, useState } from "react";
import { CodeDemo } from "@/components/code-demo";
import { DiscPlayer } from "@/components/disc-player";
import { Media } from "@/components/media";
import { ProjectMeta } from "@/components/project-meta";
import {
  about,
  archives,
  connect,
  experience,
  intro,
  nowPlaying,
  projects,
  ratioClass,
  type Project,
} from "@/lib/content";

const ink = "#4a5577";

/** Sky gradients, one per entry, like the time-of-day swatches in a run log. */
const skies: Record<string, string> = {
  alai: "linear-gradient(#3e4a6e, #9c8fa8 55%, #e9b49a)",
  healthflex: "linear-gradient(#8e9ab5, #e3b9a1)",
  atlabs: "linear-gradient(#22283b, #3d4766)",
  "freight-tiger": "linear-gradient(#b9c3d6, #f1d2b8)",
  "cruise-money": "linear-gradient(#a9b5c8, #f2c987)",
  "life-in-progress": "linear-gradient(#6e7698, #d9c2cf)",
  "india-art-fair": "linear-gradient(#7a8091, #e7c39c)",
  "jazz-de-montreal": "linear-gradient(#2b3150, #8a7fa6)",
};

const paper = {
  backgroundColor: "#eeeae3",
  backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.33  0 0 0 0 0.3  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  )}")`,
};

const all = [...projects, ...archives];

function Caps({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-sans text-[11px] uppercase tracking-[0.14em] ${className}`}>{children}</p>;
}

function Divider() {
  return <hr className="my-10 border-0 border-t border-dashed border-[#c5c1b9]" />;
}

function Entry({ project }: { project: Project }) {
  return (
    <article data-key={project.slug} className="py-5">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 h-10 w-2.5 shrink-0 rounded-[2px]" style={{ background: skies[project.slug] }} />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[13px] uppercase tracking-[0.08em]">{project.name}</p>
          <Caps className="mt-0.5 opacity-60">
            {project.scope.join(" · ")} · {project.context}
          </Caps>
        </div>
        <span
          className="mt-1.5 size-2 shrink-0 rounded-full border border-current"
          style={{ background: project.nda ? "transparent" : "currentColor" }}
          title={project.nda ? "Under NDA" : "Own work"}
        />
      </div>
      <div className="mt-4 space-y-3 pl-[26px]">
        <p>{project.summary}</p>
        <div className="font-sans text-[13px]">
          <ProjectMeta project={project} />
        </div>
      </div>
      <ul className="no-scrollbar -mx-6 mt-5 flex gap-2 overflow-x-auto px-6 lg:hidden">
        {project.visuals.map((visual, i) => (
          <li key={i} className={`h-[34vh] shrink-0 overflow-hidden rounded-[3px] ${ratioClass[visual.ratio]}`}>
            <Media visual={visual} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function Swatches() {
  return (
    <div className="grid w-full max-w-[420px] grid-cols-4 gap-x-4 gap-y-6">
      {all.map((p) => (
        <div key={p.slug}>
          <div className="aspect-[1/2] w-full rounded-[3px]" style={{ background: skies[p.slug] }} />
          <Caps className="mt-2 truncate opacity-70">{p.name}</Caps>
        </div>
      ))}
    </div>
  );
}

export function Paper() {
  const [active, setActive] = useState("intro");
  const strip = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = innerHeight * 0.45;
      for (const el of document.querySelectorAll<HTMLElement>("[data-key]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          progress.current = Math.min(1, Math.max(0, (mid - r.top) / r.height));
          setActive(el.dataset.key!);
          break;
        }
      }
      const s = strip.current;
      const p = panel.current;
      if (s && p) {
        const travel = Math.max(0, s.scrollHeight - p.clientHeight);
        s.style.transform = `translateY(${-progress.current * travel}px)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [active]);

  const project = all.find((p) => p.slug === active);

  return (
    <div
      className="min-h-svh font-[family-name:var(--font-typewriter)] text-[15px] leading-[1.6]"
      style={{ ...paper, color: ink, "--ink": ink, "--muted": "#8b92a8", "--line": "#d6d2ca" } as React.CSSProperties}
    >
      <div className="lg:grid lg:grid-cols-2">
        <main className="px-6 pb-32 pt-14 lg:px-12 lg:pb-[45vh] lg:pt-[14vh]">
          <div className="mx-auto max-w-[480px]">
            <header data-key="intro" className="text-center">
              <h1 className="font-sans text-[15px] uppercase tracking-[0.14em]">Siddharth Thorat</h1>
              <Caps className="mt-2 opacity-70">
                Designer · {projects.length} projects · {archives.length} archives
              </Caps>
              <Divider />
              <div className="space-y-4 text-left">
                {intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex justify-center gap-6 font-sans text-[11px] uppercase tracking-[0.14em] opacity-70">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-current" /> Own work
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full border border-current" /> Under NDA
                </span>
              </div>
            </header>

            <Divider />
            <Caps className="opacity-60">Selected work</Caps>
            {projects.map((p) => (
              <Entry key={p.slug} project={p} />
            ))}

            <Divider />
            <Caps className="opacity-60">Archives</Caps>
            {archives.map((p) => (
              <Entry key={p.slug} project={p} />
            ))}

            <Divider />
            <section>
              <Caps className="opacity-60">Experience</Caps>
              <ul className="mt-4 space-y-3">
                {experience.map((item) => (
                  <li key={item.role} className="flex items-baseline justify-between gap-4">
                    <span className="font-sans text-[13px] uppercase tracking-[0.08em]">
                      {item.role} · {item.place}
                    </span>
                    <span className="shrink-0 font-sans text-[13px] tabular-nums">{item.years}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Divider />
            <section data-key="about">
              <Caps className="opacity-60">About</Caps>
              <div className="mt-4 space-y-4">
                {about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-10 flex justify-center lg:hidden">
                <DiscPlayer track={nowPlaying} />
              </div>
            </section>

            <Divider />
            <section data-key="process">
              <Caps className="opacity-60">Process</Caps>
              <p className="mt-4">
                Placeholder: a line on how you use AI tools to move from idea to working thing.
              </p>
              <div className="mt-6 lg:hidden">
                <CodeDemo />
              </div>
            </section>

            <Divider />
            <section>
              <Caps className="opacity-60">Connect</Caps>
              <ul className="mt-4 font-sans text-[13px] uppercase tracking-[0.08em]">
                {connect.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </main>

        <aside className="hidden lg:block">
          <div
            ref={panel}
            className={`sticky top-0 flex h-svh justify-center overflow-hidden p-10 ${project ? "items-start" : "items-center"}`}
          >
            <div key={active} className="enter flex w-full justify-center">
              {active === "intro" ? <Swatches /> : null}
              {active === "about" ? <DiscPlayer track={nowPlaying} /> : null}
              {active === "process" ? (
                <div className="w-full max-w-[460px]">
                  <CodeDemo />
                </div>
              ) : null}
              {project ? (
                <div ref={strip} className="w-full max-w-[560px] space-y-3 will-change-transform">
                  {project.visuals.map((visual, i) => (
                    <div key={i} className={`overflow-hidden rounded-[3px] ${ratioClass[visual.ratio]}`}>
                      <Media visual={visual} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
