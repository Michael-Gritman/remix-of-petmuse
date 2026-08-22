import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteFooter } from "./SiteFooter";

interface InfoPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function InfoPageLayout({
  title,
  lastUpdated = "August 19, 2026",
  children,
}: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-40 bg-background/78 shadow-soft backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
          <Link
            to="/"
            className="font-display text-[19px] font-medium tracking-[-0.01em] text-foreground"
          >
            PetMuse
          </Link>
          <Link
            to="/"
            className="rounded-full px-3 py-2 text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Discover
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[42rem] px-4 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
        <h1 className="font-display text-[2rem] leading-tight font-medium tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
          {title}
        </h1>
        <p className="mt-3 text-[13px] text-muted-foreground">Last updated: {lastUpdated}</p>
        <div className="mt-10 space-y-8 text-[15px] leading-relaxed break-words text-muted-foreground">
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[1.25rem] font-medium tracking-[-0.01em] text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
