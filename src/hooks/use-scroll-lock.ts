import { useEffect } from "react";

let lockCount = 0;
let savedScrollY = 0;
let previous: {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflowY: string;
  paddingRight: string;
  scrollbarGutter: string;
} | null = null;

function lock() {
  lockCount += 1;
  if (lockCount > 1) return;

  const body = document.body;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  savedScrollY = window.scrollY;

  previous = {
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    overflowY: body.style.overflowY,
    paddingRight: body.style.paddingRight,
    scrollbarGutter: body.style.scrollbarGutter,
  };

  // Freeze the page without letting the layout width change.
  body.style.position = "fixed";
  body.style.top = `-${savedScrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !previous) return;

  const body = document.body;
  body.style.position = previous.position;
  body.style.top = previous.top;
  body.style.left = previous.left;
  body.style.right = previous.right;
  body.style.width = previous.width;
  body.style.overflowY = previous.overflowY;
  body.style.paddingRight = previous.paddingRight;
  body.style.scrollbarGutter = previous.scrollbarGutter;
  previous = null;

  window.scrollTo(0, savedScrollY);
}

/** Locks background scrolling without shifting or resizing the page. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
}
