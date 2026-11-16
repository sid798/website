import type { CSSProperties, ReactNode } from "react";
import { about } from "@/lib/content";

/** Line break only from the large layout up (left column in the three-column grid). */
function DesktopBr() {
  return <br className="hidden lg:block" />;
}

function tie(words: string) {
  return words.replace(/ ([^ ]+)$/g, "\u00a0$1");
}

function AboutParagraphOne({ text }: { text: string }) {
  const breakAfter = "my best work ";
  const at = text.indexOf(breakAfter);
  if (at === -1) {
    return <p className="text-muted lg:text-pretty">{text}</p>;
  }

  const head = text.slice(0, at + breakAfter.length);
  const tail = text.slice(at + breakAfter.length);
  const closing = "before settling on an answer.";
  const closingAt = tail.indexOf(closing);

  if (closingAt === -1) {
    return (
      <p className="text-muted lg:text-pretty">
        {head}
        <DesktopBr />
        {tail}
      </p>
    );
  }

  const explore = tail.slice(0, closingAt).trimEnd();

  return (
    <p className="text-muted lg:text-pretty">
      {head}
      <DesktopBr />
      {explore}{" "}
      <span className="lg:whitespace-nowrap">{closing}</span>
    </p>
  );
}

function AboutParagraphTwo({ text }: { text: string }) {
  const at = text.indexOf(". If ");
  if (at === -1) {
    return <p className="text-muted lg:text-pretty">{text}</p>;
  }

  const head = text.slice(0, at + 1);
  const tail = tie(text.slice(at + 2).replace(/^If /, "If\u00a0"));

  return (
    <p className="text-muted lg:text-pretty">
      {head}{" "}
      <span className="lg:block">{tail}</span>
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