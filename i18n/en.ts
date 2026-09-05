import type { Dict } from "./de";

export const en: Dict = {
  common: {
    brand: "Budget Visualizer",
    tagline: "See where your money goes.",
    ctaPrimary: "Visualize my budget",
    ctaOpenApp: "Open the visualizer",
    ctaTry: "Just try it",
    betaNote: "Free beta – no account, no ads. Everything stays in your browser.",
    freeLine: "Free · No account · No bank",
    freeLineShort: "Free · No sign-up · Runs in your browser",
    langLabel: "Language",
    themeLabel: "Appearance",
    themeLight: "Light",
    themeDark: "Dark",
    close: "Close",
    backToTop: "Back to top",
  },

  nav: {
    home: "Home",
    app: "Visualizer",
    howItWorks: "How it works",
    blog: "Blog",
    feedback: "Feedback",
    support: "Support the project",
    legal: "Legal & privacy",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    main: "Main navigation",
    sections: {
      features: "Features",
      how: "How it works",
      principles: "Principles",
      price: "Price",
      faq: "FAQ",
    },
  },

  footer: {
    about:
      "The simplest way to see your money. Income in, expenses in, picture out. A one-person project in open beta.",
    colProduct: "Product",
    colResources: "Resources",
    colProject: "Project",
    rights: "All rights reserved.",
    openSource: "Source on GitHub",
    noTracking: "No tracking, no cookies, no account",
  },

  /* --------------------------------------------------------------- App --- */
  app: {
    viewMonth: "Monthly",
    viewYear: "Yearly",
    heroSubMonth: "Net income per month",
    heroSubYear: "Net income per year",
    categories: (n: number) => `${n} ${n === 1 ? "category" : "categories"}`,
    kpiExpenses: "Expenses",
    kpiRate: "Savings rate",
    kpiTop: "Largest item",
    ofIncome: "of income",
    perDay: "free per day",
    overBudget: "over budget",
    targetRate: "Target: 20%",
    rateGood: "Strong – above 20%",
    rateOk: "Solid – 10–20%",
    rateLow: "Below 10%",
    rateNeg: "No buffer",
    surplus: "Surplus",
    deficit: "Deficit",
    none: "–",

    profileTitle: "Your profile",
    jobLabel: "Job (optional)",
    jobPlaceholder: "e.g. Designer",
    currencyLabel: "Currency",
    salaryLabel: "Annual net salary",
    salaryPlaceholder: "e.g. 51300",
    incomeLabel: "Monthly net income",

    newExpenseTitle: "New expense",
    expenseNameLabel: "Description",
    expenseNamePlaceholder: "e.g. Rent",
    expenseAmountLabel: "Amount / month",
    addExpenseBtn: "Add expense",
    quickAddDesc: "Quick add:",

    yourExpensesTitle: "Your expenses",
    yourExpensesDesc: "Tap to edit · drag to reorder",
    listMeta: (n: number, total: string) => `${n} ${n === 1 ? "item" : "items"} · ${total} / month`,
    sortBtn: "Sort by amount",

    exportTitle: "Share & export",
    exportDesc: "PDF report, Instagram stories, or a link that contains your budget.",
    btnPdf: "PDF report",
    btnIg: "Instagram stories",
    btnShare: "Copy link",
    resetBtn: "Reset all data",
    offlineNote: "Everything is stored locally in your browser.",

    fabAdd: "Add",
    emptyList: "No expenses yet. Add your first one.",
    emptyBar: "Enter your income",

    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    undo: "Undo",
    moveUp: "Move up",
    moveDown: "Move down",
    edit: "Edit",

    deleted: (n: string) => `“${n}” deleted`,
    linkCopied: "Link copied – it contains your budget",
    linkFailed: "Could not copy",
    loadedFromLink: "Budget loaded from link",
    loadedFromStarter: "Brought over from the starter – carry on here",
    sorted: "Sorted by amount",
    resetConfirm: "Really reset all data? This cannot be undone.",
    resetDone: "Reset done",
    exporting: "Creating …",
    exportFailed: "Export failed",

    totalExpenses: "Total expenses",
    budgetBreakdown: "Budget breakdown",
    yourExpensesCaps: "Your expenses",
    total: "Total",
    expenseCategories: "expense categories",
    report: "Budget report",
    income: "Income",
    monthly: "Monthly",
    yearly: "Yearly",
    netIncome: "Net income",
    share: "Share",
  },

  /* ------------------------------------------------------- How it works --- */
  howItWorks: {
    title: "How it works",
    intro:
      "From an empty field to a finished picture. Three steps, no account, no bank connection – everything happens in your browser.",
    steps: [
      {
        n: "01",
        title: "Enter your net income",
        desc: "Your monthly net figure is enough. If you only know the annual number, enter that – the monthly value is derived from it. Job and currency are optional.",
      },
      {
        n: "02",
        title: "Add expenses",
        desc: "Type a name and an amount, or tap one of the quick categories. Every line changes the picture instantly. Reorder by dragging or with the arrows.",
      },
      {
        n: "03",
        title: "Understand & share",
        desc: "Surplus, savings rate and largest item sit at the top. Switch between month and year below. Export as PDF, Instagram story or link.",
      },
    ],
    detailsTitle: "Good to know",
    details: [
      {
        title: "Where your data lives",
        body: "In your browser's localStorage – nowhere else. There is no server that knows your budget. Clear the site data and the budget is gone.",
      },
      {
        title: "What the share link contains",
        body: "Your entire budget, encoded in the link itself (after the #). Anyone with the link can see your numbers, so share it deliberately.",
      },
      {
        title: "Month and year",
        body: "You enter every amount per month. The yearly view multiplies by twelve – handy to see what a subscription really costs.",
      },
      {
        title: "Deficit",
        body: "If expenses exceed income, the bar scales to the expenses and the deficit appears in red at the end.",
      },
      {
        title: "Offline",
        body: "After the first load everything works without a network. Only the typeface comes from the web – without it, the system font is used.",
      },
      {
        title: "Keyboard",
        body: "Every control is reachable with Tab, segments open with Enter, and Escape closes dialogs and cancels editing.",
      },
    ],
    cta: "Open the visualizer",
  },

  /* ---------------------------------------------------------------- Blog --- */
  blog: {
    title: "Blog",
    intro:
      "Thoughts on money, fixed costs and the project – short, honest, no finance jargon. New articles appear when there is something to say.",
    readMore: "Read more",
    back: "← Back to overview",
    minutes: (n: number) => `${n} min read`,
  },

  /* ------------------------------------------------------------ Feedback --- */
  feedback: {
    eyebrow: "Beta",
    title: "Your feedback counts.",
    intro:
      "The Budget Visualizer is an open beta. What gets built next is not decided by a plan – but by what you write to me. Two minutes are enough.",
    cardFeedbackTitle: "Write feedback",
    cardFeedbackDesc: "Opens your mail app with a prepared template.",
    cardBugTitle: "Report a bug",
    cardBugDesc: "Something not working? Describe briefly what happened.",
    cardCopyTitle: "Copy the template",
    cardCopyDesc: "Rather write it yourself? Copy the questions to your clipboard.",
    copied: "Template copied",
    questionsTitle: "The five questions",
    questions: [
      "What did you like?",
      "What was unclear or did not work?",
      "Which feature do you miss most?",
      "Which device and browser did you use?",
      "May your feedback be quoted anonymously on the blog?",
    ],
    privacyNote:
      "Your message goes straight to me. There is no form, no tracker, no database – just an email from you to me. Selected feedback appears anonymised on the blog if you agree.",
    mailFeedbackSubject: "Feedback on the Budget Visualizer",
    mailFeedbackBody: `Hi Markus,

here is my feedback on the Budget Visualizer:

1) What did I like?


2) What was unclear or did not work?


3) Which feature do I miss most?


4) Used on (phone / desktop, browser):


5) May my feedback be quoted anonymously on the blog? (Yes / No)


Best regards`,
    mailBugSubject: "Bug in the Budget Visualizer",
    mailBugBody: `Hi Markus,

I noticed a bug:

What did I do?


What happened?


What should have happened?


Device / browser:


Best regards`,
  },

  /* ------------------------------------------------------------- Support --- */
  support: {
    eyebrow: "Independent",
    title: "Support the project",
    intro:
      "The Budget Visualizer is free, ad-free and collects no data. To keep it that way I don't need investment – I need people who use the tool, spread the word and say honestly what is missing.",
    cardFeedbackTitle: "Give feedback",
    cardFeedbackDesc: "The most valuable contribution: two minutes of honest input.",
    cardShareTitle: "Recommend it",
    cardShareDesc: "Share the link with someone who is looking for an overview right now.",
    cardShareBtn: "Share link",
    shared: "Link copied",
    cardDonateTitle: "Donate",
    cardDonateDesc:
      "Not set up yet – there is deliberately no payment provider while the project is in beta.",
    soon: "Coming later",
    useTitle: "What the money would be used for later",
    useItems: [
      "Domain and hosting – currently a couple of euros a month.",
      "A test device to check the app on real Android phones.",
      "Time: every hour on the project is an hour that isn't paid.",
    ],
    principleTitle: "What will not change",
    principleItems: [
      "No ads, no trackers, no data sharing.",
      "The core stays free and account-free.",
      "The source stays open.",
    ],
  },

  /* --------------------------------------------------------------- Legal --- */
  legal: {
    title: "Legal notice & privacy",
    intro: "Provider identification and information about data processing.",
    placeholderWarning:
      "This page contains placeholders. Fill in your real details before the site goes public – a legal notice and a privacy policy are mandatory for publicly accessible sites in Germany and Austria.",
    imprintTitle: "Legal notice",
    imprintFields: [
      ["Service provider", "[Company name / first and last name]"],
      ["Address", "[Street and number]\n[Postcode City]\n[Country]"],
      ["Represented by", "[Name of the authorised representative]"],
      ["Contact", "[Email address]"],
      ["Register entry", "[Register court and number, if applicable]"],
      ["VAT ID", "[VAT identification number, if applicable]"],
      ["Responsible for content", "[Name and address]"],
    ],
    privacyTitle: "Privacy",
    privacyIntro:
      "This describes what the site technically does. Check it against your actual hosting setup before publishing.",
    privacyBlocks: [
      {
        title: "No accounts, no database",
        body: "The Budget Visualizer has no backend. There is no registration, no login and no database storing budgets.",
      },
      {
        title: "Where your input lives",
        body: "Income, expenses, job, currency, language and theme are stored exclusively in your browser's localStorage (key “myBudget”). This data never leaves your device and is not transmitted to any server. You can delete it in the app via “Reset all data” or through your browser's site data.",
      },
      {
        title: "Share links",
        body: "When you create a share link, your budget is encoded into the link itself (after the #). Browsers do not send that part of a URL to the server. Anyone who receives the link can see the numbers it contains.",
      },
      {
        title: "No cookies, no tracking",
        body: "No cookies are set and no analytics or tracking services are embedded.",
      },
      {
        title: "External typeface",
        body: "The Inter typeface is loaded from Google Fonts, which transmits your IP address to Google. If you want to avoid that, you can self-host the font – the site also works without it and falls back to the system font.",
      },
      {
        title: "Hosting",
        body: "[Enter the name and address of your host, e.g. GitHub Pages – GitHub Inc.] When the page is requested, the host processes technically necessary access data such as IP address, timestamp and the requested file.",
      },
      {
        title: "Your rights",
        body: "Since no personal data is processed on any server belonging to this project, there is nothing here to disclose or delete. The host's own privacy policy applies to the access data it collects.",
      },
    ],
  },
};
