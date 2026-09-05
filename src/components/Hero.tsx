import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BudgetBars, Button, CountUp, Eyebrow, StatTile } from "./ui";
import { fmtEUR, fmtPct, startBudget, type Segment } from "../lib/budget";
import { useI18n } from "../i18n";

export function Hero() {
  const { home, t } = useI18n();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  const examples = home.hero.examples;
  const ex = examples[idx];
  const spent = ex.items.reduce((a, [, v]) => a + v, 0);
  const surplus = ex.income - spent;

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % examples.length), 5200);
    return () => clearInterval(timer);
  }, [reduce, examples.length]);

  const segments: Segment[] = [
    ...ex.items.map(([label, value]) => ({ id: label, label, value })),
    ...(surplus > 0 ? [{ id: "surplus", label: home.hero.surplusLabel, value: surplus, surplus: true }] : []),
  ];

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <motion.div
          className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-volt/40 blur-[120px]"
          animate={reduce ? undefined : { scale: [1, 1.08, 1], x: ["-50%", "-46%", "-50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] top-[35%] h-[380px] w-[380px] rounded-full bg-fg/5 blur-[100px]"
          animate={reduce ? undefined : { y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <Eyebrow>{home.hero.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mt-6 text-balance text-[44px] font-black leading-[0.98] tracking-[-0.04em] text-fg sm:text-6xl lg:text-[76px]"
          >
            {home.hero.titleLine1}
            <br />
            {home.hero.titleLine2}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{home.hero.titleHighlight}</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-[-2%] bottom-[6%] -z-0 h-[32%] origin-left -skew-x-12 rounded-sm bg-volt"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
          >
            {home.hero.lead}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button size="lg" variant="volt" arrow shine onClick={startBudget} className="sm:min-w-[240px]">
              {t.common.ctaPrimary}
            </Button>
            <a
              href="#so-funktionierts"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-5 text-base font-bold text-fg transition-colors hover:text-fg-muted"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface transition-all group-hover:border-line-strong group-hover:bg-volt">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {home.hero.secondaryCta}
            </a>
          </motion.div>

          {/* Nachprüfbare Aussagen statt erfundener Bewertungen. */}
          <motion.ul
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-muted"
          >
            {[home.hero.factPrivacy, home.hero.factSpeed].map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-volt">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="#0a0a0a"
                    strokeWidth={3.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-xs font-semibold">{fact}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative [perspective:1400px]"
        >
          <div className="relative animate-float-slow">
            <div className="glass relative overflow-hidden rounded-[28px] p-5 shadow-lift sm:p-7">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-volt/50 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                    {home.hero.cardLabel}
                  </p>
                  <p className="mt-1 text-[44px] font-black leading-none tracking-[-0.04em] text-fg sm:text-[56px]">
                    <CountUp value={ex.income} />
                  </p>
                  <motion.p
                    key={ex.who}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs font-semibold text-fg-muted"
                  >
                    {ex.who} · {ex.items.length} {home.hero.cardCategories}
                  </motion.p>
                </div>
                <div className="flex rounded-full border border-line bg-surface/70 p-0.5 text-[10px] font-extrabold uppercase">
                  <span className="rounded-full bg-fg px-2.5 py-1 text-surface">{t.app.viewMonth}</span>
                  <span className="px-2.5 py-1 text-fg-subtle">{t.app.viewYear}</span>
                </div>
              </div>

              <div className="relative mt-6">
                <BudgetBars segments={segments} height={104} compact />
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <StatTile
                  label={t.app.kpiExpenses}
                  value={<CountUp value={spent} />}
                  hint={`${fmtPct(spent / ex.income)} ${home.starter.ofNet}`}
                />
                <StatTile
                  label={home.hero.surplusLabel}
                  highlight
                  value={<CountUp value={surplus} format={(n) => fmtEUR(n, { sign: true })} />}
                  hint={`${fmtEUR(surplus / 30)} ${home.starter.perDayFree}`}
                />
                <StatTile
                  label={t.app.kpiRate}
                  className="col-span-2 sm:col-span-1"
                  value={<CountUp value={surplus / ex.income} format={(n) => fmtPct(n, 0)} />}
                  hint={surplus / ex.income >= 0.1 ? home.starter.rateOk : home.starter.rateLow}
                />
              </div>

              <div className="relative mt-5 flex items-center justify-center gap-1.5" role="tablist" aria-label={home.hero.examplesLabel}>
                {examples.map((e, i) => (
                  <button
                    key={e.who}
                    role="tab"
                    aria-selected={i === idx}
                    aria-label={e.who}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-7 bg-fg" : "w-1.5 bg-fg/20 hover:bg-fg/40"}`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 160, damping: 18 }}
              className="absolute -right-3 top-10 hidden rounded-2xl bg-ink px-4 py-3 text-white shadow-lift sm:block"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">{home.hero.badgeTop}</p>
              <motion.p key={ex.items[0][0]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-extrabold">
                {ex.items[0][0]} · {fmtPct(ex.items[0][1] / ex.income)}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 160, damping: 18 }}
              className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-lift ring-1 ring-line sm:flex"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-volt">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-volt" />
                <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="none" stroke="#0a0a0a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold text-fg">{home.hero.badgeLiveTitle}</p>
                <p className="text-[11px] text-fg-subtle">{home.hero.badgeLiveDesc}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
