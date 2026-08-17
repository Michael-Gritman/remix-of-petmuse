import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for saved + compare collections.
 * No backend in V1 — swap this module later without touching components.
 */

type Key = "petmuse:saved" | "petmuse:compare";

export const MAX_COMPARE = 3;

const listeners = new Set<() => void>();
const cache: Record<Key, string[]> = {
  "petmuse:saved": [],
  "petmuse:compare": [],
};
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  (Object.keys(cache) as Key[]).forEach((key) => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) cache[key] = JSON.parse(raw) as string[];
    } catch {
      /* ignore corrupt storage */
    }
  });
}

function emit() {
  listeners.forEach((l) => l());
}

function write(key: Key, next: string[]) {
  cache[key] = next;
  try {
    window.localStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* storage may be unavailable */
  }
  emit();
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const EMPTY: string[] = [];

function useCollection(key: Key) {
  const ids = useSyncExternalStore(
    subscribe,
    () => cache[key],
    () => EMPTY,
  );

  const toggle = useCallback(
    (id: string) => {
      const current = cache[key];
      write(key, current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
    },
    [key],
  );

  const remove = useCallback(
    (id: string) => write(key, cache[key].filter((x) => x !== id)),
    [key],
  );

  const clear = useCallback(() => write(key, []), [key]);

  return { ids, toggle, remove, clear };
}

export function useSaved() {
  return useCollection("petmuse:saved");
}

export function useCompare() {
  const { ids, toggle, remove, clear } = useCollection("petmuse:compare");

  const toggleLimited = useCallback(
    (id: string) => {
      const current = cache["petmuse:compare"];
      if (!current.includes(id) && current.length >= MAX_COMPARE) return false;
      toggle(id);
      return true;
    },
    [toggle],
  );

  return { ids, toggle: toggleLimited, remove, clear, max: MAX_COMPARE };
}
