import { METRIC_LABELS, METRIC_ORDER, petsById, photo, type Pet } from "@/data/pets";
import { Modal, CloseButton } from "./Modal";

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  compareIds: string[];
  onRemove: (id: string) => void;
}

export function CompareModal({ open, onClose, compareIds, onRemove }: CompareModalProps) {
  const selected = compareIds.map((id) => petsById[id]).filter(Boolean) as Pet[];

  return (
    <Modal open={open} onClose={onClose} labelledBy="compare-title" panelClassName="sm:max-w-[860px]">
      {(close) => (
        <div className="overflow-y-auto overscroll-contain px-6 py-7 sm:px-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="compare-title"
                className="font-display text-[26px] font-medium tracking-[-0.01em] text-foreground"
              >
                Compare
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Up to three companions, side by side.
              </p>
            </div>
            <CloseButton onClose={close} tone="dark" />
          </div>

          {selected.length === 0 ? (
            <p className="mt-10 mb-6 text-center text-sm text-muted-foreground">
              Nothing to compare yet — open a pet and tap Compare.
            </p>
          ) : (
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[520px] border-separate border-spacing-y-2 text-left">
                <thead>
                  <tr>
                    <th className="w-32" />
                    {selected.map((pet) => (
                      <th key={pet.id} className="px-2 align-bottom">
                        <img
                          src={photo(pet.image, 400)}
                          alt={pet.name}
                          loading="lazy"
                          className="h-24 w-full rounded-[16px] object-cover"
                        />
                        <p className="mt-2 text-sm font-medium text-foreground">{pet.name}</p>
                        <button
                          type="button"
                          onClick={() => onRemove(pet.id)}
                          className="mt-0.5 text-[12px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                        >
                          Remove
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {METRIC_ORDER.map((key) => (
                    <tr key={key}>
                      <td className="pr-2 text-[12px] tracking-[0.06em] text-muted-foreground uppercase">
                        {METRIC_LABELS[key].label}
                      </td>
                      {selected.map((pet) => (
                        <td key={pet.id} className="rounded-[14px] bg-cream px-3 py-2 text-sm text-foreground">
                          {METRIC_LABELS[key].words[pet[key] - 1]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="pr-2 text-[12px] tracking-[0.06em] text-muted-foreground uppercase">
                      Size
                    </td>
                    {selected.map((pet) => (
                      <td key={pet.id} className="rounded-[14px] bg-cream px-3 py-2 text-sm text-foreground">
                        {pet.size}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="pr-2 text-[12px] tracking-[0.06em] text-muted-foreground uppercase">
                      Character
                    </td>
                    {selected.map((pet) => (
                      <td key={pet.id} className="rounded-[14px] bg-cream px-3 py-2 text-sm text-foreground">
                        {pet.traits.join(" · ")}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
