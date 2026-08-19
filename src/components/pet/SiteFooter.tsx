import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
        <p className="text-[13px] text-muted-foreground">
          PetMuse — a space to discover, understand and compare future companions.
        </p>
        <nav
          aria-label="Site information"
          className="flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px]"
        >
          <Link
            to="/about"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
}
