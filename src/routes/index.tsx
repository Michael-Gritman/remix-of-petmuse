import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { pets, type Pet, type PetCategory } from "@/data/pets";
import { useCompare, useSaved } from "@/lib/pet-collections";
import { Navigation } from "@/components/pet/Navigation";
import { Hero } from "@/components/pet/Hero";
import { PetFilters, type TraitFilter } from "@/components/pet/PetFilters";
import { PetWall } from "@/components/pet/PetWall";
import { PetDetailModal } from "@/components/pet/PetDetailModal";
import { CompareModal } from "@/components/pet/CompareModal";
import { QuizButton } from "@/components/pet/QuizButton";
import { QuizModal } from "@/components/pet/QuizModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetMuse — Find a pet that fits your life" },
      {
        name: "description",
        content:
          "Explore dogs, cats, rabbits, small pets and birds in photographs, understand daily life with each one, save favourites and compare companions.",
      },
      { property: "og:title", content: "PetMuse — Find a pet that fits your life" },
      {
        property: "og:description",
        content:
          "A calm, photo-led way to discover companion animals: browse, learn what living with them is really like, save and compare.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<PetCategory | "All">("All");
  const [traits, setTraits] = useState<TraitFilter[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [activePet, setActivePet] = useState<Pet | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [showQuizButton, setShowQuizButton] = useState(false);

  const wallRef = useRef<HTMLDivElement>(null);
  const saved = useSaved();
  const compare = useCompare();

  useEffect(() => {
    const onScroll = () => setShowQuizButton(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visiblePets = useMemo(() => {
    return pets.filter((pet) => {
      if (category !== "All" && pet.category !== category) return false;
      if (savedOnly && !saved.ids.includes(pet.id)) return false;
      return traits.every((trait) =>
        trait === pet.size || (pet.lifestyle as string[]).includes(trait),
      );
    });
  }, [category, traits, savedOnly, saved.ids]);

  const scrollToWall = useCallback(() => {
    wallRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openPet = useCallback((pet: Pet) => {
    setActivePet(pet);
    setDetailOpen(true);
  }, []);

  const toggleTrait = (trait: TraitFilter) =>
    setTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]));

  const filterKey = `${category}|${traits.join(",")}|${savedOnly}|${savedOnly ? saved.ids.join(",") : ""}`;

  return (
    <main className="min-h-screen bg-background">
      <Navigation
        savedCount={saved.ids.length}
        compareCount={compare.ids.length}
        savedActive={savedOnly}
        onDiscover={scrollToWall}
        onCompare={() => setCompareOpen(true)}
        onToggleSaved={() => {
          setSavedOnly((v) => !v);
          scrollToWall();
        }}
        onQuiz={() => setQuizOpen(true)}
      />

      <Hero onExplore={scrollToWall} />

      <section
        ref={wallRef}
        id="discover"
        className="mx-auto max-w-[1400px] scroll-mt-16 px-4 pt-14 pb-24 sm:px-8"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[30px] leading-tight font-medium tracking-[-0.015em] text-foreground sm:text-[38px]">
              {savedOnly ? "Your saved companions" : "Meet the companions"}
            </h2>
            <p className="mt-2 max-w-lg text-[15px] text-muted-foreground">
              {savedOnly
                ? "Everything you've kept, in one place."
                : "Browse freely. Tap any photo to see what daily life with them looks like."}
            </p>
          </div>
        </div>

        <div className="sticky top-16 z-30 -mx-4 bg-background/85 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <PetFilters
            category={category}
            traits={traits}
            onCategoryChange={setCategory}
            onTraitToggle={toggleTrait}
            onClear={() => {
              setCategory("All");
              setTraits([]);
              setSavedOnly(false);
            }}
            resultCount={visiblePets.length}
          />
        </div>

        <div className="mt-8">
          <PetWall
            pets={visiblePets}
            savedIds={saved.ids}
            onOpen={openPet}
            filterKey={filterKey}
          />
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10 text-center text-[13px] text-muted-foreground sm:px-8">
        PetMuse — a space to discover, understand and compare future companions.
      </footer>

      <QuizButton visible={showQuizButton && !detailOpen} onClick={() => setQuizOpen(true)} />

      <PetDetailModal
        pet={activePet}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onSelectPet={setActivePet}
        savedIds={saved.ids}
        onToggleSave={saved.toggle}
        compareIds={compare.ids}
        onToggleCompare={compare.toggle}
      />

      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        compareIds={compare.ids}
        onRemove={compare.remove}
      />

      <QuizModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onApply={(recommended) => {
          setCategory("All");
          setSavedOnly(false);
          setTraits(recommended);
          window.setTimeout(scrollToWall, 260);
        }}
      />
    </main>
  );
}
