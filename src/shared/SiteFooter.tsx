import { Logo } from "../components/ui";
import { useI18n } from "../i18n";
import { LangToggle, ThemeToggle } from "./Toggles";
import { GITHUB_URL } from "../config";

/** Fußzeile aller Seiten. Enthält ausschließlich Links, die es wirklich gibt. */
export function SiteFooter({ onPrimary }: { onPrimary?: () => void }) {
  const { t } = useI18n();

  const cols = [
    {
      title: t.footer.colProduct,
      links: [
        { label: t.nav.app, href: "./app.html" },
        { label: t.nav.howItWorks, href: "./how-it-works.html" },
        { label: t.nav.sections.features, href: "./index.html#funktionen" },
        { label: t.nav.sections.price, href: "./index.html#preis" },
      ],
    },
    {
      title: t.footer.colResources,
      links: [
        { label: t.nav.blog, href: "./blog.html" },
        { label: t.nav.sections.faq, href: "./index.html#faq" },
        { label: t.nav.sections.principles, href: "./index.html#prinzipien" },
      ],
    },
    {
      title: t.footer.colProject,
      links: [
        { label: t.nav.feedback, href: "./feedback.html" },
        { label: t.nav.support, href: "./support.html" },
        { label: t.nav.legal, href: "./legal.html" },
        ...(GITHUB_URL ? [{ label: t.footer.openSource, href: GITHUB_URL }] : []),
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{t.footer.about}</p>
            <button
              onClick={() => (onPrimary ? onPrimary() : (window.location.href = "./app.html"))}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-volt transition-colors hover:text-white"
            >
              {t.common.ctaPrimary}
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
            </button>
            <div className="mt-8 flex items-center gap-2">
              <LangToggle dark />
              <ThemeToggle dark />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-volt">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {t.common.brand}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" /> {t.footer.noTracking}
            </span>
            <a href="./legal.html" className="hover:text-white">
              {t.nav.legal}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
