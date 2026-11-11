import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/media";
import { projects, ratioClass } from "@/lib/content";

const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  return { title: project ? `${project.name} — Siddharth Thorat` : "Siddharth Thorat" };
}

const column = "mx-auto w-full max-w-[440px] px-5 lg:mx-0 lg:ml-[33.333%] lg:w-1/3 lg:max-w-none lg:px-3";

const chapters = [
  { label: "Context", text: "Placeholder: what Life in Progress is, who it is for, and why you started it." },
  { label: "Process", text: "Placeholder: how the idea took shape, the directions you explored, and the ones you dropped." },
  { label: "Outcome", text: "Placeholder: what exists now, what you learned, and what comes next." },
];

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="pb-40">
      <section className={`${column} pt-[12vh]`}>
        <Link href="/" className="text-muted transition-colors hover:text-ink">
          ← Siddharth Thorat
        </Link>
        <div className="enter mt-12">
          <h1>{project.name}</h1>
          <p className="text-muted">
            {project.scope.join(", ")} · {project.context}
          </p>
        </div>
        <p className="enter mt-8" style={{ "--i": 1 } as React.CSSProperties}>
          {project.summary}
        </p>
      </section>

      <section
        className="enter mx-auto mt-24 w-full max-w-[1100px] px-5 lg:px-3"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <div className={`overflow-hidden rounded-lg ${ratioClass[project.visuals[0].ratio]}`}>
          <Media visual={project.visuals[0]} />
        </div>
      </section>

      {chapters.map((chapter, i) => (
        <div key={chapter.label}>
          <section className={`${column} mt-24`}>
            <p className="text-muted">{chapter.label}</p>
            <p className="mt-1">{chapter.text}</p>
          </section>
          {project.visuals[i + 1] ? (
            <section className="mx-auto mt-12 w-full max-w-[1100px] px-5 lg:px-3">
              <div
                className={`mx-auto overflow-hidden rounded-lg ${ratioClass[project.visuals[i + 1].ratio]} ${
                  project.visuals[i + 1].ratio === "portrait" ? "max-w-[60%]" : "w-full"
                }`}
              >
                <Media visual={project.visuals[i + 1]} />
              </div>
            </section>
          ) : null}
        </div>
      ))}
    </main>
  );
}
