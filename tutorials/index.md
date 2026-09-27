---
layout: default
title: Tutorials
description: Practical tutorials on RNA-seq, single-cell analysis, spatial transcriptomics and reproducible workflows.
permalink: /tutorials/
---

<header class="page-header">
  <div class="container container-sm">
    <div class="page-header-eyebrow" data-i18n="tutorials.guides">Guides</div>
    <h1 class="page-header-title" data-i18n="tutorials.title">Tutorials</h1>
    <p class="page-header-subtitle" data-i18n="tutorials.subtitle">
      Practical, step-by-step guides for common workflows in
      computational biology — from raw data to interpretable results.
    </p>
  </div>
</header>

<article class="container">

  <div class="grid grid-3">

    {% assign tutorials = site.tutorials %}
    {% if tutorials.size > 0 %}
      {% for tut in tutorials %}
        <a href="{{ tut.url | relative_url }}"
           class="card fade-up"
           data-reveal
           data-reveal-delay="{{ forloop.index0 | times: 80 }}">

          {% if tut.level %}
            <span class="card-label">{{ tut.level }}</span>
          {% endif %}

          <h3 class="card-title">{{ tut.title }}</h3>

          <p class="card-summary">
            {{ tut.description | default: tut.excerpt | strip_html | truncatewords: 24 }}
          </p>

          <div class="card-meta">
            <span class="card-meta-tag">{{ tut.tools | join: " · " | default: "—" }}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </a>
      {% endfor %}
    {% else %}
      <div class="empty-state">
        <p data-i18n="tutorials.empty">Tutorials are being prepared. The first set will cover single-cell quality control, RNA-seq alignment and spatial integration.</p>
      </div>
    {% endif %}

  </div>

</article>

<style>
.empty-state {
  grid-column: 1 / -1;
  padding: 60px 40px;
  text-align: center;
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: var(--r-md);
  color: var(--text-muted);
  font-size: .95rem;
  line-height: 1.7;
}
</style>
