"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CodeDemo } from "@/components/code-demo";
import { Media } from "@/components/media";
import { ProjectMeta } from "@/components/project-meta";
import { about, archives, connect, experience, intro, projects, ratioClass, type Project } from "@/lib/content";

const all = [...projects, ...archives];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

function Entry({ project }: { project: Project }) {
  return (
    <article data-key={project.slug} className="space-y-4 border-t border-line py-6">
      <div>
        <p>{project.name}</p>
        <p className="text-muted">
          {project.scope.join(", ")} · {project.context}
        </p>
      </div>
      <ul className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 scroll-px-5 lg:hidden">
        {project.visuals.map((visual, i) => (
          <li key={i} className={`h-[42vh] shrink-0 snap-start overflow-hidden rounded-lg ${ratioClass[visual.ratio]}`}>
            <Media visual={visual} />
          </li>
        ))}
      </ul>
      <p>{project.summary}</p>
      <ProjectMeta project={project} />
    </article>
  );
}

function Covers() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {all.map((p) => (
        <div key={p.slug}>
          <div className="aspect-[4/5] overflow-hidden rounded-lg">
            <Media visual={p.visuals[0]} />
          </div>
          <p className="mt-1 truncate text-muted">{p.name}</p>
        </div>
      ))}
    </div>
  );
}

export function Split() {
  const [active, setActive] = useState("intro");
  const activeRef = useRef(active);
  const progress = useRef(0);
  const panel = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  const place = () => {
    const s = strip.current;
    const p = panel.current;
    if (!s || !p) return;
    const travel = Math.max(0, s.scrollHeight - p.clientHeight + 48);
    s.style.transform = `translateY(${-progress.current * travel}px)`;
  };

  useEffect(() => {
    const update = () => {
      const mid = innerHeight * 0.45;
      for (const el of document.querySelectorAll<HTMLElement>("[data-key]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          progress.current = Math.min(1, Math.max(0, (mid - r.top) / r.height));
          const key = el.dataset.key!;
          if (key !== activeRef.current) {
            activeRef.current = key;
            setActive(key);
          }
          break;
        }
      }
      place();
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);

  // The strip remounts when the project changes, so position it before paint.
  useLayoutEffect(place, [active]);

  const project = all.find((p) => p.slug === active);

  return (
    <div className="lg:grid lg:grid-cols-2">
      <main className="px-5 pb-24 pt-6 lg:px-3 lg:pb-[50vh]">
        <div className="max-w-[520px] space-y-16">
          <header data-key="intro" className="space-y-8 lg:min-h-[60svh]">
            <div className="enter">
              <h1>Siddharth Thorat</h1>
              <p className="text-muted">Designer</p>
            </div>
            <div className="space-y-4">
              {intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </header>

          <section>
            <Label>Selected Work</Label>
            <div className="mt-1 border-b border-line">
              {projects.map((p) => (
                <Entry key={p.slug} project={p} />
              ))}
            </div>
          </section>

          <section>
            <Label>Archives</Label>
            <div className="mt-1 border-b border-line">
              {archives.map((p) => (
                <Entry key={p.slug} project={p} />
              ))}
            </div>
          </section>

          <section>
            <Label>Experience</Label>
            <ul className="mt-1">
              {experience.map((item) => (
                <li key={item.role} className="flex justify-between gap-4">
                  <span>
                    {item.role}, {item.place}
                  </span>
                  <span className="shrink-0 tabular-nums text-muted">{item.years}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Label>About</Label>
            <div className="mt-1 space-y-4">
              {about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section data-key="process">
            <Label>Process</Label>
            <div className="mt-3 lg:hidden">
              <CodeDemo />
            </div>
            <p className="hidden lg:block">Placeholder: a line on how you use AI tools to move from idea to working thing.</p>
          </section>

          <section>
            <Label>Connect</Label>
            <ul className="mt-1">
              {connect.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <aside className="hidden border-l border-line lg:block">
        <div ref={panel} className="sticky top-0 h-svh overflow-hidden px-3 pt-6">
          <div key={active} className="enter">
            {project ? (
              <div ref={strip} className="space-y-2 will-change-transform">
                {project.visuals.map((visual, i) => (
                  <div key={i} className={`w-full overflow-hidden rounded-lg ${ratioClass[visual.ratio]}`}>
                    <Media visual={visual} />
                  </div>
                ))}
              </div>
            ) : active === "process" ? (
              <CodeDemo />
            ) : (
              <Covers />
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
