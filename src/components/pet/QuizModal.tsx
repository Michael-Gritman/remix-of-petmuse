import { useState } from "react";
import type { TraitFilter } from "./PetFilters";
import { Modal, CloseButton } from "./Modal";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (traits: TraitFilter[]) => void;
}

interface Question {
  id: string;
  prompt: string;
  options: { label: string; tags: TraitFilter[] }[];
}

const QUESTIONS: Question[] = [
  {
    id: "space",
    prompt: "Where do you live?",
    options: [
      { label: "A small apartment", tags: ["Apartment-friendly", "Small"] },
      { label: "A regular flat or house", tags: ["Apartment-friendly", "Medium"] },
      { label: "A house with outdoor space", tags: ["Large", "Active"] },
    ],
  },
  {
    id: "time",
    prompt: "How much time can you give on a normal day?",
    options: [
      { label: "Under 30 minutes", tags: ["Low-maintenance", "Independent"] },
      { label: "About an hour", tags: ["Apartment-friendly"] },
      { label: "Several hours", tags: ["Cuddly", "Active"] },
    ],
  },
  {
    id: "budget",
    prompt: "What monthly budget feels comfortable?",
    options: [
      { label: "As low as possible", tags: ["Low-maintenance", "Small"] },
      { label: "Moderate", tags: ["Beginner-friendly"] },
      { label: "Whatever it takes", tags: ["Large"] },
    ],
  },
  {
    id: "activity",
    prompt: "How active is your everyday life?",
    options: [
      { label: "Mostly calm and indoors", tags: ["Quiet", "Apartment-friendly"] },
      { label: "Balanced", tags: ["Beginner-friendly"] },
      { label: "Always out and moving", tags: ["Active"] },
    ],
  },
  {
    id: "noise",
    prompt: "How much noise can you live with?",
    options: [
      { label: "I need quiet", tags: ["Quiet"] },
      { label: "Some sound is fine", tags: [] },
      { label: "Barking and chatter don't bother me", tags: ["Active"] },
    ],
  },
  {
    id: "interaction",
    prompt: "What kind of interaction do you want?",
    options: [
      { label: "A pet that seeks contact", tags: ["Cuddly"] },
      { label: "Company, at a distance", tags: ["Independent"] },
      { label: "Something to play and train with", tags: ["Active"] },
    ],
  },
  {
    id: "experience",
    prompt: "Have you kept a pet before?",
    options: [
      { label: "This would be my first", tags: ["Beginner-friendly", "Low-maintenance"] },
      { label: "A little experience", tags: ["Beginner-friendly"] },
      { label: "Plenty", tags: [] },
    ],
  },
  {
    id: "maintenance",
    prompt: "How do you feel about grooming and cleaning?",
    options: [
      { label: "Keep it minimal", tags: ["Low-maintenance"] },
      { label: "A weekly routine is fine", tags: [] },
      { label: "I enjoy caring rituals", tags: ["Cuddly"] },
    ],
  },
];

export function QuizModal({ open, onClose, onApply }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TraitFilter[][]>([]);

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const finished = step >= QUESTIONS.length;
  const question = QUESTIONS[step];

  const counts = new Map<TraitFilter, number>();
  answers.flat().forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  const recommended = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);

  return (
    <Modal open={open} onClose={onClose} labelledBy="quiz-title" panelClassName="sm:max-w-[560px]">
      {(close) => (
        <div className="overflow-y-auto overscroll-contain px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="quiz-title"
                className="font-display text-[24px] font-medium tracking-[-0.01em] text-foreground"
              >
                Narrow it down
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {finished ? "Here's a starting point." : `Question ${step + 1} of ${QUESTIONS.length}`}
              </p>
            </div>
            <CloseButton onClose={close} tone="dark" />
          </div>

          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-cream">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 ease-[var(--ease-settle)]"
              style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {!finished && question ? (
            <div key={question.id} className="fade-swap-in mt-7">
              <p className="text-[19px] leading-snug text-foreground">{question.prompt}</p>
              <div className="mt-4 space-y-2.5">
                {question.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => [...prev.slice(0, step), option.tags]);
                      setStep((s) => s + 1);
                    }}
                    className="w-full rounded-[18px] border border-border bg-card px-5 py-4 text-left text-[15px] text-foreground transition-all duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-5 text-[13px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Back
                </button>
              )}
            </div>
          ) : (
            <div className="fade-swap-in mt-7">
              <p className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                Recommended filters
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {recommended.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/12 px-4 py-2 text-[13px] text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
                Based on your lifestyle, start exploring these pets. Nothing here is a verdict — adjust
                the filters any time.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onApply(recommended);
                    close();
                    window.setTimeout(reset, 400);
                  }}
                  className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
                >
                  Explore these pets
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm text-foreground transition-colors duration-200 hover:bg-cream"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
