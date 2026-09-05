import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  loadBudget,
  saveBudget,
  clearBudget,
  defaultBudget,
  normalize,
  readStoredLang,
  translateExpenses,
  uid,
} from "../lib/storage";
import { decodeBudget } from "../lib/share";
import type { Budget, Expense, Lang, ThemePref, View } from "../lib/types";

type Action =
  | { type: "income"; value: number }
  | { type: "annual"; value: number | "" }
  | { type: "job"; value: string }
  | { type: "currency"; value: string }
  | { type: "view"; value: View }
  | { type: "add"; name: string; amount: number }
  | { type: "update"; id: string; name: string; amount: number }
  | { type: "remove"; id: string }
  | { type: "restore"; index: number; expense: Expense }
  | { type: "move"; from: number; to: number }
  | { type: "sort" }
  | { type: "lang"; value: Lang }
  | { type: "replace"; budget: Budget }
  | { type: "reset"; lang: Lang; theme: ThemePref };

function reducer(state: Budget, action: Action): Budget {
  switch (action.type) {
    case "income":
      return {
        ...state,
        income: action.value,
        // Jahresnetto folgt dem Monatswert – wie in v4.
        annualSalary: action.value > 0 ? Math.round(action.value * 12) : "",
      };
    case "annual":
      return typeof action.value === "number"
        ? { ...state, annualSalary: action.value, income: Math.round(action.value / 12) }
        : { ...state, annualSalary: "" };
    case "job":
      return { ...state, job: action.value.slice(0, 40) };
    case "currency":
      return { ...state, currency: action.value };
    case "view":
      return { ...state, view: action.value };
    case "add":
      return { ...state, expenses: [...state.expenses, { id: uid(), name: action.name.slice(0, 60), amount: action.amount }] };
    case "update":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.id ? { ...e, name: action.name.slice(0, 60) || e.name, amount: action.amount } : e,
        ),
      };
    case "remove":
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.id) };
    case "restore": {
      const next = [...state.expenses];
      next.splice(Math.min(action.index, next.length), 0, action.expense);
      return { ...state, expenses: next };
    }
    case "move": {
      const { from, to } = action;
      if (to < 0 || to >= state.expenses.length || from === to) return state;
      const next = [...state.expenses];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return { ...state, expenses: next };
    }
    case "sort":
      return { ...state, expenses: [...state.expenses].sort((a, b) => b.amount - a.amount) };
    case "lang":
      return { ...state, lang: action.value, expenses: translateExpenses(state.expenses, action.value) };
    case "replace":
      return action.budget;
    case "reset":
      return normalize({ ...defaultBudget(action.lang), lang: action.lang, theme: action.theme });
    default:
      return state;
  }
}

export type LoadSource = "link" | "starter" | null;

/**
 * Budget-State inklusive Persistenz.
 * Sprache und Theme kommen vom SettingsProvider – sie werden hier nur in den
 * gespeicherten Datensatz gespiegelt, damit beide Quellen konsistent bleiben.
 */
export function useBudget(lang: Lang, themePref: ThemePref) {
  const [loadedFrom, setLoadedFrom] = useState<LoadSource>(null);
  // Sprache aus einem geteilten Link – nur relevant, wenn der Besucher
  // selbst noch keine Sprache gewählt hat.
  const [linkLang, setLinkLang] = useState<Lang | null>(null);

  const [budget, dispatch] = useReducer(reducer, undefined, () => {
    const stored = loadBudget();
    if (typeof window === "undefined") return stored;
    const hash = window.location.hash;
    if (hash.startsWith("#b=")) {
      const shared = decodeBudget(hash.slice(3), stored.theme);
      if (shared) return shared;
    }
    return stored;
  });

  // Herkunft merken und den Hash aufräumen, damit ein Reload nicht erneut lädt.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#b=")) return;
    const fromStarter = new URLSearchParams(window.location.search).get("from") === "starter";
    setLoadedFrom(fromStarter ? "starter" : "link");
    // Hat der Besucher noch keine eigene Sprache gewählt, ist die des Links
    // die bessere Vorgabe als die des Browsers.
    if (readStoredLang() === null) setLinkLang(budget.lang);
    history.replaceState(null, "", window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sprachwechsel aus dem Header übernehmen (inkl. Kategorie-Übersetzung).
  const prevLang = useRef(budget.lang);
  useEffect(() => {
    if (lang !== prevLang.current) {
      prevLang.current = lang;
      dispatch({ type: "lang", value: lang });
    }
  }, [lang]);

  // Persistieren – Theme kommt vom Provider, Sprache aus dem State.
  useEffect(() => {
    saveBudget({ ...budget, theme: themePref });
  }, [budget, themePref]);

  const reset = useCallback(
    (nextLang: Lang, nextTheme: ThemePref) => {
      clearBudget();
      dispatch({ type: "reset", lang: nextLang, theme: nextTheme });
    },
    [],
  );

  const clearSource = useCallback(() => setLoadedFrom(null), []);

  return { budget, dispatch, reset, loadedFrom, clearSource, linkLang };
}

/** true ab 900 px – dieselbe Grenze wie in v4. */
export function useIsDesktop(): boolean {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return desktop;
}

/** Kurzlebige Meldung am unteren Rand, optional mit Aktion. */
export type ToastState = { message: string; actionLabel?: string; onAction?: () => void } | null;

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((message: string, actionLabel?: string, onAction?: () => void) => {
    window.clearTimeout(timer.current);
    setToast({ message, actionLabel, onAction });
    timer.current = window.setTimeout(() => setToast(null), 5000);
  }, []);

  const hide = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return useMemo(() => ({ toast, show, hide }), [toast, show, hide]);
}
