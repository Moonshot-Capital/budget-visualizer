# Budget Visualizer 4.0

Eine schnelle, offline-fähige Web-App, die dein monatliches Budget als skewed Balken visualisiert – jetzt als echtes Dashboard für Desktop **und** als App-Erlebnis auf dem Smartphone.

Keine Anmeldung, kein Backend: Alle Daten bleiben in `localStorage` deines Browsers.


## Version 4 – Startseite, neue Navigation, Export-Branding

- **Neue Startseite**: `index.html` ist jetzt die Landingpage (Hero, 3 Schritte, „Lohnt sich das?“-Abschnitt, Blog-Teaser, Beta-CTA).
- **Die App liegt jetzt unter `app.html`** – beim Upload also alle Dateien ersetzen und `app.html` neu hinzufügen. Geteilte Links funktionieren weiter (sie nutzen den aktuellen Pfad).
- **Footer-Navigation neu**: Chip-Buttons (Startseite · Visualizer · So funktioniert's · Blog · Feedback · Projekt unterstützen) statt unterstrichener Textlinks.
- **Export-Branding**: PDF-Report und alle drei Story-Bilder tragen Logo + Wortmarke „BUDGET VISUALIZER“ – keine handschriftliche Signatur mehr.
- **Cache-sichere Dateinamen**: `style.v3.css`, `app.v3.js`, `site.v3.js`. Dadurch lädt jeder Browser garantiert die neue Version. Nach dem Upload einmal hart neu laden (Cmd/Strg + Shift + R).
- **Robuste Übersetzungen**: fehlt ein Sprach-Key, bleibt der sichtbare Text stehen (keine rohen Schlüssel wie `footerNote` mehr).
- Logo-SVGs haben feste Größenangaben direkt im Markup – auch ohne CSS bleibt es 22–30 px klein (kein schwarzer Block mehr).


## Was ist neu in 4.0

- **Logo statt Unterschrift**: neues Markenzeichen (gelbes Quadrat + steigende Linie) in Topbar, Footer, Favicon (`logo.svg`) sowie in PDF-Report und Instagram-Stories. Die Schreibschrift *Caveat* ist entfernt.
- **Blog** (`blog.html`): statische Artikel in DE/EN, Übersicht + Volltext mit Call-to-Action.
- **Feedback** (`feedback.html`): E-Mail-Buttons mit vorausgefüllter Vorlage (Feedback / Fehler) und kopierbarer Vorlage - kein Formular, kein Backend.
- **Projekt unterstützen** (`support.html`): Feedback, Teilen, Weiterempfehlen; Spenden-Platzhalter ohne Zahlungsanbieter.
- **Footer-Navigation** auf allen Seiten; `site.v3.js` steuert Theme, Sprache und Kontaktadresse der statischen Seiten.
- Kontaktadresse anpassen: `CONTACT_EMAIL` in `site.v3.js`.

## Was ist neu in 2.0

**Desktop**
- Zweispaltiges Dashboard: Hero mit Nettoeinkommen + vier KPI-Kacheln (Ausgaben, Überschuss/Defizit, Sparquote, größter Posten)
- Breiter Balken mit schwebenden Labels und automatischer Kollisionsvermeidung (auch bei langen deutschen Bezeichnungen)
- Editor in zwei Spalten: Profil & Neue Ausgabe links, Ausgabenliste & Export rechts
- Drag & Drop zum Sortieren, zusätzlich ↑/↓-Buttons und „Nach Betrag sortieren“

**Mobil (< 900 px)**
- Kompakter Balken plus Legende mit Fortschrittsbalken statt schwebender Labels
- Fixe Bottom-Bar mit Überschuss/Defizit und „Ausgabe“-Button, der ein Bottom-Sheet zum Hinzufügen öffnet
- Große Touch-Ziele, Segmente antippen für Details, Ausgaben antippen zum Bearbeiten
- Native Share-Sheet für Link und Instagram-Stories (Web Share API)

**Allgemein**
- Dark Mode (folgt dem System, manuell umschaltbar)
- Umschalter Monat / Jahr für alle Beträge
- Inline-Bearbeitung jeder Ausgabe, Löschen mit „Rückgängig“
- Teilen-Link: Das komplette Budget wird in der URL kodiert (`#b=…`) – auf jedem Gerät öffnen und weiterarbeiten
- PDF-Report wird direkt auf einem Canvas gezeichnet (scharf, kein Screenshot mehr, `html2canvas` entfällt)
- Drei Instagram-Story-Slides (1080 × 1920) als PNG
- Tastaturbedienung, Fokus-Ringe, `aria`-Labels, `prefers-reduced-motion`
- Zwei Sprachen (DE/EN) inkl. automatischer Übersetzung bekannter Kategorien

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | App-Struktur |
| `style.v3.css` | Design-Tokens, Light/Dark, responsive Layout (Mobile-first, Breakpoints 640 / 900 / 1200 px) |
| `app.v3.js` | Logik: State, Rendering, i18n, Exporte |
| `how-it-works.html` | Kurzanleitung in DE/EN |
| `blog.html` | Blog mit statischen Artikeln (DE/EN) |
| `feedback.html` | Feedback-Seite (mailto-Vorlagen) |
| `support.html` | Projekt unterstützen (ohne Zahlungsanbieter) |
| `site.v3.js` | Gemeinsames Script der statischen Seiten (Theme, Sprache, Kontakt) |
| `logo.svg` | Logo / Favicon |

Externe Abhängigkeiten (per CDN, optional): Google Fonts *Inter* und `jsPDF` 2.5.1 für den PDF-Export. Ohne Netz läuft alles außer dem PDF-Download – Fallback-Schriften werden verwendet.

## Lokal starten

Einfach `index.html` im Browser öffnen. Für Web-Share und Clipboard-Funktionen ist ein `https://`- oder `localhost`-Kontext nötig, z. B.:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Auf GitHub Pages veröffentlichen

1. Neues Repository anlegen und die vier Dateien (`index.html`, `style.v3.css`, `app.v3.js`, `how-it-works.html`) plus diese README hochladen.
2. **Settings → Pages → Build and deployment**: Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Nach ca. einer Minute ist die App unter `https://<user>.github.io/<repo>/` erreichbar.

## Datenformat (localStorage `myBudget`)

```json
{
  "income": 4275,
  "annualSalary": 51300,
  "currency": "USD",
  "lang": "en",
  "job": "",
  "theme": "auto",
  "view": "month",
  "expenses": [{ "id": "k3j9x1a", "name": "Housing", "amount": 1500 }]
}
```

Bestehende Daten der Version 1 werden beim ersten Start automatisch migriert (IDs, Theme, Ansicht).

## Lizenz

MIT – frei verwendbar. Das Branding in den Exporten (Logo + Wortmarke „BUDGET VISUALIZER“) steckt in `app.v3.js` (Funktion `sig()` / `logoMark()`).
