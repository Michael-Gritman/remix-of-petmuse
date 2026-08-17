import { pets, type Pet } from "@/data/pets";
import {
  petMatchProfiles,
  type Compatibility,
  type MatchLevel,
  type PetMatchProfile,
} from "@/data/pet-match-profiles";

/**
 * Deterministic lifestyle matching. Every function here is pure: same answers in,
 * same results out. No storage, no network, no randomness, no UI state.
 */

/** Dimensions where the pet has a requirement the user either meets or doesn't. */
export type CapacityDimension = "time" | "space" | "care" | "cost" | "noise" | "experience";
/** Dimensions where user and pet are compared as a two-way preference distance. */
export type PreferenceDimension = "activity" | "interaction";
/** Household facts, scored from a compatibility rating. */
export type HouseholdDimension = "children" | "otherPets";

export type MatchDimension = CapacityDimension | PreferenceDimension | HouseholdDimension;

export interface QuizAnswers {
  space: MatchLevel;
  time: MatchLevel;
  activity: MatchLevel;
  interaction: MatchLevel;
  care: MatchLevel;
  noise: MatchLevel;
  cost: MatchLevel;
  experience: MatchLevel;
  children: boolean;
  otherPets: boolean;
}

/** Weights add up to 100, so the weighted sum is already a 0–100 score. */
export const DIMENSION_WEIGHTS: Record<MatchDimension, number> = {
  time: 18,
  space: 14,
  activity: 14,
  interaction: 10,
  care: 10,
  cost: 10,
  noise: 8,
  experience: 8,
  children: 4,
  otherPets: 4,
};

export const DIMENSION_LABELS: Record<MatchDimension, string> = {
  time: "Daily time",
  space: "Space",
  activity: "Activity level",
  interaction: "Interaction",
  care: "Care and cleaning",
  cost: "Budget",
  noise: "Noise",
  experience: "Experience",
  children: "Children at home",
  otherPets: "Other pets",
};

const CAPACITY_DIMENSIONS: CapacityDimension[] = [
  "time",
  "space",
  "care",
  "cost",
  "noise",
  "experience",
];

const PREFERENCE_DIMENSIONS: PreferenceDimension[] = ["activity", "interaction"];

type LevelField =
  | "spaceNeed"
  | "timeNeed"
  | "activityLevel"
  | "interactionLevel"
  | "careNeed"
  | "noiseLevel"
  | "costLevel"
  | "experienceNeed";

/** The pet requirement each capacity dimension reads. */
const CAPACITY_FIELDS: Record<CapacityDimension, LevelField> = {
  time: "timeNeed",
  space: "spaceNeed",
  care: "careNeed",
  cost: "costLevel",
  noise: "noiseLevel",
  experience: "experienceNeed",
};

const PREFERENCE_FIELDS: Record<PreferenceDimension, LevelField> = {
  activity: "activityLevel",
  interaction: "interactionLevel",
};

/** 100 when the user can cover the requirement, −25 for each level short. */
export function capacityScore(userLevel: number, petNeed: number): number {
  if (petNeed <= userLevel) return 100;
  return Math.max(0, 100 - 25 * (petNeed - userLevel));
}

/** Distance from the user's preference, in either direction. */
export function preferenceScore(petLevel: number, userPreference: number): number {
  return Math.max(0, 100 - 25 * Math.abs(petLevel - userPreference));
}

export function compatibilityScore(compatibility: Compatibility): number {
  if (compatibility === "good") return 100;
  if (compatibility === "conditional") return 60;
  return 0;
}

export type MatchTier = "strong" | "good" | "possible" | "weak";

export const TIER_LABELS: Record<MatchTier, string> = {
  strong: "Strong match",
  good: "Good match",
  possible: "Possible with adjustments",
  weak: "Not a fit right now",
};

