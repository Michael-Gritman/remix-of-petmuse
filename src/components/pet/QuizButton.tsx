import { Sparkles } from "lucide-react";

interface QuizButtonProps {
  visible: boolean;
  onClick: () => void;
}

export function QuizButton({ visible, onClick }: QuizButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        "fixed right-5 bottom-5 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-card/90 px-5 text-[13px] font-medium text-foreground shadow-lift backdrop-blur-md transition-all duration-300 ease-[var(--ease-settle)] hover:-translate-y-0.5 sm:right-8 sm:bottom-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <Sparkles className="animate-sparkle h-4 w-4 text-clay" aria-hidden="true" />
      Find my match
    </button>
  );
}
