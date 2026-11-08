import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, ratioClass } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.name} — Siddharth Thorat` : "Siddharth Thorat" };
}

const column = "mx-auto w-full max-w-[440px] px-5 lg:mx-0 lg:ml-[33.333%] lg:w-1/3 lg:max-w-none lg:px-3";

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="pb-40">
      <section className={`${column} pt-[12vh]`}>
        <Link href="/" className="text-muted transition-colors hover:text-ink">
          ← Siddharth Thorat
        </Link>
        <div className="enter mt-12">
          <h1>{project.name}</h1>
          <p className="text-muted">{project.kind}</p>
        </div>
        <p className="enter mt-8" style={{ "--i": 1 } as React.CSSProperties}>
          {project.summary}
        </p>
        <dl className="enter mt-8 grid grid-cols-[5rem_1fr]" style={{ "--i": 2 } as React.CSSProperties}>
          <dt className="text-muted">Role</dt>
          <dd>{project.role}</dd>
          <dt className="text-muted">Year</dt>
          <dd>{project.year}</dd>
        </dl>
      </section>

      <section
        className="enter mx-auto mt-24 w-full max-w-[1100px] space-y-2 px-5 lg:px-3"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        {project.visuals.map((visual, i) => (
          <div key={i} className={`mx-auto rounded-lg ${ratioClass[visual.ratio]} ${visual.ratio === "portrait" ? "max-w-[60%]" : "w-full"}`} style={{ background: visual.tone }} />
        ))}
      </section>

      <section className={`${column} mt-24`}>
        <p className="text-muted">Next</p>
        <Link href={`/work/${next.slug}`} className="transition-colors hover:text-muted">
          {next.name} →
        </Link>
      </section>
    </main>
  );
}
