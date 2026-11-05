import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: "load" | "view" | "scrub";
  delay?: number;
};

/** Splits text into masked words. Screen readers get the unsplit sentence. */
export function RevealText({ text, as: Tag = "p", className, mode = "view", delay = 0 }: Props) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-reveal={mode} data-delay={delay}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="r-mask">
              <span className="r-word">{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
