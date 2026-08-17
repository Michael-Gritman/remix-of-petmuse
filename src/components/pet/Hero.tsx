import { HeroPhotoFlow } from "./HeroPhotoFlow";

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6"
    >
      <HeroPhotoFlow />

      <div
        className="animate-rise relative w-full max-w-[52rem] rounded-[34px] bg-card/92 px-6 py-12 text-center shadow-island backdrop-blur-xl sm:px-14 sm:py-16 md:px-20 md:py-20"
        style={{ animationDelay: "160ms" }}
      >
        <h1
          className="animate-stagger font-display text-[2.6rem] leading-[1.05] font-medium tracking-[-0.02em] text-foreground sm:text-6xl md:text-[4.6rem]"
          style={{ animationDelay: "320ms" }}
        >
          Find a pet that fits your life.
        </h1>

        <p
          className="animate-stagger mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "410ms" }}
        >
          Discover different companions, understand what life with them is really like, and find one
          that feels right for you.
        </p>

        <div className="animate-stagger mt-9" style={{ animationDelay: "500ms" }}>
          <button
            type="button"
            onClick={onExplore}
            className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-primary px-8 text-[15px] font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:scale-[0.975]"
          >
            Start Exploring
            <span className="transition-transform duration-200 ease-[var(--ease-soft)] group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
