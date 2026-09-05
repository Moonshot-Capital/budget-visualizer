/* Deutsche Texte. Dieses Objekt ist die Referenz – `en.ts` wird gegen
   `typeof de` geprüft, fehlende oder überzählige Keys sind ein Compilerfehler. */

export const de = {
  common: {
    brand: "Budget Visualizer",
    tagline: "Sieh, wohin dein Geld geht.",
    ctaPrimary: "Budget visualisieren",
    ctaOpenApp: "Visualizer öffnen",
    ctaTry: "Einfach ausprobieren",
    betaNote: "Kostenlose Beta – ohne Konto, ohne Werbung. Alles bleibt in deinem Browser.",
    freeLine: "Kostenlos · Kein Konto · Keine Bank",
    freeLineShort: "Kostenlos · Keine Anmeldung · Läuft im Browser",
    langLabel: "Sprache",
    themeLabel: "Darstellung",
    themeLight: "Hell",
    themeDark: "Dunkel",
    close: "Schließen",
    backToTop: "Nach oben",
  },

  nav: {
    home: "Startseite",
    app: "Visualizer",
    howItWorks: "So funktioniert's",
    blog: "Blog",
    feedback: "Feedback",
    support: "Projekt unterstützen",
    legal: "Impressum & Datenschutz",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    main: "Hauptnavigation",
    sections: {
      features: "Funktionen",
      how: "So funktioniert's",
      principles: "Prinzipien",
      price: "Preis",
      faq: "FAQ",
    },
  },

  footer: {
    about:
      "Das einfachste Werkzeug, um dein Geld zu sehen. Netto rein, Ausgaben rein, Bild raus. Ein Ein-Personen-Projekt in offener Beta.",
    colProduct: "Produkt",
    colResources: "Ressourcen",
    colProject: "Projekt",
    rights: "Alle Rechte vorbehalten.",
    openSource: "Quelltext auf GitHub",
    noTracking: "Kein Tracking, keine Cookies, kein Konto",
  },

  /* --------------------------------------------------------------- App --- */
  app: {
    viewMonth: "Monat",
    viewYear: "Jahr",
    heroSubMonth: "Netto pro Monat",
    heroSubYear: "Netto pro Jahr",
    categories: (n: number) => `${n} ${n === 1 ? "Kategorie" : "Kategorien"}`,
    kpiExpenses: "Ausgaben",
    kpiRate: "Sparquote",
    kpiTop: "Größter Posten",
    ofIncome: "des Einkommens",
    perDay: "pro Tag frei",
    overBudget: "über Budget",
    targetRate: "Ziel: 20 %",
    rateGood: "Stark – über 20 %",
    rateOk: "Solide – 10–20 %",
    rateLow: "Unter 10 %",
    rateNeg: "Kein Puffer",
    surplus: "Überschuss",
    deficit: "Defizit",
    none: "–",

    profileTitle: "Dein Profil",
    jobLabel: "Beruf (optional)",
    jobPlaceholder: "z. B. Designer",
    currencyLabel: "Währung",
    salaryLabel: "Jahresnetto",
    salaryPlaceholder: "z. B. 51300",
    incomeLabel: "Monatliches Netto",

    newExpenseTitle: "Neue Ausgabe",
    expenseNameLabel: "Bezeichnung",
    expenseNamePlaceholder: "z. B. Miete",
    expenseAmountLabel: "Betrag / Monat",
    addExpenseBtn: "Hinzufügen",
    quickAddDesc: "Schnell hinzufügen:",

    yourExpensesTitle: "Deine Ausgaben",
    yourExpensesDesc: "Antippen zum Bearbeiten · Ziehen zum Sortieren",
    listMeta: (n: number, total: string) => `${n} ${n === 1 ? "Posten" : "Posten"} · ${total} / Monat`,
    sortBtn: "Nach Betrag sortieren",

    exportTitle: "Teilen & Exportieren",
    exportDesc: "PDF-Report, Instagram-Stories oder ein Link, der dein Budget enthält.",
    btnPdf: "PDF-Report",
    btnIg: "Instagram-Stories",
    btnShare: "Link kopieren",
    resetBtn: "Alles zurücksetzen",
    offlineNote: "Alles bleibt lokal in deinem Browser.",

    fabAdd: "Ausgabe",
    emptyList: "Noch keine Ausgaben. Füge deine erste hinzu.",
    emptyBar: "Einkommen eintragen",

    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    undo: "Rückgängig",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    edit: "Bearbeiten",

    deleted: (n: string) => `„${n}“ gelöscht`,
    linkCopied: "Link kopiert – enthält dein Budget",
    linkFailed: "Kopieren nicht möglich",
    loadedFromLink: "Budget aus Link geladen",
    loadedFromStarter: "Vom Starter übernommen – hier kannst du weitermachen",
    sorted: "Nach Betrag sortiert",
    resetConfirm: "Alle Daten wirklich zurücksetzen? Das kann nicht rückgängig gemacht werden.",
    resetDone: "Zurückgesetzt",
    exporting: "Wird erstellt …",
    exportFailed: "Export fehlgeschlagen",

    /* Texte, die auf dem Canvas landen (PDF / Stories) */
    totalExpenses: "Gesamtausgaben",
    budgetBreakdown: "Budget-Übersicht",
    yourExpensesCaps: "Deine Ausgaben",
    total: "Gesamt",
    expenseCategories: "Ausgabe-Kategorien",
    report: "Budget-Report",
    income: "Einkommen",
    monthly: "Monatlich",
    yearly: "Jährlich",
    netIncome: "Nettoeinkommen",
    share: "Teilen",
  },

  /* ------------------------------------------------------ So funktioniert's */
  howItWorks: {
    title: "So funktioniert's",
    intro:
      "Vom leeren Feld zur fertigen Visualisierung. Drei Schritte, kein Konto, keine Bank-Verknüpfung – alles passiert in deinem Browser.",
    steps: [
      {
        n: "01",
        title: "Netto eintragen",
        desc: "Deine monatliche Netto-Zahl reicht. Wenn du nur das Jahresnetto kennst, trag das ein – der Monatswert wird daraus berechnet. Beruf und Währung sind optional.",
      },
      {
        n: "02",
        title: "Ausgaben hinzufügen",
        desc: "Bezeichnung und Betrag eintippen oder eine der Schnell-Kategorien antippen. Jede Zeile verändert das Bild sofort. Reihenfolge per Ziehen oder mit den Pfeilen ändern.",
      },
      {
        n: "03",
        title: "Verstehen & teilen",
        desc: "Überschuss, Sparquote und größter Posten stehen oben. Unten wechselst du zwischen Monat und Jahr. Exportieren kannst du als PDF, als Instagram-Story oder als Link.",
      },
    ],
    detailsTitle: "Gut zu wissen",
    details: [
      {
        title: "Wo deine Daten liegen",
        body: "Im localStorage deines Browsers – sonst nirgends. Es gibt keinen Server, der dein Budget kennt. Löschst du die Website-Daten, ist das Budget weg.",
      },
      {
        title: "Was der Teilen-Link enthält",
        body: "Dein komplettes Budget, kodiert im Link selbst (hinter dem #). Wer den Link hat, sieht deine Zahlen – teile ihn also bewusst.",
      },
      {
        title: "Monat und Jahr",
        body: "Alle Beträge trägst du pro Monat ein. Die Jahresansicht multipliziert mit zwölf – praktisch, um zu sehen, was ein Abo wirklich kostet.",
      },
      {
        title: "Defizit",
        body: "Sind die Ausgaben höher als das Einkommen, skaliert der Balken auf die Ausgaben und das Defizit erscheint rot am Ende.",
      },
      {
        title: "Offline",
        body: "Nach dem ersten Laden funktioniert alles ohne Netz. Nur die Schriftart kommt aus dem Web – fehlt sie, wird die Systemschrift verwendet.",
      },
      {
        title: "Tastatur",
        body: "Alle Bedienelemente sind mit Tab erreichbar, Segmente öffnen sich mit Enter, Escape schließt Dialoge und bricht das Bearbeiten ab.",
      },
    ],
    cta: "Visualizer öffnen",
  },

  /* ---------------------------------------------------------------- Blog --- */
  blog: {
    title: "Blog",
    intro:
      "Gedanken zu Geld, Fixkosten und dem Projekt – kurz, ehrlich, ohne Finanz-Blabla. Neue Artikel erscheinen, wenn es etwas zu sagen gibt.",
    readMore: "Weiterlesen",
    back: "← Zur Übersicht",
    minutes: (n: number) => `${n} Min. Lesezeit`,
  },

  /* ------------------------------------------------------------ Feedback --- */
  feedback: {
    eyebrow: "Beta",
    title: "Dein Feedback zählt.",
    intro:
      "Der Budget Visualizer ist eine offene Beta. Was hier als Nächstes gebaut wird, entscheidet nicht ein Plan – sondern das, was du mir schreibst. Zwei Minuten reichen.",
    cardFeedbackTitle: "Feedback schreiben",
    cardFeedbackDesc: "Öffnet dein Mailprogramm mit einer vorbereiteten Vorlage.",
    cardBugTitle: "Fehler melden",
    cardBugDesc: "Etwas funktioniert nicht? Beschreib kurz, was passiert ist.",
    cardCopyTitle: "Vorlage kopieren",
    cardCopyDesc: "Lieber selbst schreiben? Kopier die Fragen in die Zwischenablage.",
    copied: "Vorlage kopiert",
    questionsTitle: "Die fünf Fragen",
    questions: [
      "Was hat dir gefallen?",
      "Was war unklar oder hat nicht funktioniert?",
      "Welche Funktion fehlt dir am meisten?",
      "Auf welchem Gerät und in welchem Browser hast du es benutzt?",
      "Darf dein Feedback anonymisiert im Blog zitiert werden?",
    ],
    privacyNote:
      "Deine Nachricht geht direkt an mich. Es gibt kein Formular, keinen Tracker, keine Datenbank – nur eine E-Mail von dir an mich. Ausgewähltes Feedback erscheint anonymisiert im Blog, wenn du zustimmst.",
    mailFeedbackSubject: "Feedback zum Budget Visualizer",
    mailFeedbackBody: `Hallo Markus,

hier mein Feedback zum Budget Visualizer:

1) Was hat mir gefallen?


2) Was war unklar oder hat nicht funktioniert?


3) Welche Funktion fehlt mir am meisten?


4) Genutzt auf (Handy / Desktop, Browser):


5) Darf mein Feedback anonymisiert im Blog zitiert werden? (Ja / Nein)


Viele Grüße`,
    mailBugSubject: "Fehler im Budget Visualizer",
    mailBugBody: `Hallo Markus,

mir ist ein Fehler aufgefallen:

Was habe ich gemacht?


Was ist passiert?


Was hätte passieren sollen?


Gerät / Browser:


Viele Grüße`,
  },

  /* ------------------------------------------------------------- Support --- */
  support: {
    eyebrow: "Unabhängig",
    title: "Projekt unterstützen",
    intro:
      "Der Budget Visualizer ist kostenlos, werbefrei und sammelt keine Daten. Damit das so bleibt, brauche ich kein Investment – sondern Menschen, die das Tool nutzen, weitersagen und ehrlich sagen, was fehlt.",
    cardFeedbackTitle: "Feedback geben",
    cardFeedbackDesc: "Der wertvollste Beitrag: zwei Minuten ehrliche Rückmeldung.",
    cardShareTitle: "Weiterempfehlen",
    cardShareDesc: "Teile den Link mit jemandem, der gerade seinen Überblick sucht.",
    cardShareBtn: "Link teilen",
    shared: "Link kopiert",
    cardDonateTitle: "Spenden",
    cardDonateDesc: "Noch nicht eingerichtet – es gibt bewusst keinen Zahlungsanbieter, solange das Projekt in der Beta ist.",
    soon: "Kommt später",
    useTitle: "Wofür das Geld später gebraucht wird",
    useItems: [
      "Domain und Hosting – aktuell im niedrigen einstelligen Bereich pro Monat.",
      "Ein Entwicklungsgerät zum Testen auf echten Android-Telefonen.",
      "Zeit: jede Stunde am Projekt ist eine Stunde, die nicht bezahlt wird.",
    ],
    principleTitle: "Was sich nicht ändern wird",
    principleItems: [
      "Keine Werbung, keine Tracker, keine Datenweitergabe.",
      "Die Grundfunktion bleibt kostenlos und ohne Konto.",
      "Der Quelltext bleibt offen.",
    ],
  },

  /* --------------------------------------------------------------- Legal --- */
  legal: {
    title: "Impressum & Datenschutz",
    intro: "Angaben nach § 5 TMG bzw. § 5 ECG sowie Informationen zur Datenverarbeitung.",
    placeholderWarning:
      "Diese Seite enthält Platzhalter. Trage deine echten Angaben ein, bevor die Seite öffentlich erreichbar ist – Impressum und Datenschutzerklärung sind für einen öffentlich zugänglichen Auftritt in Deutschland und Österreich verpflichtend.",
    imprintTitle: "Impressum",
    imprintFields: [
      ["Diensteanbieter", "[Firmenname / Vor- und Nachname]"],
      ["Anschrift", "[Straße Hausnummer]\n[PLZ Ort]\n[Land]"],
      ["Vertreten durch", "[Name der vertretungsberechtigten Person]"],
      ["Kontakt", "[E-Mail-Adresse]"],
      ["Registereintrag", "[Registergericht und Registernummer, falls vorhanden]"],
      ["Umsatzsteuer-ID", "[USt-IdNr., falls vorhanden]"],
      ["Verantwortlich für den Inhalt", "[Name und Anschrift]"],
    ] as [string, string][],
    privacyTitle: "Datenschutz",
    privacyIntro:
      "Diese Angaben beschreiben, was diese Seite technisch tut. Prüfe sie gegen deine tatsächliche Hosting-Situation, bevor du sie veröffentlichst.",
    privacyBlocks: [
      {
        title: "Keine Konten, keine Datenbank",
        body: "Der Budget Visualizer hat kein Backend. Es gibt keine Registrierung, keine Anmeldung und keine Datenbank, in der Budgets gespeichert werden.",
      },
      {
        title: "Wo deine Eingaben liegen",
        body: "Einkommen, Ausgaben, Beruf, Währung, Sprache und Theme werden ausschließlich im localStorage deines Browsers gespeichert (Schlüssel „myBudget“). Diese Daten verlassen dein Gerät nicht und werden nicht an einen Server übertragen. Du kannst sie in der App über „Alles zurücksetzen“ oder über die Website-Daten deines Browsers löschen.",
      },
      {
        title: "Teilen-Links",
        body: "Erzeugst du einen Teilen-Link, wird dein Budget in den Link selbst kodiert (hinter dem #). Dieser Teil einer URL wird von Browsern nicht an den Server gesendet. Wer den Link erhält, kann die enthaltenen Zahlen sehen.",
      },
      {
        title: "Keine Cookies, kein Tracking",
        body: "Es werden keine Cookies gesetzt und keine Analyse- oder Tracking-Dienste eingebunden.",
      },
      {
        title: "Externe Schriftart",
        body: "Die Schriftart Inter wird von Google Fonts geladen. Dabei wird deine IP-Adresse an Google übertragen. Wenn du das vermeiden willst, kannst du die Schrift selbst hosten – die Seite funktioniert auch ohne sie und fällt dann auf die Systemschrift zurück.",
      },
      {
        title: "Hosting",
        body: "[Name und Anschrift deines Hosters eintragen, z. B. GitHub Pages – GitHub Inc.] Der Hoster verarbeitet beim Abruf der Seite technisch notwendige Zugriffsdaten wie IP-Adresse, Zeitpunkt und angeforderte Datei.",
      },
      {
        title: "Deine Rechte",
        body: "Da keine personenbezogenen Daten auf einem Server dieses Projekts verarbeitet werden, gibt es hier nichts, worüber Auskunft erteilt oder was gelöscht werden könnte. Für die beim Hoster anfallenden Zugriffsdaten gilt dessen Datenschutzerklärung.",
      },
    ],
  },
};

export type Dict = typeof de;
