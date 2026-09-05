import { F, brandTag, drawSkewBar, exportSegments, newCanvas, sig, type ExportContext } from "./canvas";
import { RAMP_DARK, RED, YELLOW } from "../lib/ramp";

/**
 * Drei Instagram-Stories (je 1080 × 1920).
 * Auf dem Handy geht das native Share-Sheet auf (speichert direkt in Fotos /
 * Instagram), auf dem Desktop werden die PNGs nacheinander heruntergeladen.
 */
export async function exportStories(ctxData: ExportContext, isDesktop: boolean): Promise<void> {
  const { budget, strings, money, pctText, multiplier: m } = ctxData;
  const W = 1080;
  const H = 1920;
  const P = 90;

  const totalOfExpenses = budget.expenses.reduce((s, e) => s + e.amount, 0);
  const balLabel = budget.income - totalOfExpenses < 0 ? strings.deficit : strings.surplus;

  const dark = exportSegments(budget, true, balLabel);
  const light = exportSegments(budget, false, balLabel);
  const { segs, denom, totalExpenses, balance, isDeficit } = dark;

  /* ---------------------------------------------------- Slide 1 – Cover */
  const [c1, a] = newCanvas(W, H);
  a.fillStyle = "#0a0a0a";
  a.fillRect(0, 0, W, H);
  a.fillStyle = YELLOW;
  a.fillRect(0, 0, W, 12);
  brandTag(a, P, 80, "#fff");

  let y = 230;
  a.textAlign = "left";
  a.textBaseline = "top";
  if (budget.job) {
    a.fillStyle = "#fff";
    a.globalAlpha = 0.5;
    a.font = F(700, 44);
    a.fillText(budget.job.toUpperCase(), P, y);
    a.globalAlpha = 1;
    y += 80;
  }
  a.fillStyle = "#fff";
  a.globalAlpha = 0.55;
  a.font = F(900, 80);
  a.fillText((budget.view === "year" ? strings.yearly : strings.monthly).toUpperCase(), P, y);
  a.globalAlpha = 1;
  a.font = F(900, 150);
  a.fillText(money(budget.income * m), P - 6, y + 100);

  const dy = y + 320;
  a.strokeStyle = "rgba(255,255,255,.15)";
  a.lineWidth = 2;
  a.beginPath();
  a.moveTo(P, dy);
  a.lineTo(W - P, dy);
  a.stroke();

  a.fillStyle = "#fff";
  a.globalAlpha = 0.5;
  a.font = F(700, 32);
  a.fillText(balLabel.toUpperCase(), P, dy + 60);
  a.globalAlpha = 1;
  a.fillStyle = isDeficit ? RED : YELLOW;
  a.font = F(900, 110);
  a.fillText((isDeficit ? "−" : "+") + money(Math.abs(balance) * m), P - 4, dy + 104);

  a.fillStyle = "#fff";
  a.globalAlpha = 0.5;
  a.font = F(700, 32);
  a.fillText(strings.totalExpenses.toUpperCase(), P, dy + 260);
  a.globalAlpha = 1;
  a.font = F(900, 84);
  a.fillText(money(totalExpenses * m), P - 4, dy + 304);

  drawSkewBar(a, P, H - 440, W - 2 * P, 80, segs, denom);
  a.fillStyle = "#fff";
  a.globalAlpha = 0.4;
  a.font = F(600, 30);
  a.fillText(`${budget.expenses.length} ${strings.expenseCategories}`, P, H - 330);
  a.globalAlpha = 1;
  sig(a, W - P, H - 100, "#fff");

  /* ------------------------------------------------ Slide 2 – Aufteilung */
  const [c2, b] = newCanvas(W, H);
  b.fillStyle = "#fff";
  b.fillRect(0, 0, W, H);
  b.fillStyle = "#0a0a0a";
  b.fillRect(0, 0, W, 12);
  brandTag(b, P, 80, "#0a0a0a");

  b.textAlign = "left";
  b.textBaseline = "top";
  b.fillStyle = "#0a0a0a";
  b.globalAlpha = 0.5;
  b.font = F(800, 36);
  b.fillText(strings.budgetBreakdown.toUpperCase(), P, 200);
  b.globalAlpha = 1;
  b.font = F(900, 112);
  b.fillText(money(budget.income * m), P - 4, 250);

  drawSkewBar(b, P, 430, W - 2 * P, 150, light.segs, light.denom);

  const ly = 660;
  const rh = Math.min(96, (H - ly - 220) / Math.max(light.segs.length, 1));
  light.segs.forEach((s, i) => {
    const yy = ly + i * rh;
    b.fillStyle = s.color;
    b.fillRect(P, yy + 4, 26, 26);
    b.strokeStyle = "#0a0a0a";
    b.lineWidth = 2;
    b.strokeRect(P, yy + 4, 26, 26);

    b.fillStyle = "#0a0a0a";
    b.globalAlpha = 0.55;
    b.font = F(700, 30);
    b.textAlign = "left";
    b.fillText(s.name.toUpperCase(), P + 44, yy);
    b.globalAlpha = 1;

    b.font = F(900, 38);
    b.fillStyle = s.isBalance ? (s.isDeficit ? RED : "#5c6600") : "#0a0a0a";
    b.textAlign = "right";
    b.fillText((s.isBalance ? (s.isDeficit ? "−" : "+") : "−") + money(s.amount * m), W - P, yy - 4);

    b.fillStyle = "rgba(0,0,0,.07)";
    b.fillRect(P + 44, yy + 50, W - 2 * P - 44, 8);
    b.fillStyle = s.color;
    b.fillRect(P + 44, yy + 50, (W - 2 * P - 44) * Math.min(1, s.amount / light.denom), 8);
    b.textAlign = "left";
  });
  sig(b, W - P, H - 100, "#0a0a0a");

  /* ----------------------------------------------------- Slide 3 – Liste */
  const [c3, d] = newCanvas(W, H);
  d.fillStyle = "#111";
  d.fillRect(0, 0, W, H);
  d.fillStyle = YELLOW;
  d.fillRect(0, 0, W, 12);
  brandTag(d, P, 80, "#fff");

  d.textAlign = "left";
  d.textBaseline = "top";
  d.fillStyle = "#fff";
  d.globalAlpha = 0.5;
  d.font = F(800, 36);
  d.fillText(strings.yourExpensesCaps.toUpperCase(), P, 200);
  d.globalAlpha = 1;

  const s0 = 290;
  const s1 = H - 330;
  const rh3 = budget.expenses.length ? (s1 - s0) / budget.expenses.length : 0;
  budget.expenses.forEach((e, i) => {
    const yy = s0 + i * rh3;
    d.fillStyle = YELLOW;
    d.font = F(900, 26);
    d.fillText(String(i + 1).padStart(2, "0"), P, yy + 14);

    const nameSize = Math.min(42, rh3 * 0.42);
    d.fillStyle = "#fff";
    d.font = F(700, nameSize);
    d.fillText(e.name.toUpperCase(), P + 70, yy + 4);

    d.globalAlpha = 0.4;
    d.font = F(600, 26);
    d.fillText(pctText(e.amount), P + 70, yy + nameSize + 14);
    d.globalAlpha = 1;

    d.fillStyle = RAMP_DARK[i % 8];
    d.font = F(900, 44);
    d.textAlign = "right";
    d.fillText("−" + money(e.amount * m), W - P, yy + 8);
    d.textAlign = "left";

    d.strokeStyle = "rgba(255,255,255,.1)";
    d.lineWidth = 1;
    d.beginPath();
    d.moveTo(P, yy + rh3 - 1);
    d.lineTo(W - P, yy + rh3 - 1);
    d.stroke();
  });

  const sy = s1 + 30;
  d.strokeStyle = "rgba(255,255,255,.25)";
  d.lineWidth = 2;
  d.beginPath();
  d.moveTo(P, sy - 10);
  d.lineTo(W - P, sy - 10);
  d.stroke();

  d.fillStyle = "#fff";
  d.globalAlpha = 0.45;
  d.font = F(700, 30);
  d.fillText(strings.total.toUpperCase(), P, sy);
  d.globalAlpha = 1;
  d.font = F(900, 72);
  d.fillText(money(totalExpenses * m), P - 3, sy + 40);

  d.fillStyle = isDeficit ? RED : YELLOW;
  d.globalAlpha = 0.5;
  d.font = F(700, 30);
  d.textAlign = "right";
  d.fillText(balLabel.toUpperCase(), W - P, sy);
  d.globalAlpha = 1;
  d.font = F(900, 72);
  d.fillText((isDeficit ? "−" : "+") + money(Math.abs(balance) * m), W - P, sy + 40);
  d.textAlign = "left";
  sig(d, W - P, H - 70, "#fff");

  const slides: [HTMLCanvasElement, string][] = [
    [c1, "story-1-cover.png"],
    [c2, "story-2-breakdown.png"],
    [c3, "story-3-expenses.png"],
  ];

  // Auf dem Handy das native Share-Sheet – speichert direkt in Fotos.
  if (typeof navigator !== "undefined" && navigator.canShare && !isDesktop) {
    try {
      const files = await Promise.all(
        slides.map(
          ([c, n]) =>
            new Promise<File>((resolve) =>
              c.toBlob((blob) => resolve(new File([blob as Blob], n, { type: "image/png" })), "image/png"),
            ),
        ),
      );
      if (navigator.canShare({ files })) {
        await navigator.share({ files, title: "Budget Visualizer" });
        return;
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
    }
  }

  for (let i = 0; i < slides.length; i++) {
    if (i) await new Promise((r) => setTimeout(r, 400));
    const link = document.createElement("a");
    link.download = slides[i][1];
    link.href = slides[i][0].toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
