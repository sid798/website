import type { CSSProperties, ReactNode } from "react";
import { about } from "@/lib/content";

/** Line break only from the large layout up (≈ full-width desktop column). */
function DesktopBr() {
  return <br className="hidden lg:block" />;
}

function AboutParagraphOne({ text }: { text: string }) {
  const breakAfter = "my best work ";
  const at = text.indexOf(breakAfter);
  if (at === -1) {
    return <p className="text-muted lg:text-pretty">{text}</p>;
  }

  const head = text.slice(0, at + breakAfter.length);
  const tail = text.slice(at + breakAfter.length);
  const settleAt = tail.indexOf(" before settling on an answer.");
  if (settleAt === -1) {
    return (
      <p className="text-muted lg:text-pretty">
        {head}
        <DesktopBr />
        {tail}
      </p>
    );
  }

  const mid = tail.slice(0, settleAt);
  const end = tail.slice(settleAt + 1);

  return (
    <p className="text-muted lg:text-pretty">
      {head}
      <DesktopBr />
      {mid}
      <DesktopBr />
      {end}
    </p>
  );
}

function AboutParagraphTwo({ text }: { text: string }) {
  const at = text.indexOf(". If ");
  if (at === -1) {
    return <p className="text-muted lg:text-pretty">{text}</p>;
  }

  const head = text.slice(0, at + 1);
  const tail = text.slice(at + 2);

  return (
    <p className="text-muted lg:text-pretty">
      {head}
      <DesktopBr />
      {tail}
    </p>
  );
}

export function AboutCopy({
  className = "space-y-4",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const blocks: ReactNode[] = [<AboutParagraphOne key="1" text={about[0]} />];
  if (about[1]) {
    blocks.push(<AboutParagraphTwo key="2" text={about[1]} />);
  }

  return (
    <div className={className} style={style}>
      {blocks}
    </div>
  );
}