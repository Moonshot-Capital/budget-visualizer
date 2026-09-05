# Budget Visualizer 5.0

Sieh, wohin dein Geld geht. Eine offline-fähige Web-App, die dein monatliches
Budget als geneigten Balken zeigt – plus die Marketing-Seiten drumherum.

Kein Konto, kein Backend, keine Datenbank. Alle Daten bleiben im `localStorage`
deines Browsers.

---

## Was in Version 5 neu ist

- **Ein Projekt statt zwei.** Landingpage und Visualizer teilen sich Design,
  Komponenten, Farben und Texte. Vorher waren es zwei getrennte Codebases mit
  zwei Design-Sprachen.
- **React + Vite + Tailwind 4** statt Vanilla-JS und handgeschriebenem CSS.
  Die Rechen-, Canvas- und Export-Logik der Version 4 ist unverändert
  übernommen – die Exporte sehen aus wie vorher.
- **Multi-Page-Build.** Jede Seite ist eine echte `.html`-Datei. Auf GitHub
  Pages funktionieren Deep-Links und geteilte Budget-Links dadurch ohne
  404-Fallback.
- **Dark Mode auf allen Seiten**, nicht nur in der App.
- **Übergabe Startseite → Visualizer.** Was im Starter-Widget auf der
  Startseite eingetippt wird, landet über den Budget-Link im Visualizer.
- **jsPDF als npm-Abhängigkeit** statt CDN-Script: der PDF-Export funktioniert
  offline und wird erst beim Klick geladen.
- **Ehrliche Inhalte.** Die erfundenen Testimonials, Presse-Logos und
  Nutzerzahlen des ersten Entwurfs sind durch nachprüfbare Produktaussagen und
  die eigene Positionierung ersetzt. Die drei Preis-Tarife sind zu einer
  „Kostenlos, für immer“-Sektion geworden, weil es die bezahlten Funktionen
  nicht gibt.

---

## Loslegen

```bash
npm install
npm run dev      # http://localhost:5173
```

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Entwicklungsserver mit Hot Reload |
| `npm run build` | Typprüfung + Produktionsbuild nach `dist/` |
| `npm run preview` | gebauten Stand lokal ansehen |
| `npm run typecheck` | nur `tsc --noEmit` |

Node 20 oder neuer.

---

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit Starter-Widget |
| `app.html` | der Visualizer |
| `how-it-works.html` | Kurzanleitung |
| `blog.html` | Blog, Artikel über den Hash (`blog.html#sparquote`) |
| `feedback.html` | Feedback per mailto-Vorlage |
| `support.html` | Projekt unterstützen |
| `legal.html` | Impressum & Datenschutz – **enthält Platzhalter** |

---

## Aufbau

```
src/
├─ lib/          Rechnen, Speichern, Formatieren, Teilen-Link – ohne React
│  ├─ types.ts   Budget, Expense, Segment
│  ├─ storage.ts localStorage, Migration alter Datensätze, Kategorien
│  ├─ budget.ts  Summen, Balkensegmente, Landingpage-Demo
│  ├─ format.ts  Währung, Prozent, Monat/Jahr
│  ├─ ramp.ts    Farbrampe (auch für die Canvas-Exporte)
│  └─ share.ts   Budget ⇄ base64url für #b=…
├─ export/       Canvas-Zeichnung, PDF-Report, Instagram-Stories – ohne React
├─ i18n/         DE/EN-Wörterbücher + Provider (Sprache und Theme)
├─ app/          Visualizer: State, Balken, Liste, Panels, Mobile
├─ components/   Landingpage-Sektionen und die gemeinsame UI-Bibliothek
├─ shared/       Kopf-/Fußzeile, Seitenrahmen, Umschalter
├─ pages/        eine Komponente je Seite
└─ entries/      ein Einstiegspunkt je HTML-Datei
```

`src/lib` und `src/export` kennen weder React noch i18n. Texte werden
hineingereicht. Dadurch bleiben die Exporte testbar und der Port aus Version 4
nachvollziehbar.

---

## Anpassen

