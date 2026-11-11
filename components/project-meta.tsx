import Link from "next/link";
import { ndaNote, type Project } from "@/lib/content";

/** Facts, NDA note and outbound links shared by both layouts. */
export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="space-y-1">
      {project.facts?.length ? <p>{project.facts.join(" · ")}</p> : null}
      {project.nda ? <p className="text-muted">{ndaNote}</p> : null}
      {project.link || project.caseStudy ? (
        <p className="flex gap-4">
          {project.caseStudy ? (
            <Link href={`/work/${project.slug}`} className="text-muted transition-colors hover:text-ink">
              Open case study →
            </Link>
          ) : null}
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              Visit site ↗
            </a>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
