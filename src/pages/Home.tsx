import { useEffect } from "react";
import { SiteHeader } from "../shared/SiteHeader";
import { SiteFooter } from "../shared/SiteFooter";
import { Hero } from "../components/Hero";
import { Proof } from "../components/Proof";
import { BudgetStarter } from "../components/BudgetStarter";
import { Features } from "../components/Features";
import { Showcase } from "../components/Showcase";
import { Benefits } from "../components/Benefits";
import { Principles } from "../components/Principles";
import { Price } from "../components/Price";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";
import { startBudget } from "../lib/budget";
import { useI18n } from "../i18n";

export function HomePage() {
  const { t, lang } = useI18n();

  useEffect(() => {
    document.title =
      lang === "de"
        ? "Budget Visualizer – Dein Geld. Endlich auf einen Blick."
        : "Budget Visualizer – Your money. Finally at a glance.";
  }, [lang]);

  return (
    <div className="min-h-screen bg-surface font-sans text-fg">
      <a
        href="#start"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-surface"
      >
        {t.common.ctaPrimary}
      </a>
      <SiteHeader variant="home" onPrimary={startBudget} />
      <main>
        <Hero />
        <Proof />
        <BudgetStarter />
        <Features />
        <Showcase />
        <Benefits />
        <Principles />
        <Price />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter onPrimary={startBudget} />
    </div>
  );
}
