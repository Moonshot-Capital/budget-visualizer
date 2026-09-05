import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { fmtEUR, GRAYS, type Segment } from "../lib/budget";

/* ---------------------------------- Reveal --------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h2" | "h3";
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView="show"
      viewport={{ once, margin: "-80px 0px -60px 0px" }}
      variants={{
        hidden: fadeUp.hidden,
        show: {
          ...(fadeUp.show as object),
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px 0px -40px 0px" }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/* --------------------------------- Button ---------------------------------- */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "volt" | "ink" | "contrast" | "ghost" | "white";
  size?: "md" | "lg" | "sm";
  arrow?: boolean;
  shine?: boolean;
};

export function Button({
  variant = "ink",
  size = "md",
  arrow = false,
  shine = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold tracking-tight transition-all duration-300 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-9 px-4 text-[13px]",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-14 px-7 text-base",
        variant === "volt" && "bg-volt text-ink shadow-volt hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-10px_rgba(217,232,0,0.7)]",
        variant === "ink" && "bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-lift",
        // dreht mit dem Theme: im Hellen schwarz, im Dunkeln hell.
        variant === "contrast" && "bg-fg text-surface hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift",
        variant === "white" && "bg-surface text-fg hover:-translate-y-0.5 hover:shadow-lift",
        variant === "ghost" && "border border-line bg-surface/60 text-fg backdrop-blur hover:border-line-strong hover:bg-surface",
        className,
      )}
    >
      {shine && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70 animate-shine"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </span>
    </button>
  );
}

/* ------------------------------ Section heading ---------------------------- */

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
        dark ? "border-white/15 bg-white/5 text-white/80" : "border-line bg-surface/70 text-fg-muted",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-volt ring-2 ring-volt/30" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Stagger className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow && (
        <Item>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Item>
      )}
      <Item>
        <h2
          className={cn(
            "mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl",
            dark ? "text-white" : "text-fg",
          )}
        >
          {title}
        </h2>
      </Item>
      {desc && (
        <Item>
          <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/60" : "text-fg-muted")}>{desc}</p>
        </Item>
      )}
    </Stagger>
  );
}

/* ---------------------------------- Logo ----------------------------------- */

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-volt shadow-[0_0_0_1px_rgba(10,10,10,0.9)_inset]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#0a0a0a" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 16l5-5 3 3 7-8" />
          <path d="M15 6h4v4" />
        </svg>
      </span>
      <span className={cn("text-[15px] font-extrabold uppercase tracking-tight", dark ? "text-white" : "text-fg")}>
        Budget <span className={dark ? "text-white/50" : "text-fg-subtle"}>Visualizer</span>
      </span>
    </span>
  );
}

/* --------------------------------- CountUp --------------------------------- */

export function CountUp({
  value,
  format = (n: number) => fmtEUR(n),
  duration = 900,
  className,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const from = prev.current;
    const to = value;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduce, inView]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(display)}
    </span>
  );
}

/* -------------------------------- BudgetBars ------------------------------- */

export function BudgetBars({
  segments,
  height = 120,
  className,
  compact = false,
  onDark = false,
}: {
  segments: Segment[];
  height?: number;
  className?: string;
  compact?: boolean;
  onDark?: boolean;
}) {
  const total = segments.reduce((a, s) => a + Math.max(s.value, 0), 0) || 1;
  let gi = 0;
  const colored = segments.map((s) => {
    const color = s.surplus ? "#f2ff3d" : GRAYS[Math.min(gi++, GRAYS.length - 1)];
    return { ...s, color };
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="px-3">
        <div className="flex gap-[3px]" style={{ height, transform: "skewX(-14deg)" }} role="img" aria-label="Budget-Verteilung">
          {colored.map((s, i) => {
            const share = Math.max(s.value, 0) / total;
            const light = ["#f2ff3d", "#c1c1c1", "#d9d9d9", "#e8e8e8", "#a3a3a3"].includes(s.color);
            return (
              <motion.div
                key={s.id}
                layout
                initial={{ flexGrow: 0, opacity: 0 }}
                animate={{ flexGrow: share, opacity: 1 }}
                exit={{ flexGrow: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.8 }}
                style={{ background: s.color, flexBasis: 0, minWidth: share > 0 ? 6 : 0 }}
                className={cn(
                  "relative overflow-hidden rounded-[3px]",
                  s.surplus && "shadow-[0_0_40px_-6px_rgba(242,255,61,0.9)]",
                )}
                title={`${s.label}: ${fmtEUR(s.value)}`}
              >
                {!compact && share > 0.06 && (
                  <span
                    className={cn(
                      "absolute bottom-2 left-3 text-[10px] font-extrabold tabular-nums",
                      light ? "text-ink" : "text-white/90",
                    )}
                    style={{ transform: "skewX(14deg)" }}
                  >
                    {s.surplus ? "+" : String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      {!compact && (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 px-3">
          {colored.map((s) => (
            <li key={s.id} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-[2px] ring-1 ring-black/10" style={{ background: s.color }} />
              <span className={cn("font-semibold uppercase tracking-wide", onDark ? "text-white/60" : "text-fg-muted")}>
                {s.label}
              </span>
              <span className={cn("font-bold tabular-nums", s.surplus ? (onDark ? "text-volt" : "text-[#6b7500]") : onDark ? "text-white" : "text-fg")}>
                {s.surplus ? fmtEUR(s.value, { sign: true }) : fmtEUR(-s.value)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------------------------- Stat ----------------------------------- */

export function StatTile({
  label,
  value,
  hint,
  highlight,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 transition-colors duration-300 sm:p-5",
        highlight ? "bg-volt text-ink" : "bg-surface/70 ring-1 ring-line",
        className,
      )}
    >
      <p className={cn("text-[10px] font-bold uppercase tracking-[0.18em]", highlight ? "text-ink/70" : "text-fg-subtle")}>
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-[28px]">{value}</p>
      {hint && <p className={cn("mt-1 text-xs", highlight ? "text-ink/70" : "text-fg-subtle")}>{hint}</p>}
    </div>
  );
}
