/* Shared script for the static pages (blog, feedback, support).
   Handles theme bootstrap, DE/EN toggle for [data-i18n] and the contact address. */
(() => {
    'use strict';
    const KEY = 'myBudget';
    // >>> Change this once you have a project address (e.g. hallo@budgetvisualizer.de)
    const CONTACT_EMAIL = 'markus@iceberg.gmbh';

    const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
    const state = read();
    if (state.theme === 'dark' || state.theme === 'light') document.documentElement.dataset.theme = state.theme;

    const COMMON = {
        de: { blogLink: 'Blog', feedbackLink: 'Feedback', supportLink: 'Projekt unterst\u00fctzen', howItWorks: 'So funktioniert\u2019s', backLink: '\u2190 Visualizer', openApp: 'Visualizer \u00f6ffnen', footerNote: 'Kostenlose Beta \u2013 ohne Konto, ohne Werbung. Alles bleibt in deinem Browser.' },
        en: { blogLink: 'Blog', feedbackLink: 'Feedback', supportLink: 'Support the project', howItWorks: 'How it works', backLink: '\u2190 Visualizer', openApp: 'Open the visualizer', footerNote: 'Free beta \u2013 no account, no ads. Everything stays in your browser.' }
    };
    const PAGE = window.PAGE_TR || { de: {}, en: {} };
    let lang = ['de', 'en'].includes(state.lang) ? state.lang : 'de';

    const t = (k) => (PAGE[lang] && PAGE[lang][k]) ?? COMMON[lang][k] ?? k;
    function apply() {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
        document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        document.querySelectorAll('[data-lang-only]').forEach(el => { el.hidden = el.dataset.langOnly !== lang; });
        document.querySelectorAll('[data-mail]').forEach(el => {
            const subject = encodeURIComponent(t(el.dataset.mail + 'Subject'));
            const body = encodeURIComponent(t(el.dataset.mail + 'Body'));
            el.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        });
        document.querySelectorAll('[data-email]').forEach(el => { el.textContent = CONTACT_EMAIL; if (el.tagName === 'A') el.href = 'mailto:' + CONTACT_EMAIL; });
        document.title = t('pageTitle') !== 'pageTitle' ? `${t('pageTitle')} \u2013 Budget Visualizer` : document.title;
    }
    document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => {
        lang = b.dataset.lang; const s = read(); s.lang = lang; localStorage.setItem(KEY, JSON.stringify(s)); apply();
    }));

    // Share the project (Web Share API with clipboard fallback)
    document.querySelectorAll('[data-share-site]').forEach(btn => btn.addEventListener('click', async () => {
        const url = new URL('index.html', location.href).href;
        const text = lang === 'de' ? 'Budget Visualizer \u2013 sieh, wohin dein Geld geht.' : 'Budget Visualizer \u2013 see where your money goes.';
        try {
            if (navigator.share) await navigator.share({ title: 'Budget Visualizer', text, url });
            else { await navigator.clipboard.writeText(url); flash(btn, lang === 'de' ? 'Link kopiert' : 'Link copied'); }
        } catch { /* user cancelled */ }
    }));
    document.querySelectorAll('[data-copy-template]').forEach(btn => btn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(t('feedbackBody')); flash(btn, lang === 'de' ? 'Vorlage kopiert' : 'Template copied'); } catch { }
    }));
    function flash(btn, msg) { const old = btn.textContent; btn.textContent = msg; setTimeout(() => { btn.textContent = old; }, 1600); }

    apply();
})();
