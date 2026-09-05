/* Simuliert GitHub Pages: statisches Ausliefern von docs/ unter einem
   Unterpfad, wie bei <user>.github.io/<repo>/ */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const DOCS = "/home/claude/bv5/docs";
const PREFIX = "/budget-visualizer";
const PORT = 4444;
const TYPES = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".svg":"image/svg+xml" };

const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  if (!u.startsWith(PREFIX)) { res.writeHead(404); res.end("outside repo path"); return; }
  u = u.slice(PREFIX.length) || "/";
  const file = path.join(DOCS, u === "/" ? "index.html" : u);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end("404"); return; }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise(r => server.listen(PORT, r));

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const problems = [];
for (const page of ["", "app.html", "blog.html", "legal.html"]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const p = await ctx.newPage();
  p.on("pageerror", e => problems.push(`${page || "/"}: ${e}`));
  p.on("response", r => { if (r.status() >= 400 && !r.url().includes("fonts.")) problems.push(`${page || "/"}: HTTP ${r.status()} ${r.url()}`); });
  const url = `http://127.0.0.1:${PORT}${PREFIX}/${page}`;
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  const txt = (await p.locator("#root").innerText()).trim();
  console.log(`${(page || "index.html").padEnd(14)} gerendert: ${txt.length > 40 ? "ja" : "NEIN"}  (${txt.length} Zeichen)  "${txt.slice(0,50).replace(/\n/g," ")}"`);
  if (txt.length < 40) problems.push(`${page || "/"}: #root ist leer`);
  await ctx.close();
}
await browser.close(); server.close();
console.log("\nBefunde:", problems.length ? problems : "keine");
