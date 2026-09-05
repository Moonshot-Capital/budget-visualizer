import { cn } from "../utils/cn";
import { useI18n } from "../i18n";
import type { Lang } from "../lib/types";

/** DE / EN – kleiner Segmented Control. */
export function LangToggle({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5 text-[11px] font-extrabold",
        dark ? "border-white/15" : "border-line bg-surface/70",
        className,
      )}
      role="group"
      aria-label={t.common.langLabel}
    >
      {(["de", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-all",
            lang === l
              ? dark
                ? "bg-white text-ink"
                : "bg-fg text-surface"
              : dark
                ? "text-white/50 hover:text-white"
                : "text-fg-subtle hover:text-fg",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/** Hell / Dunkel – ein Knopf, der den aufgelösten Zustand umschaltet. */
export function ThemeToggle({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { theme, toggleTheme, t } = useI18n();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`${t.common.themeLabel}: ${isDark ? t.common.themeLight : t.common.themeDark}`}
      title={isDark ? t.common.themeLight : t.common.themeDark}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border transition-colors",
        dark
          ? "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
          : "border-line bg-surface/70 text-fg-muted hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
