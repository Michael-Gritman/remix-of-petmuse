import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

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
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const requestClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      setMounted(true);
    } else {
      setMounted(false);
      restoreFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previous;
    };
  }, [mounted]);

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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="animate-overlay-in absolute inset-0 bg-foreground/12 backdrop-blur-[11px]"
        style={closing ? { opacity: 0, transition: "opacity 280ms var(--ease-soft)" } : undefined}
        onClick={requestClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={[
          closing ? "animate-modal-out" : "animate-modal-in",
          "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[30px] bg-card shadow-island outline-none sm:max-h-[86vh] sm:rounded-[32px]",
          panelClassName,
        ].join(" ")}
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
      onClick={onClose}
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
