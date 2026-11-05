import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-5 text-sm sm:px-10">
        <Link href="/" className="press pointer-events-auto font-medium tracking-tight">
          Siddharth Thorat
        </Link>
        <ul className="pointer-events-auto flex gap-5 sm:gap-8">
          {links.map((link) => (
            <li key={link.href} className={link.label === "Process" ? "hidden sm:block" : undefined}>
              <a href={link.href} className="u-draw pb-0.5">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
