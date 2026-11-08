import Link from "next/link";
import { CodeDemo } from "@/components/code-demo";
import { about, connect, experience, intro, projects, ratioClass } from "@/lib/content";

const column = "mx-auto w-full max-w-[440px] px-5 lg:mx-0 lg:ml-[33.333%] lg:w-1/3 lg:max-w-none lg:px-3";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
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

      <section
        aria-label="Work"
        className="enter mt-32"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <ul className="no-scrollbar flex snap-x snap-proximity gap-2 overflow-x-auto px-5 scroll-px-5 lg:pl-[calc(33.333%-0.25rem)] lg:pr-3 lg:scroll-pl-[calc(33.333%-0.25rem)]">
          {projects.map((project) => {
            const cover = project.visuals[0];
            return (
              <li key={project.slug} className="shrink-0 snap-start">
                <Link href={`/work/${project.slug}`} className="group block">
                  <div
                    className={`h-[38vh] min-h-[220px] overflow-hidden rounded-lg ${ratioClass[cover.ratio]}`}
                  >
                    <div
                      className="size-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]"
                      style={{ background: cover.tone }}
                    />
                  </div>
                  <div className="mt-2 px-1.5">
                    <p>{project.name}</p>
                    <p className="text-muted">{project.kind}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={`${column} mt-32`}>
        <Label>Experience</Label>
        <ul className="mt-1">
          {experience.map((item, i) => (
            <li key={i} className="flex justify-between gap-6">
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
