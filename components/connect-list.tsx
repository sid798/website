import { connectLinks } from "@/lib/content";

const linkClass =
  "underline decoration-ink/30 underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-ink";

export function ConnectList() {
  return (
    <ul className="space-y-1">
      {connectLinks.map((item) => (
        <li key={item.href}>
          <a href={item.href} className={linkClass} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}