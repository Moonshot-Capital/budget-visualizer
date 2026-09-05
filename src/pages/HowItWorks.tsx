import { Button, Item, Reveal, Stagger } from "../components/ui";
import { useI18n } from "../i18n";
import { Card, PageShell } from "../shared/PageShell";

export function HowItWorksPage() {
  const { t } = useI18n();

  return (
    <PageShell eyebrow={t.nav.howItWorks} title={t.howItWorks.title} intro={t.howItWorks.intro}>
      <Stagger className="grid gap-4 sm:grid-cols-3">
        {t.howItWorks.steps.map((s, i) => (
          <Item key={s.n}>
            <article
              className={
                "relative h-full overflow-hidden rounded-3xl p-6 sm:p-7 " +
                (i === 0
                  ? "bg-ink text-white"
                  : i === 1
                    ? "bg-volt text-ink"
                    : "border border-line bg-surface-2 text-fg")
              }
            >
              <p className={"text-4xl font-black tracking-[-0.04em] " + (i === 0 ? "text-volt" : "")}>{s.n}</p>
              <h2 className="mt-5 text-xl font-extrabold tracking-tight">{s.title}</h2>
              <p
                className={
                  "mt-3 text-[15px] leading-relaxed " +
                  (i === 0 ? "text-white/60" : i === 1 ? "text-ink/70" : "text-fg-muted")
                }
              >
                {s.desc}
              </p>
            </article>
          </Item>
        ))}
      </Stagger>

      <Reveal className="mt-16">
        <h2 className="text-2xl font-extrabold tracking-tight">{t.howItWorks.detailsTitle}</h2>
      </Reveal>

      <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
        {t.howItWorks.details.map((d) => (
          <Item key={d.title}>
            <Card className="h-full">
              <h3 className="text-base font-extrabold tracking-tight">{d.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{d.body}</p>
            </Card>
          </Item>
        ))}
      </Stagger>

      <Reveal className="mt-12">
        <Button variant="volt" size="lg" arrow onClick={() => (window.location.href = "./app.html")}>
          {t.howItWorks.cta}
        </Button>
      </Reveal>
    </PageShell>
  );
}
