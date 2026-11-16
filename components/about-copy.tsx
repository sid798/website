import type { CSSProperties } from "react";
import { about } from "@/lib/content";

export function AboutCopy({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const copy = about
    .replace(" on an answer.", " on an\u00a0answer.")
    .replace("best work when", "best work\u00a0when");

  return (
    <p className={`text-muted lg:text-pretty ${className}`.trim()} style={style}>
      {copy}
    </p>
  );
}