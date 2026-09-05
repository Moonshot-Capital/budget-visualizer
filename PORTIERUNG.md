# Abgleich v4 → v5

Feature für Feature gegen `budget-visualizer-v4` geprüft. Drei Kategorien:
**portiert** (Verhalten unverändert), **geändert** (bewusst anders),
**entfallen**.

## Portiert – Verhalten unverändert

| Funktion | Anmerkung |
|---|---|
| Budget im `localStorage` (`myBudget`) | gleicher Schlüssel, gleiches Format |
| Migration alter Datensätze | fehlende IDs, Theme, Ansicht – `normalize()` |
| Monats-/Jahresansicht | Faktor 12, gleiche Kennzahlen |
| Kennzahlen | Ausgaben, Überschuss/Defizit, Sparquote, größter Posten |
| Überschuss pro Tag | Division durch 30,44 wie in v4 |
| Geneigter Balken, 14° | gleiche Neigung, gleiche Farbrampe |
| Schwebende Labels mit Kollisionsvermeidung | Lane-Packing 1:1 (`BASE 44 / STEP 68 / GAP 24`) |
| Schmale Segmente ohne Nummer | Schwelle 38 px |
| Tooltip beim Antippen eines Segments | schließt nach 5 s oder bei Klick daneben |
| Mobile Legende mit Fortschrittsbalken | unter 900 px statt der Labels |
| Ausgabenliste: Inline-Bearbeiten | Escape bricht ab, Betrag wird fokussiert |
| Drag & Drop plus ↑/↓ | gleiche Reihenfolge-Logik |
| „Nach Betrag sortieren“ | ab zwei Posten aktiv |
| Löschen mit „Rückgängig“ | Position wird wiederhergestellt |
| Bottom-Sheet auf Mobil | Escape und Backdrop schließen |
| Fixe Mobile-Leiste mit Saldo | plus Knopf „Ausgabe“ |
| Schnell-Kategorien | dieselben zehn, DE und EN |
| Kategorien werden beim Sprachwechsel übersetzt | gleiche Paarliste |
| Jahresnetto ⇄ Monatsnetto | beide Richtungen wie in v4 |
| Teilen-Link `#b=…` | **gleiche Kodierung, alte Links funktionieren** |
| PDF-Report A4 quer | gleiche Canvas-Zeichnung, gleiches Layout |
| Drei Instagram-Stories 1080×1920 | gleiche Slides, gleiches Branding |
| Native Share-Sheet auf Mobil | für Link und Story-PNGs |
| Logo und Wortmarke in den Exporten | `logoMark()`, `sig()`, `brandTag()` |
| Dark Mode mit Systemerkennung | `auto` / `light` / `dark` |
| DE/EN inklusive Blog-Artikel | vollständig übernommen |
| `prefers-reduced-motion` | respektiert |
| Tastaturbedienung und Fokus-Ringe | Segmente per Enter, Escape schließt |
| Offline nach dem ersten Laden | jetzt auch der PDF-Export |

## Geändert – bewusst anders

