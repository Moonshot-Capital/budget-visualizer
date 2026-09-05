import { useState } from "react";
import { Item, Reveal, Stagger } from "../components/ui";
import { useI18n } from "../i18n";
import { Card, PageShell } from "../shared/PageShell";

export function SupportPage() {
  const { t, lang } = useI18n();
  const [shared, setShared] = useState(false);

  const shareSite = async () => {
    const url = new URL("index.html", window.location.href).href;
    const text = lang === "de" ? "Budget Visualizer – sieh, wohin dein Geld geht." : t.common.tagline;
    try {
      if (navigator.share) {
        await navigator.share({ title: t.common.brand, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      /* abgebrochen oder nicht verfügbar */
    }
  };

  return (
    <PageShell eyebrow={t.support.eyebrow} title={t.support.title} intro={t.support.intro}>
      <Stagger className="grid gap-4 sm:grid-cols-3">
        <Item>
          <a
            href="./feedback.html"
            className="group flex h-full flex-col rounded-3xl bg-volt p-6 text-ink transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <h2 className="text-lg font-extrabold tracking-tight">{t.support.cardFeedbackTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.support.cardFeedbackDesc}</p>
            <span className="mt-5 text-sm font-bold">→</span>
          </a>
        </Item>
        <Item>
          <button
            type="button"
            onClick={shareSite}
            className="group flex h-full flex-col rounded-3xl border border-line bg-card p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <h2 className="text-lg font-extrabold tracking-tight">{t.support.cardShareTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t.support.cardShareDesc}</p>
            <span className="mt-5 text-sm font-bold">{shared ? t.support.shared : t.support.cardShareBtn} →</span>
          </button>
        </Item>
        <Item>
          <div className="relative flex h-full flex-col rounded-3xl border border-dashed border-line-strong bg-surface-2 p-6">
            <span className="absolute right-5 top-5 rounded-full bg-fg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-surface">
              {t.support.soon}
            </span>
            <h2 className="text-lg font-extrabold tracking-tight text-fg-muted">{t.support.cardDonateTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{t.support.cardDonateDesc}</p>
          </div>
        </Item>
      </Stagger>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <h2 className="text-xl font-extrabold tracking-tight">{t.support.useTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.support.useItems.map((i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt-deep" />
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full">
            <h2 className="text-xl font-extrabold tracking-tight">{t.support.principleTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.support.principleItems.map((i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-1 h-4 w-4 shrink-0 text-volt-deep"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </PageShell>
  );
}
