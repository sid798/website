import Link from "next/link";
import { CodeDemo } from "@/components/code-demo";
import { Media } from "@/components/media";
import { ProjectMeta } from "@/components/project-meta";
import { about, archives, connect, experience, intro, projects, ratioClass, type Project } from "@/lib/content";

const column = "mx-auto w-full max-w-[440px] px-5 lg:mx-0 lg:ml-[33.333%] lg:w-1/3 lg:max-w-none lg:px-3";
const rowPad = "px-5 scroll-px-5 lg:pl-[calc(33.333%-0.25rem)] lg:pr-3 lg:scroll-pl-[calc(33.333%-0.25rem)]";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

function Card({ project, height }: { project: Project; height: string }) {
  const cover = project.visuals[0];
  const frame = (
    <div className={`${height} overflow-hidden rounded-lg ${ratioClass[cover.ratio]}`}>
      <Media
        visual={cover}
        className={project.caseStudy ? "transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]" : ""}
      />
    </div>
  );
  return (
    <li className="shrink-0 snap-start">
      {project.caseStudy ? (
        <Link href={`/work/${project.slug}`} className="group block">
          {frame}
        </Link>
      ) : (
        frame
      )}
      <div className="mt-2 max-w-[340px] space-y-2 px-1.5">
        <div>
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

export default function Home() {
  return (
    <main className="pb-40">
      <section className={`${column} pt-[12vh]`}>
        <div className="enter" style={{ "--i": 0 } as React.CSSProperties}>
          <h1>Siddharth Thorat</h1>
          <p className="text-muted">Designer</p>
        </div>
        <div className="enter mt-8 space-y-4" style={{ "--i": 1 } as React.CSSProperties}>
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section aria-label="Selected work" className="enter mt-32" style={{ "--i": 2 } as React.CSSProperties}>
        <div className={column}>
          <Label>Selected Work</Label>
        </div>
        <ul className={`no-scrollbar mt-3 flex snap-x snap-proximity items-start gap-2 overflow-x-auto ${rowPad}`}>
          {projects.map((project) => (
            <Card key={project.slug} project={project} height="h-[38vh] min-h-[220px]" />
          ))}
        </ul>
      </section>

      <section aria-label="Archives" className="mt-24">
        <div className={column}>
          <Label>Archives</Label>
        </div>
        <ul className={`no-scrollbar mt-3 flex snap-x snap-proximity items-start gap-2 overflow-x-auto ${rowPad}`}>
          {archives.map((project) => (
            <Card key={project.slug} project={project} height="h-[30vh] min-h-[180px]" />
          ))}
        </ul>
      </section>

      <section className={`${column} mt-32`}>
        <Label>Experience</Label>
        <ul className="mt-1">
          {experience.map((item) => (
            <li key={item.role} className="flex justify-between gap-6">
              <span>
                {item.role}, {item.place}
              </span>
              <span className="shrink-0 tabular-nums text-muted">{item.years}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${column} mt-20`}>
        <Label>About</Label>
        <div className="mt-1 space-y-4">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className={`${column} mt-20`}>
        <Label>Process</Label>
        <div className="mt-3">
          <CodeDemo />
        </div>
      </section>

      <section className={`${column} mt-20`}>
        <Label>Connect</Label>
        <ul className="mt-1">
          {connect.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
