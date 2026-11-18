"use client";

import { useRef, useState } from "react";
import { SiteIntro } from "@/components/site-intro";
import { ConnectList } from "@/components/connect-list";
import { ProcessBlock } from "@/components/process-block";
import { Media } from "@/components/media";
import { ProjectLinks } from "@/components/project-meta";
import { ProjectSummary } from "@/components/project-summary";
import { ArchiveLink } from "@/components/archive-link";
import { ActionLink } from "@/components/action-link";
import { experience, ndaNote, projects, ratioClass, type Project } from "@/lib/content";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

/** Full-bleed rule across a side column on desktop. */
function Rule() {
  return <div aria-hidden className="hidden h-px bg-line lg:-mx-3 lg:block" />;
}

function Details({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-x-3">
          <p className="hidden lg:block">{project.name}</p>
          {project.link || project.caseStudyLink ? (
            <>
              <span aria-hidden className="hidden text-faint lg:inline">
                |
              </span>
              <ProjectLinks project={project} tone="soft" />
            </>
          ) : null}
        </div>
        <p className="text-muted">
          {project.scope.join(", ")} · {project.context}
        </p>
      </div>
      {project.blurb || project.outcome ? (
        <div className="space-y-1">
          {project.blurb ? <p className="text-soft">{project.blurb}</p> : null}
          {project.outcome ? (
            <p>
              {project.outcome.href ? (
                <ActionLink href={project.outcome.href}>{project.outcome.text}</ActionLink>
              ) : (
                project.outcome.text
              )}
            </p>
          ) : null}
        </div>
      ) : null}
      <ProjectSummary project={project} className="leading-[23.2px]" />
      {project.nda ? <p className="text-soft">{ndaNote}</p> : null}
    </div>
  );
}

const groups = [{ label: "Selected Work", items: projects }];
const all = projects;

const scroll = "lg:h-svh lg:overflow-y-auto no-scrollbar";

export function Columns() {
  const [active, setActive] = useState(projects[0].slug);
  const [open, setOpen] = useState(projects[0].slug);
  const visuals = useRef<HTMLDivElement>(null);
  const project = all.find((p) => p.slug === active) ?? projects[0];

  function select(slug: string) {
    setActive(slug);
    setOpen(slug);
    visuals.current?.scrollTo({ top: 0 });
    if (slug !== open && window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() =>
        document.getElementById(`project-${slug}`)?.scrollIntoView({ block: "start", behavior: "smooth" }),
      );
    }
  }

  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden pb-24 lg:grid lg:h-svh lg:grid-cols-[1fr_2fr_1fr] lg:overflow-hidden lg:pb-0">
      {/* On phones this column dissolves so its parts can sit before and after the work list. */}
      <aside className={`contents lg:block lg:space-y-12 lg:px-3 lg:pb-24 lg:pt-6 ${scroll}`}>
        <div className="order-1 min-w-0 px-5 pt-6 lg:p-0">
          <SiteIntro />
        </div>

        <Rule />

        <div className="order-3 mt-16 space-y-12 px-5 lg:mt-0 lg:p-0">
          <div>
            <Label>Experience</Label>
            <ul className="mt-2 space-y-2">
              {experience.map((item) => (
                <li key={item.role}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="max-w-[200px]">
                      {item.role}, {item.place}
                    </span>
                    <span className="shrink-0 tabular-nums text-muted">{item.years}</span>
                  </div>
                  {"detail" in item ? <p className="text-muted">{item.detail}</p> : null}
                </li>
              ))}
            </ul>
          </div>
          <ProcessBlock />
          <ConnectList />
        </div>
      </aside>

      <div
        ref={visuals}
        className={`hidden border-x border-line px-3 pb-6 pt-6 lg:block ${scroll}`}
        aria-label={`${project.name} visuals`}
      >
        <div key={project.slug} className="enter space-y-3">
          {project.visuals.map((visual, i) => (
            <div key={i} className={`w-full overflow-hidden rounded-lg ${ratioClass[visual.ratio]}`}>
              <Media visual={visual} />
            </div>
          ))}
        </div>
      </div>

      <section className={`order-2 mt-16 min-w-0 lg:mt-0 ${scroll}`}>
        <div className="min-w-0 space-y-12 px-5 lg:px-3 lg:pb-12 lg:pt-6">
          {groups.map((group) => (
            <div key={group.label}>
              <Label>{group.label}</Label>
              <ul className="mt-2 divide-y divide-line border-y border-line lg:divide-y-0 lg:border-0">
                {group.items.map((p) => {
                  const isActive = p.slug === active;
                  const isOpen = p.slug === open;
                  return (
                    <li key={p.slug} id={`project-${p.slug}`} className="scroll-mt-4">
                      <button
                        type="button"
                        onClick={() => select(p.slug)}
                        aria-pressed={isActive}
                        aria-expanded={isOpen}
                        className={`flex w-full justify-between gap-4 py-2.5 text-left transition-colors duration-200 lg:py-0 ${
                          isActive ? "lg:text-ink" : "lg:text-soft lg:hover:text-ink"
                        }`}
                      >
                        <span className="min-w-0 shrink break-words">{p.name}</span>
                        <span className="shrink-0 text-right">
                          <span className="hidden max-w-[208px] text-pretty lg:inline-block">
                            {p.scope.join(", ")}
                          </span>
                          <span className="text-muted lg:hidden">{isOpen ? "−" : "+"}</span>
                        </span>
                      </button>
                      {isOpen ? (
                        <div className="enter space-y-6 pb-6 pt-1 lg:hidden">
                          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 scroll-px-5">
                            {p.visuals.map((visual, i) => (
                              <li
                                key={i}
                                className="aspect-[4/3] w-[80%] shrink-0 snap-start overflow-hidden rounded-lg"
                              >
                                <Media visual={visual} letterbox={visual.ratio !== "classic"} />
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

        <div className="hidden border-t border-line px-3 pb-24 pt-12 lg:block">
          <div key={project.slug} className="enter">
            <Details project={project} />
          </div>
        </div>
      </section>
    </main>
  );
}
