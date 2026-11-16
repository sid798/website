import { ActionLink } from "@/components/action-link";
import { ndaNote, pendingHref, type Project } from "@/lib/content";

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

/** NDA note and outbound links, stacked. */
export function ProjectMeta({ project }: { project: Project }) {
  const links = project.link || hasCaseStudy(project);
  return (
    <div className="space-y-4">
      {project.nda ? <p className="text-soft">{ndaNote}</p> : null}
      {links ? (
        <p>
          <ProjectLinks project={project} />
        </p>
      ) : null}
    </div>
  );
}
