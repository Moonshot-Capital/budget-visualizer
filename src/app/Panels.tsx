import { useRef, useState, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/ui";
import type { Dict } from "../i18n/de";
import type { Budget, Lang } from "../lib/types";
import { QUICK_ADD } from "../lib/storage";

export const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "PLN", "SEK", "NOK", "DKK", "CZK", "CAD", "AUD"];

export function Card({
  title,
  desc,
  children,
  action,
  className,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-7", className)}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
          {desc && <p className="mt-1 text-xs text-fg-subtle">{desc}</p>}
        </div>
        {action}
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[11px] font-bold uppercase tracking-[0.18em] text-fg-muted">
        {label}
      </label>
      <div className="relative mt-2">{children}</div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border-2 border-line bg-surface-2 px-3.5 text-base font-semibold text-fg placeholder:text-fg-subtle/70 transition-all focus:border-fg focus:bg-surface focus:outline-none";

/* ------------------------------------------------------------------ Profil */

export function ProfileCard({
  budget,
  t,
  currencySymbol,
  onIncome,
  onAnnual,
  onJob,
  onCurrency,
}: {
  budget: Budget;
  t: Dict;
  currencySymbol: string;
  onIncome: (v: number) => void;
  onAnnual: (v: number | "") => void;
  onJob: (v: string) => void;
  onCurrency: (v: string) => void;
}) {
  return (
    <Card title={t.app.profileTitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.app.jobLabel} htmlFor="job">
          <input
            id="job"
            value={budget.job}
            maxLength={40}
            placeholder={t.app.jobPlaceholder}
            onChange={(e) => onJob(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label={t.app.currencyLabel} htmlFor="currency">
          <select
            id="currency"
            value={budget.currency}
            onChange={(e) => onCurrency(e.target.value)}
            className={cn(inputCls, "appearance-none pr-9")}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-fg-subtle">
            ▾
          </span>
        </Field>

        <Field label={t.app.incomeLabel} htmlFor="income">
          <input
            id="income"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={budget.income || ""}
            onChange={(e) => onIncome(parseFloat(e.target.value) || 0)}
            className={cn(inputCls, "pr-9 text-lg font-extrabold tabular-nums")}
          />
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-fg-subtle">
            {currencySymbol}
          </span>
        </Field>

        <Field label={t.app.salaryLabel} htmlFor="annual">
          <input
            id="annual"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            placeholder={t.app.salaryPlaceholder}
            value={budget.annualSalary === "" ? "" : budget.annualSalary}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              onAnnual(Number.isFinite(v) ? v : "");
            }}
            className={cn(inputCls, "pr-9 tabular-nums")}
          />
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-fg-subtle">
            {currencySymbol}
          </span>
        </Field>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------ Neue Ausgabe */

export function ExpenseForm({
  t,
  lang,
  currencySymbol,
  onAdd,
  autoFocus,
}: {
  t: Dict;
  lang: Lang;
  currencySymbol: string;
  onAdd: (name: string, amount: number) => void;
  autoFocus?: boolean;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) {
      nameRef.current?.focus();
      return;
    }
    const a = parseFloat(amount);
    if (!Number.isFinite(a) || a < 0) {
      amountRef.current?.focus();
      return;
    }
    onAdd(n, a);
    setName("");
    setAmount("");
    nameRef.current?.focus();
  };

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-[1fr_150px]">
        <Field label={t.app.expenseNameLabel} htmlFor="expense-name">
          <input
            id="expense-name"
            ref={nameRef}
            autoFocus={autoFocus}
            value={name}
            maxLength={60}
            autoComplete="off"
            placeholder={t.app.expenseNamePlaceholder}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.app.expenseAmountLabel} htmlFor="expense-amount">
          <input
            id="expense-amount"
            ref={amountRef}
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={amount}
            autoComplete="off"
            placeholder="0"
            onChange={(e) => setAmount(e.target.value)}
            className={cn(inputCls, "pr-9 font-extrabold tabular-nums")}
          />
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-fg-subtle">
            {currencySymbol}
          </span>
        </Field>
      </div>

      <Button type="submit" variant="contrast" size="lg" className="mt-4 w-full">
        {t.app.addExpenseBtn}
      </Button>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-fg-subtle">{t.app.quickAddDesc}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {QUICK_ADD[lang].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setName(c);
              amountRef.current?.focus();
            }}
            className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-bold text-fg transition-all hover:-translate-y-0.5 hover:border-fg hover:bg-fg hover:text-surface active:scale-95"
          >
            {c}
          </button>
        ))}
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- Exporte */

export function ExportCard({
  t,
  busy,
  onPdf,
  onStories,
  onShare,
  onReset,
}: {
  t: Dict;
  busy: string | null;
  onPdf: () => void;
  onStories: () => void;
  onShare: () => void;
  onReset: () => void;
}) {
  return (
    <Card title={t.app.exportTitle} desc={t.app.exportDesc}>
      <div className="flex flex-wrap gap-2">
        <Button variant="volt" onClick={onPdf} disabled={busy !== null}>
          {busy === "pdf" ? t.app.exporting : t.app.btnPdf}
        </Button>
        <Button variant="contrast" onClick={onStories} disabled={busy !== null}>
          {busy === "ig" ? t.app.exporting : t.app.btnIg}
        </Button>
        <Button variant="ghost" onClick={onShare} disabled={busy !== null}>
          {t.app.btnShare}
        </Button>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <p className="text-xs text-fg-subtle">{t.app.offlineNote}</p>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-fg-subtle underline underline-offset-4 transition-colors hover:text-alert"
        >
          {t.app.resetBtn}
        </button>
      </div>
    </Card>
  );
}
