import { CodeDemo } from "@/components/code-demo";
import { showProcessSection } from "@/lib/content";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

/** Process / code demo — toggled via `showProcessSection` in lib/content.ts */
export function ProcessBlock({ className = "" }: { className?: string }) {
  if (!showProcessSection) return null;

  return (
    <div className={className}>
      <Label>Process</Label>
      <div className="mt-3">
        <CodeDemo />
      </div>
    </div>
  );
}