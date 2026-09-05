import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { de, type Dict } from "./de";
import { en } from "./en";
import { homeDe, type HomeDict } from "./home.de";
import { homeEn } from "./home.en";
import { blogDe, type Article } from "./blog.de";
import { blogEn } from "./blog.en";
import { detectLang, patchStored, readStoredLang } from "../lib/storage";
import type { Lang, ResolvedTheme, ThemePref } from "../lib/types";

const DICTS: Record<Lang, Dict> = { de, en };
const HOME: Record<Lang, HomeDict> = { de: homeDe, en: homeEn };
const ARTICLES: Record<Lang, Article[]> = { de: blogDe, en: blogEn };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  home: HomeDict;
  articles: Article[];
  themePref: ThemePref;
  setThemePref: (t: ThemePref) => void;
  theme: ResolvedTheme;
  toggleTheme: () => void;
};

const SettingsContext = createContext<Ctx | null>(null);

const prefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

const resolve = (pref: ThemePref): ResolvedTheme =>
  pref === "dark" || (pref === "auto" && prefersDark()) ? "dark" : "light";

function readStoredTheme(): ThemePref {
  if (typeof localStorage === "undefined") return "auto";
  try {
    const raw = JSON.parse(localStorage.getItem("myBudget") || "{}") as { theme?: ThemePref };
    return raw.theme === "dark" || raw.theme === "light" || raw.theme === "auto" ? raw.theme : "auto";
  } catch {
    return "auto";
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang() ?? detectLang());
  const [themePref, setThemePrefState] = useState<ThemePref>(readStoredTheme);
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolve(readStoredTheme()));

  // data-theme trägt immer den aufgelösten Wert – darauf baut der dark:-Variant.
  useEffect(() => {
    const next = resolve(themePref);
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, [themePref]);

  // Systemwechsel nur beachten, solange „auto“ eingestellt ist.
  useEffect(() => {
    if (themePref !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next: ResolvedTheme = mq.matches ? "dark" : "light";
      setTheme(next);
      document.documentElement.dataset.theme = next;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [themePref]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    patchStored({ lang: l });
  }, []);

  const setThemePref = useCallback((p: ThemePref) => {
    setThemePrefState(p);
    patchStored({ theme: p });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemePref(resolve(readStoredTheme()) === "dark" ? "light" : "dark");
  }, [setThemePref]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: DICTS[lang],
      home: HOME[lang],
      articles: ARTICLES[lang],
      themePref,
      setThemePref,
      theme,
      toggleTheme,
    }),
    [lang, setLang, themePref, setThemePref, theme, toggleTheme],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useI18n muss innerhalb von <SettingsProvider> verwendet werden");
  return ctx;
}

export type { Article };
