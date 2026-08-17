import { photo, photoSrcSet, type Pet } from "@/data/pets";

interface PetCardProps {
  pet: Pet;
  index: number;
  onOpen: (pet: Pet) => void;
  saved: boolean;
}

export function PetCard({ pet, index, onOpen, saved }: PetCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(pet)}
      aria-label={`Open details for ${pet.name}`}
      className="animate-tile-in group mb-4 block w-full break-inside-avoid text-left focus:outline-none sm:mb-5"
      style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
    >
      <div className="relative overflow-hidden rounded-[26px] bg-sand shadow-soft transition-[transform,box-shadow] duration-300 ease-[var(--ease-settle)] group-hover:-translate-y-0.5 group-hover:scale-[1.012] group-hover:shadow-lift group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <img
          src={photo(pet.image, 800)}
          srcSet={photoSrcSet(pet.image)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={`${pet.name} — ${pet.breed}`}
          loading={index < 6 ? "eager" : "lazy"}
          decoding="async"
          className="w-full object-cover"
          style={{ aspectRatio: pet.ratio }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent px-5 pt-14 pb-4">
          <p className="font-display text-lg leading-tight font-medium text-background">{pet.name}</p>
          <p className="mt-0.5 text-[12px] text-background/80">{pet.traits.join(" · ")}</p>
        </div>

        {saved && (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/85 text-[13px] text-clay backdrop-blur-md"
          >
            ♥
          </span>
        )}
      </div>
    </button>
  );
}
