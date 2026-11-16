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

  return (
    <div className={`max-w-[334px] ${className}`} style={style}>
      <p className="text-soft text-pretty">{intro}</p>
      {aside ? <p className="text-muted text-pretty">{aside}</p> : null}
    </div>
  );
}
