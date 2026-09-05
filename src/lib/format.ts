import type { Lang, View } from "./types";

export const localeOf = (lang: Lang): string => (lang === "en" ? "en-US" : "de-DE");

/** Währungsformat, standardmäßig ohne Nachkommastellen (wie in v4). */
export function money(n: number, currency: string, lang: Lang, digits = 0): string {
  return new Intl.NumberFormat(localeOf(lang), {
    style: "currency",
    currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(n);
}

/** Nur das Währungszeichen – für die Suffixe in den Eingabefeldern. */
export function currencySymbol(currency: string, lang: Lang): string {
  return money(0, currency, lang).replace(/[0-9.,\s ]/g, "");
}

export function percentText(value: number, income: number, lang: Lang, digits = 1): string {
  const ratio = income > 0 ? (value / income) * 100 : 0;
  return new Intl.NumberFormat(localeOf(lang), { maximumFractionDigits: digits }).format(ratio) + " %";
}

/** Monatsansicht = 1, Jahresansicht = 12. */
export const viewMultiplier = (view: View): number => (view === "year" ? 12 : 1);

/** Formatierer, den Komponenten einmal aus dem State bauen und weiterreichen. */
export type Money = (n: number, digits?: number) => string;

export const makeMoney =
  (currency: string, lang: Lang): Money =>
  (n, digits = 0) =>
    money(n, currency, lang, digits);
