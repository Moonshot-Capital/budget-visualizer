import { normalize } from "./storage";
import type { Budget } from "./types";

/* Teilen-Link: das komplette Budget steckt base64url-kodiert im Hash (#b=…).
   Format und Kürzel sind identisch mit v4, damit alte geteilte Links weiter
   funktionieren. */

type Slim = {
  i: number;
  c: string;
  l: string;
  j: string;
  e: [string, number][];
};

export function encodeBudget(budget: Budget): string {
  const slim: Slim = {
    i: budget.income,
    c: budget.currency,
    l: budget.lang,
    j: budget.job,
    e: budget.expenses.map((e) => [e.name, e.amount]),
  };
  const json = JSON.stringify(slim);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeBudget(code: string, fallbackTheme: Budget["theme"] = "auto"): Budget | null {
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const o = JSON.parse(new TextDecoder().decode(bytes)) as Partial<Slim>;
    return normalize({
      income: o.i,
      currency: o.c,
      lang: o.l as Budget["lang"],
      job: o.j,
      expenses: (o.e ?? []).map(([name, amount]) => ({ id: "", name, amount })),
      theme: fallbackTheme,
    });
  } catch {
    return null;
  }
}

/** Absoluter Link auf den Visualizer, der das übergebene Budget enthält. */
export function shareUrl(budget: Budget, page = "app.html"): string {
  const url = new URL(page, window.location.href);
  url.hash = "b=" + encodeBudget(budget);
  return url.href;
}
