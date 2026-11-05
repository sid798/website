import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageMotion } from "@/components/page-motion";
import { RevealText } from "@/components/reveal-text";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.name} — Siddharth Thorat` : "Siddharth Thorat" };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    ["Role", project.role],
    ["Medium", project.kind],
    ["Year", project.year],
  ];

  return (
    <main>
      <PageMotion />

      <section className="px-5 pb-12 pt-32 sm:px-10 sm:pt-40">
        <Link href="/#work" className="u-draw pb-0.5 text-sm text-muted">
          ← All work
        </Link>
        <RevealText
          as="h1"
          mode="load"
          text={project.name}
          className="mt-10 text-[13vw] font-medium leading-[0.88] tracking-[-0.05em] sm:text-[10vw]"
        />
        <dl data-fade="0.4" className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-5 text-sm">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted">{label}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div data-fade="0.55" className="mx-5 aspect-[16/9] sm:mx-10" style={{ background: project.tone }} />

      <section className="grid gap-10 px-5 py-24 sm:px-10 md:grid-cols-12">
        <p className="text-sm text-muted md:col-span-4">Overview</p>
        <RevealText
          text={project.summary}
          className="text-2xl leading-snug tracking-[-0.015em] sm:text-4xl md:col-span-8"
        />
      </section>

      <section className="grid gap-5 px-5 sm:px-10 md:grid-cols-2 md:gap-8">
        <div data-fade className="aspect-[4/5] bg-[#d6d2c9]" />
        <div data-fade="0.1" className="aspect-[4/5] bg-[#c8cbc6]" />
        <div data-fade className="aspect-[16/9] bg-[#dcd6cc] md:col-span-2" />
      </section>

      <section className="grid gap-10 px-5 py-24 sm:px-10 md:grid-cols-12">
        <p className="text-sm text-muted md:col-span-4">Process</p>
        <p data-fade className="max-w-2xl text-lg leading-relaxed text-muted md:col-span-8">
          The story of the project in a few short paragraphs: the problem, the moves you made, and
          what changed because of it. Placeholder text.
        </p>
      </section>

      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line px-5 pb-16 pt-10 sm:px-10"
      >
        <p className="text-sm text-muted">Next project</p>
        <p className="mt-4 flex items-baseline justify-between text-[9vw] font-medium leading-none tracking-[-0.045em]">
          <span>{next.name}</span>
          <span className="text-[5vw] transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-2">
            →
          </span>
        </p>
      </Link>
    </main>
  );
}
