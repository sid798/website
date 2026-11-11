"use client";

import { useRef, useState } from "react";
import { CodeDemo } from "@/components/code-demo";
import { Media } from "@/components/media";
import { ProjectMeta } from "@/components/project-meta";
import { about, archives, connect, experience, intro, projects, ratioClass } from "@/lib/content";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

const col = "lg:h-svh lg:overflow-y-auto no-scrollbar px-5 lg:px-3";

const groups = [
  { label: "Selected Work", items: projects },
  { label: "Archives", items: archives },
];
const all = [...projects, ...archives];

export function Columns() {
  const [active, setActive] = useState(projects[0].slug);
  const visuals = useRef<HTMLDivElement>(null);
  const project = all.find((p) => p.slug === active) ?? projects[0];

  function select(slug: string) {
    setActive(slug);
    visuals.current?.scrollTo({ top: 0 });
  }

  return (
    <main className="flex flex-col lg:grid lg:h-svh lg:grid-cols-[1fr_2fr_1fr] lg:overflow-hidden">
      <aside className={`${col} space-y-14 pb-14 pt-6 lg:pb-24`}>
        <div className="enter">
          <h1>Siddharth Thorat</h1>
          <p className="text-muted">Designer</p>
        </div>
        <div className="space-y-4">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <Label>About</Label>
          <div className="mt-1 space-y-4">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div>
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
        </div>
        <div>
          <Label>Process</Label>
          <div className="mt-3">
            <CodeDemo />
          </div>
        </div>
        <div>
          <Label>Connect</Label>
          <ul className="mt-1">
            {connect.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <div ref={visuals} className={`${col} order-3 pb-24 pt-2 lg:order-none lg:pt-6`} aria-label={`${project.name} visuals`}>
        <div key={project.slug} className="enter space-y-2">
          {project.visuals.map((visual, i) => (
            <div key={i} className={`w-full overflow-hidden rounded-lg ${ratioClass[visual.ratio]}`}>
              <Media visual={visual} />
            </div>
          ))}
        </div>
      </div>

      <section className={`${col} order-2 space-y-10 pb-8 lg:order-none lg:pb-24 lg:pt-6`}>
        {groups.map((group) => (
          <div key={group.label}>
            <Label>{group.label}</Label>
            <ul className="mt-1">
              {group.items.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => select(p.slug)}
                    aria-pressed={p.slug === active}
                    className={`flex w-full justify-between gap-4 text-left transition-colors duration-200 ${
                      p.slug === active ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <span>{p.name}</span>
                    <span>{p.scope[0]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div key={project.slug} className="enter space-y-4 pt-4">
          <div>
            <p>{project.name}</p>
            <p className="text-muted">
              {project.scope.join(", ")} · {project.context}
            </p>
          </div>
          <p>{project.summary}</p>
          <ProjectMeta project={project} />
        </div>
      </section>
    </main>
  );
}
