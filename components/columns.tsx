"use client";

import { useRef, useState } from "react";
import { AboutCopy } from "@/components/about-copy";
import { ConnectList } from "@/components/connect-list";
import { ProcessBlock } from "@/components/process-block";
import { Media } from "@/components/media";
import { ProjectMeta } from "@/components/project-meta";
import { ProjectSummary } from "@/components/project-summary";
import { ArchiveLink } from "@/components/archive-link";
import { experience, projects, ratioClass, type Project } from "@/lib/content";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

function Details({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p>{project.name}</p>
        <p className="text-muted">
          {project.scope.join(", ")} · {project.context}
        </p>
      </div>
      <ProjectSummary project={project} className="max-w-[38ch] leading-[1.55]" />
      <ProjectMeta project={project} />
    </div>
  );
}

const groups = [{ label: "Selected Work", items: projects }];
const all = projects;

const scroll = "lg:h-svh lg:overflow-y-auto no-scrollbar";

export function Columns() {
  const [active, setActive] = useState(projects[0].slug);
  const [open, setOpen] = useState<string | null>(null);
  const visuals = useRef<HTMLDivElement>(null);
  const project = all.find((p) => p.slug === active) ?? projects[0];

  function select(slug: string) {
    setActive(slug);
    setOpen((current) => (current === slug ? null : slug));
    visuals.current?.scrollTo({ top: 0 });
  }

  return (
    <main className="flex flex-col pb-24 lg:grid lg:h-svh lg:grid-cols-[1fr_2fr_1fr] lg:overflow-hidden lg:pb-0">
      {/* On phones this column dissolves so its parts can sit before and after the work list. */}
      <aside className={`contents lg:block lg:space-y-14 lg:px-3 lg:pb-24 lg:pt-6 ${scroll}`}>
        <div className="order-1 space-y-8 px-5 pt-6 lg:p-0">
          <div className="enter">
            <h1>Siddharth Thorat</h1>
          </div>
          <AboutCopy />
        </div>

        <div className="order-3 mt-16 space-y-14 px-5 lg:mt-0 lg:p-0">
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
          <ProcessBlock />
          <div>
            <ConnectList />
          </div>
        </div>
      </aside>

      <div
        ref={visuals}
        className={`hidden border-x border-line px-3 pb-6 pt-6 lg:block ${scroll}`}
        aria-label={`${project.name} visuals`}
      >
        <div key={project.slug} className="enter space-y-2">
          {project.visuals.map((visual, i) => (
            <div key={i} className={`w-full overflow-hidden rounded-lg ${ratioClass[visual.ratio]}`}>
              <Media visual={visual} />
            </div>
          ))}
        </div>
      </div>

      <section className={`order-2 mt-16 lg:mt-0 lg:flex lg:flex-col ${scroll}`}>
        <div className="space-y-10 px-5 lg:px-3 lg:pb-10 lg:pt-6">
          {groups.map((group) => (
            <div key={group.label}>
              <Label>{group.label}</Label>
              <ul className="mt-1 divide-y divide-line border-y border-line lg:divide-y-0 lg:border-0">
                {group.items.map((p) => {
                  const isActive = p.slug === active;
                  const isOpen = p.slug === open;
                  return (
                    <li key={p.slug}>
                      <button
                        type="button"
                        onClick={() => select(p.slug)}
                        aria-pressed={isActive}
                        aria-expanded={isOpen}
                        className={`flex w-full justify-between gap-4 py-2.5 text-left transition-colors duration-200 lg:py-0 ${
                          isActive ? "lg:text-ink" : "lg:text-muted lg:hover:text-ink"
                        }`}
                      >
                        <span className="min-w-0 shrink">{p.name}</span>
                        <span className="shrink-0 text-right text-muted">
                          <span className="hidden max-w-[11rem] text-pretty lg:inline">
                            {p.scope.join(", ")}
                          </span>
                          <span className="lg:hidden">{isOpen ? "−" : "+"}</span>
                        </span>
                      </button>
                      {isOpen ? (
                        <div className="enter space-y-4 pb-6 pt-1 lg:hidden">
                          <ul className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 scroll-px-5">
                            {p.visuals.map((visual, i) => (
                              <li
                                key={i}
                                className={`h-[42vh] shrink-0 snap-start overflow-hidden rounded-lg ${ratioClass[visual.ratio]}`}
                              >
                                <Media visual={visual} />
                              </li>
                            ))}
                          </ul>
                          <Details project={p} />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <p>
            <ArchiveLink />
          </p>
        </div>

        <div className="hidden border-t border-line px-3 pb-24 pt-5 lg:block">
          <p className="mb-4 text-muted">Project</p>
          <div key={project.slug} className="enter">
            <Details project={project} />
          </div>
        </div>
      </section>
    </main>
  );
}