| Was | Vorher | Jetzt | Warum |
|---|---|---|---|
| Erfundene Testimonials | sechs namentliche Zitate | Sektion „Prinzipien“ mit der eigenen Positionierung | die Personen und Zitate gab es nicht |
| Presse-/Podcast-Logos | sieben erfundene Namen, „Empfohlen von …“ | Marquee mit Produkteigenschaften | die Empfehlungen gab es nicht |
| „48.000 Budgets“, „4,9/5“ | Zähler und Sterne | vier nachprüfbare Zahlen (0 € / 0 Konten / 0 Byte / 2 Eingaben) | die Zahlen gab es nicht |
| „benutzt in 40+ Ländern“, „Alle Systeme laufen“ | Footer | ehrliche Projektbeschreibung | dito |
| Preise | Free / Pro 4 € / Gemeinsam 7 € | eine „Kostenlos, für immer“-Sektion + Beta-Hinweis | Pro-Funktionen und Zahlungsanbieter existieren nicht |
| Tote Footer-Links | Changelog, Roadmap, Über uns, Presse, Hilfe-Center … | nur Links, die es gibt | führten alle auf `#` |
| Startseite → App | CTAs scrollten nur zum Widget | CTAs öffnen `app.html`; der Starter übergibt seine Eingaben per `#b=` | die beiden Teile waren nicht verbunden |
| Standardsprache | fest `en`, Währung `USD` | aus `navigator.language`, Währung passend (`de`→EUR) | die Seite ist deutschsprachig |
| Sprache aus geteiltem Link | – | wird übernommen, solange der Empfänger keine eigene gewählt hat | ein deutscher Link sollte deutsch aufgehen |
| Dark Mode | nur App und statische Seiten | alle Seiten, inklusive Landingpage | die Landingpage war hell-only |
| jsPDF | CDN-Script | npm-Abhängigkeit, dynamisch geladen | offline nutzbar, kein Fremdhost |
| Zeitangaben „12 Sek.“ | im Marketing-Text | zu „2 Eingaben“ bzw. „Sekunden“ | nicht gemessen, also nicht als Zahl behauptet |
| Impressum / Datenschutz | nicht vorhanden | eigene Seite mit Platzhaltern | für einen öffentlichen Auftritt in DE/AT verpflichtend |
| Dateinamen `*.v3.*` | Cache-Busting von Hand | Vite-Hashes | erledigt der Build |

## Entfallen

| Was | Grund |
|---|---|
| `site.v3.js` | ersetzt durch den i18n- und Theme-Provider |
| `style.v3.css` (878 Zeilen) | ersetzt durch Tailwind-Utilities und Tokens |
| Rotation der Startseite um −1° (`.viz-inner`) | wirkte mit dem neuen Layout unruhig |
| `data-lang-only`-Blöcke im HTML | Sprachwechsel läuft jetzt über die Wörterbücher |

## Bekannte Punkte

- **GitHub Pages baut nicht.** Ausgeliefert werden muss der gebaute Stand –
  entweder über den beiliegenden Actions-Workflow oder über den mitgelieferten
  Ordner `docs/`. Wer die Quelldateien in den Repo-Root legt und Pages darauf
  zeigen lässt, bekommt eine weiße Seite.

- **`legal.html` enthält Platzhalter.** Vor der Veröffentlichung ausfüllen.
- **Google Fonts** lädt weiterhin von Google. Wer das nicht will: Inter selbst
  hosten und die beiden `<link>`-Zeilen aus den HTML-Dateien entfernen.
- **`CONTACT_EMAIL`** steht in `src/config.ts` und ist derzeit die private
  Adresse. Für einen öffentlichen Auftritt besser eine Projektadresse.
- **`GITHUB_URL`** in `src/config.ts` ist leer; sobald dort ein Link steht,
  erscheint er im Footer.
- Der PDF-Export zieht `html2canvas` und `dompurify` als optionale
  Abhängigkeiten von jsPDF mit (~730 kB). Sie werden **nur beim Klick auf
  „PDF-Report“** geladen, nicht beim Seitenaufruf.

## Prüfstand

`node scripts/verify.mjs` gegen `dist/`, in Chromium:

- sieben Seiten, je Hell/Dunkel bei 1440 px und Hell bei 390 px – keine
  Konsolenfehler, keine fehlenden Assets
- Anlegen, Bearbeiten, Löschen mit Rückgängig, Sortieren
- Monat ↔ Jahr, Theme-Umschalter, Sprachumschalter
- Teilen-Link: kopieren, in frischem Profil öffnen, Budget kommt an
- PDF-Report: 237 kB
- Instagram-Stories: drei PNGs
- Übergabe Startseite → App: Einkommen und Posten kommen an
