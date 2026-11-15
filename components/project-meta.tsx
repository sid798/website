import Link from "next/link";
import { ndaNote, type Project } from "@/lib/content";

const actionLink =
  "text-ink underline decoration-ink/30 underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-ink";

/** Facts, NDA note and outbound links shared by both layouts. */
export function ProjectMeta({ project }: { project: Project }) {
  const hasLinks = project.link || project.caseStudyLink || project.caseStudy;
  return (
    <div className="space-y-2">
      {project.facts?.length ? <p className="text-muted">{project.facts.join(" · ")}</p> : null}
      {project.nda ? <p className="text-muted">{ndaNote}</p> : null}
      {hasLinks ? (
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {project.caseStudy ? (
            <Link href={`/work/${project.slug}`} className={actionLink}>
              View full case study →
            </Link>
          ) : null}
          {project.caseStudyLink ? (
            <a href={project.caseStudyLink} target="_blank" rel="noopener noreferrer" className={actionLink}>
              View full case study ↗
            </a>
          ) : null}
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={actionLink}>
              View site ↗
            </a>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}