"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { fontKey, fonts } from "@/lib/fonts";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-font"] });
  return () => observer.disconnect();
}

const read = () => document.documentElement.dataset.font ?? "f1";

function pick(font: string) {
  document.documentElement.dataset.font = font;
  try {
    localStorage.setItem(fontKey, font);
  } catch {}
}

const item = "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-[#f2f2f2]";

/** Draft-only switch for comparing layouts and fonts. */
export function VersionSwitch() {
  const current = useSyncExternalStore(subscribe, read, () => "f1");

  return (
    <nav className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-line bg-paper/90 p-1 text-xs backdrop-blur">
      <Link href="/" className={item}>
        V1 Centre
      </Link>
      <Link href="/v2" className={item}>
        V2 Columns
      </Link>
      <span className="mx-1 h-4 w-px bg-line" />
      {fonts.map((font) => (
        <button
          key={font}
          type="button"
          onClick={() => pick(font)}
          aria-pressed={current === font}
          className={`${item} uppercase ${current === font ? "bg-ink text-paper hover:bg-ink" : ""}`}
        >
          {font}
        </button>
      ))}
    </nav>
  );
}
