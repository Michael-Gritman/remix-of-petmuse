import type { AcquisitionCategory, StarterKitCategory } from "@/data/pet-match-profiles";

/**
 * Every outbound destination lives here so a link, or a future affiliate
 * programme, can be swapped without touching a component.
 *
 * There is no affiliate relationship today: no tracking parameters are added,
 * and nothing in this file influences quiz scoring or ranking.
 * When a programme is signed, set `affiliate: true` on that link — the rel
 * attribute then gains `sponsored` automatically.
 */

export interface OutboundLink {
  label: string;
  url: string;
  /** Set to true only for links that are genuinely part of a paid programme. */
  affiliate?: boolean;
}

export function outboundRel(link: OutboundLink): string {
  return link.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer";
}

/** Adoption search — the user enters their own location on the external site. */
export const ADOPTION_LINKS: OutboundLink[] = [
  { label: "Petfinder", url: "https://www.petfinder.com/" },
  { label: "Adopt a Pet", url: "https://www.adoptapet.com/" },
];

/** Breeder directory, dogs only. No unvetted shops or individual sellers. */
export const DOG_SOURCE_LINK: OutboundLink = {
  label: "AKC Marketplace",
  url: "https://marketplace.akc.org/",
};

/** Neutral educational reference for every category. */
export const SOURCE_GUIDE_LINK: OutboundLink = {
  label: "ASPCA guide to sources",
  url: "https://www.aspca.org/about-us/aspca-policy-and-position-statements/sources-companion-animals",
};

export const SUPPLY_LINKS: OutboundLink[] = [{ label: "Chewy", url: "https://www.chewy.com/" }];

export const RESPONSIBLE_SOURCE_TIPS: string[] = [
  "Meet the animal in person, together with whoever raised it.",
  "Ask to see where the animals actually live.",
  "Ask for health records, vaccinations and parent health checks.",
  "Walk away from sellers who will only ship, or who push for fast payment.",
];

/** One short line per category, matching the categories already in the data. */
export const STARTER_KIT_NOTES: Record<StarterKitCategory, string> = {
  dog: "Harness or collar with ID, lead, bed or crate, food and water bowls, waste bags, brush, chew toys.",
  cat: "Litter tray, litter and scoop, scratching post, carrier, bowls, brush, wand toys.",
  rabbit: "Roomy pen, hay feeder, litter tray, ceramic bowls, willow chews, brush, nail clippers.",
  "small-pet":
    "Large enclosure, safe bedding, hideouts, wheel or climbing platforms, hay and pellets, water bottle.",
  bird: "Wide cage, perches in several widths, food and water dishes, cuttlebone, foraging and shredding toys.",
};

/** Category-specific line for the responsible-source card. */
export const SOURCE_NOTES: Record<AcquisitionCategory, string> = {
  dog: "Adoption first. If you go to a breeder, use a directory that publishes health testing and visit in person.",
  cat: "Shelters and breed-specific rescues place cats of every age. Ask about vaccination and neutering status.",
  rabbit:
    "Rabbit rescues are full and often bond pairs for you. Avoid impulse buys from general pet shops.",
  "small-pet":
    "Small-animal rescues and species-specific breeders only. Shop stock is often mis-sexed or too young.",
  bird: "Look for a rescue or a breeder who lets you see the parent birds and the aviary.",
  specialist:
    "This species needs a specialist rescue or breeder, plus a vet who treats it. Confirm both before committing.",
};
