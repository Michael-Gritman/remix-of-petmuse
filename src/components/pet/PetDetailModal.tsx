import { useEffect, useRef, useState } from "react";
import { petsById, photo, photoSrcSet, type Pet } from "@/data/pets";
import { Modal, CloseButton } from "./Modal";
import { PetMetrics } from "./PetMetrics";
import { SaveButton } from "./SaveButton";

interface PetDetailModalProps {
  pet: Pet | null;
  open: boolean;
  onClose: () => void;
  onSelectPet: (pet: Pet) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}

function Bullets({ title, items, marker }: { title: string; items: string[]; marker: string }) {
  return (
    <section>
      <h3 className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{title}</h3>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
            <span aria-hidden="true" className="mt-[3px] text-primary">
              {marker}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PetDetailModal({
  pet,
  open,
  onClose,
  onSelectPet,
  savedIds,
  onToggleSave,
  compareIds,
  onToggleCompare,
}: PetDetailModalProps) {
  const [swapping, setSwapping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pet) return;
    setSwapping(true);
    const t = window.setTimeout(() => setSwapping(false), 20);
    scrollRef.current?.scrollTo({ top: 0 });
    return () => window.clearTimeout(t);
  }, [pet?.id]);

  if (!pet) return null;

  const saved = savedIds.includes(pet.id);
  const comparing = compareIds.includes(pet.id);
  const similar = pet.similarPetIds.map((id) => petsById[id]).filter(Boolean) as Pet[];

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="pet-detail-title"
      panelClassName="sm:max-w-[760px]"
    >
      {(close) => (
        <div ref={scrollRef} className="overflow-y-auto overscroll-contain">
          <div className={swapping ? "opacity-0" : "fade-swap-in"}>
            <div className="relative bg-cream">
              <img
                key={pet.id}
                src={photo(pet.image, 1200)}
                srcSet={photoSrcSet(pet.image)}
                sizes="(max-width: 640px) 100vw, 760px"
                alt={`${pet.name} — ${pet.breed}`}
                className="mx-auto block max-h-[46dvh] w-full object-contain sm:max-h-[52dvh]"
              />
              <div
                className="absolute right-4"
                style={{ top: "max(1rem, env(safe-area-inset-top))" }}
              >
                <CloseButton onClose={close} />
              </div>
            </div>

            <div className="space-y-8 px-6 pt-7 pb-10 sm:px-9">
              <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2
                    id="pet-detail-title"
                    className="font-display text-[28px] leading-tight font-medium tracking-[-0.01em] text-foreground sm:text-[32px]"
                  >
                    {pet.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{pet.traits.join(" · ")}</p>
                </div>
                <div className="flex gap-2">
                  <SaveButton
                    saved={saved}
                    petName={pet.name}
                    onToggle={() => onToggleSave(pet.id)}
                  />
                  <button
                    type="button"
                    aria-pressed={comparing}
                    onClick={() => onToggleCompare(pet.id)}
                    className={[
                      "inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-all duration-200 ease-[var(--ease-soft)]",
                      comparing
                        ? "border-transparent bg-primary/12 text-primary"
                        : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:shadow-soft",
                    ].join(" ")}
                  >
                    {comparing ? "In compare" : "Compare"}
                  </button>
                </div>
              </header>

              <p className="text-[16px] leading-relaxed text-foreground/85">{pet.shortDescription}</p>

              <PetMetrics pet={pet} />

              <div className="grid gap-7 sm:grid-cols-2">
                <Bullets title="Great for" items={pet.greatFor} marker="✓" />
                <Bullets title="Think twice if" items={pet.thinkTwiceIf} marker="—" />
              </div>

              {similar.length > 0 && (
                <section>
                  <h3 className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                    Similar pets
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {similar.map((similarPet) => (
                      <button
                        key={similarPet.id}
                        type="button"
                        onClick={() => onSelectPet(similarPet)}
                        className="group overflow-hidden rounded-[18px] bg-cream text-left transition-transform duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5"
                      >
                        <img
                          src={photo(similarPet.image, 400)}
                          alt={similarPet.name}
                          loading="lazy"
                          className="h-24 w-full bg-sand object-contain"
                        />
                        <p className="px-3 py-2 text-[13px] leading-tight font-medium text-foreground">
                          {similarPet.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
