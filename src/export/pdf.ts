import { F, brandTag, drawSkewBar, exportSegments, newCanvas, sig, type ExportContext } from "./canvas";
import { RED } from "../lib/ramp";

/**
 * Budget-Report als A4-Querformat.
 * Wird auf einem Canvas gezeichnet (scharf, kein Screenshot) und dann in ein
 * PDF gelegt. jsPDF kommt per dynamischem Import – die Bibliothek landet in
 * einem eigenen Chunk und wird erst beim Klick geladen.
 */
export async function downloadPdfReport(ctxData: ExportContext): Promise<void> {
  const { budget, strings, money, pctText, multiplier: m, dateString } = ctxData;
  const W = 2384;
  const H = 1684;
  const P = 140; // A4 quer bei ~200 dpi

  const [canvas, ctx] = newCanvas(W, H);
  const { segs, denom, totalExpenses, balance, isDeficit } = exportSegments(
    budget,
    false,
    isDeficitLabel(strings, budget),
  );
  const period = budget.view === "year" ? strings.yearly : strings.monthly;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, 14);
  brandTag(ctx, P, 90, "#0a0a0a");

  ctx.fillStyle = "#0a0a0a";
  ctx.globalAlpha = 0.5;
  ctx.font = F(700, 28);
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(
    `${(budget.job || strings.report).toUpperCase()} · ${period.toUpperCase()} · ${dateString}`,
    W - P,
    101,
  );
  ctx.globalAlpha = 1;

  // Kopfzahl
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.globalAlpha = 0.55;
  ctx.font = F(800, 30);
  ctx.fillText(strings.netIncome.toUpperCase(), P, 200);
  ctx.globalAlpha = 1;
  ctx.font = F(900, 150);
  ctx.fillText(money(budget.income * m), P - 6, 236);

  // KPI-Reihe rechts
  const kx = W - P - 760;
  const ky = 210;
  const kw = 240;
  const kpis: [string, string, string, string | null][] = [
    [strings.kpiExpenses, money(totalExpenses * m), "#0a0a0a", null],
    [
      isDeficit ? strings.deficit : strings.surplus,
      (isDeficit ? "−" : "+") + money(Math.abs(balance) * m),
      "#0a0a0a",
      isDeficit ? RED : "#f2ff00",
    ],
    [strings.kpiRate, Math.round((balance / (budget.income || 1)) * 100) + " %", "#0a0a0a", null],
  ];
  kpis.forEach(([label, value, fg, bg], i) => {
    const x = kx + i * (kw + 20);
    if (bg) {
      ctx.fillStyle = bg;
      ctx.fillRect(x, ky, kw, 150);
    }
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, ky, kw, 150);
    ctx.fillStyle = bg === RED ? "#fff" : fg;
    ctx.globalAlpha = 0.6;
    ctx.font = F(800, 22);
    ctx.fillText(label.toUpperCase(), x + 22, ky + 24);
    ctx.globalAlpha = 1;
    ctx.font = F(900, 44);
    ctx.fillText(value, x + 20, ky + 70);
  });

  // Balken
  const by = 470;
  const bh = 170;
  drawSkewBar(ctx, P, by, W - 2 * P, bh, segs, denom);

  // Tabelle
  const ty = by + bh + 90;
  const rowH = Math.min(78, (H - ty - 160) / Math.max(segs.length, 1));
  ctx.font = F(800, 22);
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillText(strings.yourExpensesCaps.toUpperCase(), P, ty - 50);
  ctx.textAlign = "right";
  ctx.fillText("%", W - P - 380, ty - 50);
  ctx.fillText(period.toUpperCase(), W - P, ty - 50);
  ctx.globalAlpha = 1;

  segs.forEach((s, i) => {
    const y = ty + i * rowH;
    ctx.strokeStyle = "rgba(0,0,0,.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(P, y + rowH);
    ctx.lineTo(W - P, y + rowH);
    ctx.stroke();

    ctx.fillStyle = s.color;
    ctx.fillRect(P, y + rowH / 2 - 14, 28, 28);
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 2;
    ctx.strokeRect(P, y + rowH / 2 - 14, 28, 28);

    ctx.fillStyle = "#0a0a0a";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = F(s.isBalance ? 900 : 700, 30);
    ctx.fillText(s.name.toUpperCase(), P + 50, y + rowH / 2);

    const tx = W - P - 1100;
    const tw = 640;
    ctx.fillStyle = "rgba(0,0,0,.07)";
    ctx.fillRect(tx, y + rowH / 2 - 5, tw, 10);
    ctx.fillStyle = s.color;
    ctx.fillRect(tx, y + rowH / 2 - 5, tw * Math.min(1, s.amount / denom), 10);

    ctx.fillStyle = "#0a0a0a";
    ctx.textAlign = "right";
    ctx.globalAlpha = 0.6;
    ctx.font = F(700, 26);
    ctx.fillText(pctText(s.amount), W - P - 380, y + rowH / 2);
    ctx.globalAlpha = 1;
    ctx.font = F(900, 34);
    ctx.fillStyle = s.isBalance ? (s.isDeficit ? RED : "#5c6600") : "#0a0a0a";
    ctx.fillText((s.isBalance ? (s.isDeficit ? "−" : "+") : "−") + money(s.amount * m), W - P, y + rowH / 2);
  });

  sig(ctx, W - P, H - 70, "#0a0a0a", 70);

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  doc.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 297, 210);
  doc.save("budget-report.pdf");
}

function isDeficitLabel(strings: ExportContext["strings"], budget: ExportContext["budget"]): string {
  const total = budget.expenses.reduce((s, e) => s + e.amount, 0);
  return budget.income - total < 0 ? strings.deficit : strings.surplus;
}
