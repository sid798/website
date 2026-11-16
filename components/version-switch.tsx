"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { draftUi, defaultFont, showDraftSwitcher, visibleFonts } from "@/lib/draft-ui";
import { fontKey } from "@/lib/fonts";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-font"] });
  return () => observer.disconnect();
}

const read = () => document.documentElement.dataset.font ?? defaultFont;

function pick(font: string) {
  document.documentElement.dataset.font = font;
  try {
    localStorage.setItem(fontKey, font);
  } catch {}
}

const item = "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-[#f2f2f2]";

/** Draft-only switch for comparing layouts and fonts. Hidden when everything is locked. */
export function VersionSwitch() {
  const current = useSyncExternalStore(subscribe, read, () => defaultFont);
  const fonts = visibleFonts();

  if (!showDraftSwitcher()) return null;

  return (
    <nav className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-line bg-paper/90 p-1 text-xs backdrop-blur">
      {draftUi.showV1InSwitcher ? (
        <>
          <Link href="/v1" className={item}>
            V1 Centre
          </Link>
          <Link href="/" className={item}>
            V2 Columns
          </Link>
        </>
      ) : null}
      {draftUi.showV1InSwitcher && fonts.length > 0 ? <span className="mx-1 h-4 w-px bg-line" /> : null}
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