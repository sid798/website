import type { CSSProperties, ReactNode } from "react";
import { about } from "@/lib/content";

function tie(words: string) {
  return words.replace(/ ([^ ]+)$/g, "\u00a0$1");
}

function AboutParagraphOne({ text }: { text: string }) {
  const copy = text
    .replace(" on an answer.", " on an\u00a0answer.")
    .replace("best work when", "best work\u00a0when");

  return <p className="text-muted lg:text-pretty">{copy}</p>;
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