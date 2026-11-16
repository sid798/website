import { connectLinks } from "@/lib/content";

const linkClass =
  "text-muted underline decoration-muted/40 underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink";

export function ConnectList() {
  return (
    <ul className="space-y-1">
      {connectLinks.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className={linkClass}
            {...(item.href.startsWith("http") || item.href.endsWith(".pdf")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}