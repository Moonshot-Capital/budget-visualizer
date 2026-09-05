import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../utils/cn";
import { Button, Reveal, SectionHeading } from "./ui";
import { startBudget } from "../lib/budget";
import { useI18n } from "../i18n";

export function FAQ() {
  const { home, t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 bg-surface-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={home.faq.eyebrow}
              title={
                <>
                  {home.faq.titleA} <span className="text-fg-subtle">{home.faq.titleB}</span>
                </>
              }
              desc={home.faq.desc}
            />
            <Reveal delay={0.2} className="mt-8">
              <Button variant="contrast" arrow onClick={startBudget}>
                {t.common.ctaTry}
              </Button>
            </Reveal>
          </div>

          <ul className="space-y-3">
            {home.faq.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.05} as="li">
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                      isOpen ? "border-line-strong shadow-soft" : "border-line hover:border-line-strong",
                    )}
                  >
                    <h3>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-btn-${i}`}
                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                      >
                        <span className="text-base font-extrabold tracking-tight sm:text-lg">{f.q}</span>
                        <span
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                            isOpen ? "rotate-45 bg-volt text-ink" : "bg-surface-3 text-fg",
                          )}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden>
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-btn-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="px-6 pb-6 text-[15px] leading-relaxed text-fg-muted">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
