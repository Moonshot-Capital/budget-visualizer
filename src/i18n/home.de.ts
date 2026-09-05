/* Texte der Startseite.
   Hinweis: Die Sektionen „Vertrauen“ und „Prinzipien“ standen im ersten
   Entwurf voller erfundener Testimonials, Presselogos und Nutzerzahlen. Sie
   sind hier durch nachprüfbare Produktaussagen bzw. die eigene Positionierung
   ersetzt – Layout und Rhythmus der Seite bleiben identisch. */

export const homeDe = {
  hero: {
    eyebrow: "Kostenlos · Keine Anmeldung · Läuft im Browser",
    titleLine1: "Dein Geld.",
    titleLine2: "Endlich auf",
    titleHighlight: "einen Blick.",
    lead: "Netto eintragen, erste Ausgabe hinzufügen – und in Sekunden siehst du, wohin dein Geld fließt und wie viel wirklich übrig bleibt. Kein Excel. Keine Bank-Verknüpfung. Kein Konto.",
    secondaryCta: "So funktioniert's",
    factPrivacy: "Keine Anmeldung, kein Konto, keine Bank-Verknüpfung",
    factSpeed: "Sekunden bis zur ersten Visualisierung",
    cardLabel: "Budget · Monat",
    cardCategories: "Kategorien",
    badgeTop: "Größter Posten",
    badgeLiveTitle: "Live aktualisiert",
    badgeLiveDesc: "bei jeder Eingabe",
    examplesLabel: "Beispiel-Budgets",
    examples: [
      {
        who: "Beispiel · Angestellt",
        income: 4275,
        items: [
          ["Wohnen", 1500],
          ["Freizeit", 600],
          ["Fortbildung", 535],
          ["Studienkredit", 500],
          ["Essen", 450],
          ["Mobilität", 200],
          ["Versicherung", 100],
          ["Kleidung", 80],
          ["Gym", 50],
        ] as [string, number][],
      },
      {
        who: "Beispiel · Studium",
        income: 1250,
        items: [
          ["WG-Zimmer", 480],
          ["Essen", 260],
          ["Semesterticket", 35],
          ["Handy & Netz", 30],
          ["Freizeit", 150],
          ["Abos", 25],
        ] as [string, number][],
      },
      {
        who: "Beispiel · Familie",
        income: 5800,
        items: [
          ["Miete", 1850],
          ["Lebensmittel", 900],
          ["Kita", 420],
          ["Auto", 480],
          ["Versicherungen", 310],
          ["Freizeit", 400],
          ["Sparen", 600],
        ] as [string, number][],
      },
    ],
    surplusLabel: "Überschuss",
  },

  proof: {
    kicker: "Was dieses Tool ausmacht",
    marquee: [
      "Kein Konto",
      "Keine Bank-Verknüpfung",
      "Keine Cookies",
      "Kein Tracking",
      "Keine Werbung",
      "Kein Server",
      "Offline nutzbar",
      "Quelltext offen",
    ],
    stats: [
      { value: "0 €", label: "Kosten – heute und morgen" },
      { value: "0", label: "Konten oder Anmeldungen nötig" },
      { value: "0 Byte", label: "verlassen deinen Browser" },
      { value: "2", label: "Eingaben bis zum ersten Bild" },
    ],
  },

  features: {
    eyebrow: "Funktionen",
    titleA: "Alles, was ein Budget braucht.",
    titleB: "Nichts, was ablenkt.",
    desc: "Budget Visualizer ist bewusst reduziert: Einkommen, Ausgaben, Bild. Genau die Werkzeuge, die dich zur ersten klaren Zahl bringen.",
    items: [
      {
        title: "Live-Visualisierung",
        desc: "Jede Eingabe verändert sofort das Bild. Keine Tabellen, keine Berechnen-Buttons – dein Budget reagiert in Echtzeit.",
      },
      {
        title: "Monat ↔ Jahr",
        desc: "Ein Klick – und du siehst, was deine 12 € Streaming pro Jahr wirklich kosten.",
      },
      {
        title: "Schnell-Kategorien",
        desc: "Miete, Essen, Mobilität, Abos – die häufigsten Posten sind einen Tipp entfernt.",
      },
      {
        title: "Überschuss pro Tag",
        desc: "Der Überschuss wird auf den Tag heruntergerechnet. „9 € pro Tag frei“ ist greifbarer als eine Monatszahl.",
      },
      {
        title: "Privat by Design",
        desc: "Keine Anmeldung, keine Bank-Verknüpfung. Deine Daten bleiben lokal im Browser – Punkt.",
      },
      {
        title: "PDF, Story & Link",
        desc: "Exportiere als sauberen PDF-Report, als Instagram-Story oder teile einen Link, der dein Budget enthält.",
      },
    ],
    exportChips: ["PDF-Report", "Instagram-Story", "Link kopieren"],
  },

  showcase: {
    eyebrow: "So funktioniert's",
    titleA: "Drei Schritte.",
    titleB: "Ein klares Bild.",
    desc: "Vom leeren Feld zur fertigen Visualisierung sind es zwei Eingaben. So sieht der Weg aus.",
    cta: "Selbst ausprobieren",
    steps: [
      { n: "01", title: "Netto eintragen", desc: "Einmal deine monatliche Netto-Zahl. Optional: Beruf und Währung." },
      {
        n: "02",
        title: "Ausgaben hinzufügen",
        desc: "Tippe Posten ein oder nutze die Schnell-Kategorien. Jede Zeile verändert sofort das Bild.",
      },
      {
        n: "03",
        title: "Verstehen & teilen",
        desc: "Überschuss, Sparquote und größter Posten – auf einen Blick. Als PDF, Story oder Link teilen.",
      },
    ],
    mock: {
      profileTitle: "Dein Profil",
      job: "Beruf (optional)",
      jobValue: "Designerin",
      currency: "Währung",
      currencyValue: "€ Euro",
      income: "Monatliches Netto",
      annual: "Jahresnetto",
      annualPlaceholder: "z. B. 51300",
      budget: "Budget",
      perMonth: "Netto pro Monat · 0 Kategorien",
      expensesTitle: "Deine Ausgaben",
      sortBtn: "Nach Betrag sortieren",
      itemsMeta: (n: number, sum: string) => `${n} Posten · ${sum} / Monat`,
      expenses: "Ausgaben",
      surplus: "Überschuss",
    },
    demoItems: [
      ["Wohnen", 1500],
      ["Freizeit & Lifestyle", 600],
      ["Fortbildungen", 535],
      ["Studienkredit", 500],
      ["Essen", 450],
      ["Mobilität", 200],
      ["Versicherungen", 100],
      ["Kleidung", 80],
      ["Gym", 50],
    ] as [string, number][],
    demoIncome: 4275,
  },

  benefits: {
    eyebrow: "Warum Budget Visualizer",
    titleA: "Weniger Reibung.",
    titleB: "Mehr Klarheit.",
    desc: "Die meisten Budgets scheitern nicht am Rechnen, sondern am Anfangen. Deshalb liegt zwischen dir und deiner ersten Zahl keine Hürde.",
    cards: [
      {
        kpi: "2 Felder",
        title: "Vom Nullpunkt zum Aha-Moment",
        desc: "Andere Tools wollen erst dein Bankkonto, deine E-Mail und dein Passwort. Hier reichen zwei Zahlen – und du siehst sofort, was sie bedeuten.",
      },
      {
        kpi: "100 %",
        title: "Deine Daten. Dein Browser.",
        desc: "Es gibt keinen Server, der dein Budget speichert. Was du eintippst, bleibt bei dir – und verschwindet, wenn du es willst.",
      },
      {
        kpi: "1 Bild",
        title: "Ein Bild statt 40 Zeilen",
        desc: "Der schräge Balken zeigt Proportionen, die eine Tabelle versteckt: Wohnen frisst 35 %, Freizeit 14 %, übrig bleibt der gelbe Rest.",
      },
    ],
    tableCaption: "Vergleich: Budget Visualizer, Excel-Tabelle und Banking-App",
    colUs: "Budget Visualizer",
    colExcel: "Excel-Tabelle",
    colBank: "Banking-App",
    yes: "Ja",
    no: "Nein",
    rows: [
      { label: "Start ohne Anmeldung", us: true, excel: true, bank: false },
      { label: "Visualisierung in Echtzeit", us: true, excel: false, bank: "teilweise" },
      { label: "Keine Bank-Verknüpfung nötig", us: true, excel: true, bank: false },
      { label: "Überschuss pro Tag", us: true, excel: false, bank: false },
      { label: "PDF- & Story-Export", us: true, excel: "umständlich", bank: false },
      { label: "Einrichtung", us: "2 Eingaben", excel: "30+ Min.", bank: "Tage" },
    ] as { label: string; us: string | boolean; excel: string | boolean; bank: string | boolean }[],
  },

  principles: {
    eyebrow: "Prinzipien",
    titleA: "Was dieses Tool bewusst",
    titleB: "nicht macht.",
    desc: "Ein Budget-Tool wird nicht dadurch besser, dass es mehr kann. Diese Entscheidungen sind der eigentliche Produktkern.",
    cards: [
      {
        title: "Es liest dein Bankkonto nicht.",
        text: "Keine Verknüpfung, kein Open Banking, keine Kontovollmacht. Du tippst deine Zahlen selbst ein – das dauert zwei Minuten und du weißt danach genau, was drinsteht. Automatisch importierte Kategorien sehen ordentlich aus und stimmen selten.",
        big: true,
      },
      {
        title: "Es speichert nichts.",
        text: "Es gibt keinen Server, kein Konto, keine Datenbank. Dein Budget liegt im localStorage deines Browsers.",
      },
      {
        title: "Es bewertet dich nicht.",
        text: "Keine Punktzahl, keine roten Warnhinweise, keine Belehrung über deine Miete. Nur die Proportionen.",
      },
      {
        title: "Es erinnert dich nicht.",
        text: "Keine Push-Nachrichten, keine E-Mails, keine Streak. Du kommst wieder, wenn du willst – oder nie.",
      },
      {
        title: "Es verkauft dir nichts.",
        text: "Keine Werbung, keine Partnerangebote für Depots oder Kredite, keine Affiliate-Links im Budget.",
      },
    ],
  },

  price: {
    eyebrow: "Preis",
    titleA: "Kostenlos.",
    titleB: "Für immer.",
    desc: "Kein Trial, das abläuft. Keine Funktion, die hinter einer Bezahlschranke wartet. Das Projekt finanziert sich nicht über dich.",
    planName: "Alles inklusive",
    planPrice: "0 €",
    planPeriod: "für immer",
    features: [
      "Unbegrenzte Posten",
      "Monats- und Jahresansicht",
      "Überschuss, Sparquote, größter Posten",
      "PDF-Report & Instagram-Stories",
      "Teilen-Link mit deinem Budget",
      "Deutsch und Englisch",
      "Hell und Dunkel",
      "Kein Konto nötig",
    ],
    cta: "Budget visualisieren",
    betaTitle: "Offene Beta",
    betaText:
      "Das Tool ist funktionsfähig, aber jung. Was als Nächstes gebaut wird, entscheidet dein Feedback – nicht eine Roadmap.",
    betaCta: "Sag mir, was fehlt",
    supportText: "Wenn du das Projekt unterstützen willst, geht das ohne Geld:",
    supportCta: "Projekt unterstützen",
  },

  faq: {
    eyebrow: "FAQ",
    titleA: "Offene Fragen?",
    titleB: "Kurze Antworten.",
    desc: "Alles, was Menschen fragen, bevor sie ihre erste Zahl eintippen.",
    items: [
      {
        q: "Muss ich mich anmelden oder mein Bankkonto verbinden?",
        a: "Nein. Du trägst dein Netto und deine Ausgaben selbst ein – das dauert Sekunden und du behältst die volle Kontrolle. Kein Konto, keine E-Mail, keine Bank-Verknüpfung.",
      },
      {
        q: "Wo werden meine Daten gespeichert?",
        a: "Ausschließlich lokal in deinem Browser. Es gibt keinen Server, der dein Budget kennt. Wenn du einen Teilen-Link erstellst, sind die Zahlen im Link selbst kodiert – nicht bei mir gespeichert.",
      },
      {
        q: "Was ist, wenn ich mein Netto nicht genau weiß?",
        a: "Trag eine Schätzung ein. Du kannst die Zahl jederzeit ändern und die Visualisierung passt sich sofort an. Die Zahl vom letzten Kontoauszug reicht für den Anfang.",
      },
      {
        q: "Ist das wirklich dauerhaft kostenlos?",
        a: "Ja. Es gibt keine kostenpflichtige Version, keinen Tarif und keinen Zahlungsanbieter. Das Projekt ist ein Nebenprojekt und soll eins bleiben.",
      },
      {
        q: "Kann ich mein Budget teilen oder exportieren?",
        a: "Ja: als PDF-Report, als Instagram-Story im Hochformat oder als Link. Der Link enthält dein Budget und lässt sich von jedem öffnen – praktisch für Partner:in, WG oder Finanzcoach. Wer den Link hat, sieht deine Zahlen.",
      },
      {
        q: "Funktioniert das auch auf dem Handy?",
        a: "Ja, die Oberfläche ist mobile-first gebaut. Visualisierung, Eingaben und Export funktionieren in jedem aktuellen Smartphone-Browser – ohne App-Download.",
      },
    ],
  },

  cta: {
    kicker: "Bereit für deine erste Zahl?",
    title: "Zwei Eingaben. Ein Bild.",
    desc: "Netto eintragen. Erste Ausgabe hinzufügen. Sehen, was übrig bleibt. Mehr braucht es nicht, um anzufangen.",
  },

  starter: {
    eyebrow: "Jetzt starten · 2 Eingaben, fertig",
    titleA: "Dein erstes Budget –",
    titleB: "direkt hier, direkt jetzt.",
    lead: "Trag dein monatliches Netto ein und füge eine erste Ausgabe hinzu. Die Visualisierung baut sich live auf – kein Konto, keine App, nichts verlässt deinen Browser.",
    step1Title: "Dein Einkommen",
    step1Desc: "Monatliches Netto – was auf dem Konto landet.",
    incomeLabel: "Monatliches Netto",
    incomePlaceholder: "z. B. 3200",
    step2TitleFirst: "Deine erste Ausgabe",
    step2TitleMore: "Weitere Ausgabe",
    step2Desc: "Fang mit dem größten Posten an – meistens die Miete.",
    nameLabel: "Bezeichnung",
    namePlaceholder: "z. B. Miete",
    amountLabel: "Betrag",
    addBtn: "Hinzufügen",
    quickAdd: "Schnell hinzufügen",
    errNoName: "Gib deiner Ausgabe einen Namen – z. B. Miete.",
    errNoAmount: "Trag einen Betrag größer als 0 ein.",
    cardLabel: "Dein Budget · Monat",
    live: "Live",
    emptyHint: "Hier erscheint deine Visualisierung – sobald du dein Netto eingetragen hast.",
    hintIncomeFirst: "Trag oben dein Netto ein",
    perMonth: "Netto pro Monat",
    statExpenses: "Ausgaben",
    statSurplus: "Überschuss",
    statRate: "Sparquote",
    statTop: "Größter Posten",
    ofNet: "des Nettos",
    perDayFree: "pro Tag frei",
    overspent: "Mehr Ausgaben als Netto",
    rateStrong: "Über 20 % – stark",
    rateOk: "Über 10 %",
    rateLow: "Unter 10 %",
    notDistributed: "Noch nicht verteilt",
    surplusLabel: "Überschuss",
    removeLabel: (name: string) => `${name} entfernen`,
    doneKicker: "Geschafft",
    doneTitle: "Dein Budget lebt.",
    doneDesc:
      "Nimm es mit in den vollständigen Visualizer – mit Jahresansicht, Dark Mode, PDF-Report, Instagram-Stories und Teilen-Link. Deine Eingaben kommen mit.",
    doneCta: "Im Visualizer weitermachen",
    categoriesOne: "Kategorie",
    categoriesMany: "Kategorien",
  },
};

export type HomeDict = typeof homeDe;
