import type { CSSProperties } from "react";
import { about } from "@/lib/content";

export function AboutCopy({
  className = "space-y-4",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [intro, aside] = about;
  const copy = intro
    .replace(" on an answer.", " on an\u00a0answer.")
    .replace("best work when", "best work\u00a0when");

  return (
    <div className={className} style={style}>
      <p className="text-soft lg:text-pretty">{copy}</p>
      {aside ? <p className="text-muted lg:text-pretty">{aside}</p> : null}
    </div>
  );
}
