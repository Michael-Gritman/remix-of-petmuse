import { useEffect, useState } from "react";
import type { Pet } from "@/data/pets";
import { PetCard } from "./PetCard";

interface PetWallProps {
  pets: Pet[];
  savedIds: string[];
  onOpen: (pet: Pet) => void;
  /** changes whenever filters change, to drive the fade-out → relayout → fade-in */
  filterKey: string;
}

export function PetWall({ pets, savedIds, onOpen, filterKey }: PetWallProps) {
  const [visible, setVisible] = useState(pets);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    setPhase("out");
    const timer = window.setTimeout(() => {
      setVisible(pets);
      setPhase("in");
    }, 170);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  useEffect(() => {
    // keep list fresh when data (not filters) changes
    if (phase === "in") setVisible(pets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pets]);

  if (visible.length === 0) {
    return (
      <div className="rounded-[26px] bg-cream px-6 py-16 text-center">
        <p className="font-display text-xl text-foreground">No companions match those filters yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try removing a trait — most pets fit more lives than their labels suggest.
        </p>
      </div>
    );
  }

  return (
    <div
      className="columns-2 gap-4 transition-opacity duration-200 ease-[var(--ease-soft)] sm:gap-5 md:columns-3 xl:columns-4"
      style={{ opacity: phase === "out" ? 0 : 1 }}
    >
      {visible.map((pet, index) => (
        <PetCard
          key={pet.id}
          pet={pet}
          index={index}
          onOpen={onOpen}
          saved={savedIds.includes(pet.id)}
        />
      ))}
    </div>
  );
}
