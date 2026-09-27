/* ============================================================
   CompBio Lab — Main Runtime
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

  /* ----------------------------------------------------------
     Language detection (automatic)
       1. Saved value in localStorage
       2. Browser preferred languages
       3. Fallback to default
     ---------------------------------------------------------- */
  function detectLanguage() {
    // 1. saved
    const saved = localStorage.getItem(STORAGE_LANG);
    if (saved && SUPPORTED.has(saved)) return saved;

    // 2. browser
    const prefs = [
      ...(navigator.languages || []),
      navigator.language,
      navigator.userLanguage,
    ].filter(Boolean);

    for (const raw of prefs) {
      const code = String(raw).toLowerCase();
      // exact or prefix match (e.g. "fa-IR" → "fa", "da-DK" → "da")
      const short = code.split("-")[0];
      if (SUPPORTED.has(short)) return short;
    }

    // 3. fallback
    return DEFAULT_LANG;
  }

  /* ----------------------------------------------------------
     Apply language to the DOM
     ---------------------------------------------------------- */
  function applyLanguage(lang, { persist = true } = {}) {
    if (!SUPPORTED.has(lang)) lang = DEFAULT_LANG;

    const dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
    const html = document.documentElement;

    // html attributes
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dir);

    // translation strings
    const dict = I18N[lang] || {};
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
      else if (val != null) el.textContent = String(val);
    });

    // nav links (fall back to _data/navigation via existing markup)
    // Only update ones that explicitly carry data-nav-key
    $$("[data-nav-key]").forEach(el => {
      const key = `nav.${el.getAttribute("data-nav-key")}`;
      const val = dict[key];
      if (val) el.textContent = val;
    });

    // language switcher button state
    $$(".lang-switch button").forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    // persist
    if (persist) {
      try { localStorage.setItem(STORAGE_LANG, lang); } catch (_) {}
    }

    // dispatch event for other scripts
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

    // update theme-color for browser UI
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0c0e0d" : "#0e3b2e");

    // update toggle aria
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
    const AMPLITUDE = 4;         // ±4 readers
    const PERIOD = 45000;        // smooth wave over 45s
    const JITTER = 2;            // small random noise
    const UPDATE_MS = 18000;     // visual refresh every 18s

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
        // ease-out cubic
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
      // slight initial delay so the first paint settles
      timer = setInterval(update, UPDATE_MS);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    // update when tab becomes visible again (feels alive)
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
     Active nav link on scroll (for anchors on home)
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

      // update URL without jump
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
      // skip when typing
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
     External links → open in new tab, with security attrs
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
    // Language — detect automatically
    applyLanguage(detectLanguage(), { persist: true });

    // Theme
    applyTheme(detectTheme(), { persist: false });

    // Bind language buttons
    $$(".lang-switch button").forEach(btn => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.dataset.lang);
      });
    });

    // Bind theme toggle
    const toggle = $("#theme-toggle");
    if (toggle) toggle.addEventListener("click", toggleTheme);

    // Features
    initReveal();
    initActiveNav();
    initSmoothAnchors();
    initShortcuts();
    initExternalLinks();

    // Start online counter
    OnlineCounter.start();

    // Follow system theme changes (only if user hasn't chosen)
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener?.("change", e => {
      if (!localStorage.getItem(STORAGE_THEME)) {
        applyTheme(e.matches ? "dark" : "light", { persist: false });
      }
    });

    // Cleanup
    window.addEventListener("beforeunload", () => OnlineCounter.stop(), { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
