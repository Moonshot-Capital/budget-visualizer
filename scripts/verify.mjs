/* Prüft den gebauten Stand im echten Browser:
   Konsolenfehler, fehlende Assets, Screenshots und die Kernfunktionen.

   Playwright ist bewusst KEINE Abhängigkeit des Projekts (sein postinstall
   lädt Browser herunter). Vor dem ersten Lauf:

     npm run build
     npm i -D playwright && npx playwright install chromium
     npm run verify

   Läuft ein Chromium schon woanders, kann sein Pfad über
   PLAYWRIGHT_CHROMIUM gesetzt werden. */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const SHOTS = path.join(__dirname, "..", "shots");
const DOWNLOADS = path.join(__dirname, "..", ".downloads");
const PORT = 4173;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
  let file = path.join(DIST, url === "/" ? "index.html" : url);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, "index.html");
  if (!fs.existsSync(file)) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

const PAGES = ["index", "app", "how-it-works", "blog", "feedback", "support", "legal"];
const problems = [];
const notes = [];

async function blockFonts(ctx) {
  // Der Container hat keinen Zugriff auf Google Fonts – blockieren statt
  // scheitern lassen. Damit prüfen wir gleichzeitig den Fallback auf die
  // Systemschrift.
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
}

function watch(page, label) {
  page.on("console", (m) => {
    const text = m.text();
    if (m.type() !== "error") return;
    if (/ERR_(TUNNEL_CONNECTION_FAILED|BLOCKED_BY_CLIENT|FAILED)/.test(text)) return;
    problems.push(`[${label}] console: ${text.slice(0, 300)}`);
  });
  page.on("pageerror", (e) => problems.push(`[${label}] pageerror: ${String(e).slice(0, 300)}`));
  page.on("requestfailed", (r) => {
    const u = r.url();
    if (u.startsWith("https://fonts.")) return; // im Container offline, im Netz vorhanden
    problems.push(`[${label}] request failed: ${u} (${r.failure()?.errorText})`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().startsWith("https://fonts.")) {
      problems.push(`[${label}] HTTP ${r.status()}: ${r.url()}`);
    }
  });
}

const base = `http://127.0.0.1:${PORT}`;

