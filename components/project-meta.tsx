import Link from "next/link";
import { ndaNote, type Project } from "@/lib/content";

const outbound = "text-muted transition-colors hover:text-ink";

/** Facts, NDA note and outbound links shared by both layouts. */
export function ProjectMeta({ project }: { project: Project }) {
  const hasLinks = project.link || project.caseStudyLink || project.caseStudy;
  return (
    <div className="space-y-1">
      {project.facts?.length ? <p>{project.facts.join(" · ")}</p> : null}
      {project.nda ? <p className="text-muted">{ndaNote}</p> : null}
      {hasLinks ? (
        <p className="flex flex-wrap gap-x-4">
          {project.caseStudy ? (
            <Link href={`/work/${project.slug}`} className={outbound}>
              Open case study →
            </Link>
          ) : null}
          {project.caseStudyLink ? (
            <a href={project.caseStudyLink} target="_blank" rel="noopener noreferrer" className={outbound}>
              View full case study here ↗
            </a>
          ) : null}
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={outbound}>
              Visit site ↗
            </a>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
