import { Reveal } from "./ui";
import { useI18n } from "../i18n";

/**
 * Vertrauensleiste.
 * Ersetzt die ursprünglichen Presse-Logos, Nutzerzahlen und Sterne-Bewertungen –
 * die gab es nicht. Stattdessen laufen hier die Eigenschaften durch, die das
 * Produkt tatsächlich einlöst, plus vier nachprüfbare Zahlen.
 */
export function Proof() {
  const { home } = useI18n();
  const items = home.proof.marquee;

  return (
    <section aria-label={home.proof.kicker} className="relative border-y border-line bg-surface py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-fg-subtle">
            {home.proof.kicker}
          </p>
        </Reveal>

        <div className="mask-fade-x relative mt-7 overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 pr-14 hover:[animation-play-state:paused]">
            {[...items, ...items].map((l, i) => (
              <span
                key={l + i}
                className="whitespace-nowrap text-lg font-black uppercase tracking-tight text-fg/25 transition-colors hover:text-fg"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {home.proof.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="relative text-center lg:text-left">
              <dd className="text-3xl font-black tracking-[-0.03em] text-fg sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-fg-muted">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
