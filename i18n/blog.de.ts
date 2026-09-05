export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: { lead?: string; text: string }[] }
  | { t: "note"; text: string };

export type Article = {
  slug: string;
  category: string;
  date: string;
  title: string;
  teaser: string;
  minutes: number;
  blocks: Block[];
};

export const blogDe: Article[] = [
  {
    slug: "warum",
    category: "Hinter dem Projekt",
    date: "2026-09",
    title: "Warum ein Budget-Visualizer? Weil eine Tabelle kein Gefühl erzeugt.",
    teaser:
      "Fast jeder hat schon einmal versucht, ein Haushaltsbuch zu führen. Und fast jeder hört nach zwei Wochen wieder auf.",
    minutes: 3,
    blocks: [
      {
        t: "p",
        text: "Fast jeder hat schon einmal versucht, ein Haushaltsbuch zu führen. Und fast jeder hört nach zwei Wochen wieder auf. Nicht, weil die Zahlen fehlen – sondern weil eine Tabelle nichts zeigt. 1.240 € Miete sind eine Zeile. Erst wenn diese Zeile zu einem Block wird, der ein Drittel deines gesamten Balkens frisst, versteht man: Das ist der Hebel.",
      },
      {
        t: "p",
        text: "Der Budget Visualizer macht genau das. Du gibst dein Einkommen und deine größten Ausgaben ein – fertig. Kein Konto, keine App-Installation, keine Bankverbindung. Das Ergebnis ist ein einziger Balken, der dein Geld in Proportionen zeigt. Rechts bleibt übrig, was du wirklich zur Verfügung hast – oder rot leuchtet, was fehlt.",
      },
      { t: "h2", text: "Die Idee kommt aus dem Zuschauen" },
      {
        t: "p",
        text: "Inspiriert ist das Tool von Formaten, in denen Menschen offen über ihr Gehalt und ihre Fixkosten sprechen. Was daran fasziniert, ist nicht die Zahl selbst, sondern der Vergleich: Wie viel bleibt bei dem übrig – und wie viel bei mir? Genau diese Frage beantwortet der Visualizer in Sekunden.",
      },
      { t: "h2", text: "Was das Tool bewusst nicht macht" },
      {
        t: "ul",
        items: [
          { text: "Es verbindet sich nicht mit deinem Konto. Alles bleibt lokal im Browser." },
          { text: "Es will dich nicht täglich erinnern. Einmal im Monat reicht." },
          { text: "Es zeigt keine Werbung und verkauft keine Daten." },
        ],
      },
      {
        t: "note",
        text: "Die aktuelle Version ist eine kostenlose Beta. Ob und wie es weitergeht, entscheidet euer Feedback.",
      },
    ],
  },
  {
    slug: "fixkosten",
    category: "Praxis",
    date: "2026-09",
    title: "Die 5 Fixkosten, die dein Budget wirklich bestimmen",
    teaser:
      "Die ersten fünf Segmente machen bei den meisten über 80 % des Balkens aus. Alles danach ist Feinschliff.",
    minutes: 3,
    blocks: [
      {
        t: "p",
        text: "Im Visualizer sieht man es sofort: Die ersten fünf Segmente machen bei den meisten über 80 % des Balkens aus. Alles danach ist Feinschliff.",
      },
      {
        t: "ul",
        items: [
          {
            lead: "Wohnen",
            text: "Miete oder Kredit inklusive Nebenkosten. Faustregel: unter 30 % des Nettos ist entspannt, über 40 % wird eng.",
          },
          {
            lead: "Mobilität",
            text: "Auto (Leasing, Versicherung, Sprit, Wartung) oder ÖPNV. Ein Auto kostet fast immer mehr, als man schätzt.",
          },
          {
            lead: "Versicherungen & Vorsorge",
            text: "Krankenversicherung, Haftpflicht, Altersvorsorge. Langweilig, aber groß.",
          },
          {
            lead: "Lebensmittel",
            text: "Der Block, der sich am leichtesten steuern lässt, aber selten der größte ist.",
          },
          {
            lead: "Abos & Verträge",
            text: "Handy, Internet, Streaming, Fitness. Einzeln klein, zusammen oft ein sichtbares Segment.",
          },
        ],
      },
      {
        t: "p",
        text: "Tipp: Trag zuerst nur diese fünf ein. Wenn der Balken schon jetzt fast voll ist, weißt du, wo du ansetzen musst – und dass Sparen beim Kaffee nichts bringt.",
      },
      {
        t: "note",
        text: "Nutze die Jahresansicht, um zu sehen, was ein Segment über zwölf Monate kostet. 89 € Fitnessstudio sind 1.068 € im Jahr – diese Zahl fühlt sich anders an.",
      },
    ],
  },
  {
    slug: "sparquote",
    category: "Zahlen verstehen",
    date: "2026-09",
    title: "Was ist eine gute Sparquote – und was sagt dein Balken darüber?",
    teaser: "Die Sparquote ist der gelbe Rest ganz rechts in deinem Balken, geteilt durch dein Einkommen.",
    minutes: 2,
    blocks: [
      {
        t: "p",
        text: "Die Sparquote ist der gelbe Rest ganz rechts in deinem Balken, geteilt durch dein Einkommen. Der Visualizer zeigt sie dir direkt als Kennzahl.",
      },
      { t: "h2", text: "Grobe Orientierung" },
      {
        t: "ul",
        items: [
          {
            lead: "unter 5 %",
            text: "Jede Unregelmäßigkeit – Autoreparatur, Nachzahlung – wird zum Problem. Ziel: erst Puffer aufbauen.",
          },
          {
            lead: "10–20 %",
            text: "Solide. Damit lassen sich Notgroschen und langfristige Vorsorge parallel bedienen.",
          },
          {
            lead: "über 30 %",
            text: "Stark. Hier lohnt sich die Frage, ob das Geld arbeitet oder nur auf dem Girokonto liegt.",
          },
        ],
      },
      {
        t: "p",
        text: "Wichtig: Die Quote ist kein Wettbewerb. Wer in München 1.600 € Miete zahlt, hat einen anderen Balken als jemand auf dem Land. Spannend wird es, wenn du deinen Balken mit dir selbst vergleichst – heute, in drei Monaten, nach einem Umzug oder einer Gehaltserhöhung.",
      },
      {
        t: "note",
        text: "Probier es aus: Ändere im Visualizer nur eine Zahl – z. B. das Auto raus, ÖPNV rein – und beobachte, wie sich der gelbe Bereich bewegt.",
      },
    ],
  },
  {
    slug: "beta",
    category: "Roadmap",
    date: "2026-09",
    title: "Die Beta ist offen: Was jetzt kommt – und was bewusst noch nicht",
    teaser:
      "Kein Konto, keine Bezahlung, keine Bank-Anbindung. Erst mal zählt nur eins: Ist das Tool für euch nützlich?",
    minutes: 2,
    blocks: [
      {
        t: "p",
        text: "Der Budget Visualizer ist als kostenlose Beta online. Alles funktioniert direkt im Browser, auf dem Handy wie am Desktop. Deine Daten bleiben lokal auf deinem Gerät.",
      },
      { t: "h2", text: "Was schon da ist" },
      {
        t: "ul",
        items: [
          { text: "Einkommen, Ausgaben, Währung – Monats- und Jahresansicht" },
          { text: "Kennzahlen: Ausgaben, Rest, Sparquote, größter Posten" },
          { text: "Export als PDF-Report und als Instagram-Stories" },
          { text: "Teilen per Link – ohne Server, alles steckt im Link selbst" },
        ],
      },
      { t: "h2", text: "Was bewusst noch fehlt" },
      {
        t: "ul",
        items: [
          { text: "Konten und Cloud-Synchronisation" },
          { text: "Bezahlfunktionen oder Premium-Features" },
          { text: "Bank-Anbindungen oder externe Dienste" },
        ],
      },
      {
        t: "p",
        text: "Der Grund ist einfach: Bevor irgendetwas davon gebaut wird, will ich wissen, ob das Grundprinzip für euch funktioniert. Deshalb gibt es die Feedback-Seite – und wer das Projekt gut findet, kann es auf der Seite „Projekt unterstützen“ weiterbringen.",
      },
    ],
  },
];
