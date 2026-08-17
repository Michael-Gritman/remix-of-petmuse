import { useMemo, useState } from "react";
import { photo, type LifestyleTag } from "@/data/pets";
import type { MatchLevel } from "@/data/pet-match-profiles";
import { QUIZ_QUESTIONS } from "@/data/quiz-questions";
import {
  rankPets,
  type MatchResults,
  type PetMatchResult,
  type QuizAnswers,
} from "@/lib/pet-match";
import type { TraitFilter } from "./PetFilters";
import { Modal, CloseButton } from "./Modal";
import { PetActionLinks } from "./PetActionLinks";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (traits: TraitFilter[]) => void;
}

type AnswerValue = MatchLevel | boolean;
type AnswerMap = Partial<Record<keyof QuizAnswers, AnswerValue>>;

function isComplete(answers: AnswerMap): answers is QuizAnswers {
  return QUIZ_QUESTIONS.every((question) => answers[question.id] !== undefined);
}

/** Lifestyle tags shared by the recommendations, so the wall isn't over-filtered. */
function sharedTraits(results: MatchResults): TraitFilter[] {
  const shown = [results.best, ...results.alternates].filter(
    (result): result is PetMatchResult => result !== null,
  );
  if (shown.length === 0) return [];

  const tally = new Map<LifestyleTag, number>();
  for (const result of shown) {
    for (const tag of result.pet.lifestyle) {
      tally.set(tag, (tally.get(tag) ?? 0) + 1);
    }
  }

  return [...tally.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 2)
    .map(([tag]) => tag);
}

function ResultCard({
  result,
  eyebrow,
  emphasis,
}: {
  result: PetMatchResult;
  eyebrow: string;
  emphasis: "best" | "alternate";
}) {
  const best = emphasis === "best";

  return (
    <article
      className={[
        "rounded-[22px] border bg-card p-5",
        best ? "border-primary/25 shadow-soft" : "border-border",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <img
          src={photo(result.pet.image, 400)}
          alt={result.pet.name}
          loading="lazy"
          className={[
            "shrink-0 rounded-[16px] bg-cream object-contain",
            best ? "h-24 w-24" : "h-16 w-16",
          ].join(" ")}
        />
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{eyebrow}</p>
          <h3
            className={[
              "font-display font-medium tracking-[-0.01em] text-foreground",
              best ? "text-[24px]" : "text-[19px]",
            ].join(" ")}
          >
            {result.pet.name}
          </h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {result.tierLabel} · fit score {result.score} of 100
          </p>
        </div>
      </div>

      {result.reasons.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
            Why it fits
          </p>
          <ul className="mt-2 space-y-1.5">
            {result.reasons.map((reason) => (
              <li
                key={reason}
                className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/85"
              >
                <span aria-hidden="true" className="mt-[2px] text-primary">
                  ✓
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.cautions.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
            Keep in mind
          </p>
          <ul className="mt-2 space-y-1.5">
            {result.cautions.map((caution) => (
              <li
                key={caution}
                className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/85"
              >
                <span aria-hidden="true" className="mt-[2px] text-primary">
                  —
                </span>
                <span>{caution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PetActionLinks
        pet={result.pet}
        variant={best ? "detailed" : "compact"}
        className="mt-5 border-t border-border pt-5"
      />
    </article>
  );
}

export function QuizModal({ open, onClose, onApply }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResults, setShowResults] = useState(false);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const select = (id: keyof QuizAnswers, value: AnswerValue) =>
    setAnswers((prev) => {
      const next: AnswerMap = { ...prev };
      next[id] = value;
      return next;
    });

  const question = QUIZ_QUESTIONS[step]!;
  const options: { label: string; value: AnswerValue }[] = question.options;
  const selected = answers[question.id];
  const isLast = step === QUIZ_QUESTIONS.length - 1;

  const results = useMemo(
    () => (showResults && isComplete(answers) ? rankPets(answers) : null),
    [showResults, answers],
  );

  const progress = showResults ? 1 : step / QUIZ_QUESTIONS.length;

  return (
    <Modal open={open} onClose={onClose} labelledBy="quiz-title" panelClassName="sm:max-w-[680px]">
      {(close) => (
        <div className="overflow-y-auto overscroll-contain px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="quiz-title"
                className="font-display text-[24px] font-medium tracking-[-0.01em] text-foreground"
              >
                {showResults ? "Your matches" : "Find your fit"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {showResults
                  ? "Based only on the answers you just gave."
                  : `${step + 1} of ${QUIZ_QUESTIONS.length}`}
              </p>
            </div>
            <CloseButton onClose={close} tone="dark" />
          </div>

          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-cream">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 ease-[var(--ease-settle)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {!showResults ? (
            <div key={question.id} className="fade-swap-in mt-7">
              <p
                id={`quiz-prompt-${question.id}`}
                className="text-[19px] leading-snug text-foreground"
              >
                {question.prompt}
              </p>

              <div
                role="radiogroup"
                aria-labelledby={`quiz-prompt-${question.id}`}
                className="mt-4 space-y-2.5"
              >
                {options.map((option) => {
                  const active = selected === option.value;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => select(question.id, option.value)}
                      className={[
                        "w-full rounded-[18px] border px-5 py-4 text-left text-[15px] text-foreground transition-all duration-200 ease-[var(--ease-soft)]",
                        active
                          ? "border-primary/40 bg-primary/10"
                          : "border-border bg-card hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="text-[13px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
                >
                  Back
                </button>
                <div className="flex items-center gap-3">
                  {selected === undefined && (
                    <span className="text-[13px] text-muted-foreground">Pick one to continue</span>
                  )}
                  <button
                    type="button"
                    disabled={selected === undefined}
                    onClick={() => {
                      if (isLast) setShowResults(true);
                      else setStep((s) => s + 1);
                    }}
                    className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
                  >
                    {isLast ? "See matches" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-swap-in mt-7 space-y-5">
              {results && !results.hasStrongMatch && (
                <div className="rounded-[18px] border border-border bg-cream px-4 py-3.5">
                  <p className="text-[15px] font-medium text-foreground">
                    We couldn't find a strong match yet
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    Nothing in this collection scored above 65 for your answers. The closest options
                    are below — they need real adjustments, not a leap of faith. Retaking the quiz
                    with different answers, or changing one thing about your setup, may open up
                    better options.
                  </p>
                </div>
              )}

              {results?.best ? (
                <>
                  <ResultCard result={results.best} eyebrow="Best match" emphasis="best" />
                  {results.alternates.map((alternate, index) => (
                    <ResultCard
                      key={alternate.petId}
                      result={alternate}
                      eyebrow={`Alternative ${index + 1}`}
                      emphasis="alternate"
                    />
                  ))}
                </>
              ) : (
                <p className="text-[15px] leading-relaxed text-foreground/85">
                  None of the companions here scored high enough to recommend for the answers you
                  gave. Retake the quiz, or browse freely and read what daily life with each one
                  looks like.
                </p>
              )}

              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Scores compare your answers with breed-typical needs. Breed patterns describe
                tendencies, not individuals — any specific animal's behaviour depends on its
                history, training and health, so always meet it in person before deciding.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {results && (
                  <button
                    type="button"
                    onClick={() => {
                      onApply(sharedTraits(results));
                      close();
                    }}
                    className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
                  >
                    Explore similar pets
                  </button>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm text-foreground transition-colors duration-200 hover:bg-cream"
                >
                  Retake quiz
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResults(false);
                    setStep(QUIZ_QUESTIONS.length - 1);
                  }}
                  className="inline-flex h-12 items-center px-2 text-[13px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Change an answer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
