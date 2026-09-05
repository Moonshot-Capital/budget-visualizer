import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { BudgetBars, Button, CountUp, Eyebrow, StatTile } from "./ui";
import { fmtEUR, fmtPct, INCOME_INPUT_ID, parseAmount, START_SECTION_ID, type Segment } from "../lib/budget";
import { encodeBudget } from "../lib/share";
import { normalize } from "../lib/storage";
import { useI18n } from "../i18n";

type Item = { id: string; label: string; amount: number };

const INCOME_PRESETS = [1800, 2400, 3200, 4275];
const QUICK: [string, number][] = [
  ["Miete", 850],
  ["Essen", 400],
  ["Mobilität", 120],
  ["Internet", 40],
  ["Handy", 25],
  ["Versicherung", 90],
  ["Freizeit", 200],
  ["Gym", 50],
  ["Abos", 30],
  ["Sparen", 300],
];
const QUICK_EN: [string, number][] = [
  ["Rent", 850],
  ["Food", 400],
  ["Mobility", 120],
  ["Internet", 40],
  ["Phone", 25],
  ["Insurance", 90],
  ["Leisure", 200],
  ["Gym", 50],
  ["Subs", 30],
  ["Savings", 300],
];

const uid = () => Math.random().toString(36).slice(2, 9);

