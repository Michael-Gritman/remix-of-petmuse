import { useEffect } from "react";

let lockCount = 0;
let savedScrollY = 0;
let pinGeneration = 0;
let previous: {
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
  bodyOverflow: string;
  bodyOverscrollBehavior: string;
  bodyPaddingRight: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
} | null = null;

type FixedSnapshot = { el: HTMLElement; paddingRight: string; right: string };
let fixedSnapshots: FixedSnapshot[] = [];

function isModalLayer(el: HTMLElement) {
  return Boolean(el.closest("[aria-modal='true']") || el.querySelector("[aria-modal='true']"));
}

/** Body padding cannot reach `position: fixed` chrome, so pad/offset those separately. */
function compensateFixedChrome(scrollbarWidth: number) {
  fixedSnapshots = [];
  if (scrollbarWidth <= 0) return;

  for (const el of document.body.querySelectorAll<HTMLElement>("*")) {
    const style = getComputedStyle(el);
    if (style.position !== "fixed") continue;
    if (isModalLayer(el)) continue;

    fixedSnapshots.push({
      el,
      paddingRight: el.style.paddingRight,
      right: el.style.right,
    });

    if (style.left === "0px" && style.right === "0px") {
      const currentPad = Number.parseFloat(style.paddingRight) || 0;
      el.style.paddingRight = `${currentPad + scrollbarWidth}px`;
      continue;
    }

    if (style.right !== "auto") {
      const currentRight = Number.parseFloat(style.right) || 0;
      el.style.right = `${currentRight + scrollbarWidth}px`;
    }
  }
}

function restoreFixedChrome() {
  for (const item of fixedSnapshots) {
    item.el.style.paddingRight = item.paddingRight;
    item.el.style.right = item.right;
  }
  fixedSnapshots = [];
}

function pinScroll() {
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });
  html.style.scrollBehavior = previousBehavior;
}

function lock() {
  lockCount += 1;
  if (lockCount > 1) return;

  pinGeneration += 1;
  const html = document.documentElement;
  const body = document.body;
  const scrollbarWidth = window.innerWidth - html.clientWidth;
  savedScrollY = window.scrollY;

  previous = {
    htmlOverflow: html.style.overflow,
    htmlOverscrollBehavior: html.style.overscrollBehavior,
    bodyOverflow: body.style.overflow,
    bodyOverscrollBehavior: body.style.overscrollBehavior,
    bodyPaddingRight: body.style.paddingRight,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
  };

  // Overflow-hidden freeze keeps window.scrollY intact (unlike position:fixed).
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";
  body.style.overflow = "hidden";
  body.style.overscrollBehavior = "none";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
  compensateFixedChrome(scrollbarWidth);
  pinScroll();
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !previous) return;

  restoreFixedChrome();

  const html = document.documentElement;
  const body = document.body;
  html.style.overflow = previous.htmlOverflow;
  html.style.overscrollBehavior = previous.htmlOverscrollBehavior;
  body.style.overflow = previous.bodyOverflow;
  body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
  body.style.paddingRight = previous.bodyPaddingRight;
  body.style.position = previous.bodyPosition;
  body.style.top = previous.bodyTop;
  body.style.left = previous.bodyLeft;
  body.style.right = previous.bodyRight;
  body.style.width = previous.bodyWidth;
  previous = null;

  pinScroll();
  const generation = pinGeneration;
  requestAnimationFrame(() => {
    if (generation !== pinGeneration) return;
    pinScroll();
  });
}

/** Locks background scrolling without shifting or resizing the page. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
}
