import { GRAYS, RED, YELLOW, shade } from "./ramp";
import type { BarSegment, Budget, Totals } from "./types";

export { GRAYS };

/* ---------------------------------------------------------------------------
   Landingpage-Demo
   Der Starter auf der Startseite rechnet in Euro und braucht keinen State.
   Diese Helfer bleiben bewusst simpel und unabhängig vom App-Budget.
--------------------------------------------------------------------------- */

export type Segment = {
  id: string;
  label: string;
  value: number;
  surplus?: boolean;
};

export const fmtEUR = (n: number, opts: { sign?: boolean } = {}) => {
  const abs = Math.abs(Math.round(n));
  const formatted = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(abs) + " €";
  if (opts.sign) return (n < 0 ? "–" : "+") + formatted;
  return (n < 0 ? "–" : "") + formatted;
};

export const fmtPct = (ratio: number, digits = 1) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(ratio * 100) +
  " %";

export const parseAmount = (raw: string) => {
  const cleaned = raw.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

export const INCOME_INPUT_ID = "einkommen-input";
export const START_SECTION_ID = "start";

/** Bringt den Besucher zum Starter-Widget und fokussiert das Einkommensfeld. */
export function startBudget() {
  const section = document.getElementById(START_SECTION_ID);
  const input = document.getElementById(INCOME_INPUT_ID) as HTMLInputElement | null;
  if (section) {
    const top = section.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
  window.setTimeout(() => {
    input?.focus({ preventScroll: true });
    input?.select();
  }, 650);
}

/* ---------------------------------------------------------------------------
   App-Berechnungen
--------------------------------------------------------------------------- */

export function totals(budget: Budget): Totals {
  const totalExpenses = budget.expenses.reduce((s, e) => s + e.amount, 0);
  const balance = budget.income - totalExpenses;
  return {
    totalExpenses,
    balance,
    isDeficit: balance < 0,
    rate: budget.income > 0 ? balance / budget.income : 0,
  };
}

/**
 * Alle Balkenabschnitte inklusive Saldo-Segment.
 * `balanceLabel` kommt von außen, damit dieses Modul nichts über i18n weiß.
 */
export function barSegments(budget: Budget, dark: boolean, balanceLabel: string): BarSegment[] {
  const { balance, isDeficit } = totals(budget);
  const items: BarSegment[] = budget.expenses.map((e, i) => ({
    id: e.id,
    label: e.name,
    amount: e.amount,
    index: i,
    color: shade(i, dark),
    surplus: false,
    deficit: false,
  }));
  items.push({
    id: "__balance",
    label: balanceLabel,
    amount: Math.abs(balance),
    index: items.length,
    color: isDeficit ? RED : YELLOW,
    surplus: true,
    deficit: isDeficit,
  });
  return items;
}

/**
 * Bezugsgröße des Balkens. Im Defizit ist die Summe der Ausgaben größer als
 * das Einkommen – dann skaliert der Balken auf die Ausgaben, damit das
 * Defizit-Segment sichtbar bleibt.
 */
export function barDenominator(budget: Budget): number {
  const { totalExpenses } = totals(budget);
  return Math.max(budget.income, totalExpenses, 1);
}

export function largestExpense(budget: Budget) {
  return [...budget.expenses].sort((a, b) => b.amount - a.amount)[0] ?? null;
}
