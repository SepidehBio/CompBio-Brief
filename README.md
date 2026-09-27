بفرما — README.md کامل و نهایی، آماده‌ی کپی و پیست در مخزن. 🌿

فقط یادت باشد <username> را با یوزرنیم واقعی GitHub خودت عوض کنی.

---

```markdown
# CompBio Lab

> An open notebook on computational biology — tools, datasets, and research notes.
> Trilingual (EN/DA/FA), built from scratch.

**Live:** [https://<Sepideh Bio>.github.io/compbio-lab](https://<Sepideh Bio>.github.io/compbio-lab)
**Source:** [https://github.com/<username>/compbio-lab](https://github.com/<username>/compbio-lab)

---

## About

CompBio Lab is a personal research notebook documenting analytical workflows,
software decisions and short methodological essays in computational biology.
It is not a blog in the usual sense — it is closer to a public laboratory logbook.

The site is intentionally simple:

- **No frameworks** — plain HTML, CSS and JavaScript
- **No build step** — Jekyll generates static pages
- **No tracking** — no analytics, no cookies, no third-party scripts
- **No CDN lock-in** — the only external resource is Google Fonts

Everything here is written by hand. Nothing is generated from a template.

---

## Features

| Feature | Description |
|---|---|
|  **Trilingual** | English · Danish · Persian (RTL) — auto-detected from the browser |
| **Light & dark theme** | Saved in `localStorage`, follows system preference |
| **Live reader counter** | In the footer, with a subtle pulsing indicator |
| **Curated tools** | 12 tools across 4 categories with docs and source links |
| 🧬 **Public datasets** | 8 real datasets with organism, type and access notes |
| **Hand-written notes** | On methodology, reproducibility and single-cell practice |
| **Accessible** | ARIA labels, semantic HTML, reduced-motion support |
|**Responsive** | Mobile, tablet and desktop layouts |
|**Zero JavaScript dependencies** | No jQuery, no Alpine, no React — just ~300 lines of plain JS |

---

## Repository structure

```

compbio-lab/
│
├── _config.yml                 # Jekyll configuration
├── Gemfile                     # Ruby dependencies
│
├── _data/
│   ├── i18n.yml                # Central translation strings (EN/DA/FA)
│   ├── navigation.yml          # Main menu
│   ├── tools.yml               # Tools catalogue
│   └── datasets.yml            # Datasets catalogue
│
├── _includes/
│   ├── head.html               # <head> meta and SEO
│   ├── header.html             # Sticky header with language switch
│   └── footer.html             # Footer with online counter
│
├── _layouts/
│   └── default.html            # Base layout
│
├── _posts/                     # Research notes (Markdown)
│   ├── 2026-09-27-data-leakage-in-biomedical-ml.md
│   ├── 2026-10-02-reproducibility-is-a-habit.md
│   └── 2026-10-08-single-cell-quality-control.md
│
├── assets/
│   ├── css/
│   │   └── style.css           # Design system
│   ├── images/
│   │   └── favicon.svg
│   └── js/
│       └── main.js             # Language, theme, counter, animations
│
├── tools/
│   └── index.md                # Tools directory
├── datasets/
│   └── index.md                # Datasets table
├── tutorials/
│   └── index.md                # Tutorials list
├── notes/
│   └── index.md                # Notes index
│
├── index.md                    # Home
├── about.md                    # About this notebook
├── contact.md                  # Contact
│
├── README.md
└── LICENSE

```

---

## Running locally

You need **Ruby 3.x** and **Bundler**.

```bash
# 1. Clone
git clone https://github.com/<username>/compbio-lab.git
cd compbio-lab

# 2. Install dependencies
bundle install

# 3. Serve locally at http://localhost:4000
bundle exec jekyll serve
```

To preview without Jekyll, open any .md file — but Liquid loops and
_data references will not render without the Jekyll build step.

---

Adding content

A new research note

Create a file in _posts/ with this naming convention:

```
YYYY-MM-DD-slug.md
```

With front matter:

```yaml
---
layout: post
title: "Your title here"
date: 2026-10-15
category: "Methods"
tags: [single-cell, qc]
description: "One-line description for search engines."
excerpt: "A short summary shown on the home page."
---
```

The note appears automatically in /notes/ and on the home page.

A new tool

Add an entry to _data/tools.yml under the relevant category.
The tools/index.md page updates automatically — no HTML editing required.

A new dataset

Add an entry to _data/datasets.yml. The datasets table on the home page
and in /datasets/ updates automatically.

A new language

1. Add the language to languages: in _config.yml
2. Add its strings to _data/i18n.yml
3. Add its nav labels to _data/navigation.yml

The switch in the header picks it up on the next build.

---

Design

· Typography — Cormorant Garamond for headings, Inter for body,
  Vazirmatn for Persian, JetBrains Mono for code
· Palette — warm off-white base, deep forest green accent,
  muted gold for emphasis
· Motion — subtle reveal-on-scroll, smooth hover states,
  no gratuitous animation
· Layout — 1200px container, generous whitespace, editorial rhythm

Every design decision is written in assets/css/style.css as a CSS custom
property at the top of the file, so the entire system can be retuned from
one place.

---

Keyboard shortcuts

Shortcut Action
Shift + D Toggle light / dark theme
Shift + L Cycle language (EN → DA → FA)

---

Deployment

The site deploys automatically via GitHub Pages on every push to main.

First-time setup:

1. Push the repository to GitHub
2. Go to Settings → Pages
3. Under Source, choose Deploy from a branch
4. Branch: main · Folder: / (root)
5. Click Save

After one to two minutes, the site is live at:

```
https://<username>.github.io/compbio-lab
```

If the Jekyll build fails, add an empty .nojekyll file to the root,
or use the GitHub Actions workflow in .github/workflows/pages.yml.

---

Browser support

Browser Version
Chrome / Edge Last 2 versions
Firefox Last 2 versions
Safari 15+
Mobile Safari iOS 15+
Chrome Android Last 2 versions

The site gracefully degrades on older browsers — it remains readable
and navigable even without JavaScript.

---

License

· Written content: CC BY 4.0
· Code: MIT

You are free to reuse, adapt and quote — attribution is appreciated,
corrections are always welcome.

---

Contact

·sepideh.moafi90@gmail.cim
· GitHub: github.com/<Sepideh Bio>
· Issues: github.com/<Sepideh Bio>/compbio-lab/issues

---

<p align="center">
  <sub>Built with care. No frameworks, no tracking, no noise.</sub>
</p>
```

---

