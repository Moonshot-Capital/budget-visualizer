import type { Budget, Expense, Lang } from "./types";

export const STORAGE_KEY = "myBudget";

export const uid = (): string => Math.random().toString(36).slice(2, 9);

/* Bekannte Kategorien in beiden Sprachen – beim Sprachwechsel werden Posten,
   die exakt einem Paar entsprechen, mit übersetzt (Verhalten aus v4). */
export const CATEGORY_PAIRS: [string, string][] = [
  ["Wohnen", "Housing"],
  ["Freizeit & Lifestyle", "Leisure & Lifestyle"],
  ["Fortbildungen", "Education"],
  ["Studienkredit", "Student Loan"],
  ["Essen", "Food"],
  ["Mobilität", "Mobility"],
  ["Versicherungen & Sonstiges", "Insurance & Misc"],
  ["Kleidung & Körperpflege", "Clothing"],
  ["Miete", "Rent"],
  ["Internet", "Internet"],
  ["Handy", "Phone"],
  ["Versicherung", "Insurance"],
  ["Freizeit", "Leisure"],
  ["Auto", "Car"],
  ["Gym", "Gym"],
  ["Abos", "Subs"],
  ["Abo", "Subs"],
  ["Sparen", "Savings"],
];

/** Vorschlags-Chips im Formular „Neue Ausgabe“. */
export const QUICK_ADD: Record<Lang, string[]> = {
  de: ["Miete", "Essen", "Mobilität", "Internet", "Handy", "Versicherung", "Freizeit", "Gym", "Abos", "Sparen"],
  en: ["Rent", "Food", "Mobility", "Internet", "Phone", "Insurance", "Leisure", "Gym", "Subs", "Savings"],
};

const DEMO_EXPENSES: Record<Lang, [string, number][]> = {
  de: [
    ["Wohnen", 1500],
    ["Freizeit & Lifestyle", 600],
    ["Fortbildungen", 535],
    ["Studienkredit", 500],
    ["Essen", 450],
    ["Mobilität", 200],
    ["Versicherungen & Sonstiges", 100],
    ["Kleidung & Körperpflege", 80],
  ],
  en: [
    ["Housing", 1500],
    ["Leisure & Lifestyle", 600],
    ["Education", 535],
    ["Student Loan", 500],
    ["Food", 450],
    ["Mobility", 200],
    ["Insurance & Misc", 100],
    ["Clothing", 80],
  ],
};

/** Sprache des Browsers, sonst Deutsch (die Seite ist deutschsprachig). */
export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "de";
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "de";
}

export function defaultBudget(lang: Lang = detectLang()): Budget {
  return {
    income: 4275,
    annualSalary: 51300,
    currency: lang === "en" ? "USD" : "EUR",
    lang,
    job: "",
    theme: "auto",
    view: "month",
    expenses: DEMO_EXPENSES[lang].map(([name, amount]) => ({ id: uid(), name, amount })),
  };
}

/**
 * Bringt einen beliebigen (auch alten oder kaputten) Datensatz in eine gültige
 * Form. Übernimmt die Migration aus v1/v2: fehlende IDs, Theme, Ansicht.
 */
export function normalize(input: Partial<Budget> | null | undefined, lang?: Lang): Budget {
  const base = defaultBudget(lang ?? (input?.lang === "en" || input?.lang === "de" ? input.lang : undefined));
  const out: Budget = { ...base, ...(input ?? {}) } as Budget;

  if (out.lang !== "de" && out.lang !== "en") out.lang = base.lang;
  if (out.view !== "month" && out.view !== "year") out.view = "month";
  if (out.theme !== "auto" && out.theme !== "light" && out.theme !== "dark") out.theme = "auto";
  if (typeof out.currency !== "string" || !out.currency) out.currency = base.currency;

  out.income = Number(out.income) || 0;
  out.job = String(out.job ?? "").slice(0, 40);

  const annual = Number(out.annualSalary);
  out.annualSalary = Number.isFinite(annual) && annual > 0 ? annual : "";

  out.expenses = (Array.isArray(out.expenses) ? out.expenses : []).map(
    (e): Expense => ({
      id: e?.id || uid(),
      name: String(e?.name ?? "").slice(0, 60),
      amount: Math.max(0, Number(e?.amount) || 0),
    }),
  );

  return out;
}

function safeParse(raw: string | null): Partial<Budget> | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Partial<Budget>;
  } catch {
    return null;
  }
}

export function loadBudget(): Budget {
  if (typeof localStorage === "undefined") return defaultBudget();
  try {
    return normalize(safeParse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return defaultBudget();
  }
}

export function saveBudget(budget: Budget): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
  } catch {
    /* privater Modus, volles Kontingent – kein Grund, die App anzuhalten */
  }
}

export function clearBudget(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* siehe oben */
  }
}

/** Nur die Sprache lesen – für die Marketing-Seiten, die kein Budget brauchen. */
export function readStoredLang(): Lang | null {
  if (typeof localStorage === "undefined") return null;
  const s = safeParse(localStorage.getItem(STORAGE_KEY));
  return s?.lang === "de" || s?.lang === "en" ? s.lang : null;
}

/** Sprache oder Theme ändern, ohne ein bestehendes Budget zu überschreiben. */
export function patchStored(patch: Partial<Budget>): void {
  if (typeof localStorage === "undefined") return;
  const current = safeParse(localStorage.getItem(STORAGE_KEY)) ?? {};
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
  } catch {
    /* siehe oben */
  }
}

/** Übersetzt bekannte Kategorienamen beim Sprachwechsel mit. */
export function translateExpenses(expenses: Expense[], target: Lang): Expense[] {
  const from = target === "en" ? 0 : 1;
  const to = target === "en" ? 1 : 0;
  return expenses.map((e) => {
    const pair = CATEGORY_PAIRS.find((p) => p[from].toLowerCase() === e.name.toLowerCase());
    return pair ? { ...e, name: pair[to] } : e;
  });
}
