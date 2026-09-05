import { type ReactNode } from "react";
import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useI18n } from "../i18n";
import { Eyebrow, Reveal } from "../components/ui";

/** Rahmen der Inhaltsseiten: Kopfzeile, Hero, Inhalt, Fußzeile. */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
  documentTitle,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  documentTitle?: string;
}) {
  const { t, lang } = useI18n();

  useEffect(() => {
    document.title = `${documentTitle ?? title} – ${t.common.brand}`;
  }, [documentTitle, title, t.common.brand, lang]);

  return (
    <div className="min-h-screen bg-surface font-sans text-fg">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-surface"
      >
        {title}
      </a>
      <SiteHeader variant="page" />

      <main id="inhalt">
        <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          />
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Reveal>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <h1 className="mt-5 text-balance text-4xl font-black leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</p>}
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}

/** Karte im Stil der Landingpage – Grundbaustein der Inhaltsseiten. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-8 ${className}`}>{children}</div>
  );
}
