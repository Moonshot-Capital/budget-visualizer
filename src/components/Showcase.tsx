import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { BudgetBars, Button, Reveal, SectionHeading } from "./ui";
import { fmtEUR, fmtPct, startBudget, type Segment } from "../lib/budget";
import { useI18n } from "../i18n";

export function Showcase() {
  const { home } = useI18n();
  const s = home.showcase;
  const [tab, setTab] = useState(0);

  const income = s.demoIncome;
  const items = s.demoItems;
  const spent = items.reduce((a, [, v]) => a + v, 0);
  const surplus = income - spent;
  const segments: Segment[] = [
    ...items.map(([label, value]) => ({ id: label, label, value })),
    { id: "surplus", label: s.mock.surplus, value: surplus, surplus: true },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTab((v) => (v + 1) % s.steps.length), 6000);
    return () => clearInterval(timer);
  }, [s.steps.length]);

  return (
    <section id="so-funktionierts" className="relative scroll-mt-20 overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <motion.div
          className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-volt/20 blur-[140px]"
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow={s.eyebrow}
          title={
            <>
              {s.titleA} <span className="text-white/40">{s.titleB}</span>
            </>
          }
          desc={s.desc}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
          <ol className="space-y-2" aria-label={s.eyebrow}>
            {s.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} as="li">
                <button
                  onClick={() => setTab(i)}
                  aria-current={tab === i ? "step" : undefined}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-500",
                    tab === i ? "glass-dark" : "hover:bg-white/5",
                  )}
                >
                  {tab === i && (
                    <motion.span
                      layoutId="step-indicator"
                      className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-volt"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <span className={cn("text-xs font-black tabular-nums transition-colors", tab === i ? "text-volt" : "text-white/30")}>
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/55">{step.desc}</p>
                    </div>
                  </div>
                  {tab === i && (
                    <motion.span
                      key={`bar-${i}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-volt/40"
                    />
                  )}
                </button>
              </Reveal>
            ))}
            <li className="pt-4">
              <Reveal delay={0.3}>
                <Button variant="volt" arrow onClick={startBudget}>
                  {s.cta}
                </Button>
              </Reveal>
            </li>
          </ol>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-white/20 via-transparent to-volt/30 blur-sm" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl bg-card text-fg shadow-lift">
                <div className="flex items-center gap-3 border-b border-line bg-surface-3 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                  </div>
                  <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center rounded-md bg-card text-[11px] font-semibold text-fg-subtle ring-1 ring-line">
                    budget-visualizer
                  </div>
                </div>

                <div className="min-h-[420px] p-5 sm:p-7">
                  <AnimatePresence mode="wait">
                    {tab === 0 && (
                      <motion.div key="t0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                        <h4 className="text-2xl font-black uppercase tracking-tight">{s.mock.profileTitle}</h4>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <MockField label={s.mock.job} value={s.mock.jobValue} />
                          <MockField label={s.mock.currency} value={s.mock.currencyValue} />
                          <MockField label={s.mock.income} value={String(income)} suffix="€" typing />
                          <MockField label={s.mock.annual} value="" placeholder={s.mock.annualPlaceholder} suffix="€" />
                        </div>
                        <div className="mt-8 rounded-2xl bg-surface-2 p-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg-subtle">{s.mock.budget}</p>
                          <p className="mt-1 text-5xl font-black tracking-[-0.04em] sm:text-6xl">{fmtEUR(income)}</p>
                          <p className="mt-2 text-xs font-semibold text-fg-muted">{s.mock.perMonth}</p>
                        </div>
                      </motion.div>
                    )}

                    {tab === 1 && (
                      <motion.div key="t1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-2xl font-black uppercase tracking-tight">{s.mock.expensesTitle}</h4>
                            <p className="text-xs text-fg-subtle">{s.mock.itemsMeta(items.length, fmtEUR(spent))}</p>
                          </div>
                          <span className="hidden rounded-md border-2 border-line-strong px-3 py-1.5 text-[10px] font-extrabold uppercase sm:block">
                            {s.mock.sortBtn}
                          </span>
                        </div>
                        <ul className="mt-5 space-y-2">
                          {items.slice(0, 6).map(([l, v], i) => (
                            <motion.li
                              key={l}
                              initial={{ opacity: 0, x: -14 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + i * 0.09 }}
                              className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-2.5"
                            >
                              <span className="grid h-6 w-6 place-items-center rounded bg-ink text-[10px] font-black text-white">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-baseline justify-between">
                                  <span className="truncate text-[11px] font-bold uppercase tracking-wider text-fg-muted">{l}</span>
                                  <span className="text-sm font-extrabold tabular-nums">
                                    {fmtEUR(v)} <span className="text-xs font-semibold text-fg-subtle">{fmtPct(v / income)}</span>
                                  </span>
                                </div>
                                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-3">
                                  <motion.div
                                    className="h-full bg-fg"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(v / income) * 100}%` }}
                                    transition={{ delay: 0.3 + i * 0.09, duration: 0.6 }}
                                  />
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {tab === 2 && (
                      <motion.div key="t2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg-subtle">{s.mock.budget}</p>
                            <p className="text-5xl font-black tracking-[-0.04em] sm:text-6xl">{fmtEUR(income)}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-left">
                            <div className="rounded-xl border-2 border-line-strong px-3 py-2">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-fg-subtle">{s.mock.expenses}</p>
                              <p className="text-lg font-black">{fmtEUR(spent)}</p>
                            </div>
                            <div className="rounded-xl bg-volt px-3 py-2 text-ink">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-ink/60">{s.mock.surplus}</p>
                              <p className="text-lg font-black">{fmtEUR(surplus, { sign: true })}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8">
                          <BudgetBars segments={segments} height={96} />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                          {home.features.exportChips.map((chip, i) => (
                            <span
                              key={chip}
                              className={cn(
                                "rounded-lg px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wider",
                                i === 0 ? "bg-volt text-ink" : i === 1 ? "bg-ink text-white" : "border-2 border-line-strong text-fg",
                              )}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MockField({
  label,
  value,
  placeholder,
  suffix,
  typing,
}: {
  label: string;
  value: string;
  placeholder?: string;
  suffix?: string;
  typing?: boolean;
}) {
  const [shown, setShown] = useState(typing ? "" : value);
  useEffect(() => {
    if (!typing) return;
    let i = 0;
    setShown("");
    const timer = setInterval(() => {
      i++;
      setShown(value.slice(0, i));
      if (i >= value.length) clearInterval(timer);
    }, 140);
    return () => clearInterval(timer);
  }, [typing, value]);

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fg-muted">{label}</p>
      <div
        className={cn(
          "relative mt-1.5 flex h-11 items-center rounded-lg border-2 px-3 text-sm font-bold",
          typing ? "border-fg bg-card" : "border-line-strong bg-surface-2",
        )}
      >
        {shown ? <span>{shown}</span> : <span className="text-fg-subtle">{placeholder}</span>}
        {typing && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-fg" />}
        {suffix && <span className="absolute right-3 text-fg-subtle">{suffix}</span>}
      </div>
    </div>
  );
}