async function shoot(browser, name, theme, width, height) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    // Ohne reduzierte Bewegung bleiben Sektionen unterhalb des Falzes
    // unsichtbar (whileInView), und Übergänge werden mitten in der
    // Animation erwischt.
    reducedMotion: "reduce",
  });
  await blockFonts(ctx);
  const page = await ctx.newPage();
  watch(page, `${name}/${theme}/${width}`);
  await page.addInitScript((t) => {
    localStorage.setItem("myBudget", JSON.stringify({ theme: t, lang: "de" }));
  }, theme);
  await page.goto(`${base}/${name}.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  if (width > 800) {
    // Viewport auf die volle Dokumenthöhe ziehen statt fullPage zu stitchen –
    // das vermeidet doppelte fixe Elemente im Bild und löst alle
    // whileInView-Animationen auf einmal aus.
    const full = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width, height: Math.min(full, 16000) });
    await page.waitForTimeout(1200);
  }

  await page.screenshot({ path: path.join(SHOTS, `${name}-${theme}-${width}.png`) });
  await ctx.close();
}

async function functional(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  await blockFonts(ctx);
  const page = await ctx.newPage();
  watch(page, "app/functional");
  await page.addInitScript(() => localStorage.setItem("myBudget", JSON.stringify({ theme: "light", lang: "de" })));
  await page.goto(`${base}/app.html`, { waitUntil: "networkidle" });

  const count = () => page.locator('[role="list"] > li').count();
  const before = await count();

  // Ausgabe hinzufügen
  await page.fill("#expense-name", "Testposten");
  await page.fill("#expense-amount", "123");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await page.waitForTimeout(400);
  if ((await count()) !== before + 1) problems.push("[funktional] Ausgabe wurde nicht hinzugefügt");

  // Bearbeiten
  await page.getByRole("button", { name: /Bearbeiten: Testposten/ }).click();
  await page.waitForTimeout(300);
  const amount = page.locator('form input[type="number"]').last();
  await amount.fill("222");
  await page.getByRole("button", { name: "Speichern" }).click();
  await page.waitForTimeout(400);
  if (!(await page.getByText("222").first().isVisible())) problems.push("[funktional] Bearbeiten hat nicht gegriffen");

  // Löschen + Rückgängig
  const row = page.locator('[role="list"] > li').filter({ hasText: "Testposten" });
  await row.getByRole("button", { name: "Löschen" }).click();
  await page.waitForTimeout(1200); // Exit-Animation abwarten
  if ((await count()) !== before) problems.push("[funktional] Löschen hat nicht gegriffen");
  await page.getByRole("button", { name: "Rückgängig" }).click();
  await page.waitForTimeout(900);
  if ((await count()) !== before + 1) problems.push("[funktional] Rückgängig hat nicht gegriffen");

  // Sortieren
  await page.getByRole("button", { name: "Nach Betrag sortieren" }).click();
  await page.waitForTimeout(400);

  // Monat / Jahr
  const monthly = await page.locator("h1").innerText();
  await page.getByRole("button", { name: "Jahr", exact: true }).click();
  await page.waitForTimeout(400);
  const yearly = await page.locator("h1").innerText();
  if (monthly === yearly) problems.push("[funktional] Monat/Jahr ändert die Kopfzahl nicht");
  await page.getByRole("button", { name: "Monat", exact: true }).click();

  // Theme
  await page.getByRole("button", { name: /Darstellung/ }).first().click();
  await page.waitForTimeout(400);
  const themeAttr = await page.evaluate(() => document.documentElement.dataset.theme);
  if (themeAttr !== "dark") problems.push(`[funktional] Theme-Umschalter: data-theme=${themeAttr}`);
  await page.getByRole("button", { name: /Darstellung/ }).first().click();
  await page.waitForTimeout(300);

  // Sprache
  await page.getByRole("group", { name: "Sprache" }).first().getByText("en").click();
  await page.waitForTimeout(500);
  if (!(await page.getByText("Your expenses").first().isVisible()))
    problems.push("[funktional] Sprachumschalter greift nicht");
  await page.getByRole("group", { name: "Language" }).first().getByText("de").click();
  await page.waitForTimeout(500);

  // Teilen-Link: kopieren, öffnen, prüfen ob dasselbe Budget ankommt
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Link kopieren" }).click();
  await page.waitForTimeout(600);
  const shareLink = await page.evaluate(() => navigator.clipboard.readText());
  if (!/#b=/.test(shareLink)) {
    problems.push(`[funktional] Teilen-Link ohne Budget: ${shareLink.slice(0, 80)}`);
  } else {
    const check = await ctx.newPage();
    watch(check, "share-roundtrip");
    await check.addInitScript(() => localStorage.removeItem("myBudget"));
    await check.goto(shareLink, { waitUntil: "networkidle" });
    await check.waitForTimeout(1500);
    const seen = await check.getByText("Testposten").first().isVisible();
    const h1 = await check.locator("h1").innerText();
    notes.push(`Teilen-Link: h1 = ${h1}, Testposten sichtbar = ${seen}`);
    if (!seen) problems.push("[funktional] Teilen-Link überträgt die Ausgaben nicht");
    await check.close();
  }

  // PDF
  const pdfWait = page.waitForEvent("download", { timeout: 45000 });
  await page.getByRole("button", { name: "PDF-Report" }).click();
  try {
    const dl = await pdfWait;
    const p = path.join(DOWNLOADS, dl.suggestedFilename());
    await dl.saveAs(p);
    const size = fs.statSync(p).size;
    notes.push(`PDF: ${dl.suggestedFilename()} (${Math.round(size / 1024)} kB)`);
    if (size < 20000) problems.push(`[funktional] PDF verdächtig klein: ${size} Byte`);
  } catch (e) {
    problems.push(`[funktional] PDF-Download fehlgeschlagen: ${String(e).slice(0, 200)}`);
  }

  // Stories
  const shots = [];
  page.on("download", (d) => shots.push(d));
  await page.getByRole("button", { name: "Instagram-Stories" }).click();
  await page.waitForTimeout(6000);
  const stories = shots.filter((d) => d.suggestedFilename().startsWith("story-"));
  for (const d of stories) await d.saveAs(path.join(DOWNLOADS, d.suggestedFilename()));
  notes.push(`Stories: ${stories.length} PNG(s)`);
  if (stories.length !== 3) problems.push(`[funktional] Erwartet 3 Story-PNGs, bekommen ${stories.length}`);

  await ctx.close();
}

async function starterHandoff(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await blockFonts(ctx);
  const page = await ctx.newPage();
  watch(page, "starter");
  await page.addInitScript(() => localStorage.setItem("myBudget", JSON.stringify({ theme: "light", lang: "de" })));
  await page.goto(`${base}/index.html`, { waitUntil: "networkidle" });

  await page.fill("#einkommen-input", "3200");
  await page.fill("#ausgabe-name", "Testmiete");
  await page.fill("#ausgabe-betrag", "900");
  await page.getByRole("button", { name: "Hinzufügen", exact: true }).click();
  await page.waitForTimeout(700);

  await page.getByRole("button", { name: /Im Visualizer weitermachen/ }).click();
  await page.waitForURL(/app\.html/, { timeout: 15000 });
  await page.waitForTimeout(1600);

  const heading = await page.locator("h1").innerText();
  const hasItem = await page.getByText("Testmiete").first().isVisible();
  if (!heading.includes("3.200")) problems.push(`[übergabe] Einkommen nicht übernommen (h1 = ${heading})`);
  if (!hasItem) problems.push("[übergabe] Ausgabe nicht übernommen");
  notes.push(`Übergabe Startseite → App: h1 = ${heading}, Posten sichtbar = ${hasItem}`);

  await page.screenshot({ path: path.join(SHOTS, "handoff-app.png"), fullPage: false });
  await ctx.close();
}

async function main() {
  fs.rmSync(SHOTS, { recursive: true, force: true });
  fs.mkdirSync(SHOTS, { recursive: true });
  fs.mkdirSync(DOWNLOADS, { recursive: true });
  await new Promise((r) => server.listen(PORT, r));

  const browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {},
  );
  for (const name of PAGES) {
    await shoot(browser, name, "light", 1440, 1000);
    await shoot(browser, name, "dark", 1440, 1000);
    await shoot(browser, name, "light", 390, 844);
  }
  await functional(browser);
  await starterHandoff(browser);
  await browser.close();
  server.close();

  console.log("\n=== NOTIZEN ===");
  notes.forEach((n) => console.log(" ·", n));
  console.log("\n=== BEFUNDE ===");
  if (!problems.length) console.log(" keine");
  else [...new Set(problems)].forEach((p) => console.log(" ✗", p));
  console.log(`\nScreenshots: ${fs.readdirSync(SHOTS).length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
