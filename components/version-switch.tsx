import Link from "next/link";

/** Draft-only switch for comparing the two layouts. */
export function VersionSwitch() {
  return (
    <nav className="fixed bottom-4 right-4 z-50 flex gap-1 rounded-full border border-line bg-paper/90 p-1 text-xs backdrop-blur">
      <Link href="/" className="rounded-full px-3 py-1 hover:bg-[#f2f2f2]">
        V1 Centre
      </Link>
      <Link href="/v2" className="rounded-full px-3 py-1 hover:bg-[#f2f2f2]">
        V2 Columns
      </Link>
    </nav>
  );
}
