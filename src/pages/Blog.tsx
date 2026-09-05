import { useEffect, useState } from "react";
import { Item, Reveal, Stagger } from "../components/ui";
import { useI18n, type Article } from "../i18n";
import { Card, PageShell } from "../shared/PageShell";

/** Artikel-Auswahl über den Hash – so bleiben Deep-Links teilbar. */
function useHashSlug(): [string | null, (slug: string | null) => void] {
  const [slug, setSlug] = useState<string | null>(() => window.location.hash.slice(1) || null);

  useEffect(() => {
    const onHash = () => setSlug(window.location.hash.slice(1) || null);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (next: string | null) => {
    if (next) window.location.hash = next;
    else {
      history.replaceState(null, "", window.location.pathname);
      setSlug(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [slug, go];
}

function Body({ article }: { article: Article }) {
  return (
    <div className="mt-8 space-y-5">
      {article.blocks.map((b, i) => {
        if (b.t === "h2")
          return (
            <h2 key={i} className="pt-4 text-xl font-extrabold tracking-tight sm:text-2xl">
              {b.text}
            </h2>
          );
        if (b.t === "p")
          return (
            <p key={i} className="text-[17px] leading-relaxed text-fg-muted">
              {b.text}
            </p>
          );
        if (b.t === "note")
          return (
            <div key={i} className="rounded-2xl border-l-4 border-volt-deep bg-surface-2 p-5">
              <p className="text-[15px] font-semibold leading-relaxed text-fg">{b.text}</p>
            </div>
          );
        return (
          <ul key={i} className="space-y-3">
            {b.items.map((it) => (
              <li key={it.text} className="flex gap-3 text-[17px] leading-relaxed text-fg-muted">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt-deep" />
                <span>
                  {it.lead && <strong className="font-extrabold text-fg">{it.lead} – </strong>}
                  {it.text}
                </span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export function BlogPage() {
  const { t, articles } = useI18n();
  const [slug, go] = useHashSlug();
  const article = articles.find((a) => a.slug === slug) ?? null;

  if (article) {
    return (
      <PageShell
        eyebrow={article.category}
        title={article.title}
        documentTitle={article.title}
        intro={`${article.date} · ${t.blog.minutes(article.minutes)}`}
      >
        <Reveal>
          <Body article={article} />
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <a
            href="./app.html"
            className="inline-flex h-12 items-center rounded-full bg-volt px-6 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            {t.common.ctaPrimary} →
          </a>
          <button
            type="button"
            onClick={() => go(null)}
            className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-bold text-fg-muted transition-colors hover:text-fg"
          >
            {t.blog.back}
          </button>
        </Reveal>
      </PageShell>
    );
  }

  return (
    <PageShell title={t.blog.title} intro={t.blog.intro}>
      <Stagger className="grid gap-4">
        {articles.map((a) => (
          <Item key={a.slug}>
            <Card className="transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-fg-subtle">
                <span className="rounded-full bg-surface-3 px-2.5 py-1">{a.category}</span>
                <span>{a.date}</span>
                <span>· {t.blog.minutes(a.minutes)}</span>
              </div>
              <h2 className="mt-4 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                <a href={`#${a.slug}`} className="transition-colors hover:text-fg-muted">
                  {a.title}
                </a>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{a.teaser}</p>
              <a
                href={`#${a.slug}`}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-fg"
              >
                {t.blog.readMore}
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
            </Card>
          </Item>
        ))}
      </Stagger>
    </PageShell>
  );
}
