import type { Article } from "./blog.de";

export const blogEn: Article[] = [
  {
    slug: "warum",
    category: "Behind the project",
    date: "2026-09",
    title: "Why a budget visualizer? Because a spreadsheet creates no feeling.",
    teaser:
      "Almost everyone has tried keeping a household budget. And almost everyone stops again after two weeks.",
    minutes: 3,
    blocks: [
      {
        t: "p",
        text: "Almost everyone has tried keeping a household budget. And almost everyone stops again after two weeks. Not because the numbers are missing – but because a spreadsheet shows nothing. €1,240 of rent is one row. Only when that row becomes a block eating a third of your entire bar do you understand: that is the lever.",
      },
      {
        t: "p",
        text: "The Budget Visualizer does exactly that. You enter your income and your largest expenses – done. No account, no app install, no bank connection. The result is a single bar showing your money in proportions. What's left on the right is what you actually have – or what's missing glows red.",
      },
      { t: "h2", text: "The idea comes from watching" },
      {
        t: "p",
        text: "The tool is inspired by formats where people talk openly about their salary and their fixed costs. What fascinates isn't the number itself but the comparison: how much is left for them – and how much for me? That is the question the visualizer answers in seconds.",
      },
      { t: "h2", text: "What the tool deliberately does not do" },
      {
        t: "ul",
        items: [
          { text: "It does not connect to your bank account. Everything stays local in the browser." },
          { text: "It does not want to remind you daily. Once a month is enough." },
          { text: "It shows no ads and sells no data." },
        ],
      },
      {
        t: "note",
        text: "The current version is a free beta. Whether and how it continues is decided by your feedback.",
      },
    ],
  },
  {
    slug: "fixkosten",
    category: "Practice",
    date: "2026-09",
    title: "The 5 fixed costs that really define your budget",
    teaser: "For most people the first five segments make up more than 80% of the bar. Everything after that is fine-tuning.",
    minutes: 3,
    blocks: [
      {
        t: "p",
        text: "You see it immediately in the visualizer: for most people the first five segments make up more than 80% of the bar. Everything after that is fine-tuning.",
      },
      {
        t: "ul",
        items: [
          {
            lead: "Housing",
            text: "Rent or mortgage including utilities. Rule of thumb: below 30% of net income is comfortable, above 40% gets tight.",
          },
          {
            lead: "Mobility",
            text: "Car (leasing, insurance, fuel, maintenance) or public transport. A car almost always costs more than you estimate.",
          },
          {
            lead: "Insurance & pension",
            text: "Health insurance, liability, retirement provision. Boring, but big.",
          },
          {
            lead: "Groceries",
            text: "The block that is easiest to steer, but rarely the largest.",
          },
          {
            lead: "Subscriptions & contracts",
            text: "Phone, internet, streaming, gym. Small individually, often a visible segment together.",
          },
        ],
      },
      {
        t: "p",
        text: "Tip: enter only these five first. If the bar is nearly full already, you know where to start – and that saving on coffee won't do it.",
      },
      {
        t: "note",
        text: "Use the yearly view to see what a segment costs over twelve months. €89 for the gym is €1,068 a year – that number feels different.",
      },
    ],
  },
  {
    slug: "sparquote",
    category: "Understanding numbers",
    date: "2026-09",
    title: "What is a good savings rate – and what does your bar say about it?",
    teaser: "The savings rate is the yellow remainder on the right of your bar, divided by your income.",
    minutes: 2,
    blocks: [
      {
        t: "p",
        text: "The savings rate is the yellow remainder on the right of your bar, divided by your income. The visualizer shows it directly as a metric.",
      },
      { t: "h2", text: "Rough orientation" },
      {
        t: "ul",
        items: [
          {
            lead: "below 5%",
            text: "Any irregularity – a car repair, a back payment – becomes a problem. Goal: build a buffer first.",
          },
          {
            lead: "10–20%",
            text: "Solid. Enough to build an emergency fund and long-term provision in parallel.",
          },
          {
            lead: "above 30%",
            text: "Strong. Worth asking whether the money is working or just sitting in a current account.",
          },
        ],
      },
      {
        t: "p",
        text: "Important: the rate is not a competition. Someone paying €1,600 rent in Munich has a different bar than someone in the countryside. It gets interesting when you compare your bar with yourself – today, in three months, after a move or a raise.",
      },
      {
        t: "note",
        text: "Try it: change a single number in the visualizer – drop the car, add a transit pass – and watch the yellow area move.",
      },
    ],
  },
  {
    slug: "beta",
    category: "Roadmap",
    date: "2026-09",
    title: "The beta is open: what comes next – and what deliberately not yet",
    teaser: "No account, no payment, no bank connection. For now only one thing counts: is the tool useful to you?",
    minutes: 2,
    blocks: [
      {
        t: "p",
        text: "The Budget Visualizer is online as a free beta. Everything works directly in the browser, on a phone as well as on a desktop. Your data stays local on your device.",
      },
      { t: "h2", text: "What is already there" },
      {
        t: "ul",
        items: [
          { text: "Income, expenses, currency – monthly and yearly view" },
          { text: "Metrics: expenses, remainder, savings rate, largest item" },
          { text: "Export as a PDF report and as Instagram stories" },
          { text: "Sharing by link – no server, everything sits in the link itself" },
        ],
      },
      { t: "h2", text: "What is deliberately missing" },
      {
        t: "ul",
        items: [
          { text: "Accounts and cloud synchronisation" },
          { text: "Payment or premium features" },
          { text: "Bank connections or external services" },
        ],
      },
      {
        t: "p",
        text: "The reason is simple: before any of that gets built, I want to know whether the basic principle works for you. That's why there is a feedback page – and if you like the project, you can help it grow on the “Support the project” page.",
      },
    ],
  },
];