export function tierFor(score: number): MatchTier {
  if (score >= 80) return "strong";
  if (score >= 65) return "good";
  if (score >= 50) return "possible";
  return "weak";
}

export interface DimensionScore {
  dimension: MatchDimension;
  score: number;
  weight: number;
  /** Household dimensions are neutral when the user has no children / no pets. */
  relevant: boolean;
}

export interface PetMatchResult {
  petId: string;
  pet: Pet;
  profile: PetMatchProfile;
  score: number;
  tier: MatchTier;
  tierLabel: string;
  dimensions: DimensionScore[];
  /** Highest-scoring dimensions, as sentences. */
  reasons: string[];
  /** Lowest-scoring dimensions, as sentences. Empty when nothing is short. */
  cautions: string[];
  /** Which score ceiling, if any, limited the final number. */
  limitedBy: string[];
}

const REASON_TEMPLATES: Record<MatchDimension, string> = {
  time: "The daily time it asks for fits the time you said you have.",
  space: "Comfortable in the kind of space you described.",
  activity: "Its everyday pace is close to the activity level you want.",
  interaction: "The amount of contact it looks for matches what you want.",
  care: "Grooming and cleaning stay inside what you're willing to do.",
  cost: "Typical running costs sit inside your budget.",
  noise: "Usually as quiet as you need it to be.",
  experience: "Manageable at your level of experience.",
  children: "Generally does well in homes with children.",
  otherPets: "Usually settles alongside pets you already have.",
};

const CAUTION_TEMPLATES: Record<MatchDimension, string> = {
  time: "Wants more daily time than you selected.",
  space: "Wants more room than the space you described.",
  activity: "Its everyday pace is further from your preference than the rest.",
  interaction: "The contact it looks for doesn't line up with what you described.",
  care: "Grooming and cleaning go beyond what you selected.",
  cost: "Likely to cost more than the budget you chose.",
  noise: "Can be louder than your noise tolerance.",
  experience: "Usually needs more hands-on experience than you selected.",
  children: "Needs careful introductions and supervision around children.",
  otherPets: "Introductions to your current pets need planning and separate space.",
};

function householdCaution(dimension: HouseholdDimension, profile: PetMatchProfile): string {
  if (dimension === "children") {
    return profile.childCompatibility === "poor"
      ? "Not a good fit for a household with children."
      : CAUTION_TEMPLATES.children;
  }
  return profile.otherPetCompatibility === "poor"
    ? "Not a good fit for a household that already has pets."
    : CAUTION_TEMPLATES.otherPets;
}

/** Stable ordering: best score first, then unique profile ID. */
function compareResults(a: PetMatchResult, b: PetMatchResult): number {
  if (b.score !== a.score) return b.score - a.score;
  return a.petId.localeCompare(b.petId);
}

function compareForReasons(a: DimensionScore, b: DimensionScore): number {
  if (b.score !== a.score) return b.score - a.score;
  if (b.weight !== a.weight) return b.weight - a.weight;
  return a.dimension.localeCompare(b.dimension);
}

function compareForCautions(a: DimensionScore, b: DimensionScore): number {
  if (a.score !== b.score) return a.score - b.score;
  if (b.weight !== a.weight) return b.weight - a.weight;
  return a.dimension.localeCompare(b.dimension);
}

