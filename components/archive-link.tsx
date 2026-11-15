import { archive } from "@/lib/content";

export function ArchiveLink() {
  return (
    <a
      href={archive.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-ink"
    >
      {archive.text} ↗
    </a>
  );
}