| Was | Wo |
|---|---|
| Kontaktadresse, GitHub-Link | `src/config.ts` |
| Farben, Dark-Mode-Töne | `src/index.css` (`:root` und `[data-theme="dark"]`) |
| Balkenfarben (auch Export) | `src/lib/ramp.ts` |
| Alle Texte | `src/i18n/de.ts`, `en.ts`, `home.de.ts`, `home.en.ts` |
| Blog-Artikel | `src/i18n/blog.de.ts`, `blog.en.ts` |
| Währungen im Auswahlfeld | `CURRENCIES` in `src/app/Panels.tsx` |
| Impressum, Datenschutz | `legal`-Abschnitt in `src/i18n/de.ts` / `en.ts` |

`en.ts` ist gegen `typeof de` typisiert: fehlt ein Schlüssel oder ist einer
zu viel, schlägt `npm run build` fehl. Das ist die Absicht.

---

## Veröffentlichen

Der Build nutzt `base: "./"`, die Ausgabe ist also ortsunabhängig – sie läuft im
Repo-Unterordner, auf einer eigenen Domain und lokal per Doppelklick.

**Ins Repository bringen:**

```bash
git init
git add .
git commit -m "Budget Visualizer 5.0"
git branch -M main
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```

`dist/` ist über `.gitignore` ausgeschlossen. Wer die gebaute Version im Repo
haben will (etwa für Pages aus `/docs`), nimmt die Zeile dort heraus.

**GitHub Pages, von Hand:** `npm run build`, dann den Inhalt von `dist/` in den
Branch `gh-pages` oder in `/docs` auf `main` legen und unter
*Settings → Pages* als Quelle auswählen.

**GitHub Pages, automatisch:** Workflow anlegen, der bei jedem Push auf `main`
`npm ci && npm run build` ausführt und `dist/` per
`actions/deploy-pages` veröffentlicht.

**Netlify / Vercel / Cloudflare Pages:** Build-Befehl `npm run build`,
Ausgabeverzeichnis `dist`.

---

## Datenformat (`localStorage`, Schlüssel `myBudget`)

```json
{
  "income": 4275,
  "annualSalary": 51300,
  "currency": "EUR",
  "lang": "de",
  "job": "",
  "theme": "auto",
  "view": "month",
  "expenses": [{ "id": "k3j9x1a", "name": "Wohnen", "amount": 1500 }]
}
```

Datensätze aus Version 1 bis 4 werden beim ersten Start automatisch übernommen
(fehlende IDs, Theme, Ansicht). Geteilte Links aus Version 4 funktionieren
weiter – die Kodierung ist unverändert.

---

## Datenschutz-Hinweise für Betreiber

- Es werden keine Cookies gesetzt, kein Tracking eingebunden, keine Daten an
  einen Server gesendet.
- Die Schriftart **Inter** wird von Google Fonts geladen. Dabei geht die
  IP-Adresse der Besucher an Google. Wer das vermeiden will, hostet die Schrift
  selbst und entfernt die beiden `<link>`-Zeilen aus den HTML-Dateien – die
  Seite fällt dann auf die Systemschrift zurück.
- `legal.html` enthält Platzhalter. Vor der Veröffentlichung ausfüllen.

---

## Prüfen

`scripts/verify.mjs` baut den Stand nicht, sondern prüft `dist/` in einem
echten Chromium: Konsolenfehler und fehlende Assets auf allen sieben Seiten,
Screenshots in Hell und Dunkel sowie in 390 px und 1440 px, dazu ein
Funktionsdurchlauf (Anlegen, Bearbeiten, Löschen mit Rückgängig, Sortieren,
Monat/Jahr, Theme, Sprache, Teilen-Link-Roundtrip, PDF, drei Story-PNGs,
Übergabe von der Startseite).

```bash
npm run build
npm i -D playwright && npx playwright install chromium
npm run verify
```

Playwright ist absichtlich keine Projekt-Abhängigkeit – sein `postinstall`
lädt Browser herunter, und dafür gibt es beim normalen Bauen keinen Grund.

---

## Lizenz

MIT, siehe `LICENSE`. Das Branding in den Exporten (Logo und Wortmarke
„BUDGET VISUALIZER“) steckt in `src/export/canvas.ts`.