export function scorePet(pet: Pet, profile: PetMatchProfile, answers: QuizAnswers): PetMatchResult {
  const dimensions: DimensionScore[] = [];

  for (const dimension of CAPACITY_DIMENSIONS) {
    const petNeed = profile[CAPACITY_FIELDS[dimension]];
    dimensions.push({
      dimension,
      score: capacityScore(answers[dimension], petNeed),
      weight: DIMENSION_WEIGHTS[dimension],
      relevant: true,
    });
  }

  for (const dimension of PREFERENCE_DIMENSIONS) {
    const petLevel = profile[PREFERENCE_FIELDS[dimension]];
    dimensions.push({
      dimension,
      score: preferenceScore(petLevel, answers[dimension]),
      weight: DIMENSION_WEIGHTS[dimension],
      relevant: true,
    });
  }

  dimensions.push({
    dimension: "children",
    score: answers.children ? compatibilityScore(profile.childCompatibility) : 100,
    weight: DIMENSION_WEIGHTS.children,
    relevant: answers.children,
  });

  dimensions.push({
    dimension: "otherPets",
    score: answers.otherPets ? compatibilityScore(profile.otherPetCompatibility) : 100,
    weight: DIMENSION_WEIGHTS.otherPets,
    relevant: answers.otherPets,
  });

  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  const weighted = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0) / totalWeight;

  // Ceilings: a weighted average can hide one disqualifying gap.
  const limitedBy: string[] = [];
  let ceiling = 100;

  if (profile.timeNeed - answers.time >= 3 || profile.spaceNeed - answers.space >= 3) {
    ceiling = Math.min(ceiling, 60);
    limitedBy.push("Its time or space needs are far above what you can offer.");
  }
  if (profile.costLevel - answers.cost >= 3 || profile.experienceNeed - answers.experience >= 3) {
    ceiling = Math.min(ceiling, 65);
    limitedBy.push("Its cost or experience demands are far above what you selected.");
  }
  if (
    (answers.children && profile.childCompatibility === "poor") ||
    (answers.otherPets && profile.otherPetCompatibility === "poor")
  ) {
    ceiling = Math.min(ceiling, 55);
    limitedBy.push("Poor fit with the children or pets already in your home.");
  }

  const score = Math.round(Math.min(weighted, ceiling));
  const relevant = dimensions.filter((d) => d.relevant);

  const reasons = [...relevant]
    .sort(compareForReasons)
    .filter((d) => d.score >= 60)
    .slice(0, 3)
    .map((d) => REASON_TEMPLATES[d.dimension]);

  const cautions = [...relevant]
    .sort(compareForCautions)
    .filter((d) => d.score < 100)
    .slice(0, 2)
    .map((d) =>
      d.dimension === "children" || d.dimension === "otherPets"
        ? householdCaution(d.dimension, profile)
        : CAUTION_TEMPLATES[d.dimension],
    );

  const tier = tierFor(score);

  return {
    petId: pet.id,
    pet,
    profile,
    score,
    tier,
    tierLabel: TIER_LABELS[tier],
    dimensions,
    reasons,
    cautions,
    limitedBy,
  };
}

export interface MatchResults {
  best: PetMatchResult | null;
  alternates: PetMatchResult[];
  /** False when nothing reached 65 — the UI must say so instead of overselling. */
  hasStrongMatch: boolean;
  /** Every profile, scored and ordered. Useful for review and debugging. */
  ranked: PetMatchResult[];
}

/**
 * One entry per breed so near-identical photographs of the same breed cannot
 * take more than one recommendation slot.
 */
function breedKey(pet: Pet): string {
  return `${pet.category}|${pet.breed.trim().toLowerCase()}`;
}

export function rankPets(answers: QuizAnswers): MatchResults {
  const scored = pets
    .map((pet) => {
      const profile = petMatchProfiles[pet.id];
      return profile ? scorePet(pet, profile, answers) : null;
    })
    .filter((result): result is PetMatchResult => result !== null)
    .sort(compareResults);

  const bestPerBreed = new Map<string, PetMatchResult>();
  for (const result of scored) {
    const key = breedKey(result.pet);
    if (!bestPerBreed.has(key)) bestPerBreed.set(key, result);
  }

  const ranked = [...bestPerBreed.values()].sort(compareResults);
  const eligible = ranked.filter((result) => result.score >= 50);

  return {
    best: eligible[0] ?? null,
    alternates: eligible.slice(1, 3),
    hasStrongMatch: eligible.some((result) => result.score >= 65),
    ranked,
  };
}
