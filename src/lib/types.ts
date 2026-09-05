export type Lang = "de" | "en";
export type ThemePref = "auto" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";
export type View = "month" | "year";

export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type Budget = {
  income: number;
  annualSalary: number | "";
  currency: string;
  lang: Lang;
  job: string;
  theme: ThemePref;
  view: View;
  expenses: Expense[];
};

/** Ein Balkenabschnitt der App – entweder eine Ausgabe oder der Saldo.
    (Die Landingpage-Demo nutzt den schlankeren `Segment`-Typ aus lib/budget.) */
export type BarSegment = {
  id: string;
  /** Anzeigename. */
  label: string;
  amount: number;
  /** Laufende Nummer der Ausgabe (0-basiert); beim Saldo-Segment die Länge der Liste. */
  index: number;
  color: string;
  /** true beim Überschuss-/Defizit-Segment. */
  surplus: boolean;
  deficit: boolean;
};

export type Totals = {
  totalExpenses: number;
  balance: number;
  isDeficit: boolean;
  /** Sparquote als Anteil (0.2 = 20 %). */
  rate: number;
};
