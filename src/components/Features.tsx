import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Item, SectionHeading, Stagger } from "./ui";
import { useI18n } from "../i18n";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* Icons und Layout gehören zur Gestaltung, nicht zum Text – deshalb stehen sie
   hier und nicht im Wörterbuch. Reihenfolge = Reihenfolge der Texte. */
const ICONS = [
  "M4 16l5-5 3 3 7-8M15 6h4v4",
  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  "M12 5v14M5 12h14",
  "M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3",
];
const SPANS = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

export function Features() {
  const { home } = useI18n();

  const visuals: (ReactNode | null)[] = [
    <div key="bars" className="mt-6 flex h-14 gap-[3px]" style={{ transform: "skewX(-14deg)" }} aria-hidden>
      {[38, 16, 13, 12, 10, 5, 3, 2].map((w, i) => (
        <motion.div
          key={i}
          className="rounded-[3px]"
          style={{ background: ["#0a0a0a", "#2e2e2e", "#4a4a4a", "#666", "#848484", "#a3a3a3", "#c1c1c1", "#d9d9d9"][i] }}
          initial={{ flexGrow: 0 }}
          whileInView={{ flexGrow: w }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 120, damping: 20 }}
        />
      ))}
      <motion.div
        className="rounded-[3px] bg-volt"
        initial={{ flexGrow: 0 }}
        whileInView={{ flexGrow: 6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>,
    null,
    null,
    null,
    null,
    <div key="chips" className="mt-6 flex flex-wrap gap-2" aria-hidden>
      {home.features.exportChips.map((l, i) => (
        <span
          key={l}
          className={cn(
            "rounded-lg px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider",
            i === 0 ? "bg-volt text-ink" : i === 1 ? "bg-ink text-white" : "border border-line-strong text-fg",
          )}
        >
          {l}
        </span>
      ))}
    </div>,
  ];

  return (
    <section id="funktionen" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={home.features.eyebrow}
          title={
            <>
              {home.features.titleA}
              <br className="hidden sm:block" /> <span className="text-fg-subtle">{home.features.titleB}</span>
            </>
          }
          desc={home.features.desc}
        />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.features.items.map((f, i) => (
            <Item key={f.title} className={cn("group", SPANS[i])}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-volt/0 blur-3xl transition-all duration-700 group-hover:bg-volt/50"
                />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-volt group-hover:text-ink">
                    <Icon d={ICONS[i]} />
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight">{f.title}</h3>
                </div>
                <p className="relative mt-4 text-[15px] leading-relaxed text-fg-muted">{f.desc}</p>
                {visuals[i] && <div className="relative mt-auto">{visuals[i]}</div>}
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
