import { useState } from "react";
import { Item, Reveal, Stagger } from "../components/ui";
import { useI18n } from "../i18n";
import { Card, PageShell } from "../shared/PageShell";
import { CONTACT_EMAIL } from "../config";

const mailto = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function ActionCard({
  title,
  desc,
  href,
  onClick,
  accent,
}: {
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  const cls =
    "group flex h-full flex-col rounded-3xl p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-lift " +
    (accent ? "bg-volt text-ink" : "border border-line bg-card text-fg");
  const inner = (
    <>
      <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
      <p className={"mt-2 text-sm leading-relaxed " + (accent ? "text-ink/70" : "text-fg-muted")}>{desc}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
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
      </span>
    </>
  );
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function FeedbackPage() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(t.feedback.mailFeedbackBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Zwischenablage nicht verfügbar – Nutzer kann den Text markieren */
    }
  };

  return (
    <PageShell eyebrow={t.feedback.eyebrow} title={t.feedback.title} intro={t.feedback.intro}>
      <Stagger className="grid gap-4 sm:grid-cols-3">
        <Item>
          <ActionCard
            accent
            title={t.feedback.cardFeedbackTitle}
            desc={t.feedback.cardFeedbackDesc}
            href={mailto(t.feedback.mailFeedbackSubject, t.feedback.mailFeedbackBody)}
          />
        </Item>
        <Item>
          <ActionCard
            title={t.feedback.cardBugTitle}
            desc={t.feedback.cardBugDesc}
            href={mailto(t.feedback.mailBugSubject, t.feedback.mailBugBody)}
          />
        </Item>
        <Item>
          <ActionCard
            title={copied ? t.feedback.copied : t.feedback.cardCopyTitle}
            desc={t.feedback.cardCopyDesc}
            onClick={copyTemplate}
          />
        </Item>
      </Stagger>

      <Reveal className="mt-10">
        <Card>
          <h2 className="text-xl font-extrabold tracking-tight">{t.feedback.questionsTitle}</h2>
          <ol className="mt-5 space-y-3">
            {t.feedback.questions.map((q, i) => (
              <li key={q} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-fg text-[11px] font-black text-surface">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-[15px] leading-relaxed text-fg-muted">{q}</span>
              </li>
            ))}
          </ol>
        </Card>
      </Reveal>

      <Reveal className="mt-6">
        <div className="rounded-2xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-fg-muted">
          {t.feedback.privacyNote}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-fg underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </div>
      </Reveal>
    </PageShell>
  );
}
