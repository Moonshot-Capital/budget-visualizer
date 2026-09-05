import { RAMP_DARK, RAMP_LIGHT, RED, YELLOW } from "../lib/ramp";
import { totals } from "../lib/budget";
import type { Budget } from "../lib/types";

/* Zeichen-Primitive für PDF-Report und Instagram-Stories.
   Bewusst framework-frei und 1:1 aus v4 übernommen – die Exporte sollen
   pixelgleich bleiben. */

export type ExportSegment = {
  name: string;
  amount: number;
  color: string;
  isBalance: boolean;
  isDeficit: boolean;
};

/** Schrift-Kurzschreibweise. */
export const F = (weight: number, px: number): string =>
  `${weight} ${px}px Inter, system-ui, -apple-system, 'Segoe UI', Arial, sans-serif`;

/** Der geneigte Balken: jedes Segment ist ein Parallelogramm mit 14° Neigung. */
export function drawSkewBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  segs: ExportSegment[],
  denom: number,
): void {
  const skew = Math.tan((14 * Math.PI) / 180) * h;
  const gap = 4;
  let cur = x + skew;
  segs.forEach((s) => {
    const sw = (s.amount / denom) * (w - skew) - gap;
    if (sw <= 0.5) {
      cur += sw + gap;
      return;
    }
    ctx.beginPath();
    ctx.moveTo(cur, y + h);
    ctx.lineTo(cur + sw, y + h);
    ctx.lineTo(cur + sw - skew, y);
    ctx.lineTo(cur - skew, y);
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();
    cur += sw + gap;
  });
}

/** Markenzeichen: gelbes Quadrat mit steigender Linie. */
export function logoMark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, fg: string): void {
  const u = size / 64;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = YELLOW;
  ctx.fillRect(4 * u, 4 * u, 56 * u, 56 * u);
  ctx.strokeStyle = fg;
  ctx.lineWidth = 5 * u;
  ctx.strokeRect(4 * u, 4 * u, 56 * u, 56 * u);
  ctx.lineWidth = 6 * u;
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  ctx.beginPath();
  ctx.moveTo(16 * u, 46 * u);
  ctx.lineTo(28 * u, 34 * u);
  ctx.lineTo(36 * u, 42 * u);
  ctx.lineTo(50 * u, 22 * u);
  ctx.stroke();
  ctx.restore();
}

/** Signatur unten rechts: Wortmarke + Logo. */
export function sig(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size = 80): void {
  const mark = Math.round(size * 0.7);
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = F(900, Math.round(size * 0.32));
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("BUDGET VISUALIZER", x - mark - Math.round(size * 0.2), y - mark / 2);
  ctx.restore();
  logoMark(ctx, x - mark, y - mark, mark, color);
}

/** Kopfzeile: kleines Logo + Wortmarke, linksbündig. */
export function brandTag(ctx: CanvasRenderingContext2D, x: number, y: number, fg: string): void {
  ctx.save();
  ctx.fillStyle = YELLOW;
  ctx.fillRect(x, y, 22, 22);
  ctx.strokeStyle = fg;
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, 22, 22);
  ctx.fillStyle = fg;
  ctx.font = F(900, 28);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("BUDGET VISUALIZER", x + 38, y + 11);
  ctx.restore();
}

/** Segmente für den Export – unabhängig vom aktuellen Theme der Oberfläche. */
export function exportSegments(budget: Budget, dark: boolean, balanceLabel: string) {
  const { totalExpenses, balance, isDeficit } = totals(budget);
  const ramp = dark ? RAMP_DARK : RAMP_LIGHT;
  const segs: ExportSegment[] = budget.expenses.map((e, i) => ({
    name: e.name,
    amount: e.amount,
    color: ramp[i % 8],
    isBalance: false,
    isDeficit: false,
  }));
  segs.push({
    name: balanceLabel,
    amount: Math.abs(balance),
    color: isDeficit ? RED : YELLOW,
    isBalance: true,
    isDeficit,
  });
  return {
    segs: segs.filter((s) => s.amount > 0),
    denom: Math.max(budget.income, totalExpenses, 1),
    totalExpenses,
    balance,
    isDeficit,
  };
}

export function newCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d") as CanvasRenderingContext2D];
}

/** Texte, die die Export-Renderer brauchen – reicht die App aus dem i18n durch. */
export type ExportStrings = {
  surplus: string;
  deficit: string;
  kpiExpenses: string;
  kpiRate: string;
  report: string;
  monthly: string;
  yearly: string;
  netIncome: string;
  totalExpenses: string;
  budgetBreakdown: string;
  yourExpensesCaps: string;
  total: string;
  expenseCategories: string;
};

export type ExportContext = {
  budget: Budget;
  strings: ExportStrings;
  /** Währungsformat inklusive Zeichen. */
  money: (n: number) => string;
  /** Anteil am Einkommen, z. B. „35,1 %“. */
  pctText: (n: number) => string;
  /** Monatsansicht = 1, Jahresansicht = 12. */
  multiplier: number;
  /** Vorformatiertes Datum in der Sprache des Nutzers. */
  dateString: string;
};
