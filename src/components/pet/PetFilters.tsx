import {
  CATEGORIES,
  LIFESTYLE_TAGS,
  SIZE_TAGS,
  type LifestyleTag,
  type PetCategory,
  type PetSize,
} from "@/data/pets";

export type TraitFilter = LifestyleTag | PetSize;

interface PetFiltersProps {
  category: PetCategory | "All";
  traits: TraitFilter[];
  onCategoryChange: (category: PetCategory | "All") => void;
  onTraitToggle: (trait: TraitFilter) => void;
  onClear: () => void;
  resultCount: number;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "shrink-0 rounded-full border px-4 py-2 text-[13px] whitespace-nowrap transition-all duration-200 ease-[var(--ease-soft)]",
        active
          ? "border-transparent bg-foreground text-background shadow-soft"
          : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function PetFilters({
  category,
  traits,
  onCategoryChange,
  onTraitToggle,
  onClear,
  resultCount,
}: PetFiltersProps) {
  const hasFilters = category !== "All" || traits.length > 0;

  return (
    <div className="space-y-4">
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => (
            <Pill key={c} active={category === c} onClick={() => onCategoryChange(c)}>
              {c}
            </Pill>
          ))}
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {[...SIZE_TAGS, ...LIFESTYLE_TAGS].map((t) => (
            <Pill key={t} active={traits.includes(t)} onClick={() => onTraitToggle(t)}>
              {t}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
        <span>
          {resultCount} {resultCount === 1 ? "companion" : "companions"}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-2 py-1 underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
