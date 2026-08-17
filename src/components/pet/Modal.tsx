import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: ReactNode | ((close: () => void) => ReactNode);
  /** width class for the desktop panel */
  panelClassName?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, labelledBy, children, panelClassName = "" }: ModalProps) {
  // Single source of truth: "closed" -> "open" -> "closing" -> "closed".
  const [phase, setPhase] = useState<"closed" | "open" | "closing">(open ? "open" : "closed");
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const mounted = phase !== "closed";
  const closing = phase === "closing";

  useScrollLock(mounted);

  const requestClose = useCallback(() => {
    // Guarded: repeated clicks cannot restart or re-open the transition.
    setPhase((current) => (current === "open" ? "closing" : current));
  }, []);

  const finishClose = useCallback(() => {
    setPhase((current) => {
      if (current !== "closing") return current;
      return "closed";
    });
  }, []);

  // Sync with the controlled `open` prop.
  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      setPhase((current) => (current === "open" ? current : "open"));
    } else {
      setPhase((current) => {
        if (current === "closed") return current;
        restoreFocus.current?.focus?.();
        return "closed";
      });
    }
  }, [open]);

  // When the exit animation ends, unmount and tell the owner to flip `open`.
  const handleAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.target !== panelRef.current) return;
      if (phase !== "closing") return;
      finishClose();
      onClose();
      restoreFocus.current?.focus?.();
    },
    [phase, finishClose, onClose],
  );

  useEffect(() => {
    if (!mounted) return;
    const panel = panelRef.current;
    panel?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        requestClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mounted, requestClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overscroll-contain sm:items-center">
      <div
        className="animate-overlay-in absolute inset-0 bg-foreground/12 backdrop-blur-[11px]"
        style={closing ? { opacity: 0, transition: "opacity 280ms var(--ease-soft)" } : undefined}
        onMouseDown={(event) => {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          event.stopPropagation();
          requestClose();
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onAnimationEnd={handleAnimationEnd}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        className={[
          closing ? "animate-modal-out" : "animate-modal-in",
          "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[30px] bg-card shadow-island outline-none sm:max-h-[86dvh] sm:rounded-[32px]",
          panelClassName,
        ].join(" ")}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {typeof children === "function" ? children(requestClose) : children}
      </div>
    </div>
  );
}

export function CloseButton({ onClose, tone = "light" }: { onClose: () => void; tone?: "light" | "dark" }) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      aria-label="Close"
      className={[
        "flex h-9 w-9 items-center justify-center rounded-full text-[17px] backdrop-blur-md transition-all duration-200 ease-[var(--ease-soft)] hover:scale-105 active:scale-95",
        tone === "light"
          ? "bg-card/80 text-foreground hover:bg-card"
          : "bg-foreground/12 text-foreground hover:bg-foreground/18",
      ].join(" ")}
    >
      ×
    </button>
  );
}
