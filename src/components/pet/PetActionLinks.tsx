import {
  ADOPTION_LINKS,
  DOG_SOURCE_LINK,
  RESPONSIBLE_SOURCE_TIPS,
  SOURCE_GUIDE_LINK,
  SOURCE_NOTES,
  STARTER_KIT_NOTES,
  SUPPLY_LINKS,
  outboundRel,
  type OutboundLink,
} from "@/data/outbound-links";
import { petMatchProfiles, type StarterKitCategory } from "@/data/pet-match-profiles";
import type { Pet } from "@/data/pets";

interface PetActionLinksProps {
  pet: Pet;
  /** `compact` drops the checklist — used for the two quiz alternates. */
  variant?: "detailed" | "compact";
  className?: string;
}

/** Fallback when a pet has no match profile yet. */
const CATEGORY_KIT: Record<Pet["category"], StarterKitCategory> = {
  Dogs: "dog",
  Cats: "cat",
  Rabbits: "rabbit",
  "Small Pets": "small-pet",
  Birds: "bird",
};

function LinkPill({ link }: { link: OutboundLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel={outboundRel(link)}
      className="inline-flex h-9 max-w-full items-center gap-1.5 rounded-full border border-border bg-cream px-3.5 text-[13px] text-foreground transition-all duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft"
    >
      <span className="truncate">{link.label}</span>
      <span aria-hidden="true" className="text-muted-foreground">
        ↗
      </span>
    </a>
  );
}

function ActionCard({
  title,
  note,
  links,
  tips,
  highlight,
}: {
  title: string;
  note: string;
  links: OutboundLink[];
  tips?: string[] | undefined;
  highlight?: string | undefined;
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-[18px] border border-border bg-card p-4">
      <p className="text-[15px] font-medium text-foreground">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{note}</p>
      {tips && tips.length > 0 && (
        <ul className="mt-2.5 space-y-1">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-2 text-[13px] leading-relaxed text-foreground/80">
              <span aria-hidden="true" className="mt-[2px] text-primary">
                ·
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
      {highlight && (
        <p className="mt-2.5 rounded-[14px] bg-cream px-3 py-2 text-[13px] leading-relaxed text-foreground/85">
          {highlight}
        </p>
      )}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {links.map((link) => (
          <LinkPill key={link.url} link={link} />
        ))}
      </div>
    </div>
  );
}

export function PetActionLinks({ pet, variant = "detailed", className = "" }: PetActionLinksProps) {
  const profile = petMatchProfiles[pet.id];
  const acquisition = profile?.acquisitionCategory ?? CATEGORY_KIT[pet.category];
  const starterKit = profile?.starterKitCategory ?? CATEGORY_KIT[pet.category];
  const isDog = acquisition === "dog";

  const sourceLinks = isDog ? [DOG_SOURCE_LINK, SOURCE_GUIDE_LINK] : [SOURCE_GUIDE_LINK];

  return (
    <section className={className}>
      <h3 className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
        Where to go next
      </h3>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <ActionCard
          title="Find adoptable pets"
          note={`Search shelters and rescues for a ${pet.name.toLowerCase()} near you — enter your location on their site. PetMuse doesn't ask for it.`}
          links={ADOPTION_LINKS}
        />
        <ActionCard
          title="Find a responsible source"
          note={SOURCE_NOTES[acquisition]}
          links={sourceLinks}
          tips={variant === "detailed" ? RESPONSIBLE_SOURCE_TIPS : undefined}
          highlight={profile?.legalityOrSafetyNote}
        />
        <ActionCard
          title="Get starter essentials"
          note={STARTER_KIT_NOTES[starterKit]}
          links={SUPPLY_LINKS}
        />
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
        These are plain outbound links. PetMuse has no affiliate or paid arrangement with any of
        them, and commercial links never affect quiz scores or ranking.
      </p>
    </section>
  );
}
