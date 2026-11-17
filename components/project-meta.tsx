import { ActionLink } from "@/components/action-link";
import { pendingHref, type Project } from "@/lib/content";

function hasCaseStudy(project: Project) {
  return Boolean(project.caseStudyLink && project.caseStudyLink !== pendingHref);
}

/** Outbound links for a project, inline. */
export function ProjectLinks({ project, tone }: { project: Project; tone?: "ink" | "soft" }) {
  if (!project.link && !hasCaseStudy(project)) return null;
  return (
    <span className="inline-flex flex-wrap gap-x-3">
      {project.link ? (
        <ActionLink href={project.link} tone={tone}>
          View site
        </ActionLink>
      ) : null}
      {hasCaseStudy(project) && project.caseStudyLink ? (
        <ActionLink href={project.caseStudyLink} tone={tone}>
          {project.caseStudyLinkLabel ?? "View case study"}
        </ActionLink>
      ) : null}
    </span>
  );
}