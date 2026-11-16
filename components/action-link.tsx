const label =
  "underline decoration-ink/30 underline-offset-[3px] transition-[text-decoration-color] duration-200 group-hover:decoration-ink";

function ExternalArrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
      className="shrink-0 translate-y-px"
    >
      <path
        d="M3.25 9.75L9.75 3.25M9.75 3.25H4.75M9.75 3.25V8.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Outbound text link; underline stops before the arrow (not an icon font — inline SVG). */
export function ActionLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-ink"
    >
      <span className={label}>{children}</span>
      <ExternalArrow />
    </a>
  );
}