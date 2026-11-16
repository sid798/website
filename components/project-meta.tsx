import { ActionLink } from "@/components/action-link";
import { ndaNote, pendingHref, type Project } from "@/lib/content";

/** Role, outcome, NDA note and outbound links shared by both layouts. */
export function ProjectMeta({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(
    project.caseStudyLink && project.caseStudyLink !== pendingHref,
  );
  const hasLinks = project.link || hasCaseStudy;

  return (
    <div className="space-y-4">
      {project.facts?.length ? <p className="text-muted">{project.facts.join(" · ")}</p> : null}
      {project.role ? (
        <p>
          <span className="text-muted">Role · </span>
          {project.role}
        </p>
      ) : null}
      {project.outcome ? (
        <p>
          <span className="text-muted">Outcome · </span>
          {project.outcome}
        </p>
      ) : null}
      {project.nda ? <p className="text-muted">{ndaNote}</p> : null}
      {hasLinks ? (
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {hasCaseStudy && project.caseStudyLink ? (
            <ActionLink href={project.caseStudyLink}>
              {project.caseStudyLinkLabel ?? "View case study"}
            </ActionLink>
          ) : null}
          {project.link ? <ActionLink href={project.link}>View site</ActionLink> : null}
        </p>
      ) : null}
    </div>
  );
}