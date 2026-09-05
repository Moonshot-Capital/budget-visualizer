import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useI18n } from "../i18n";
import { SiteHeader } from "../shared/SiteHeader";
import { SiteFooter } from "../shared/SiteFooter";
import { useBudget, useIsDesktop, useToast } from "../app/state";
import { SkewBar } from "../app/SkewBar";
import { Legend } from "../app/Legend";
import { ExpenseList } from "../app/ExpenseList";
import { Card, ExpenseForm, ExportCard, ProfileCard } from "../app/Panels";
import { BottomSheet, MobileBar, Toast } from "../app/Mobile";
import { barDenominator, barSegments, largestExpense, totals } from "../lib/budget";
import { currencySymbol as symbolOf, localeOf, makeMoney, percentText, viewMultiplier } from "../lib/format";
import { shareUrl } from "../lib/share";
import { downloadPdfReport } from "../export/pdf";
import { exportStories } from "../export/story";
import type { ExportContext } from "../export/canvas";
import type { Expense } from "../lib/types";

function KpiTile({
  label,
  value,
  note,
  tone = "plain",
  className,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "plain" | "volt" | "alert";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 transition-colors duration-300 sm:p-5",
        tone === "volt" && "bg-volt text-ink",
        tone === "alert" && "bg-alert text-white",
        tone === "plain" && "border border-line bg-card",
        className,
      )}
    >
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.18em]",
          tone === "plain" ? "text-fg-subtle" : tone === "volt" ? "text-ink/70" : "text-white/70",
        )}
      >
        {label}
      </p>
      <p className="mt-1.5 truncate text-2xl font-extrabold tracking-tight tabular-nums sm:text-[28px]">{value}</p>
      {note && (
        <p
          className={cn(
            "mt-1 truncate text-xs",
            tone === "plain" ? "text-fg-subtle" : tone === "volt" ? "text-ink/70" : "text-white/70",
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}

export function VisualizerPage() {
  const { t, lang, setLang, theme, themePref } = useI18n();
  const { budget, dispatch, reset, loadedFrom, clearSource, linkLang } = useBudget(lang, themePref);
  const desktop = useIsDesktop();
  const { toast, show, hide } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const money = useMemo(() => makeMoney(budget.currency, lang), [budget.currency, lang]);
  const symbol = useMemo(() => symbolOf(budget.currency, lang), [budget.currency, lang]);
  const m = viewMultiplier(budget.view);
  const sums = totals(budget);
  const pct = useCallback((n: number) => percentText(n, budget.income, lang), [budget.income, lang]);
  const balanceLabel = sums.isDeficit ? t.app.deficit : t.app.surplus;

  const segments = useMemo(
    () => barSegments(budget, theme === "dark", balanceLabel),
    [budget, theme, balanceLabel],
  );
  const denominator = barDenominator(budget);
  const top = largestExpense(budget);
  const ratePct = Math.round(sums.rate * 100);

  useEffect(() => {
    document.title = `${t.nav.app} – ${t.common.brand}`;
  }, [t]);

  // Geteilter Link bringt seine Sprache mit, solange der Besucher keine eigene hat.
  useEffect(() => {
    if (linkLang && linkLang !== lang) setLang(linkLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkLang]);

  // Hinweis, wenn das Budget aus einem Link oder vom Starter kam.
  useEffect(() => {
    if (!loadedFrom) return;
    const id = window.setTimeout(() => {
      show(loadedFrom === "starter" ? t.app.loadedFromStarter : t.app.loadedFromLink);
      clearSource();
    }, 400);
    return () => window.clearTimeout(id);
  }, [loadedFrom, show, clearSource, t]);

  const exportContext = (): ExportContext => ({
    budget,
    strings: {
      surplus: t.app.surplus,
      deficit: t.app.deficit,
      kpiExpenses: t.app.kpiExpenses,
      kpiRate: t.app.kpiRate,
      report: t.app.report,
      monthly: t.app.monthly,
      yearly: t.app.yearly,
      netIncome: t.app.netIncome,
      totalExpenses: t.app.totalExpenses,
      budgetBreakdown: t.app.budgetBreakdown,
      yourExpensesCaps: t.app.yourExpensesCaps,
      total: t.app.total,
      expenseCategories: t.app.expenseCategories,
    },
    money: (n) => money(n),
    pctText: pct,
    multiplier: m,
    dateString: new Date().toLocaleDateString(localeOf(lang)),
  });

  const runExport = async (kind: "pdf" | "ig", fn: () => Promise<void>) => {
    setBusy(kind);
    try {
      await document.fonts?.ready;
      await fn();
    } catch {
      show(t.app.exportFailed);
    } finally {
      setBusy(null);
    }
  };

  const addExpense = (name: string, amount: number) => {
    dispatch({ type: "add", name, amount });
    setSheetOpen(false);
  };

  const removeExpense = (id: string) => {
    const index = budget.expenses.findIndex((e) => e.id === id);
    if (index < 0) return;
    const expense: Expense = budget.expenses[index];
    dispatch({ type: "remove", id });
    if (editingId === id) setEditingId(null);
    show(t.app.deleted(expense.name), t.app.undo, () => dispatch({ type: "restore", index, expense }));
  };

  const startEdit = (id: string | null) => {
    setEditingId(id);
    if (id) listRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const copyShareLink = async () => {
    const url = shareUrl(budget);
    try {
      if (navigator.share && !desktop) {
        await navigator.share({ title: t.common.brand, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      show(t.app.linkCopied);
    } catch {
      show(t.app.linkFailed);
    }
  };

  const doReset = () => {
    if (!window.confirm(t.app.resetConfirm)) return;
    reset(lang, themePref);
    setEditingId(null);
    show(t.app.resetDone);
  };

  const empty = !budget.income || budget.income <= 0;

  return (
    <div className="min-h-screen bg-surface font-sans text-fg">
      <SiteHeader variant="app" />

      <main id="inhalt" className="pb-32 lg:pb-0">
        {/* ------------------------------------------------------------ Hero */}
        <section className="relative overflow-hidden pt-28 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          />
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                  {budget.job || t.app.report}
                </p>
                <h1 className="mt-1 text-[52px] font-black leading-none tracking-[-0.04em] tabular-nums sm:text-7xl">
                  {money(budget.income * m)}
                </h1>
                <p className="mt-2 text-xs font-semibold text-fg-muted">
                  {budget.view === "year" ? t.app.heroSubYear : t.app.heroSubMonth} ·{" "}
                  {t.app.categories(budget.expenses.length)}
                </p>
              </div>

              <div
                className="flex rounded-full border border-line bg-surface-2 p-0.5 text-[11px] font-extrabold uppercase"
                role="group"
                aria-label={`${t.app.viewMonth} / ${t.app.viewYear}`}
              >
                {(["month", "year"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => dispatch({ type: "view", value: v })}
                    aria-pressed={budget.view === v}
                    className={cn(
                      "rounded-full px-4 py-2 transition-all",
                      budget.view === v ? "bg-fg text-surface" : "text-fg-subtle hover:text-fg",
                    )}
                  >
                    {v === "month" ? t.app.viewMonth : t.app.viewYear}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              <KpiTile
                label={t.app.kpiExpenses}
                value={money(sums.totalExpenses * m)}
                note={budget.income > 0 ? `${pct(sums.totalExpenses)} ${t.app.ofIncome}` : undefined}
              />
              <KpiTile
                label={balanceLabel}
                tone={sums.isDeficit ? "alert" : "volt"}
                value={`${sums.isDeficit ? "−" : "+"}${money(Math.abs(sums.balance) * m)}`}
                note={
                  sums.isDeficit
                    ? `${pct(Math.abs(sums.balance))} ${t.app.overBudget}`
                    : `${money(sums.balance / 30.44)} ${t.app.perDay}`
                }
              />
              <KpiTile
                label={t.app.kpiRate}
                value={`${ratePct} %`}
                note={
                  ratePct >= 20
                    ? t.app.rateGood
                    : ratePct >= 10
                      ? t.app.rateOk
                      : ratePct > 0
                        ? t.app.rateLow
                        : t.app.rateNeg
                }
              />
              <KpiTile
                label={t.app.kpiTop}
                value={top ? top.name : t.app.none}
                note={top ? `${money(top.amount * m)} · ${pct(top.amount)}` : undefined}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- Balken */}
        <section className="mx-auto mt-10 max-w-7xl px-5 sm:mt-14 sm:px-8">
          <SkewBar
            segments={segments}
            denominator={denominator}
            desktop={desktop}
            money={(n) => money(n * m)}
            pctText={pct}
            ofIncomeLabel={t.app.ofIncome}
            emptyLabel={t.app.emptyBar}
            closeLabel={t.common.close}
            empty={empty}
          />

          {!desktop && !empty && (
            <Legend
              segments={segments}
              denominator={denominator}
              money={(n) => money(n * m)}
              pctText={pct}
              onPick={startEdit}
            />
          )}
        </section>

        {/* ----------------------------------------------------------- Editor */}
        <section className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 sm:px-8 lg:mt-20 lg:grid-cols-2">
          <div className="space-y-5">
            <ProfileCard
              budget={budget}
              t={t}
              currencySymbol={symbol}
              onIncome={(v) => dispatch({ type: "income", value: v })}
              onAnnual={(v) => dispatch({ type: "annual", value: v })}
              onJob={(v) => dispatch({ type: "job", value: v })}
              onCurrency={(v) => dispatch({ type: "currency", value: v })}
            />

            <div className="hidden lg:block">
              <Card title={t.app.newExpenseTitle}>
                <ExpenseForm t={t} lang={lang} currencySymbol={symbol} onAdd={addExpense} />
              </Card>
            </div>
          </div>

          <div className="space-y-5" ref={listRef}>
            <Card
              title={t.app.yourExpensesTitle}
              desc={t.app.listMeta(budget.expenses.length, money(sums.totalExpenses))}
              action={
                <button
                  type="button"
                  disabled={budget.expenses.length < 2}
                  onClick={() => {
                    dispatch({ type: "sort" });
                    show(t.app.sorted);
                  }}
                  className="rounded-full border border-line px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-fg-muted transition-colors hover:border-fg hover:text-fg disabled:opacity-40 disabled:hover:border-line disabled:hover:text-fg-muted"
                >
                  {t.app.sortBtn}
                </button>
              }
            >
              <ExpenseList
                expenses={budget.expenses}
                dark={theme === "dark"}
                t={t}
                money={money}
                pctText={pct}
                currencySymbol={symbol}
                editingId={editingId}
                onEdit={startEdit}
                onSave={(id, name, amount) => {
                  dispatch({ type: "update", id, name, amount });
                  setEditingId(null);
                }}
                onMove={(from, to) => dispatch({ type: "move", from, to })}
                onRemove={removeExpense}
              />
            </Card>

            <ExportCard
              t={t}
              busy={busy}
              onPdf={() => runExport("pdf", () => downloadPdfReport(exportContext()))}
              onStories={() => runExport("ig", () => exportStories(exportContext(), desktop))}
              onShare={copyShareLink}
              onReset={doReset}
            />
          </div>
        </section>
      </main>

      <div className="mt-20">
        <SiteFooter />
      </div>

      <MobileBar
        label={balanceLabel}
        value={`${sums.isDeficit ? "−" : "+"}${money(Math.abs(sums.balance) * m)}`}
        isDeficit={sums.isDeficit}
        addLabel={t.app.fabAdd}
        onAdd={() => setSheetOpen(true)}
      />

      <BottomSheet
        open={sheetOpen}
        title={t.app.newExpenseTitle}
        closeLabel={t.common.close}
        onClose={() => setSheetOpen(false)}
      >
        <ExpenseForm t={t} lang={lang} currencySymbol={symbol} onAdd={addExpense} autoFocus />
      </BottomSheet>

      <Toast state={toast} onDismiss={hide} />
    </div>
  );
}
