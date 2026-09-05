import { cn } from "../utils/cn";
import { inkOn } from "../lib/ramp";
import type { BarSegment } from "../lib/types";

/** Mobile Alternative zu den schwebenden Labels: Liste mit Fortschrittsbalken. */
export function Legend({
  segments,
  denominator,
  money,
  pctText,
  onPick,
}: {
  segments: BarSegment[];
  denominator: number;
  money: (n: number) => string;
  pctText: (n: number) => string;
  onPick: (id: string) => void;
}) {
  return (
    <ul className="mt-6 space-y-1.5">
      {segments
        .filter((s) => s.amount > 0)
        .map((s) => {
          const row = (
            <>
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-black tabular-nums"
                style={{ background: s.color, color: s.surplus ? "#0a0a0a" : inkOn(s.color) }}
              >
                {s.surplus ? (s.deficit ? "−" : "+") : String(s.index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[11px] font-bold uppercase tracking-wider text-fg-muted">
                    {s.label}
                  </span>
                  <span className={cn("text-sm font-extrabold tabular-nums", s.deficit && "text-alert")}>
                    {s.surplus ? (s.deficit ? "−" : "+") : "−"}
                    {money(s.amount)}
                    <span className="ml-1.5 text-xs font-semibold text-fg-subtle">{pctText(s.amount)}</span>
                  </span>
                </div>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-surface-3">
                  <span
                    className="block h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${Math.min(100, (s.amount / denominator) * 100)}%`, background: s.color }}
                  />
                </span>
              </div>
            </>
          );

          return (
            <li key={s.id}>
              {s.surplus ? (
                <div className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">{row}</div>
              ) : (
                <button
                  type="button"
                  onClick={() => onPick(s.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
                >
                  {row}
                </button>
              )}
            </li>
          );
        })}
    </ul>
  );
}
