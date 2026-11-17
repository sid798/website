import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-5 pt-6 lg:px-3">
      <div className="space-y-1">
        <p>Page not found.</p>
        <p>
          <Link
            href="/"
            className="text-soft underline decoration-faint underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink"
          >
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
