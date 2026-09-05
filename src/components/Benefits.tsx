import { cn } from "../utils/cn";
import { Item, Reveal, SectionHeading, Stagger } from "./ui";
import { useI18n } from "../i18n";

function Cell({ v, strong, yes, no }: { v: string | boolean; strong?: boolean; yes: string; no: string }) {
  if (typeof v === "string")
    return <span className={cn("text-sm font-semibold", strong ? "text-fg" : "text-fg-subtle")}>{v}</span>;
  return v ? (
    <span
      className={cn(
        "inline-grid h-6 w-6 place-items-center rounded-full",
        strong ? "bg-volt text-ink" : "bg-surface-3 text-fg",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-label={yes}>
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  ) : (
    <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-surface-2 text-fg-subtle">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-label={no}>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

export function Benefits() {
  const { home } = useI18n();
  const b = home.benefits;

  return (
    <section id="vorteile" className="relative scroll-mt-20 bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={b.eyebrow}
          align="left"
          title={
            <>
              {b.titleA} <span className="text-fg-subtle">{b.titleB}</span>
            </>
          }
          desc={b.desc}
        />

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
          {b.cards.map((c, i) => (
            <Item key={c.title}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8",
                  i === 0 ? "bg-ink text-white" : i === 1 ? "bg-volt text-ink" : "border border-line bg-surface-2 text-fg",
                )}
              >
                <p className={cn("text-5xl font-black tracking-[-0.04em] sm:text-6xl", i === 0 && "text-volt")}>
                  {c.kpi}
                </p>
                <h3 className="mt-6 text-xl font-extrabold tracking-tight">{c.title}</h3>
                <p
                  className={cn(
                    "mt-3 text-[15px] leading-relaxed",
                    i === 0 ? "text-white/60" : i === 1 ? "text-ink/70" : "text-fg-muted",
                  )}
                >
                  {c.desc}
                </p>
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150",
                    i === 0 ? "bg-volt/30" : i === 1 ? "bg-white/50" : "bg-volt/40",
                  )}
                />
              </article>
            </Item>
          ))}
        </Stagger>

        <Reveal className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <caption className="sr-only">{b.tableCaption}</caption>
                <thead>
                  <tr className="border-b border-line text-[11px] font-bold uppercase tracking-[0.18em] text-fg-subtle">
                    <th scope="col" className="px-6 py-5 font-bold">
                      &nbsp;
                    </th>
                    <th scope="col" className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-volt" /> {b.colUs}
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-5 font-bold">
                      {b.colExcel}
                    </th>
                    <th scope="col" className="px-6 py-5 font-bold">
                      {b.colBank}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, i) => (
                    <tr
                      key={r.label}
                      className={cn(
                        "border-b border-line transition-colors hover:bg-surface-2",
                        i === b.rows.length - 1 && "border-b-0",
                      )}
                    >
                      <th scope="row" className="px-6 py-4 text-sm font-semibold text-fg">
                        {r.label}
                      </th>
                      <td className="px-6 py-4">
                        <Cell v={r.us} strong yes={b.yes} no={b.no} />
                      </td>
                      <td className="px-6 py-4">
                        <Cell v={r.excel} yes={b.yes} no={b.no} />
                      </td>
                      <td className="px-6 py-4">
                        <Cell v={r.bank} yes={b.yes} no={b.no} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
