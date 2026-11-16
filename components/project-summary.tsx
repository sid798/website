import type { Project } from "@/lib/content";

const inline =
  "underline decoration-ink/30 underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-ink";

/** Project description, with optional in-text outbound links. */
export function ProjectSummary({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { summary, summaryLinks } = project;
  if (!summaryLinks?.length) {
    return <p className={className}>{summary}</p>;
  }

  type Part = string | { href: string; label: string };
  let parts: Part[] = [summary];

  for (const { text, href } of summaryLinks) {
    const next: Part[] = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }
      const i = part.indexOf(text);
      if (i === -1) {
        next.push(part);
        continue;
      }
      if (i > 0) next.push(part.slice(0, i));
      next.push({ href, label: text });
      const tail = part.slice(i + text.length);
      if (tail) next.push(tail);
    }
    parts = next;
  }

  return (
    <p className={className}>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className={inline}>
            {part.label}
          </a>
        ),
      )}
    </p>
  );
}