
# CompBio Brief

An open notebook on computational biology — tools, datasets, and research notes.
Trilingual (EN/DA/FA), built from scratch.

Live: https://<Sepideh Bio>.github.io/compbio-brief
Source: https://github.com/<Sepideh Bio>/compbio-brief

---

## About

CompBio Brief is a personal research notebook documenting analytical
workflows, software decisions and short methodological essays in
computational biology. It is closer to a public laboratory logbook
than to a blog.

The site is intentionally simple:

- No frameworks — plain HTML, CSS and JavaScript
- No build step — Jekyll generates static pages
- No tracking — no analytics, no cookies, no third-party scripts
- No CDN lock-in — the only external resource is Google Fonts

Everything here is written by hand.

---

## Features

- Trilingual: English, Danish, Persian (RTL), detected automatically
- Light and dark theme, saved between visits
- Live reader counter in the footer
- Curated tools: 12 tools across 4 categories, with docs and source links
- Public datasets: 8 real datasets with organism, type and access notes
- Hand-written notes on methodology, reproducibility and single-cell work
- Accessible: ARIA labels, semantic HTML, reduced-motion support
- Responsive: mobile, tablet and desktop
- No JavaScript dependencies — around 300 lines of plain JS

---

## Repository structure

```

compbio-brief/
│
├── _config.yml
├── Gemfile
│
├── _data/
│   ├── i18n.yml
│   ├── navigation.yml
│   ├── tools.yml
│   └── datasets.yml
│
├── _includes/
│   ├── head.html
│   ├── header.html
│   └── footer.html
│
├── _layouts/
│   └── default.html
│
├── _posts/
│   ├── 2026-09-27-data-leakage-in-biomedical-ml.md
│   ├── 2026-10-02-reproducibility-is-a-habit.md
│   └── 2026-10-08-single-cell-quality-control.md
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── favicon.svg
│   └── js/
│       └── main.js
│
├── tools/
│   └── index.md
├── datasets/
│   └── index.md
├── tutorials/
│   └── index.md
├── notes/
│   └── index.md
│
├── index.md
├── about.md
├── contact.md
│
├── README.md
└── LICENSE

```

---

## Running locally

You need Ruby 3.x and Bundler.

```bash
git clone https://github.com/<username>/compbio-brief.git
cd compbio-brief
bundle install
bundle exec jekyll serve
```

The site will be available at http://localhost:4000/compbio-brief.

---

Adding content

A new research note

Create a file in _posts/ named YYYY-MM-DD-slug.md with this front matter:

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
The tools page updates automatically.

A new dataset

Add an entry to _data/datasets.yml. The datasets table updates automatically.

A new language

Add the language to languages: in _config.yml, then add its strings
to _data/i18n.yml and _data/navigation.yml. The switch in the header
picks it up on the next build.

---

Design

· Typography: Cormorant Garamond for headings, Inter for body,
  Vazirmatn for Persian, JetBrains Mono for code
· Palette: warm off-white base, deep forest green accent, muted gold for emphasis
· Motion: subtle reveal-on-scroll, smooth hover states, no gratuitous animation
· Layout: 1200px container, generous whitespace, editorial rhythm

Every design decision is defined as a CSS custom property at the top of
assets/css/style.css, so the entire system can be retuned from one place.

---

Keyboard shortcuts

· Shift + D — toggle light and dark theme
· Shift + L — cycle language (EN → DA → FA)

---

Deployment

The site deploys automatically via GitHub Pages on every push to main.

First-time setup:

1. Push the repository to GitHub
2. Go to Settings → Pages
3. Under Source, choose "Deploy from a branch"
4. Branch: main, Folder: / (root)
5. Click Save

After one to two minutes, the site is live at:

```
https://<username>.github.io/compbio-brief
```

If the Jekyll build fails, add an empty .nojekyll file to the root,
or use the GitHub Actions workflow in .github/workflows/pages.yml.

---

License

· Code: MIT
· Content: CC BY 4.0

You are free to reuse, adapt and quote. Attribution is appreciated,
corrections are always welcome.

---

Contact

· Email: sepideh.moafi90@gmail.com
· GitHub: https://github.com/<Sepideh Bio>
· Issues: https://github.com/<Sepideh Bio>/compbio-brief/issues

```

---

## 📌
