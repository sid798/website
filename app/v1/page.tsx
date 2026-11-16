import { SiteIntro } from "@/components/site-intro";
import { ConnectList } from "@/components/connect-list";
import { ProcessBlock } from "@/components/process-block";
import { MarkerTrail } from "@/components/marker-trail";
import { Media } from "@/components/media";
import { ProjectMeta } from "@/components/project-meta";
import { ArchiveLink } from "@/components/archive-link";
import { experience, projects, type Project } from "@/lib/content";

const column = "mx-auto w-full max-w-[440px] px-5 lg:mx-0 lg:ml-[33.333%] lg:w-1/3 lg:max-w-none lg:px-3";
const rowPad = "px-5 scroll-px-5 lg:pl-[calc(33.333%-0.25rem)] lg:pr-3 lg:scroll-pl-[calc(33.333%-0.25rem)]";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

function Card({ project }: { project: Project }) {
  const cover = project.cover ?? project.visuals[0];
  const frame = (
    <div className="aspect-[4/3] h-[38vh] min-h-[220px] overflow-hidden rounded-lg">
      <Media visual={cover} />
    </div>
  );
  return (
    <li className="shrink-0 snap-start">
      {frame}
      <div className="mt-2 max-w-[340px] space-y-3 px-1.5">
        <div className="space-y-1">
          <p>{project.name}</p>
          <p className="text-muted">
            {project.scope.join(", ")} · {project.context}
          </p>
        </div>
        <ProjectMeta project={project} />
      </div>
    </li>
  );
}

/** Archived centre-column layout — not linked in production. */
export default function V1() {
  return (
    <main className="pb-40">
      <MarkerTrail />
      <section className={`${column} pt-[12vh]`}>
        <SiteIntro
          aboutClassName="enter space-y-4"
          aboutStyle={{ "--i": 1 } as React.CSSProperties}
        />
      </section>

      <section aria-label="Selected work" className="enter mt-32" style={{ "--i": 2 } as React.CSSProperties}>
        <div className={column}>
          <Label>Selected Work</Label>
        </div>
        <ul className={`no-scrollbar mt-3 flex snap-x snap-proximity items-start gap-2 overflow-x-auto ${rowPad}`}>
          {projects.map((project) => (
            <Card key={project.slug} project={project} />
          ))}
        </ul>
      </section>

      <section aria-label="Archives" className={`${column} mt-24`}>
        <ArchiveLink />
      </section>

      <ProcessBlock className={`${column} mt-20`} />

      <section className={`${column} mt-32`}>
        <Label>Experience</Label>
        <ul className="mt-1 space-y-2">
          {experience.map((item) => (
            <li key={item.role}>
              <div className="flex justify-between gap-6">
                <span>
                  {item.role}, {item.place}
                </span>
                <span className="shrink-0 tabular-nums text-muted">{item.years}</span>
              </div>
              {"detail" in item ? <p className="text-muted">{item.detail}</p> : null}
            </li>
          ))}
        </ul>      </section>

      <section className={`${column} mt-20`}>
        <ConnectList />
      </section>
    </main>
  );
}