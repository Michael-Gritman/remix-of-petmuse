import { useEffect, useState } from "react";

interface NavigationProps {
  savedCount: number;
  compareCount: number;
  savedActive: boolean;
  onDiscover: () => void;
  onCompare: () => void;
  onToggleSaved: () => void;
  onQuiz: () => void;
}

export function Navigation({
  savedCount,
  compareCount,
  savedActive,
  onDiscover,
  onCompare,
  onToggleSaved,
  onQuiz,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-[var(--ease-soft)]",
        scrolled ? "bg-background/78 shadow-soft backdrop-blur-xl" : "bg-background/25 backdrop-blur-[3px]",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-[19px] font-medium tracking-[-0.01em] text-foreground"
        >
          PetMuse
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onDiscover}
            className="hidden rounded-full px-3 py-2 text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground sm:block"
          >
            Discover
          </button>
          <button
            type="button"
            onClick={onCompare}
            className="rounded-full px-3 py-2 text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Compare{compareCount > 0 ? ` (${compareCount})` : ""}
          </button>
          <button
            type="button"
            onClick={onToggleSaved}
            aria-pressed={savedActive}
            className={[
              "rounded-full px-3 py-2 text-[13px] transition-colors duration-200",
              savedActive ? "text-clay" : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {savedActive ? "♥" : "♡"} Saved{savedCount > 0 ? ` (${savedCount})` : ""}
          </button>
          <button
            type="button"
            onClick={onQuiz}
            className="ml-1 inline-flex h-9 items-center rounded-full bg-foreground px-4 text-[13px] font-medium text-background transition-all duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.98]"
          >
            Take the Quiz
          </button>
        </div>
      </nav>
    </header>
  );
}
