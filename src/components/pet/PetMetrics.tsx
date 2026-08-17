import { METRIC_LABELS, METRIC_ORDER, type Pet } from "@/data/pets";

export function MetricRow({
  label,
  word,
  value,
}: {
  label: string;
  word: string;
  value: number;
}) {
  return (
    <div className="rounded-[16px] bg-cream px-4 py-3">
      <p className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{label}</p>
      <div className="mt-1.5 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{word}</span>
        <span className="flex gap-1" aria-hidden="true">
          {[1, 2, 3, 4].map((dot) => (
            <span
              key={dot}
              className={[
                "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                dot <= value ? "bg-primary" : "bg-border",
              ].join(" ")}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export function PetMetrics({ pet }: { pet: Pet }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {METRIC_ORDER.map((key) => {
        const value = pet[key];
        const meta = METRIC_LABELS[key];
        return (
          <MetricRow
            key={key}
            label={meta.label}
            word={meta.words[value - 1]!}
            value={value}
          />
        );
      })}
    </div>
  );
}
