import { cn } from "../utils/cn";
import { Item, SectionHeading, Stagger } from "./ui";
import { useI18n } from "../i18n";

/**
 * Prinzipien-Sektion.
 * Steht an der Stelle, an der im ersten Entwurf erfundene Testimonials standen.
 * Inhaltlich die Positionierung aus dem Blog – dieselbe Karten-Grid, dieselbe
 * Bildwirkung, nur ohne erfundene Personen.
 */
export function Principles() {
  const { home } = useI18n();

  return (
    <section id="prinzipien" className="relative scroll-mt-20 overflow-hidden bg-surface-2 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_bottom,black_10%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={home.principles.eyebrow}
          title={
            <>
              {home.principles.titleA} <span className="text-fg-subtle">{home.principles.titleB}</span>
            </>
          }
          desc={home.principles.desc}
        />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.principles.cards.map((c) => (
            <Item key={c.title} className={cn(c.big && "md:col-span-2 lg:col-span-2")}>
              <article
                className={cn(
                  "group relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift",
                  c.big ? "bg-ink text-white" : "bg-card ring-1 ring-line",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl text-lg font-black",
                    c.big ? "bg-volt text-ink" : "bg-surface-2 text-fg-subtle",
                  )}
                >
                  ×
                </span>
                <h3
                  className={cn(
                    "mt-5 font-extrabold tracking-tight",
                    c.big ? "text-2xl sm:text-3xl" : "text-lg",
                  )}
                >
                  {c.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 leading-relaxed",
                    c.big ? "text-base text-white/60 sm:text-lg" : "text-[15px] text-fg-muted",
                  )}
                >
                  {c.text}
                </p>
                {c.big && (
                  <span
                    aria-hidden
                    className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-volt/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
                  />
                )}
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
