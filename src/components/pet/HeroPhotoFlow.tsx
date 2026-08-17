import { useMemo } from "react";
import { heroPhotoIds, photo } from "@/data/pets";

/**
 * Purely decorative photo world behind the hero.
 * Columns drift slowly in alternating directions; never interactive.
 */

const COLUMN_SETTINGS = [
  { direction: "drift-up", duration: 96 },
  { direction: "drift-down", duration: 122 },
  { direction: "drift-up", duration: 110 },
  { direction: "drift-down", duration: 134 },
] as const;

function chunk(ids: string[], columns: number) {
  const out: string[][] = Array.from({ length: columns }, () => []);
  ids.forEach((id, i) => out[i % columns]!.push(id));
  return out;
}

export function HeroPhotoFlow() {
  const columns = useMemo(() => chunk(heroPhotoIds, 4), []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2 gap-3 px-3 sm:gap-4 sm:px-4 md:grid-cols-3 lg:grid-cols-4">
        {columns.map((ids, index) => {
          const settings = COLUMN_SETTINGS[index]!;
          const doubled = [...ids, ...ids];
          return (
            <div
              key={index}
              className={[
                "relative h-full overflow-hidden",
                index === 2 ? "hidden md:block" : "",
                index === 3 ? "hidden lg:block" : "",
              ].join(" ")}
            >
              <div
                className={`drift-column ${settings.direction} flex flex-col gap-3 sm:gap-4`}
                style={{
                  animationDuration: `${settings.duration}s`,
                  marginTop: index % 2 === 0 ? "-6%" : "-14%",
                }}
              >
                {doubled.map((id, i) => (
                  <div
                    key={`${id}-${i}`}
                    className="overflow-hidden rounded-[22px] bg-sand"
                    style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "1 / 1" : "4 / 5" }}
                  >
                    <img
                      src={photo(id, 500)}
                      alt=""
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* keeps foreground text readable without darkening the photography */}
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
