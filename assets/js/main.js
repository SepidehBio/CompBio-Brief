/* ============================================================
   CompBio Brief — Main Runtime
   Language · Theme · Online counter · Reveal animations
   ============================================================ */

(() => {
  "use strict";

  /* ----------------------------------------------------------
     Constants
     ---------------------------------------------------------- */
  const STORAGE_LANG  = "cbl.lang";
  const STORAGE_THEME = "cbl.theme";

  const DEFAULT_LANG = window.__DEFAULT_LANG__ || "en";
  const LANGS        = window.__LANGS__        || [{ code: "en", dir: "ltr" }];
  const I18N         = window.__I18N__         || {};

  const RTL_LANGS = new Set(
    LANGS.filter(l => l.dir === "rtl").map(l => l.code)
  );

  const SUPPORTED = new Set(LANGS.map(l => l.code));

  /* ----------------------------------------------------------
     Utilities
     ---------------------------------------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getPath(obj, path) {
    const parts = path.split(".");
    let val = obj;
    for (const p of parts) {
      if (val && typeof val === "object" && p in val) val = val[p];
      else return null;
    }
    return val;
  }

  /* ----------------------------------------------------------
     Language detection (automatic)
       1. Saved value in localStorage
       2. Browser preferred languages
       3. Fallback to default
     ---------------------------------------------------------- */
  function detectLanguage() {
    const saved = localStorage.getItem(STORAGE_LANG);
    if (saved && SUPPORTED.has(saved)) return saved;

    const prefs = [
      ...(navigator.languages || []),
      navigator.language,
      navigator.userLanguage,
    ].filter(Boolean);

    for (const raw of prefs) {
      const code = String(raw).toLowerCase();
      const short = code.split("-")[0];
      if (SUPPORTED.has(short)) return short;
    }

    return DEFAULT_LANG;
  }

  /* ----------------------------------------------------------
     Content translations (categories inside i18n dict)
     ---------------------------------------------------------- */
  function applyContentTranslations(lang) {
    const dict = I18N[lang] || {};

    $$("[data-content]").forEach(el => {
      const path = el.getAttribute("data-content");
      if (!path) return;
      const val = getPath(dict, path);
      if (typeof val === "string") el.textContent = val;
    });
  }

  /* ----------------------------------------------------------
     Apply language to the DOM
     ---------------------------------------------------------- */
  function applyLanguage(lang, { persist = true } = {}) {
    if (!SUPPORTED.has(lang)) lang = DEFAULT_LANG;

    const dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
    const html = document.documentElement;

    html.setAttribute("lang", lang);
    html.setAttribute("dir", dir);

    const dict = I18N[lang] || {};

    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
      else if (val != null) el.textContent = String(val);
    });

    $$("[data-nav-key]").forEach(el => {
      const key = `nav.${el.getAttribute("data-nav-key")}`;
      const val = dict[key];
      if (val) el.textContent = val;
    });

    applyContentTranslations(lang);

    $$(".lang-switch button").forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (persist) {
      try { localStorage.setItem(STORAGE_LANG, lang); } catch (_) {}
    }

    window.dispatchEvent(new CustomEvent("lang:changed", { detail: { lang, dir } }));
  }

  /* ----------------------------------------------------------
     Theme
     ---------------------------------------------------------- */
  function detectTheme() {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme, { persist = true } = {}) {
    if (theme !== "light" && theme !== "dark") theme = "light";
    document.documentElement.setAttribute("data-theme", theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0c0e0d" : "#0e3b2e");

    const tgl = $("#theme-toggle");
    if (tgl) {
      tgl.setAttribute("aria-pressed", String(theme === "dark"));
      tgl.setAttribute("aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }

    if (persist) {
      try { localStorage.setItem(STORAGE_THEME, theme); } catch (_) {}
    }

    window.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme } }));
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* ----------------------------------------------------------
     Online counter (simulated, smooth)
     ---------------------------------------------------------- */
  const OnlineCounter = (() => {
    const BASE = 11;
    const AMPLITUDE = 4;
    const PERIOD = 45000;
    const JITTER = 2;
    const UPDATE_MS = 18000;

    let current = BASE;
    let timer = null;

    function computeTarget() {
      const t = Date.now();
      const wave = Math.sin((2 * Math.PI * t) / PERIOD) * AMPLITUDE;
      const noise = (Math.random() - 0.5) * 2 * JITTER;
      const target = Math.round(BASE + wave + noise);
      return Math.max(1, target);
    }

    function animateNumber(el, from, to, duration = 700) {
      if (prefersReducedMotion() || duration <= 0) {
        el.textContent = String(to);
        return;
      }
      const start = performance.now();
      const delta = to - from;
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(from + delta * eased));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function update() {
      const el = $("#online-count");
      if (!el) return;
      const next = computeTarget();
      const from = parseInt(el.textContent, 10) || current;
      animateNumber(el, from, next);
      current = next;
    }

    function start() {
      update();
      timer = setInterval(update, UPDATE_MS);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") update();
    });

    return { start, stop, update };
  })();

  /* ----------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------- */
  function initReveal() {
    const els = $$("[data-reveal]");
    if (!els.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.revealDelay || "0", 10);
            setTimeout(() => entry.target.classList.add("is-visible"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     Active nav link on scroll
     ---------------------------------------------------------- */
  function initActiveNav() {
    const links = $$(".main-nav .nav-link");
    if (!links.length) return;

    const map = links
      .map(a => {
        const href = a.getAttribute("href") || "";
        const hash = href.includes("#") ? href.split("#")[1] : null;
        return hash ? { link: a, el: document.getElementById(hash) } : null;
      })
      .filter(Boolean);

    if (!map.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove("active"));
            const found = map.find(m => m.el === entry.target);
            if (found) found.link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    map.forEach(m => io.observe(m.el));
  }

  /* ----------------------------------------------------------
     Smooth scroll for in-page anchors
     ---------------------------------------------------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const header = $(".site-header");
      const offset = header ? header.offsetHeight + 16 : 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });

      history.replaceState(null, "", `#${id}`);
    });
  }

  /* ----------------------------------------------------------
     Keyboard shortcuts
       Shift + D → toggle theme
       Shift + L → cycle language
     ---------------------------------------------------------- */
  function initShortcuts() {
    document.addEventListener("keydown", e => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

      if (e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        toggleTheme();
      }

      if (e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault();
        const order = LANGS.map(l => l.code);
        const current = document.documentElement.getAttribute("lang") || DEFAULT_LANG;
        const idx = order.indexOf(current);
        const next = order[(idx + 1) % order.length];
        applyLanguage(next);
      }
    });
  }

  /* ----------------------------------------------------------
     External links
     ---------------------------------------------------------- */
  function initExternalLinks() {
    const host = window.location.hostname;
    $$('a[href^="http"]').forEach(a => {
      try {
        const url = new URL(a.href);
        if (url.hostname !== host) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        }
      } catch (_) {}
    });
  }

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */
  function boot() {
    applyLanguage(detectLanguage(), { persist: true });
    applyTheme(detectTheme(), { persist: false });

    $$(".lang-switch button").forEach(btn => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.dataset.lang);
      });
    });

    const toggle = $("#theme-toggle");
    if (toggle) toggle.addEventListener("click", toggleTheme);

    initReveal();
    initActiveNav();
    initSmoothAnchors();
    initShortcuts();
    initExternalLinks();

    OnlineCounter.start();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener?.("change", e => {
      if (!localStorage.getItem(STORAGE_THEME)) {
        applyTheme(e.matches ? "dark" : "light", { persist: false });
      }
    });

    window.addEventListener("beforeunload", () => OnlineCounter.stop(), { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
