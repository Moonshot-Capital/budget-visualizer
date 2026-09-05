import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { inkOn } from "../lib/ramp";
import type { BarSegment } from "../lib/types";

/* Der geneigte Balken mit schwebenden Labels.
   Die Kollisionsvermeidung (Lane-Packing) ist 1:1 aus v4 übernommen: Labels
   werden nach ihrer Mitte sortiert und in die erste Spur gelegt, in der sie
   nicht mit dem rechten Rand des Vorgängers kollidieren. */

const SKEW_DEG = -14;
const BASE = 44; // Abstand der ersten Spur zum Balken
const STEP = 68; // Höhe einer weiteren Spur
const GAP = 24; // Mindestabstand zweier Labels in derselben Spur
const NARROW = 38; // schmaler als das → Nummer ausblenden

type Props = {
  segments: BarSegment[];
  denominator: number;
  desktop: boolean;
  /** Formatiert den Betrag inklusive Ansichts-Multiplikator. */
  money: (n: number) => string;
  pctText: (n: number) => string;
  ofIncomeLabel: string;
  emptyLabel: string;
  closeLabel: string;
  empty: boolean;
};

export function SkewBar({
  segments,
  denominator,
  desktop,
  money,
  pctText,
  ofIncomeLabel,
  emptyLabel,
  closeLabel,
  empty,
}: Props) {
  const vizRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState<Set<string>>(new Set());
  const [tip, setTip] = useState<{ seg: BarSegment; left: number; top: number } | null>(null);

  const layout = useCallback(() => {
    const viz = vizRef.current;
    const bar = barRef.current;
    if (!viz || !bar) return;

    // schmale Segmente markieren
    const next = new Set<string>();
    bar.querySelectorAll<HTMLElement>("[data-seg]").forEach((el) => {
      if (el.offsetWidth < NARROW) next.add(el.dataset.seg as string);
    });
    setNarrow((prev) => {
      if (prev.size === next.size && [...next].every((id) => prev.has(id))) return prev;
      return next;
    });

    if (!desktop) {
      viz.style.marginTop = "";
      viz.style.marginBottom = "";
      return;
    }

    const labels = [
      ...Array.from(topRef.current?.children ?? []),
      ...Array.from(bottomRef.current?.children ?? []),
    ] as HTMLElement[];
    if (!labels.length) {
      viz.style.marginTop = "";
      viz.style.marginBottom = "";
      return;
    }

    // Die Neigung verschiebt die Ober- und Unterkante gegenläufig; ohne
    // Korrektur zeigt die Linie nicht auf die Mitte ihres Segments.
    const shift = (-Math.tan((SKEW_DEG * Math.PI) / 180) * bar.offsetHeight) / 2;
    const centers = new Map<HTMLElement, number>();

    labels.forEach((l) => {
      const seg = bar.querySelector<HTMLElement>(`[data-seg="${CSS.escape(l.dataset.for as string)}"]`);
      if (!seg) return;
      const isTop = l.parentElement === topRef.current;
      const cx = seg.offsetLeft + seg.offsetWidth / 2 + (isTop ? shift : -shift);
      centers.set(l, cx);
      l.style.left = `${cx}px`;
      l.style.transform = "translateX(-50%)";
    });

    let maxTop = 0;
    let maxBottom = 0;

    const process = (side: "top" | "bottom") => {
      const parent = side === "top" ? topRef.current : bottomRef.current;
      const list = (Array.from(parent?.children ?? []) as HTMLElement[])
        .filter((l) => centers.has(l))
        .sort((a, b) => (centers.get(a) as number) - (centers.get(b) as number));

      const lanes: number[] = []; // rechter Rand je Spur
      list.forEach((l) => {
        const w = l.offsetWidth;
        const height = l.offsetHeight;
        const left = (centers.get(l) as number) - w / 2;
        const right = left + w;
        let lane = 0;
        while (lanes[lane] !== undefined && left < lanes[lane] + GAP) lane++;
        lanes[lane] = right;

        const h = BASE + lane * STEP;
        const line = l.querySelector<HTMLElement>("[data-line]");
        if (side === "top") {
          l.style.bottom = `${h}px`;
          maxTop = Math.max(maxTop, h + height);
          if (line) {
            line.style.bottom = `${-(h + 6)}px`;
            line.style.height = `${h}px`;
          }
        } else {
          l.style.top = `${h}px`;
          maxBottom = Math.max(maxBottom, h + height);
          if (line) {
            line.style.top = `${-(h + 6)}px`;
            line.style.height = `${h}px`;
          }
        }
      });
    };

    process("top");
    process("bottom");
    viz.style.marginTop = `${Math.max(150, maxTop + 40)}px`;
    viz.style.marginBottom = `${Math.max(150, maxBottom + 40)}px`;
  }, [desktop]);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(layout);
    return () => cancelAnimationFrame(raf);
  }, [layout, segments, denominator]);

  // Neu ausrichten, wenn sich die Breite ändert (Scrollbar, Drehung, Fonts).
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || typeof ResizeObserver === "undefined") return;
    let lastW = 0;
    const ro = new ResizeObserver(() => {
      const w = bar.offsetWidth;
      if (Math.abs(w - lastW) > 1) {
        lastW = w;
        requestAnimationFrame(layout);
      }
    });
    ro.observe(bar);
    return () => ro.disconnect();
  }, [layout]);

  useEffect(() => {
    if (document.fonts?.ready) void document.fonts.ready.then(() => requestAnimationFrame(layout));
  }, [layout]);

  // Tooltip schließt bei Klick daneben und nach fünf Sekunden.
  useEffect(() => {
    if (!tip) return;
    const t = window.setTimeout(() => setTip(null), 5000);
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-tooltip]")) setTip(null);
    };
    const id = window.setTimeout(() => document.addEventListener("click", onDoc), 0);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(id);
      document.removeEventListener("click", onDoc);
    };
  }, [tip]);

  const openTip = (e: React.MouseEvent | React.KeyboardEvent, seg: BarSegment) => {
    e.stopPropagation();
    const viz = vizRef.current;
    const el = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (!viz) return;
    const vr = viz.getBoundingClientRect();
    const w = Math.min(240, vr.width - 16);
    const left = Math.max(8, Math.min(el.left + el.width / 2 - vr.left - w / 2, vr.width - w - 8));
    setTip({ seg, left, top: el.bottom - vr.top + 12 });
  };

  if (empty) {
    return (
      <div className="px-1 py-6">
        <div
          className="flex h-[120px] items-center justify-center rounded-2xl border-2 border-dashed border-line-strong text-sm font-semibold text-fg-subtle"
          role="img"
          aria-label={emptyLabel}
        >
          {emptyLabel}
        </div>
      </div>
    );
  }

  const visible = segments.filter((s) => s.amount > 0);

  const renderLabel = (s: BarSegment, side: "top" | "bottom") => (
    <div
      key={s.id}
      data-for={s.id}
      className="absolute w-max max-w-[220px] whitespace-nowrap"
      style={side === "top" ? { bottom: BASE } : { top: BASE }}
    >
      <span
        data-line
        aria-hidden
        className="absolute left-1/2 w-px -translate-x-1/2 bg-line-strong"
        style={side === "top" ? { bottom: -(BASE + 6) } : { top: -(BASE + 6) }}
      />
      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-fg-subtle">{s.label}</span>
      <span className={cn("block text-sm font-black tabular-nums", s.deficit ? "text-alert" : "text-fg")}>
        {s.surplus ? (s.deficit ? "−" : "+") : "−"}
        {money(s.amount)}
      </span>
    </div>
  );

  return (
    <div ref={vizRef} className="relative pl-1 pr-7 sm:pr-2">
      <div className="relative w-full">
        {desktop && (
          <div ref={topRef} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full">
            {visible.filter((_, i) => i % 2 === 1).map((s) => renderLabel(s, "top"))}
          </div>
        )}

        <div
          ref={barRef}
          className="flex h-[104px] gap-[3px] sm:h-[120px]"
          style={{ transform: `skewX(${SKEW_DEG}deg)` }}
          role="img"
          aria-label={visible.map((s) => `${s.label}: ${money(s.amount)}`).join(", ")}
        >
          {visible.map((s) => (
            <button
              key={s.id}
              type="button"
              data-seg={s.id}
              data-tooltip
              onClick={(e) => openTip(e, s)}
              aria-label={`${s.label}: ${money(s.amount)} (${pctText(s.amount)})`}
              className={cn(
                "relative overflow-hidden rounded-[3px] transition-[filter,transform] duration-300",
                "hover:brightness-110 focus-visible:z-10",
                s.surplus && !s.deficit && "shadow-[0_0_40px_-6px_rgba(242,255,61,0.8)]",
              )}
              style={{
                width: `${(s.amount / denominator) * 100}%`,
                background: s.color,
                color: s.surplus ? "#0a0a0a" : inkOn(s.color),
              }}
            >
              {!narrow.has(s.id) && (
                <span
                  className="absolute bottom-2 left-3 text-[10px] font-black tabular-nums"
                  style={{ transform: `skewX(${-SKEW_DEG}deg)` }}
                >
                  {s.surplus ? (s.deficit ? "−" : "+") : String(s.index + 1).padStart(2, "0")}
                </span>
              )}
            </button>
          ))}
        </div>

        {desktop && (
          <div ref={bottomRef} aria-hidden className="pointer-events-none absolute inset-x-0 top-full">
            {visible.filter((_, i) => i % 2 === 0).map((s) => renderLabel(s, "bottom"))}
          </div>
        )}
      </div>

      {tip && (
        <div
          data-tooltip
          role="dialog"
          className="absolute z-20 rounded-2xl border border-line bg-surface p-4 shadow-lift"
          style={{ left: tip.left, top: tip.top, width: 240 }}
        >
          <p className="pr-6 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-subtle">{tip.seg.label}</p>
          <p className="mt-1 text-2xl font-black tabular-nums">{money(tip.seg.amount)}</p>
          <p className="mt-0.5 text-xs text-fg-muted">
            {pctText(tip.seg.amount)} {ofIncomeLabel}
          </p>
          <button
            type="button"
            onClick={() => setTip(null)}
            aria-label={closeLabel}
            className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full text-fg-subtle hover:bg-surface-2 hover:text-fg"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
