"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CodeDemo } from "@/components/code-demo";
import { about, connect, experience, intro, projects, ratioClass } from "@/lib/content";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

const col = "lg:h-svh lg:overflow-y-auto no-scrollbar px-5 lg:px-3";

export function Columns() {
  const [active, setActive] = useState(0);
  const visuals = useRef<HTMLDivElement>(null);
  const project = projects[active];

  function select(i: number) {
    setActive(i);
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
            {experience.map((item, i) => (
              <li key={i} className="flex justify-between gap-4">
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
            <div
              key={i}
              className={`w-full rounded-lg ${ratioClass[visual.ratio]}`}
              style={{ background: visual.tone }}
            />
          ))}
        </div>
      </div>

      <section className={`${col} order-2 pb-8 lg:order-none lg:pb-24 lg:pt-6`}>
        <Label>Selected Work</Label>
        <ul className="mt-1">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === active}
                className={`flex w-full justify-between gap-4 text-left transition-colors duration-200 ${
                  i === active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span>{p.name}</span>
                <span className="tabular-nums">{p.year}</span>
              </button>
            </li>
          ))}
        </ul>

        <div key={project.slug} className="enter mt-14 space-y-4">
          <div>
            <p>{project.name}</p>
            <p className="text-muted">{project.kind}</p>
          </div>
          <p>{project.summary}</p>
          <dl className="grid grid-cols-[5rem_1fr]">
            <dt className="text-muted">Role</dt>
            <dd>{project.role}</dd>
            <dt className="text-muted">Year</dt>
            <dd>{project.year}</dd>
          </dl>
          <Link href={`/work/${project.slug}`} className="inline-block text-muted transition-colors hover:text-ink">
            Open case study →
          </Link>
        </div>
      </section>
    </main>
  );
}