function StepBadge({ n, done, active }: { n: number; done: boolean; active: boolean }) {
  return (
    <span
      className={cn(
        "relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black transition-all duration-500",
        done ? "bg-volt text-ink" : active ? "bg-fg text-surface" : "bg-surface-3 text-fg-subtle",
      )}
    >
      {active && !done && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-fg/40" />}
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.svg
            key="check"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            viewBox="0 0 24 24"
            className="relative h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : (
          <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
            {String(n).padStart(2, "0")}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function BudgetStarter() {
  const { home, lang } = useI18n();
  const s = home.starter;
  const reduce = useReducedMotion();

  const [incomeRaw, setIncomeRaw] = useState("");
  const [label, setLabel] = useState("");
  const [amountRaw, setAmountRaw] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const income = parseAmount(incomeRaw);
  const spent = items.reduce((a, e) => a + e.amount, 0);
  const surplus = income - spent;
  const step1 = income > 0;
  const step2 = items.length > 0;
  const done = step1 && step2;
  const quick = lang === "en" ? QUICK_EN : QUICK;

  const segments = useMemo<Segment[]>(() => {
    const segs: Segment[] = items.map((e) => ({ id: e.id, label: e.label, value: e.amount }));
    if (income > 0 && surplus > 0) segs.push({ id: "surplus", label: s.surplusLabel, value: surplus, surplus: true });
    if (segs.length === 0 && income > 0) segs.push({ id: "surplus", label: s.notDistributed, value: income, surplus: true });
    return segs;
  }, [items, income, surplus, s.surplusLabel, s.notDistributed]);

  const biggest = items.length ? [...items].sort((a, b) => b.amount - a.amount)[0] : null;

  const addExpense = (l: string, a: number) => {
    const name = l.trim();
    if (!name) {
      setError(s.errNoName);
      labelRef.current?.focus();
      return;
    }
    if (!(a > 0)) {
      setError(s.errNoAmount);
      amountRef.current?.focus();
      return;
    }
    setError(null);
    setItems((xs) => [...xs, { id: uid(), label: name, amount: a }]);
    setLabel("");
    setAmountRaw("");
    labelRef.current?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addExpense(label, parseAmount(amountRaw));
  };

  const remove = (id: string) => setItems((xs) => xs.filter((x) => x.id !== id));

  /**
   * Übergabe an den Visualizer: Was hier eingetippt wurde, wird als Budget
   * kodiert und im Hash mitgegeben – dieselbe Kodierung wie beim Teilen-Link.
   * `?from=starter` sorgt nur für die passende Meldung drüben.
   */
  const continueInApp = () => {
    const budget = normalize({
      income,
      currency: lang === "en" ? "USD" : "EUR",
      lang,
      job: "",
      expenses: items.map((e) => ({ id: e.id, name: e.label, amount: e.amount })),
    });
    window.location.href = `./app.html?from=starter#b=${encodeBudget(budget)}`;
  };

  return (
    <section id={START_SECTION_ID} className="relative scroll-mt-20 overflow-hidden bg-surface-2 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <motion.div
          className="absolute left-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-volt/40 blur-[110px]"
          animate={reduce ? undefined : { y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl">
            {s.titleA} <span className="text-fg-subtle">{s.titleB}</span>
          </h2>
          <p className="mt-5 text-lg text-fg-muted">{s.lead}</p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[440px_1fr] lg:gap-8">
          {/* Eingaben */}
          <div className="space-y-5">
            <motion.div
              layout
              className={cn(
                "rounded-3xl bg-card p-6 shadow-soft ring-1 transition-all duration-500 sm:p-7",
                step1 ? "ring-volt-deep/60" : "ring-line",
              )}
            >
              <div className="flex items-center gap-3">
                <StepBadge n={1} done={step1} active={!step1} />
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">{s.step1Title}</h3>
                  <p className="text-xs text-fg-subtle">{s.step1Desc}</p>
                </div>
              </div>

              <label htmlFor={INCOME_INPUT_ID} className="mt-5 block text-[11px] font-bold uppercase tracking-[0.18em] text-fg-muted">
                {s.incomeLabel}
              </label>
              <div className="relative mt-2">
                <input
                  id={INCOME_INPUT_ID}
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={s.incomePlaceholder}
                  value={incomeRaw}
                  onChange={(e) => setIncomeRaw(e.target.value)}
                  className="h-14 w-full rounded-2xl border-2 border-line bg-surface-2 px-4 pr-12 text-2xl font-extrabold tracking-tight text-fg transition-all placeholder:font-semibold placeholder:text-fg-subtle/70 focus:border-fg focus:bg-surface focus:shadow-soft focus:outline-none"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-fg-subtle">€</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {INCOME_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setIncomeRaw(String(p))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-bold transition-all hover:-translate-y-0.5",
                      income === p ? "border-fg bg-fg text-surface" : "border-line bg-card text-fg-muted hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {fmtEUR(p)}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.form
              layout
              onSubmit={onSubmit}
              aria-labelledby="step2-title"
              className={cn(
                "rounded-3xl bg-card p-6 shadow-soft ring-1 transition-all duration-500 sm:p-7",
                step2 ? "ring-volt-deep/60" : step1 ? "ring-line-strong" : "ring-line",
              )}
            >
              <div className="flex items-center gap-3">
                <StepBadge n={2} done={step2} active={step1 && !step2} />
                <div>
                  <h3 id="step2-title" className="text-lg font-extrabold tracking-tight">
                    {step2 ? s.step2TitleMore : s.step2TitleFirst}
                  </h3>
                  <p className="text-xs text-fg-subtle">{s.step2Desc}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-[1fr_120px] gap-3">
                <div>
                  <label htmlFor="ausgabe-name" className="block text-[11px] font-bold uppercase tracking-[0.18em] text-fg-muted">
                    {s.nameLabel}
                  </label>
                  <input
                    id="ausgabe-name"
                    ref={labelRef}
                    value={label}
                    autoComplete="off"
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder={s.namePlaceholder}
                    className="mt-2 h-12 w-full rounded-xl border-2 border-line bg-surface-2 px-3.5 text-base font-semibold text-fg transition-all placeholder:text-fg-subtle/70 focus:border-fg focus:bg-surface focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="ausgabe-betrag" className="block text-[11px] font-bold uppercase tracking-[0.18em] text-fg-muted">
                    {s.amountLabel}
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="ausgabe-betrag"
                      ref={amountRef}
                      inputMode="decimal"
                      autoComplete="off"
                      value={amountRaw}
                      onChange={(e) => setAmountRaw(e.target.value)}
                      placeholder="0"
                      className="h-12 w-full rounded-xl border-2 border-line bg-surface-2 px-3.5 pr-8 text-base font-extrabold tabular-nums text-fg transition-all placeholder:text-fg-subtle/70 focus:border-fg focus:bg-surface focus:outline-none"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-fg-subtle">€</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="mt-2 text-xs font-semibold text-alert"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button type="submit" variant="contrast" size="lg" className="mt-4 w-full">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {s.addBtn}
              </Button>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-fg-subtle">{s.quickAdd}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {quick.map(([l, a]) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => addExpense(l, a)}
                    className="group rounded-full border border-line bg-card px-3 py-1.5 text-xs font-bold text-fg transition-all hover:-translate-y-0.5 hover:border-fg hover:bg-fg hover:text-surface active:scale-95"
                  >
                    {l} <span className="text-fg-subtle group-hover:text-surface/60">{a} €</span>
                  </button>
                ))}
              </div>
            </motion.form>
          </div>

          {/* Visualisierung */}
          <div className="lg:sticky lg:top-24">
            <motion.div layout className="relative overflow-hidden rounded-[28px] bg-card p-6 shadow-lift ring-1 ring-line sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-volt/40 blur-3xl" />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg-subtle">{s.cardLabel}</p>
                  <p className="mt-1 text-5xl font-black leading-none tracking-[-0.04em] text-fg sm:text-7xl">
                    <CountUp value={income} duration={600} />
                  </p>
                  <p className="mt-2 text-xs font-semibold text-fg-muted">
                    {step1
                      ? `${s.perMonth} · ${items.length} ${items.length === 1 ? s.categoriesOne : s.categoriesMany}`
                      : s.hintIncomeFirst}
                  </p>
                </div>
                <div className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-fg-muted">
                  {s.live}
                  <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-volt-deep align-middle" />
                </div>
              </div>

              <div className="relative mt-7 min-h-[130px]">
                <AnimatePresence mode="wait">
                  {segments.length ? (
                    <motion.div key="bars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <BudgetBars segments={segments} height={112} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-[112px] items-center justify-center rounded-2xl border-2 border-dashed border-line px-6 text-center"
                    >
                      <p className="text-sm text-fg-subtle">{s.emptyHint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative mt-7 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                <StatTile
                  label={s.statExpenses}
                  value={<CountUp value={spent} duration={500} />}
                  hint={income > 0 ? `${fmtPct(spent / income)} ${s.ofNet}` : "–"}
                />
                <StatTile
                  label={s.statSurplus}
                  highlight={surplus >= 0}
                  className={surplus < 0 ? "bg-alert/10 ring-alert/30" : undefined}
                  value={<CountUp value={income > 0 ? surplus : 0} duration={500} format={(n) => fmtEUR(n, { sign: true })} />}
                  hint={income > 0 ? (surplus >= 0 ? `${fmtEUR(surplus / 30)} ${s.perDayFree}` : s.overspent) : "–"}
                />
                <StatTile
                  label={s.statRate}
                  value={<CountUp value={income > 0 ? Math.max(surplus / income, 0) : 0} duration={500} format={(n) => fmtPct(n, 0)} />}
                  hint={
                    income > 0 && surplus / income >= 0.2
                      ? s.rateStrong
                      : income > 0 && surplus / income >= 0.1
                        ? s.rateOk
                        : s.rateLow
                  }
                />
                <StatTile
                  label={s.statTop}
                  value={<span className="truncate">{biggest?.label ?? "–"}</span>}
                  hint={biggest && income > 0 ? `${fmtEUR(biggest.amount)} · ${fmtPct(biggest.amount / income)}` : "–"}
                />
              </div>

              <AnimatePresence initial={false}>
                {items.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line"
                  >
                    <AnimatePresence initial={false}>
                      {items.map((e, i) => (
                        <motion.li
                          key={e.id}
                          layout
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 16, height: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 26 }}
                          className="flex items-center gap-3 bg-card px-4 py-3"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-[10px] font-black text-white">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-3">
                              <p className="truncate text-[11px] font-bold uppercase tracking-wider text-fg-muted">{e.label}</p>
                              <p className="text-sm font-extrabold tabular-nums">
                                {fmtEUR(e.amount)}{" "}
                                {income > 0 && <span className="text-xs font-semibold text-fg-subtle">{fmtPct(e.amount / income)}</span>}
                              </p>
                            </div>
                            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-3">
                              <motion.div
                                className="h-full rounded-full bg-fg"
                                initial={{ width: 0 }}
                                animate={{ width: `${income > 0 ? Math.min(100, (e.amount / income) * 100) : 0}%` }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(e.id)}
                            aria-label={s.removeLabel(e.label)}
                            className="grid h-7 w-7 place-items-center rounded-md text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden>
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="relative mt-6 overflow-hidden rounded-2xl bg-ink p-5 text-white sm:p-6"
                  >
                    <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-volt/30 blur-2xl" />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-volt">{s.doneKicker}</p>
                        <p className="mt-1 text-lg font-extrabold tracking-tight">{s.doneTitle}</p>
                        <p className="mt-1 text-sm text-white/60">{s.doneDesc}</p>
                      </div>
                      <div className="flex shrink-0">
                        <Button variant="volt" arrow onClick={continueInApp}>
                          {s.doneCta}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
