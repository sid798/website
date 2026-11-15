import type { CSSProperties } from "react";
import { about } from "@/lib/content";

export function AboutCopy({
  className = "space-y-4",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {about.map((p) => (
        <p key={p} className="text-muted">
          {p}
        </p>
      ))}
    </div>
  );
}