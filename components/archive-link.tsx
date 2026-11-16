import { archive } from "@/lib/content";
import { ActionLink } from "@/components/action-link";

export function ArchiveLink() {
  return <ActionLink href={archive.href}>{archive.text}</ActionLink>;
}