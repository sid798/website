"use client";

import Link from "next/link";
import { showDraftSwitcher } from "@/lib/draft-ui";

const item = "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-[#f2f2f2]";

/** Draft-only layout switcher. Hidden when the centre column layout is locked off. */
export function VersionSwitch() {
  if (!showDraftSwitcher()) return null;

  return (
    <nav className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-line bg-paper/90 p-1 text-xs backdrop-blur">
      <Link href="/v1" className={item}>
        V1 Centre
      </Link>
      <Link href="/" className={item}>
        V2 Columns
      </Link>
    </nav>
  );
}