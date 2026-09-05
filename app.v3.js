/* ===========================================================================
   Budget Visualizer – app.js
   Vanilla JS, no build step. State lives in localStorage ("myBudget").
   =========================================================================== */
(() => {
    'use strict';

    /* ------------------------------------------------------------------ i18n */
    const T = {
        de: {
            howItWorks: 'So funktioniert\u2019s', blogLink: 'Blog', feedbackLink: 'Feedback', supportLink: 'Projekt unterst\u00fctzen', navApp: 'Visualizer', navHome: 'Startseite', backLink: '\u2190 Visualizer', footerNote: 'Kostenlose Beta \u2013 ohne Konto, ohne Werbung. Alles bleibt in deinem Browser.',
            viewMonth: 'Monat', viewYear: 'Jahr',
            heroSubMonth: 'Netto pro Monat', heroSubYear: 'Netto pro Jahr',
            categories: (n) => `${n} ${n === 1 ? 'Kategorie' : 'Kategorien'}`,
            kpiExpenses: 'Ausgaben', kpiRate: 'Sparquote', kpiTop: 'Gr\u00f6\u00dfter Posten',
            ofIncome: 'des Einkommens', perDay: 'pro Tag frei', overBudget: '\u00fcber Budget',
            targetRate: 'Ziel: 20 %', rateGood: 'Stark \u2013 \u00fcber 20 %', rateOk: 'Solide \u2013 10\u201320 %', rateLow: 'Unter 10 %', rateNeg: 'Kein Puffer',
            surplus: '\u00dcberschuss', deficit: 'Defizit', none: '\u2013',
            profileTitle: 'Dein Profil', jobLabel: 'Beruf (optional)', jobPlaceholder: 'z. B. Designer',
            currencyLabel: 'W\u00e4hrung', salaryLabel: 'Jahresnetto', salaryPlaceholder: 'z. B. 51300', incomeLabel: 'Monatliches Netto',
            newExpenseTitle: 'Neue Ausgabe', expenseNameLabel: 'Bezeichnung', expenseNamePlaceholder: 'z. B. Miete',
            expenseAmountLabel: 'Betrag / Monat', addExpenseBtn: 'Hinzuf\u00fcgen', quickAddDesc: 'Schnell hinzuf\u00fcgen:',
            yourExpensesTitle: 'Deine Ausgaben', yourExpensesDesc: 'Antippen zum Bearbeiten \u00b7 Ziehen zum Sortieren',
            listMeta: (n, total) => `${n} ${n === 1 ? 'Posten' : 'Posten'} \u00b7 ${total} / Monat`,
            sortBtn: 'Nach Betrag sortieren',
            exportTitle: 'Teilen & Exportieren', exportDesc: 'PDF-Report, Instagram-Stories oder ein Link, der dein Budget enth\u00e4lt.',
            btnPdf: 'PDF-Report', btnIg: 'Instagram-Stories', btnShare: 'Link kopieren',
            resetBtn: 'Alles zur\u00fccksetzen', offlineNote: 'Alles bleibt lokal in deinem Browser.',
            fabAdd: 'Ausgabe',
            emptyList: 'Noch keine Ausgaben. F\u00fcge deine erste hinzu.',
            emptyBar: 'Einkommen eintragen',
            save: 'Speichern', cancel: 'Abbrechen', delete: 'L\u00f6schen', undo: 'R\u00fcckg\u00e4ngig', moveUp: 'Nach oben', moveDown: 'Nach unten', edit: 'Bearbeiten',
            deleted: (n) => `\u201e${n}\u201c gel\u00f6scht`,
            linkCopied: 'Link kopiert \u2013 enth\u00e4lt dein Budget', linkFailed: 'Kopieren nicht m\u00f6glich', loadedFromLink: 'Budget aus Link geladen',
            sorted: 'Nach Betrag sortiert', resetConfirm: 'Alle Daten wirklich zur\u00fccksetzen? Das kann nicht r\u00fcckg\u00e4ngig gemacht werden.',
            resetDone: 'Zur\u00fcckgesetzt', pdfLibMissing: 'PDF-Bibliothek nicht geladen (offline?)', exporting: 'Wird erstellt \u2026',
            totalExpenses: 'Gesamtausgaben', budgetBreakdown: 'Budget-\u00dcbersicht', yourExpensesCaps: 'Deine Ausgaben', total: 'Gesamt',
            expenseCategories: 'Ausgabe-Kategorien', report: 'Budget-Report', income: 'Einkommen', monthly: 'Monatlich', yearly: 'J\u00e4hrlich',
            netIncome: 'Nettoeinkommen', share: 'Teilen'
        },
        en: {
            howItWorks: 'How it works', blogLink: 'Blog', feedbackLink: 'Feedback', supportLink: 'Support the project', navApp: 'Visualizer', navHome: 'Home', backLink: '\u2190 Visualizer', footerNote: 'Free beta \u2013 no account, no ads. Everything stays in your browser.',
            viewMonth: 'Monthly', viewYear: 'Yearly',
            heroSubMonth: 'Net income per month', heroSubYear: 'Net income per year',
            categories: (n) => `${n} ${n === 1 ? 'category' : 'categories'}`,
            kpiExpenses: 'Expenses', kpiRate: 'Savings rate', kpiTop: 'Largest item',
            ofIncome: 'of income', perDay: 'free per day', overBudget: 'over budget',
            targetRate: 'Target: 20%', rateGood: 'Strong \u2013 above 20%', rateOk: 'Solid \u2013 10\u201320%', rateLow: 'Below 10%', rateNeg: 'No buffer',
            surplus: 'Surplus', deficit: 'Deficit', none: '\u2013',
            profileTitle: 'Your profile', jobLabel: 'Job (optional)', jobPlaceholder: 'e.g. Designer',
            currencyLabel: 'Currency', salaryLabel: 'Annual net salary', salaryPlaceholder: 'e.g. 51300', incomeLabel: 'Monthly net income',
            newExpenseTitle: 'New expense', expenseNameLabel: 'Description', expenseNamePlaceholder: 'e.g. Rent',
            expenseAmountLabel: 'Amount / month', addExpenseBtn: 'Add expense', quickAddDesc: 'Quick add:',
            yourExpensesTitle: 'Your expenses', yourExpensesDesc: 'Tap to edit \u00b7 drag to reorder',
            listMeta: (n, total) => `${n} ${n === 1 ? 'item' : 'items'} \u00b7 ${total} / month`,
            sortBtn: 'Sort by amount',
            exportTitle: 'Share & export', exportDesc: 'PDF report, Instagram stories, or a link that contains your budget.',
            btnPdf: 'PDF report', btnIg: 'Instagram stories', btnShare: 'Copy link',
            resetBtn: 'Reset all data', offlineNote: 'Everything is stored locally in your browser.',
            fabAdd: 'Add',
            emptyList: 'No expenses yet. Add your first one.',
            emptyBar: 'Enter your income',
            save: 'Save', cancel: 'Cancel', delete: 'Delete', undo: 'Undo', moveUp: 'Move up', moveDown: 'Move down', edit: 'Edit',
            deleted: (n) => `\u201c${n}\u201d deleted`,
            linkCopied: 'Link copied \u2013 it contains your budget', linkFailed: 'Could not copy', loadedFromLink: 'Budget loaded from link',
            sorted: 'Sorted by amount', resetConfirm: 'Really reset all data? This cannot be undone.',
            resetDone: 'Reset done', pdfLibMissing: 'PDF library not loaded (offline?)', exporting: 'Creating \u2026',
            totalExpenses: 'Total expenses', budgetBreakdown: 'Budget breakdown', yourExpensesCaps: 'Your expenses', total: 'Total',
            expenseCategories: 'expense categories', report: 'Budget report', income: 'Income', monthly: 'Monthly', yearly: 'Yearly',
            netIncome: 'Net income', share: 'Share'
        }
    };

    const COMMON = {
        de: ['Miete', 'Essen', 'Mobilit\u00e4t', 'Internet', 'Handy', 'Versicherung', 'Freizeit', 'Gym', 'Abos', 'Sparen'],
        en: ['Rent', 'Food', 'Mobility', 'Internet', 'Phone', 'Insurance', 'Leisure', 'Gym', 'Subs', 'Savings']
    };
    const PAIRS = [
        ['Wohnen', 'Housing'], ['Freizeit & Lifestyle', 'Leisure & Lifestyle'], ['Fortbildungen', 'Education'],
        ['Studienkredit', 'Student Loan'], ['Essen', 'Food'], ['Mobilit\u00e4t', 'Mobility'], ['Versicherungen & Sonstiges', 'Insurance & Misc'],
        ['Kleidung & K\u00f6rperpflege', 'Clothing'], ['Miete', 'Rent'], ['Internet', 'Internet'], ['Handy', 'Phone'], ['Versicherung', 'Insurance'],
        ['Freizeit', 'Leisure'], ['Auto', 'Car'], ['Gym', 'Gym'], ['Abos', 'Subs'], ['Abo', 'Subs'], ['Sparen', 'Savings']
    ];

    const DEFAULT_DATA = {
        income: 4275, currency: 'USD', lang: 'en', job: '', annualSalary: '', theme: 'auto', view: 'month',
        expenses: [
            { name: 'Housing', amount: 1500 }, { name: 'Leisure & Lifestyle', amount: 600 }, { name: 'Education', amount: 535 },
            { name: 'Student Loan', amount: 500 }, { name: 'Food', amount: 450 }, { name: 'Mobility', amount: 200 },
            { name: 'Insurance & Misc', amount: 100 }, { name: 'Clothing', amount: 80 }
        ]
    };

    /* ------------------------------------------------------------- state */
    const KEY = 'myBudget';
    const uid = () => Math.random().toString(36).slice(2, 9);

    function normalize(b) {
        const out = { ...JSON.parse(JSON.stringify(DEFAULT_DATA)), ...(b || {}) };
        if (!['de', 'en'].includes(out.lang)) out.lang = 'en';
        if (!['month', 'year'].includes(out.view)) out.view = 'month';
        if (!['auto', 'light', 'dark'].includes(out.theme)) out.theme = 'auto';
        out.income = Number(out.income) || 0;
        out.expenses = (Array.isArray(out.expenses) ? out.expenses : []).map(e => ({
            id: e.id || uid(), name: String(e.name || '').slice(0, 60), amount: Math.max(0, Number(e.amount) || 0)
        }));
        return out;
    }

    let budget = normalize(safeParse(localStorage.getItem(KEY)));
    let editingId = null;
    let dragId = null;
    let lastDeleted = null;

    function safeParse(s) { try { return JSON.parse(s); } catch { return null; } }
    function save() { localStorage.setItem(KEY, JSON.stringify(budget)); }

    /* --------------------------------------------------------- helpers */
    const $ = (id) => document.getElementById(id);
    const t = (k, ...a) => { const v = T[budget.lang][k]; return typeof v === 'function' ? v(...a) : (v ?? k); };
    const locale = () => budget.lang === 'en' ? 'en-US' : 'de-DE';
    const fmt = (n, digits = 0) => new Intl.NumberFormat(locale(), { style: 'currency', currency: budget.currency, maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n);
    const sym = () => fmt(0).replace(/[0-9.,\s\u00a0]/g, '');
    const pct = (n) => budget.income > 0 ? (n / budget.income) * 100 : 0;
    const pctText = (n) => new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(pct(n)) + '\u00a0%';
    const mult = () => budget.view === 'year' ? 12 : 1;
    const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;
    const isDark = () => budget.theme === 'dark' || (budget.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    function totals() {
        const totalExpenses = budget.expenses.reduce((s, e) => s + e.amount, 0);
        const balance = budget.income - totalExpenses;
        return { totalExpenses, balance, isDeficit: balance < 0, rate: budget.income > 0 ? balance / budget.income : 0 };
    }

    /* Segment shades: dark→light ramp (light mode) — inverted in dark mode. */
    const RAMP_LIGHT = ['#0a0a0a', '#2b2b2b', '#4a4a4a', '#6a6a6a', '#8a8a8a', '#a8a8a8', '#c4c4c4', '#dcdcdc'];
    const RAMP_DARK = ['#f5f5f5', '#d8d8d8', '#bcbcbc', '#a0a0a0', '#858585', '#6a6a6a', '#525252', '#3d3d3d'];
    const shade = (i) => (isDark() ? RAMP_DARK : RAMP_LIGHT)[i % 8];
    const inkOn = (hex) => { const n = parseInt(hex.slice(1), 16); const l = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)); return l > 140 ? '#0a0a0a' : '#ffffff'; };
    const YELLOW = '#f2ff00', RED = '#ff3d00';

    /* ----------------------------------------------------------- theme */
    function applyTheme() {
        const root = document.documentElement;
        if (budget.theme === 'auto') delete root.dataset.theme; else root.dataset.theme = budget.theme;
    }
    $('themeBtn').addEventListener('click', () => {
        budget.theme = isDark() ? 'light' : 'dark';
        applyTheme(); save(); render();
    });

    /* ------------------------------------------------------------ i18n */
    function translateExpenses(target) {
        const from = target === 'en' ? 0 : 1, to = target === 'en' ? 1 : 0;
        budget.expenses.forEach(e => {
            const p = PAIRS.find(p => p[from].toLowerCase() === e.name.toLowerCase());
            if (p) e.name = p[to];
        });
    }
    function applyLanguage() {
        document.documentElement.lang = budget.lang;
        document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if ((T[budget.lang] || {})[k] !== undefined) el.textContent = t(k); });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === budget.lang));
        translateExpenses(budget.lang);
        renderQuickAdd();
    }
    document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => {
        budget.lang = b.dataset.lang; save(); applyLanguage(); render();
    }));
    document.querySelectorAll('.view-btn').forEach(b => b.addEventListener('click', () => {
        budget.view = b.dataset.view; save(); render();
    }));

    /* ---------------------------------------------------------- render */
    function render() {
        renderHero();
        renderBar();
        renderLegend();
        renderList();
        renderMobileBar();
        document.querySelectorAll('[data-affix="currency"]').forEach(el => el.textContent = sym());
        document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === budget.view));
        save();
    }

    function renderHero() {
        const { totalExpenses, balance, isDeficit, rate } = totals();
        const m = mult();
        $('heroJob').textContent = budget.job ? budget.job : (budget.lang === 'en' ? 'Budget' : 'Budget');
        $('totalDisplay').textContent = fmt(budget.income * m);
        $('heroSub').textContent = `${t(budget.view === 'year' ? 'heroSubYear' : 'heroSubMonth')} \u00b7 ${t('categories', budget.expenses.length)}`;

        $('kpiExpenses').textContent = fmt(totalExpenses * m);
        $('kpiExpensesNote').textContent = budget.income > 0 ? `${pctText(totalExpenses)} ${t('ofIncome')}` : '';

        const bc = $('kpiBalanceCard');
        bc.classList.toggle('is-deficit', isDeficit);
        $('kpiBalanceLabel').textContent = isDeficit ? t('deficit') : t('surplus');
        $('kpiBalance').textContent = (isDeficit ? '\u2212' : '+') + fmt(Math.abs(balance) * m);
        $('kpiBalanceNote').textContent = isDeficit
            ? `${pctText(Math.abs(balance))} ${t('overBudget')}`
            : `${fmt(balance / 30.44, 0)} ${t('perDay')}`;

        const rp = Math.round(rate * 100);
        $('kpiRate').textContent = (rp > 0 ? '' : '') + rp + '\u00a0%';
        $('kpiRateNote').textContent = rp >= 20 ? t('rateGood') : rp >= 10 ? t('rateOk') : rp > 0 ? t('rateLow') : t('rateNeg');

        const top = [...budget.expenses].sort((a, b) => b.amount - a.amount)[0];
        $('kpiTop').textContent = top ? top.name : t('none');
        $('kpiTop').style.fontSize = top && top.name.length > 12 ? (top.name.length > 20 ? '1.05rem' : '1.3rem') : '';
        $('kpiTopNote').textContent = top ? `${fmt(top.amount * m)} \u00b7 ${pctText(top.amount)}` : '';
    }

    function segmentsData() {
        const { balance, isDeficit } = totals();
        const items = budget.expenses.map((e, i) => ({ ...e, i, color: shade(i), isBalance: false }));
        items.push({ id: '__balance', name: isDeficit ? t('deficit') : t('surplus'), amount: Math.abs(balance), i: items.length, color: isDeficit ? RED : YELLOW, isBalance: true, isDeficit });
        return items;
    }

    function renderBar() {
        const bar = $('bar'), top = $('labels-top'), bottom = $('labels-bottom');
        bar.innerHTML = ''; top.innerHTML = ''; bottom.innerHTML = '';
        document.querySelectorAll('.seg-tooltip').forEach(e => e.remove());

        if (!budget.income || budget.income <= 0) {
            bar.innerHTML = `<div class="bar-empty">${esc(t('emptyBar'))}</div>`;
            bar.setAttribute('aria-label', t('emptyBar'));
            $('vizContainer').style.margin = '';
            return;
        }

        const { totalExpenses } = totals();
        const denom = Math.max(budget.income, totalExpenses); // in deficit the bar shows expenses + deficit
        const segs = segmentsData().filter(s => s.amount > 0);
        bar.setAttribute('aria-label', segs.map(s => `${s.name}: ${fmt(s.amount)}`).join(', '));

        segs.forEach((s, order) => {
            const w = (s.amount / denom) * 100;
            const seg = document.createElement('div');
            seg.className = 'segment' + (s.isBalance ? (s.isDeficit ? ' deficit' : ' surplus') : '');
            seg.style.width = w + '%';
            if (!s.isBalance) seg.style.background = s.color;
            seg.style.color = s.isBalance ? '#0a0a0a' : inkOn(s.color);
            seg.dataset.id = s.id;
            seg.tabIndex = 0;
            seg.setAttribute('role', 'button');
            seg.setAttribute('aria-label', `${s.name}: ${fmt(s.amount)} (${pctText(s.amount)})`);
            seg.innerHTML = `<span class="seg-idx">${s.isBalance ? (s.isDeficit ? '\u2212' : '+') : String(s.i + 1).padStart(2, '0')}</span>`;
            bar.appendChild(seg);

            const show = (ev) => { ev.stopPropagation(); showTooltip(seg, s); };
            seg.addEventListener('click', show);
            seg.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); show(ev); } });

            // desktop floating label
            const label = document.createElement('div');
            label.className = 'label' + (s.isBalance ? ' is-balance' : '') + (s.isDeficit ? ' deficit' : '');
            label.dataset.id = s.id;
            label.innerHTML = `<span class="name">${esc(s.name)}</span><span class="value">${s.isBalance ? (s.isDeficit ? '\u2212' : '+') : '\u2212'}${fmt(s.amount * mult())}</span><span class="line"></span>`;
            (order % 2 === 0 ? bottom : top).appendChild(label);

            seg.addEventListener('mouseenter', () => { label.classList.add('active'); });
            seg.addEventListener('mouseleave', () => { label.classList.remove('active'); });
        });

        requestAnimationFrame(() => {
            bar.querySelectorAll('.segment').forEach(seg => seg.classList.toggle("is-narrow", seg.offsetWidth < 38));
            positionLabels();
        });
    }

    function positionLabels() {
        const viz = $('vizContainer');
        if (!isDesktop()) { viz.style.margin = ''; return; }
        const bar = $('bar');
        const labels = [...document.querySelectorAll('.label')];
        if (!labels.length) return;

        // Use untransformed geometry (offset*) so the skew/rotation never distorts the centre.
        const skewDeg = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--skew')) || -14;
        const shift = -Math.tan(skewDeg * Math.PI / 180) * bar.offsetHeight / 2; // top edge moves right, bottom edge left
        const centers = new Map();
        labels.forEach(l => {
            const seg = bar.querySelector(`.segment[data-id="${l.dataset.id}"]`);
            if (!seg) return;
            const cx = seg.offsetLeft + seg.offsetWidth / 2 + (l.parentElement.id === 'labels-top' ? shift : -shift);
            centers.set(l, cx);
            l.style.left = cx + 'px';
            l.style.transform = 'translateX(-50%)';
        });

        const BASE = 44, STEP = 68, GAP = 24;
        let maxTop = 0, maxBottom = 0;
        const process = (side) => {
            const list = [...$(side === 'top' ? 'labels-top' : 'labels-bottom').children]
                .filter(l => centers.has(l))
                .sort((a, b) => centers.get(a) - centers.get(b));
            const lanes = []; // right edge per lane
            list.forEach(l => {
                const w = l.offsetWidth, hgt = l.offsetHeight;
                const left = centers.get(l) - w / 2, right = left + w;
                let lane = 0;
                while (lanes[lane] !== undefined && left < lanes[lane] + GAP) lane++;
                lanes[lane] = right;
                const h = BASE + lane * STEP;
                const line = l.querySelector('.line');
                if (side === 'top') { l.style.bottom = h + 'px'; maxTop = Math.max(maxTop, h + hgt); line.style.bottom = -(h + 6) + 'px'; line.style.height = h + 'px'; }
                else { l.style.top = h + 'px'; maxBottom = Math.max(maxBottom, h + hgt); line.style.top = -(h + 6) + 'px'; line.style.height = h + 'px'; }
            });
        };
        process('top'); process('bottom');
        viz.style.marginTop = Math.max(150, maxTop + 40) + 'px';
        viz.style.marginBottom = Math.max(150, maxBottom + 40) + 'px';
    }

    function showTooltip(seg, s) {
        document.querySelectorAll('.seg-tooltip').forEach(e => e.remove());
        const tip = document.createElement('div');
        tip.className = 'seg-tooltip';
        tip.innerHTML = `<div class="seg-tooltip-name">${esc(s.name)}</div><div class="seg-tooltip-amount">${fmt(s.amount * mult())}</div><div class="seg-tooltip-pct">${pctText(s.amount)} ${esc(t('ofIncome'))}</div><button class="seg-tooltip-close" aria-label="Close">\u00d7</button>`;
        const viz = $('viz');
        viz.style.position = 'relative';
        viz.appendChild(tip);
        const vr = viz.getBoundingClientRect(), sr = seg.getBoundingClientRect();
        const w = Math.min(240, vr.width - 16);
        tip.style.width = w + 'px';
        let left = (sr.left + sr.width / 2) - vr.left - w / 2;
        left = Math.max(8, Math.min(left, vr.width - w - 8));
        tip.style.left = left + 'px';
        tip.style.top = (sr.bottom - vr.top + 12) + 'px';
        const close = () => tip.remove();
        tip.querySelector('.seg-tooltip-close').addEventListener('click', close);
        setTimeout(() => document.addEventListener('click', function h(e) { if (!tip.contains(e.target)) { close(); document.removeEventListener('click', h); } }), 0);
        setTimeout(close, 5000);
    }

    function renderLegend() {
        const legend = $('legend');
        legend.innerHTML = '';
        if (!budget.income) return;
        const { totalExpenses } = totals();
        const denom = Math.max(budget.income, totalExpenses);
        segmentsData().filter(s => s.amount > 0).forEach(s => {
            const row = document.createElement('div');
            row.className = 'legend-item' + (s.isBalance ? (s.isDeficit ? ' is-deficit' : ' is-balance') : '');
            row.innerHTML = `
                <span class="legend-idx" style="background:${s.color};color:${s.isBalance ? '#0a0a0a' : inkOn(s.color)}">${s.isBalance ? (s.isDeficit ? '\u2212' : '+') : String(s.i + 1).padStart(2, '0')}</span>
                <span class="legend-name">${esc(s.name)}</span>
                <span class="legend-val">${s.isBalance ? (s.isDeficit ? '\u2212' : '+') : '\u2212'}${fmt(s.amount * mult())}<span class="pct">${pctText(s.amount)}</span></span>
                <span class="legend-track"><span class="legend-fill" style="width:${(s.amount / denom) * 100}%;background:${s.color}"></span></span>`;
            if (!s.isBalance) row.addEventListener('click', () => { startEdit(s.id); });
            legend.appendChild(row);
        });
    }

    function renderList() {
        const list = $('expenseList');
        list.innerHTML = '';
        const { totalExpenses } = totals();
        $('listMeta').textContent = t('listMeta', budget.expenses.length, fmt(totalExpenses));
        $('sortBtn').disabled = budget.expenses.length < 2;

        if (!budget.expenses.length) {
            list.innerHTML = `<div class="empty-state">${esc(t('emptyList'))}</div>`;
            return;
        }
        const maxAmt = Math.max(...budget.expenses.map(e => e.amount), 1);

        budget.expenses.forEach((e, i) => {
            const item = document.createElement('div');
            item.className = 'expense-item' + (editingId === e.id ? ' editing' : '');
            item.dataset.id = e.id;
            item.setAttribute('role', 'listitem');

            if (editingId === e.id) {
                item.innerHTML = `
                    <form class="edit-form">
                        <div class="field"><label for="en-${e.id}">${esc(t('expenseNameLabel'))}</label><input id="en-${e.id}" class="edit-name" type="text" value="${esc(e.name)}" maxlength="60"></div>
                        <div class="field"><label for="ea-${e.id}">${esc(t('expenseAmountLabel'))}</label><div class="input-affix"><input id="ea-${e.id}" class="edit-amount" type="number" inputmode="decimal" min="0" step="any" value="${e.amount}"><span class="affix">${esc(sym())}</span></div></div>
                        <div class="edit-actions">
                            <button type="submit" class="btn btn-primary btn-sm">${esc(t('save'))}</button>
                            <button type="button" class="btn btn-ghost btn-sm cancel">${esc(t('cancel'))}</button>
                        </div>
                    </form>`;
                const form = item.querySelector('form');
                const nameIn = form.querySelector('.edit-name'), amtIn = form.querySelector('.edit-amount');
                form.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    const a = parseFloat(amtIn.value);
                    e.name = nameIn.value.trim() || e.name;
                    if (!isNaN(a) && a >= 0) e.amount = a;
                    editingId = null; render();
                });
                form.querySelector('.cancel').addEventListener('click', () => { editingId = null; render(); });
                form.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { editingId = null; render(); } });
                setTimeout(() => { amtIn.focus(); amtIn.select(); }, 30);
            } else {
                item.draggable = true;
                item.innerHTML = `
                    <span class="exp-idx" style="background:${shade(i)};color:${inkOn(shade(i))}" title="${esc(t('yourExpensesDesc'))}">${String(i + 1).padStart(2, '0')}</span>
                    <div class="exp-main" role="button" tabindex="0" aria-label="${esc(t('edit'))}: ${esc(e.name)}">
                        <span class="exp-name">${esc(e.name)}</span>
                        <span class="exp-amount">${fmt(e.amount)}<span class="pct">${pctText(e.amount)}</span></span>
                    </div>
                    <div class="exp-actions">
                        <button class="mini-btn up" type="button" aria-label="${esc(t('moveUp'))}" ${i === 0 ? 'disabled' : ''}>\u2191</button>
                        <button class="mini-btn down" type="button" aria-label="${esc(t('moveDown'))}" ${i === budget.expenses.length - 1 ? 'disabled' : ''}>\u2193</button>
                        <button class="mini-btn danger del" type="button" aria-label="${esc(t('delete'))}">\u00d7</button>
                    </div>
                    <span class="exp-track"><span class="exp-fill" style="width:${(e.amount / maxAmt) * 100}%;background:${shade(i)}"></span></span>`;
                const main = item.querySelector('.exp-main');
                main.addEventListener('click', () => startEdit(e.id));
                main.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); startEdit(e.id); } });
                item.querySelector('.up').addEventListener('click', () => move(i, i - 1));
                item.querySelector('.down').addEventListener('click', () => move(i, i + 1));
                item.querySelector('.del').addEventListener('click', () => removeExpense(e.id));

                // drag & drop (mouse)
                item.addEventListener('dragstart', (ev) => { dragId = e.id; item.classList.add('dragging'); ev.dataTransfer.effectAllowed = 'move'; });
                item.addEventListener('dragover', (ev) => { ev.preventDefault(); item.classList.add('drop-target'); });
                item.addEventListener('dragleave', () => item.classList.remove('drop-target'));
                item.addEventListener('drop', (ev) => {
                    ev.preventDefault(); item.classList.remove('drop-target');
                    const from = budget.expenses.findIndex(x => x.id === dragId), to = i;
                    if (from < 0 || from === to) return;
                    move(from, to);
                });
                item.addEventListener('dragend', () => { item.classList.remove('dragging'); dragId = null; });
            }
            list.appendChild(item);
        });
    }

    function renderMobileBar() {
        const { balance, isDeficit } = totals();
        $('mobileBarLabel').textContent = isDeficit ? t('deficit') : t('surplus');
        const v = $('mobileBarValue');
        v.textContent = (isDeficit ? '\u2212' : '+') + fmt(Math.abs(balance) * mult());
        v.classList.toggle('is-deficit', isDeficit);
    }

    function renderQuickAdd() {
        const c = $('quickAddContainer');
        c.innerHTML = '';
        COMMON[budget.lang].forEach(name => {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'chip'; b.textContent = name;
            b.addEventListener('click', () => {
                $('expenseName').value = name;
                $('expenseAmount').focus();
            });
            c.appendChild(b);
        });
    }

    /* --------------------------------------------------------- actions */
    function startEdit(id) {
        editingId = id; render();
        const el = document.querySelector(`.expense-item[data-id="${id}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function move(from, to) {
        if (to < 0 || to >= budget.expenses.length) return;
        const [it] = budget.expenses.splice(from, 1);
        budget.expenses.splice(to, 0, it);
        render();
    }
    function removeExpense(id) {
        const idx = budget.expenses.findIndex(e => e.id === id);
        if (idx < 0) return;
        lastDeleted = { item: budget.expenses[idx], idx };
        budget.expenses.splice(idx, 1);
        render();
        toast(t('deleted', lastDeleted.item.name), t('undo'), () => {
            if (!lastDeleted) return;
            budget.expenses.splice(Math.min(lastDeleted.idx, budget.expenses.length), 0, lastDeleted.item);
            lastDeleted = null; render();
        });
    }

    $('addForm').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = $('expenseName').value.trim();
        const amount = parseFloat($('expenseAmount').value);
        if (!name) { $('expenseName').focus(); return; }
        if (isNaN(amount) || amount < 0) { $('expenseAmount').focus(); return; }
        const e = { id: uid(), name: name.slice(0, 60), amount };
        budget.expenses.push(e);
        $('expenseName').value = ''; $('expenseAmount').value = '';
        render();
        closeSheet();
        const el = document.querySelector(`.expense-item[data-id="${e.id}"]`);
        if (el) { el.classList.add('is-new'); if (!isDesktop()) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        if (isDesktop()) $('expenseName').focus();
    });

    $('sortBtn').addEventListener('click', () => {
        budget.expenses.sort((a, b) => b.amount - a.amount);
        render(); toast(t('sorted'));
    });

    $('incomeInput').addEventListener('input', (e) => {
        const v = parseFloat(e.target.value);
        budget.income = isNaN(v) ? 0 : v;
        budget.annualSalary = isNaN(v) ? '' : Math.round(v * 12);
        $('annualSalaryInput').value = budget.annualSalary;
        render();
    });
    $('annualSalaryInput').addEventListener('input', (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) { budget.annualSalary = v; budget.income = Math.round(v / 12); $('incomeInput').value = budget.income; }
        else budget.annualSalary = '';
        render();
    });
    $('jobInput').addEventListener('input', (e) => { budget.job = e.target.value.slice(0, 40); renderHero(); save(); });
    $('currencyInput').addEventListener('change', (e) => { budget.currency = e.target.value; render(); });

    $('btnReset').addEventListener('click', () => {
        if (!confirm(t('resetConfirm'))) return;
        const lang = budget.lang, theme = budget.theme;
        localStorage.removeItem(KEY);
        budget = normalize({ ...DEFAULT_DATA, lang, theme });
        fillInputs(); applyLanguage(); render(); toast(t('resetDone'));
    });

    /* ----------------------------------------------------- bottom sheet */
    function openSheet() {
        $('addCard').classList.add('open'); $('sheetBackdrop').hidden = false;
        document.body.style.overflow = 'hidden';
        setTimeout(() => $('expenseName').focus(), 200);
    }
    function closeSheet() {
        $('addCard').classList.remove('open'); $('sheetBackdrop').hidden = true;
        document.body.style.overflow = '';
    }
    $('fabAdd').addEventListener('click', openSheet);
    $('sheetClose').addEventListener('click', closeSheet);
    $('sheetBackdrop').addEventListener('click', closeSheet);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('addCard').classList.contains('open')) closeSheet(); });

    /* ------------------------------------------------------------ toast */
    let toastTimer;
    function toast(msg, actionLabel, onAction) {
        const el = $('toast'), act = $('toastAction');
        $('toastText').textContent = msg;
        el.hidden = false;
        if (actionLabel) { act.hidden = false; act.textContent = actionLabel; act.onclick = () => { onAction(); el.hidden = true; }; }
        else { act.hidden = true; act.onclick = null; }
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { el.hidden = true; }, 5000);
    }

    /* ------------------------------------------------------- share link */
    function encodeState() {
        const slim = { i: budget.income, c: budget.currency, l: budget.lang, j: budget.job, e: budget.expenses.map(e => [e.name, e.amount]) };
        return btoa(unescape(encodeURIComponent(JSON.stringify(slim)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    function decodeState(s) {
        try {
            const json = decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))));
            const o = JSON.parse(json);
            return normalize({ income: o.i, currency: o.c, lang: o.l, job: o.j, expenses: (o.e || []).map(([name, amount]) => ({ name, amount })), theme: budget.theme });
        } catch { return null; }
    }
    $('btnShare').addEventListener('click', async () => {
        const url = location.origin + location.pathname + '#b=' + encodeState();
        try {
            if (navigator.share && !isDesktop()) { await navigator.share({ title: 'Budget Visualizer', url }); return; }
            await navigator.clipboard.writeText(url);
            toast(t('linkCopied'));
        } catch { toast(t('linkFailed')); }
    });

    /* ---------------------------------------------------- canvas export */
    function drawSkewBar(ctx, x, y, w, h, segs, denom) {
        const skew = Math.tan(14 * Math.PI / 180) * h;
        const gap = 4;
        let cur = x + skew;
        segs.forEach(s => {
            const sw = (s.amount / denom) * (w - skew) - gap;
            if (sw <= 0.5) { cur += sw + gap; return; }
            ctx.beginPath();
            ctx.moveTo(cur, y + h); ctx.lineTo(cur + sw, y + h); ctx.lineTo(cur + sw - skew, y); ctx.lineTo(cur - skew, y);
            ctx.closePath(); ctx.fillStyle = s.color; ctx.fill();
            cur += sw + gap;
        });
    }
    function exportSegments(dark) {
        const { totalExpenses, balance, isDeficit } = totals();
        const ramp = dark ? RAMP_DARK : RAMP_LIGHT;
        const segs = budget.expenses.map((e, i) => ({ ...e, color: ramp[i % 8], isBalance: false }));
        segs.push({ name: isDeficit ? t('deficit') : t('surplus'), amount: Math.abs(balance), color: isDeficit ? RED : YELLOW, isBalance: true, isDeficit });
        return { segs: segs.filter(s => s.amount > 0), denom: Math.max(budget.income, totalExpenses), totalExpenses, balance, isDeficit };
    }
    const F = (w, px) => `${w} ${px}px Inter, system-ui, -apple-system, 'Segoe UI', Arial, sans-serif`;
    /* Logo mark (replaces the hand-written signature): yellow square + rising bar, right-aligned at (x, y). */
    function logoMark(ctx, x, y, size, fg) {
        const s = size, u = s / 64;
        ctx.save(); ctx.translate(x, y);
        ctx.fillStyle = YELLOW; ctx.fillRect(4 * u, 4 * u, 56 * u, 56 * u);
        ctx.strokeStyle = fg; ctx.lineWidth = 5 * u; ctx.strokeRect(4 * u, 4 * u, 56 * u, 56 * u);
        ctx.lineWidth = 6 * u; ctx.lineCap = 'square'; ctx.lineJoin = 'miter'; ctx.beginPath();
        ctx.moveTo(16 * u, 46 * u); ctx.lineTo(28 * u, 34 * u); ctx.lineTo(36 * u, 42 * u); ctx.lineTo(50 * u, 22 * u); ctx.stroke();
        ctx.restore();
    }
    function sig(ctx, x, y, color, size = 80) {
        const mark = Math.round(size * 0.7);
        ctx.save(); ctx.fillStyle = color; ctx.font = F(900, Math.round(size * 0.32)); ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText('BUDGET VISUALIZER', x - mark - Math.round(size * 0.2), y - mark / 2);
        ctx.restore();
        logoMark(ctx, x - mark, y - mark, mark, color);
    }
    function brandTag(ctx, x, y, fg) {
        ctx.save();
        ctx.fillStyle = YELLOW; ctx.fillRect(x, y, 22, 22); ctx.strokeStyle = fg; ctx.lineWidth = 3; ctx.strokeRect(x, y, 22, 22);
        ctx.fillStyle = fg; ctx.font = F(900, 28); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('BUDGET VISUALIZER', x + 38, y + 11);
        ctx.restore();
    }

    async function busy(btn, fn) {
        const old = btn.innerHTML; btn.disabled = true; btn.textContent = t('exporting');
        try { await document.fonts.ready; await fn(); } finally { btn.disabled = false; btn.innerHTML = old; }
    }

    // ---- PDF (A4 landscape, drawn on canvas → jsPDF)
    $('btnDownloadPdf').addEventListener('click', () => busy($('btnDownloadPdf'), async () => {
        if (!window.jspdf) { toast(t('pdfLibMissing')); return; }
        const W = 2384, H = 1684, P = 140; // A4 landscape @ ~200dpi
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const ctx = c.getContext('2d');
        const { segs, denom, totalExpenses, balance, isDeficit } = exportSegments(false);
        const m = mult(), period = t(budget.view === 'year' ? 'yearly' : 'monthly');

        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, W, 14);
        brandTag(ctx, P, 90, '#0a0a0a');
        ctx.fillStyle = '#0a0a0a'; ctx.globalAlpha = .5; ctx.font = F(700, 28); ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(`${(budget.job || t('report')).toUpperCase()} \u00b7 ${period.toUpperCase()} \u00b7 ${new Date().toLocaleDateString(locale())}`, W - P, 101);
        ctx.globalAlpha = 1;

        // Headline
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.globalAlpha = .55; ctx.font = F(800, 30); ctx.fillText(t('netIncome').toUpperCase(), P, 200); ctx.globalAlpha = 1;
        ctx.font = F(900, 150); ctx.fillText(fmt(budget.income * m), P - 6, 236);

        // KPI row (right side)
        const kx = W - P - 760, ky = 210, kw = 240;
        [[t('kpiExpenses'), fmt(totalExpenses * m), '#0a0a0a', null],
         [isDeficit ? t('deficit') : t('surplus'), (isDeficit ? '\u2212' : '+') + fmt(Math.abs(balance) * m), '#0a0a0a', isDeficit ? RED : YELLOW],
         [t('kpiRate'), Math.round((balance / (budget.income || 1)) * 100) + ' %', '#0a0a0a', null]].forEach(([l, v, fg, bg], i) => {
            const x = kx + i * (kw + 20);
            if (bg) { ctx.fillStyle = bg; ctx.fillRect(x, ky, kw, 150); }
            ctx.strokeStyle = '#0a0a0a'; ctx.lineWidth = 3; ctx.strokeRect(x, ky, kw, 150);
            ctx.fillStyle = bg === RED ? '#fff' : fg; ctx.globalAlpha = .6; ctx.font = F(800, 22); ctx.fillText(l.toUpperCase(), x + 22, ky + 24); ctx.globalAlpha = 1;
            ctx.font = F(900, 44); ctx.fillText(v, x + 20, ky + 70);
        });

        // Bar
        const by = 470, bh = 170;
        drawSkewBar(ctx, P, by, W - 2 * P, bh, segs, denom);

        // Table
        const ty = by + bh + 90;
        const rows = segs.length;
        const rowH = Math.min(78, (H - ty - 160) / rows);
        ctx.font = F(800, 22); ctx.globalAlpha = .5; ctx.fillStyle = '#0a0a0a';
        ctx.fillText(t('yourExpensesCaps').toUpperCase(), P, ty - 50);
        ctx.textAlign = 'right'; ctx.fillText('%', W - P - 380, ty - 50); ctx.fillText(period.toUpperCase(), W - P, ty - 50); ctx.globalAlpha = 1;
        segs.forEach((s, i) => {
            const y = ty + i * rowH;
            ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(P, y + rowH); ctx.lineTo(W - P, y + rowH); ctx.stroke();
            ctx.fillStyle = s.color; ctx.fillRect(P, y + rowH / 2 - 14, 28, 28); ctx.strokeStyle = '#0a0a0a'; ctx.lineWidth = 2; ctx.strokeRect(P, y + rowH / 2 - 14, 28, 28);
            ctx.fillStyle = '#0a0a0a'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
            ctx.font = F(s.isBalance ? 900 : 700, 30); ctx.fillText(s.name.toUpperCase(), P + 50, y + rowH / 2);
            // pct track
            const tx = W - P - 1100, tw = 640;
            ctx.fillStyle = 'rgba(0,0,0,.07)'; ctx.fillRect(tx, y + rowH / 2 - 5, tw, 10);
            ctx.fillStyle = s.color; ctx.fillRect(tx, y + rowH / 2 - 5, tw * Math.min(1, s.amount / denom), 10);
            ctx.fillStyle = '#0a0a0a'; ctx.textAlign = 'right'; ctx.globalAlpha = .6; ctx.font = F(700, 26);
            ctx.fillText(pctText(s.amount), W - P - 380, y + rowH / 2); ctx.globalAlpha = 1;
            ctx.font = F(900, 34); ctx.fillStyle = s.isBalance ? (s.isDeficit ? RED : '#5c6600') : '#0a0a0a';
            ctx.fillText((s.isBalance ? (s.isDeficit ? '\u2212' : '+') : '\u2212') + fmt(s.amount * m), W - P, y + rowH / 2);
        });
        sig(ctx, W - P, H - 70, '#0a0a0a', 70);

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        doc.addImage(c.toDataURL('image/jpeg', .92), 'JPEG', 0, 0, 297, 210);
        doc.save('budget-report.pdf');
    }));

    // ---- Instagram stories (3 × 1080×1920)
    $('btnDownloadIg').addEventListener('click', () => busy($('btnDownloadIg'), async () => {
        const W = 1080, H = 1920, P = 90;
        const { segs, denom, totalExpenses, balance, isDeficit } = exportSegments(true);
        const light = exportSegments(false);
        const balLabel = isDeficit ? t('deficit') : t('surplus');
        const m = mult();
        const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return [c, c.getContext('2d')]; };

        // Slide 1 – cover (black)
        const [c1, a] = mk();
        a.fillStyle = '#0a0a0a'; a.fillRect(0, 0, W, H); a.fillStyle = YELLOW; a.fillRect(0, 0, W, 12);
        brandTag(a, P, 80, '#fff');
        let y = 230; a.textAlign = 'left'; a.textBaseline = 'top';
        if (budget.job) { a.fillStyle = '#fff'; a.globalAlpha = .5; a.font = F(700, 44); a.fillText(budget.job.toUpperCase(), P, y); a.globalAlpha = 1; y += 80; }
        a.fillStyle = '#fff'; a.globalAlpha = .55; a.font = F(900, 80); a.fillText(t(budget.view === 'year' ? 'yearly' : 'monthly').toUpperCase(), P, y); a.globalAlpha = 1;
        a.font = F(900, 150); a.fillText(fmt(budget.income * m), P - 6, y + 100);
        const dy = y + 320; a.strokeStyle = 'rgba(255,255,255,.15)'; a.lineWidth = 2; a.beginPath(); a.moveTo(P, dy); a.lineTo(W - P, dy); a.stroke();
        a.fillStyle = '#fff'; a.globalAlpha = .5; a.font = F(700, 32); a.fillText(balLabel.toUpperCase(), P, dy + 60); a.globalAlpha = 1;
        a.fillStyle = isDeficit ? RED : YELLOW; a.font = F(900, 110); a.fillText((isDeficit ? '\u2212' : '+') + fmt(Math.abs(balance) * m), P - 4, dy + 104);
        a.fillStyle = '#fff'; a.globalAlpha = .5; a.font = F(700, 32); a.fillText(t('totalExpenses').toUpperCase(), P, dy + 260); a.globalAlpha = 1;
        a.font = F(900, 84); a.fillText(fmt(totalExpenses * m), P - 4, dy + 304);
        drawSkewBar(a, P, H - 440, W - 2 * P, 80, segs, denom);
        a.fillStyle = '#fff'; a.globalAlpha = .4; a.font = F(600, 30); a.fillText(`${budget.expenses.length} ${t('expenseCategories')}`, P, H - 330); a.globalAlpha = 1;
        sig(a, W - P, H - 100, '#fff');

        // Slide 2 – breakdown (white)
        const [c2, b] = mk();
        b.fillStyle = '#fff'; b.fillRect(0, 0, W, H); b.fillStyle = '#0a0a0a'; b.fillRect(0, 0, W, 12);
        brandTag(b, P, 80, '#0a0a0a');
        b.textAlign = 'left'; b.textBaseline = 'top'; b.fillStyle = '#0a0a0a'; b.globalAlpha = .5; b.font = F(800, 36); b.fillText(t('budgetBreakdown').toUpperCase(), P, 200); b.globalAlpha = 1;
        b.font = F(900, 112); b.fillText(fmt(budget.income * m), P - 4, 250);
        drawSkewBar(b, P, 430, W - 2 * P, 150, light.segs, light.denom);
        const ly = 660, rh = Math.min(96, (H - ly - 220) / light.segs.length);
        light.segs.forEach((s, i) => {
            const yy = ly + i * rh;
            b.fillStyle = s.color; b.fillRect(P, yy + 4, 26, 26); b.strokeStyle = '#0a0a0a'; b.lineWidth = 2; b.strokeRect(P, yy + 4, 26, 26);
            b.fillStyle = '#0a0a0a'; b.globalAlpha = .55; b.font = F(700, 30); b.textAlign = 'left'; b.fillText(s.name.toUpperCase(), P + 44, yy); b.globalAlpha = 1;
            b.font = F(900, 38); b.fillStyle = s.isBalance ? (s.isDeficit ? RED : '#5c6600') : '#0a0a0a'; b.textAlign = 'right';
            b.fillText((s.isBalance ? (s.isDeficit ? '\u2212' : '+') : '\u2212') + fmt(s.amount * m), W - P, yy - 4);
            b.fillStyle = 'rgba(0,0,0,.07)'; b.fillRect(P + 44, yy + 50, W - 2 * P - 44, 8);
            b.fillStyle = s.color; b.fillRect(P + 44, yy + 50, (W - 2 * P - 44) * Math.min(1, s.amount / light.denom), 8);
            b.textAlign = 'left';
        });
        sig(b, W - P, H - 100, '#0a0a0a');

        // Slide 3 – list (dark)
        const [c3, d] = mk();
        d.fillStyle = '#111'; d.fillRect(0, 0, W, H); d.fillStyle = YELLOW; d.fillRect(0, 0, W, 12);
        brandTag(d, P, 80, '#fff');
        d.textAlign = 'left'; d.textBaseline = 'top'; d.fillStyle = '#fff'; d.globalAlpha = .5; d.font = F(800, 36); d.fillText(t('yourExpensesCaps').toUpperCase(), P, 200); d.globalAlpha = 1;
        const s0 = 290, s1 = H - 330, rh3 = budget.expenses.length ? (s1 - s0) / budget.expenses.length : 0;
        budget.expenses.forEach((e, i) => {
            const yy = s0 + i * rh3;
            d.fillStyle = YELLOW; d.font = F(900, 26); d.fillText(String(i + 1).padStart(2, '0'), P, yy + 14);
            d.fillStyle = '#fff'; d.font = F(700, Math.min(42, rh3 * .42)); d.fillText(e.name.toUpperCase(), P + 70, yy + 4);
            d.globalAlpha = .4; d.font = F(600, 26); d.fillText(pctText(e.amount), P + 70, yy + Math.min(42, rh3 * .42) + 14); d.globalAlpha = 1;
            d.fillStyle = RAMP_DARK[i % 8]; d.font = F(900, 44); d.textAlign = 'right'; d.fillText('\u2212' + fmt(e.amount * m), W - P, yy + 8); d.textAlign = 'left';
            d.strokeStyle = 'rgba(255,255,255,.1)'; d.lineWidth = 1; d.beginPath(); d.moveTo(P, yy + rh3 - 1); d.lineTo(W - P, yy + rh3 - 1); d.stroke();
        });
        const sy = s1 + 30;
        d.strokeStyle = 'rgba(255,255,255,.25)'; d.lineWidth = 2; d.beginPath(); d.moveTo(P, sy - 10); d.lineTo(W - P, sy - 10); d.stroke();
        d.fillStyle = '#fff'; d.globalAlpha = .45; d.font = F(700, 30); d.fillText(t('total').toUpperCase(), P, sy); d.globalAlpha = 1;
        d.font = F(900, 72); d.fillText(fmt(totalExpenses * m), P - 3, sy + 40);
        d.fillStyle = isDeficit ? RED : YELLOW; d.globalAlpha = .5; d.font = F(700, 30); d.textAlign = 'right'; d.fillText(balLabel.toUpperCase(), W - P, sy); d.globalAlpha = 1;
        d.font = F(900, 72); d.fillText((isDeficit ? '\u2212' : '+') + fmt(Math.abs(balance) * m), W - P, sy + 40); d.textAlign = 'left';
        sig(d, W - P, H - 70, '#fff');

        const slides = [[c1, 'story-1-cover.png'], [c2, 'story-2-breakdown.png'], [c3, 'story-3-expenses.png']];

        // On mobile, prefer the native share sheet (saves straight to Photos / Instagram)
        if (navigator.canShare && !isDesktop()) {
            try {
                const files = await Promise.all(slides.map(([c, n]) => new Promise(r => c.toBlob(bl => r(new File([bl], n, { type: 'image/png' })), 'image/png'))));
                if (navigator.canShare({ files })) { await navigator.share({ files, title: 'Budget Visualizer' }); return; }
            } catch (e) { if (e && e.name === 'AbortError') return; }
        }
        for (let i = 0; i < slides.length; i++) {
            await new Promise(r => setTimeout(r, i ? 400 : 0));
            const link = document.createElement('a'); link.download = slides[i][1]; link.href = slides[i][0].toDataURL('image/png');
            document.body.appendChild(link); link.click(); link.remove();
        }
    }));

    /* ------------------------------------------------------------- init */
    function fillInputs() {
        $('incomeInput').value = budget.income || '';
        $('jobInput').value = budget.job || '';
        $('annualSalaryInput').value = budget.annualSalary || '';
        $('currencyInput').value = budget.currency;
    }

    // Load from share link
    if (location.hash.startsWith('#b=')) {
        const loaded = decodeState(location.hash.slice(3));
        if (loaded) { budget = loaded; history.replaceState(null, '', location.pathname); setTimeout(() => toast(t('loadedFromLink')), 400); }
    }

    applyTheme();
    fillInputs();
    applyLanguage();
    render();

    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { renderBar(); }, 120); });
    // Re-position labels whenever the bar's box changes (scrollbar appears, fonts swap, orientation change ...)
    if ('ResizeObserver' in window) {
        let lastW = 0;
        new ResizeObserver(() => {
            const w = $('bar').offsetWidth;
            if (Math.abs(w - lastW) > 1) { lastW = w; requestAnimationFrame(() => { $('bar').querySelectorAll('.segment').forEach(seg => seg.classList.toggle('is-narrow', seg.offsetWidth < 38)); positionLabels(); }); }
        }).observe($('bar'));
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => positionLabels());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (budget.theme === 'auto') render(); });
})();
