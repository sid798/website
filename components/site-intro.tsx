import { AboutCopy } from "@/components/about-copy";
import { headline } from "@/lib/content";
import type { CSSProperties } from "react";

export function SiteIntro({
  aboutClassName = "space-y-4",
  aboutStyle,
}: {
  aboutClassName?: string;
  aboutStyle?: CSSProperties;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1>Siddharth Thorat</h1>
        <p className="text-muted">{headline}</p>
      </div>
      <AboutCopy className={aboutClassName} style={aboutStyle} />
    </div>
  );
}