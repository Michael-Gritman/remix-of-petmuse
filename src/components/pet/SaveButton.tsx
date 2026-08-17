import { useEffect, useState } from "react";

interface SaveButtonProps {
  saved: boolean;
  onToggle: () => void;
  petName: string;
}

export function SaveButton({ saved, onToggle, petName }: SaveButtonProps) {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (!pop) return;
    const t = window.setTimeout(() => setPop(false), 440);
    return () => window.clearTimeout(t);
  }, [pop]);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${petName} from saved` : `Save ${petName}`}
      onClick={() => {
        setPop(true);
        onToggle();
      }}
      className={[
        "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-all duration-200 ease-[var(--ease-soft)]",
        saved
          ? "border-transparent bg-clay/15 text-clay"
          : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:shadow-soft",
      ].join(" ")}
    >
      <span className={pop ? "animate-heart inline-block" : "inline-block"} aria-hidden="true">
        {saved ? "♥" : "♡"}
      </span>
      {saved ? "Saved" : "Save"}
    </button>
  );
}
