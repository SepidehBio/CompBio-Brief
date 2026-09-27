---
layout: default
title: Tools
description: A curated list of software for computational biology — sequence analysis, single-cell, variant analysis and machine learning.
permalink: /tools/
---

<header class="page-header">
  <div class="container container-sm">
    <div class="page-header-eyebrow" data-i18n="tools.directory">Directory</div>
    <h1 class="page-header-title" data-i18n="tools.title">Tools</h1>
    <p class="page-header-subtitle" data-i18n="tools.subtitle">
      A curated list of software for computational biology — sequence
      analysis, single-cell, variant analysis and machine learning.
    </p>
  </div>
</header>

<article class="container">

  <nav class="category-nav" aria-label="Categories" data-reveal>
    {% if site.data.tools %}
      {% for cat in site.data.tools %}
        {% assign key = cat[0] %}
        {% assign value = cat[1] %}
        <a href="#{{ key }}" class="category-pill" data-content="categories.{{ key }}.title">{{ value.title }}</a>
      {% endfor %}
    {% endif %}
  </nav>

  {% if site.data.tools %}
    {% for cat in site.data.tools %}
      {% assign key = cat[0] %}
      {% assign value = cat[1] %}

      <section id="{{ key }}" class="tool-category" data-reveal>

        <header class="tool-category-head">
          <h2 class="section-title" data-content="categories.{{ key }}.title">{{ value.title }}</h2>
          <p class="section-subtitle" data-content="categories.{{ key }}.description">{{ value.description }}</p>
        </header>

        <div class="grid grid-3">
          {% for tool in value.tools %}
            <article class="tool-card">

              <div class="tool-head">
                <h3 class="tool-name">{{ tool.name }}</h3>
                <span class="tool-type">{{ tool.type }}</span>
              </div>

              <p class="tool-what">{{ tool.what }}</p>

              <div class="tool-meta">
                {% if tool.docs %}
                  <a href="{{ tool.docs }}" target="_blank" rel="noopener">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                    <span data-i18n="tools.docs">Docs</span>
                  </a>
                {% endif %}
                {% if tool.github %}
                  <a href="{{ tool.github }}" target="_blank" rel="noopener">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.98 3.23 9.2 7.71 10.69.56.1.77-.24.77-.54v-1.9c-3.14.68-3.8-1.51-3.8-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.65 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.35-2.64 5.31-5.16 5.59.41.35.77 1.04.77 2.1v3.12c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.71-10.69C23.25 5.48 18.27.5 12 .5z"/></svg>
                    <span data-i18n="tools.github">GitHub</span>
                  </a>
                {% endif %}
              </div>

            </article>
          {% endfor %}
        </div>

      </section>
    {% endfor %}
  {% endif %}

</article>

<style>
.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 70px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-soft);
}
.category-pill {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .3px;
  padding: 8px 16px;
  background: var(--surface);
  color: var(--text-soft);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  transition: all var(--dur) var(--ease);
}
.category-pill:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
  transform: translateY(-1px);
}
.tool-category {
  margin-bottom: 90px;
  scroll-margin-top: calc(var(--header-h) + 24px);
}
.tool-category:last-child { margin-bottom: 40px; }
.tool-category-head { margin-bottom: 32px; }
</style>
