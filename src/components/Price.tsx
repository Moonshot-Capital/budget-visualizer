import { Button, Reveal, SectionHeading } from "./ui";
import { startBudget } from "../lib/budget";
import { useI18n } from "../i18n";

/**
 * Preis-Sektion.
 * Ersetzt die ursprünglichen Tarife „Pro“ (4 €) und „Gemeinsam“ (7 €) samt
 * Geräte-Sync und Fairness-Split – Funktionen, die es nicht gibt und für die
 * es keinen Zahlungsanbieter gibt.
 */
export function Price() {
  const { home } = useI18n();

  return (
    <section id="preis" className="relative scroll-mt-20 bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={home.price.eyebrow}
          title={
            <>
              {home.price.titleA} <span className="text-fg-subtle">{home.price.titleB}</span>
            </>
          }
          desc={home.price.desc}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[28px] bg-ink p-8 text-white sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/25 blur-3xl"
              />
              <div className="relative flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-volt">{home.price.planName}</p>
                  <p className="mt-3 text-7xl font-black leading-none tracking-[-0.05em]">{home.price.planPrice}</p>
                  <p className="mt-2 text-sm text-white/50">{home.price.planPeriod}</p>
                </div>
                <Button variant="volt" size="lg" arrow onClick={startBudget}>
                  {home.price.cta}
                </Button>
              </div>

              <ul className="relative mt-10 grid gap-3 sm:grid-cols-2">
                {home.price.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-white/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-volt">
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
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-[28px] border-2 border-volt-deep bg-volt/15 p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                  {home.price.betaTitle}
                </p>
                <p className="mt-3 text-lg font-extrabold leading-snug tracking-tight text-fg">
                  {home.price.betaText}
                </p>
                <a
                  href="./feedback.html"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-fg"
                >
                  {home.price.betaCta}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>

              <div className="flex flex-1 flex-col justify-between rounded-[28px] border border-line bg-surface-2 p-7">
                <p className="text-[15px] leading-relaxed text-fg-muted">{home.price.supportText}</p>
                <a
                  href="./support.html"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-fg"
                >
                  {home.price.supportCta}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
