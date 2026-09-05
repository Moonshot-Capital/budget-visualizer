import { Reveal } from "../components/ui";
import { useI18n } from "../i18n";
import { Card, PageShell } from "../shared/PageShell";

export function LegalPage() {
  const { t } = useI18n();

  return (
    <PageShell title={t.legal.title} intro={t.legal.intro}>
      <Reveal>
        <div className="rounded-2xl border-2 border-volt-deep bg-volt/15 p-5">
          <p className="text-sm font-semibold leading-relaxed text-fg">{t.legal.placeholderWarning}</p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Card>
          <h2 className="text-2xl font-extrabold tracking-tight">{t.legal.imprintTitle}</h2>
          <dl className="mt-6 space-y-4">
            {t.legal.imprintFields.map(([label, value]) => (
              <div key={label} className="grid gap-1 sm:grid-cols-[220px_1fr] sm:gap-4">
                <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-fg-subtle sm:pt-1">{label}</dt>
                <dd className="whitespace-pre-line text-[15px] leading-relaxed text-fg-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Reveal>

      <Reveal className="mt-8">
        <h2 className="text-2xl font-extrabold tracking-tight">{t.legal.privacyTitle}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{t.legal.privacyIntro}</p>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {t.legal.privacyBlocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.05}>
            <Card className="h-full">
              <h3 className="text-base font-extrabold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{b.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
