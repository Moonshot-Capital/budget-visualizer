import { motion, useReducedMotion } from "framer-motion";
import { Button, Reveal } from "./ui";
import { startBudget } from "../lib/budget";
import { useI18n } from "../i18n";

export function CTA() {
  const { home, t } = useI18n();
  const reduce = useReducedMotion();
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] bg-volt px-6 py-16 text-center text-ink sm:px-12 sm:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <motion.div
              className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/50 blur-3xl"
              animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-ink/10 blur-3xl"
              animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* decorative skewed bars */}
            <div className="absolute inset-x-0 bottom-0 flex h-10 gap-[3px] opacity-90 sm:h-14" style={{ transform: "skewX(-14deg)" }}>
              {[34, 16, 13, 12, 10, 5, 3, 2].map((w, i) => (
                <motion.div
                  key={i}
                  className="rounded-t-[3px]"
                  style={{ background: ["#0a0a0a", "#2e2e2e", "#4a4a4a", "#666", "#848484", "#a3a3a3", "#c1c1c1", "#d9d9d9"][i] }}
                  initial={{ flexGrow: 0 }}
                  whileInView={{ flexGrow: w }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 100, damping: 20 }}
                />
              ))}
              <div className="flex-[5]" />
            </div>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink/60">{home.cta.kicker}</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {home.cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
              {home.cta.desc}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="ink" arrow onClick={startBudget} className="min-w-[240px]">
                {t.common.ctaPrimary}
              </Button>
              <span className="text-sm font-semibold text-ink/60">{t.common.freeLine}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
