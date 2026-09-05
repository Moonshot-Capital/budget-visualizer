import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Button, Logo } from "../components/ui";
import { useI18n } from "../i18n";
import { LangToggle, ThemeToggle } from "./Toggles";

type Variant = "home" | "page" | "app";

/**
 * Kopfzeile aller Seiten. Auf der Startseite sind die Links Sprungmarken,
 * auf allen anderen echte Seitenwechsel.
 */
export function SiteHeader({ variant = "page", onPrimary }: { variant?: Variant; onPrimary?: () => void }) {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links =
    variant === "home"
      ? [
          { href: "#funktionen", label: t.nav.sections.features },
          { href: "#so-funktionierts", label: t.nav.sections.how },
          { href: "#prinzipien", label: t.nav.sections.principles },
          { href: "#preis", label: t.nav.sections.price },
          { href: "#faq", label: t.nav.sections.faq },
        ]
      : [
          { href: "./index.html", label: t.nav.home },
          { href: "./how-it-works.html", label: t.nav.howItWorks },
          { href: "./blog.html", label: t.nav.blog },
          { href: "./feedback.html", label: t.nav.feedback },
          { href: "./support.html", label: t.nav.support },
        ];

  const primary = () => {
    setOpen(false);
    if (onPrimary) onPrimary();
    else window.location.href = "./app.html";
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label={t.nav.main}
          className={cn(
            "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-3 pl-4 transition-all duration-500 sm:px-4 sm:pl-5",
            scrolled ? "glass shadow-soft" : "border border-transparent bg-transparent",
          )}
        >
          <a href="./index.html" className="rounded-full" aria-label={`${t.common.brand} – ${t.nav.home}`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-fg-muted transition-colors after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-volt-deep after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle className="hidden sm:flex" />
            <ThemeToggle className="hidden sm:grid" />
            {variant !== "app" && (
              <Button size="sm" variant="contrast" arrow onClick={primary} className="hidden sm:inline-flex">
                {t.common.ctaPrimary}
              </Button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/70 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={cn("absolute left-0 top-0 h-0.5 w-full rounded bg-fg transition-all duration-300", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute left-0 top-1.5 h-0.5 w-full rounded bg-fg transition-all duration-300", open && "opacity-0")} />
                <span className={cn("absolute left-0 top-3 h-0.5 w-full rounded bg-fg transition-all duration-300", open && "top-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-surface/90 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col px-6 pb-8 pt-24"
            >
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-4 text-2xl font-extrabold tracking-tight text-fg hover:bg-surface-2"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <LangToggle />
                  <ThemeToggle />
                </div>
                <Button size="lg" variant="volt" arrow className="w-full" onClick={primary}>
                  {t.common.ctaPrimary}
                </Button>
                <p className="text-center text-xs text-fg-subtle">{t.common.freeLineShort}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
