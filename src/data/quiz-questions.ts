import type { MatchLevel } from "./pet-match-profiles";

/**
 * Quiz copy and the level each answer maps to. Kept out of the modal so the
 * scoring inputs stay reviewable in one place.
 *
 * For capability questions the level describes what the user can offer; for
 * activity and interaction it describes what they want. Answers are never
 * stored or sent anywhere — they live in component state for the session only.
 */

export type ScaleQuestionId =
  | "space"
  | "time"
  | "activity"
  | "interaction"
  | "care"
  | "noise"
  | "cost"
  | "experience";

export type BooleanQuestionId = "children" | "otherPets";

export type QuizQuestion =
  | {
      kind: "scale";
      id: ScaleQuestionId;
      prompt: string;
      options: { label: string; value: MatchLevel }[];
    }
  | {
      kind: "boolean";
      id: BooleanQuestionId;
      prompt: string;
      options: { label: string; value: boolean }[];
    };

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    kind: "scale",
    id: "space",
    prompt: "Where do you live?",
    options: [
      { label: "A studio or small apartment", value: 1 },
      { label: "A normal apartment", value: 2 },
      { label: "A house without outdoor space", value: 3 },
      { label: "A house with a garden", value: 4 },
      { label: "A large property with land", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "time",
    prompt: "How much time can you give a pet on a normal day?",
    options: [
      { label: "Under 30 minutes", value: 1 },
      { label: "Around half an hour to an hour", value: 2 },
      { label: "One to two hours", value: 3 },
      { label: "Two to three hours", value: 4 },
      { label: "I'm home most of the day", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "activity",
    prompt: "What activity level do you want to live with?",
    options: [
      { label: "Calm and mostly still", value: 1 },
      { label: "Gentle, short walks", value: 2 },
      { label: "Moderately active", value: 3 },
      { label: "Lively and playful", value: 4 },
      { label: "Sporty, out every day", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "interaction",
    prompt: "How much interaction do you want?",
    options: [
      { label: "Mostly independent", value: 1 },
      { label: "Quiet company nearby", value: 2 },
      { label: "Regular daily contact", value: 3 },
      { label: "A close, hands-on bond", value: 4 },
      { label: "Constant companionship", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "care",
    prompt: "How much grooming and cleaning are you happy to do?",
    options: [
      { label: "As little as possible", value: 1 },
      { label: "A quick tidy now and then", value: 2 },
      { label: "A weekly routine", value: 3 },
      { label: "Frequent brushing and cleaning", value: 4 },
      { label: "Daily care is fine by me", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "noise",
    prompt: "How much noise can you live with?",
    options: [
      { label: "I need near silence", value: 1 },
      { label: "Quiet, with occasional sound", value: 2 },
      { label: "Normal household sound", value: 3 },
      { label: "Barking or chatter is fine", value: 4 },
      { label: "Noise really doesn't bother me", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "cost",
    prompt: "What budget feels comfortable?",
    options: [
      { label: "Very tight", value: 1 },
      { label: "Low — the basics only", value: 2 },
      { label: "Moderate", value: 3 },
      { label: "Comfortable", value: 4 },
      { label: "Cost isn't a limit for me", value: 5 },
    ],
  },
  {
    kind: "scale",
    id: "experience",
    prompt: "How much experience do you have with pets?",
    options: [
      { label: "This would be my first", value: 1 },
      { label: "A little, years ago", value: 2 },
      { label: "I've kept one pet before", value: 3 },
      { label: "Several pets, I'm confident", value: 4 },
      { label: "Very experienced", value: 5 },
    ],
  },
  {
    kind: "boolean",
    id: "children",
    prompt: "Are there children at home?",
    options: [
      { label: "No children at home", value: false },
      { label: "Yes — children live with us or visit often", value: true },
    ],
  },
  {
    kind: "boolean",
    id: "otherPets",
    prompt: "Do you already have other pets?",
    options: [
      { label: "No other pets", value: false },
      { label: "Yes — I already have pets at home", value: true },
    ],
  },
];
