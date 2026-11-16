import { ActionLink } from "@/components/action-link";
import { ndaNote, type Project } from "@/lib/content";

/** Facts, NDA note and outbound links shared by both layouts. */
export function ProjectMeta({ project }: { project: Project }) {
  const hasLinks = project.link || project.caseStudyLink;
  return (
    <div className="space-y-4">
      {project.facts?.length ? <p className="text-muted">{project.facts.join(" · ")}</p> : null}
      {project.nda ? <p className="text-muted">{ndaNote}</p> : null}
      {hasLinks ? (
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {project.caseStudyLink ? (
            <ActionLink href={project.caseStudyLink}>View full case study</ActionLink>
          ) : null}
          {project.link ? <ActionLink href={project.link}>View site</ActionLink> : null}
        </p>
      ) : null}
    </div>
  );
}