import { archive } from "@/lib/content";

export function ArchiveLink() {
  return (
    <a
      href={archive.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink underline decoration-ink/30 underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-ink"
    >
      {archive.text} ↗
    </a>
  );
}
