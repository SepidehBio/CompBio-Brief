---
layout: default
title: Home
description: An open resource for computational biology — research notes, tools, datasets and practical workflows.
permalink: /
---

<section class="hero">
  <div class="container hero-inner">

    <span class="hero-eyebrow" data-i18n="hero.eyebrow">CompBio Brief · Est. 2026</span>

    <h1 class="hero-title" data-i18n="hero.title">
      An open resource for computational biology.
    </h1>

    <p class="hero-subtitle" data-i18n="hero.subtitle">
      Documenting practical knowledge in computational biology, bioinformatics
      and biomedical data analysis — written with clarity and care.
    </p>

    <div class="hero-actions">
      <a href="{{ '/tools/' | relative_url }}" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        <span data-i18n="hero.cta.tools">Explore tools</span>
      </a>
      <a href="{{ '/notes/' | relative_url }}" class="btn btn-ghost">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span data-i18n="hero.cta.notes">Read notes</span>
      </a>
    </div>

  </div>
</section>

<section class="section">
  <div class="container">

    <header class="section-head">
      <div class="section-head-text">
        <h2 class="section-title" data-i18n="section.tools">Tools &amp; resources</h2>
        <p class="section-subtitle" data-i18n="section.tools.subtitle">
          Curated software for sequence analysis, single-cell work,
          variant interpretation and machine learning — with input,
          output and installation notes.
        </p>
      </div>
      <a href="{{ '/tools/' | relative_url }}" class="section-link">
        <span data-i18n="section.tools.link">View all tools</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </header>

    <div class="grid grid-4">
      {% if site.data.tools %}
        {% assign categories = site.data.tools | sort %}
        {% for cat in categories limit:4 %}
          {% assign key = cat[0] %}
          {% assign value = cat[1] %}
          <a href="{{ '/tools/#' | append: key | relative_url }}"
             class="card fade-up"
             data-reveal
             data-reveal-delay="{{ forloop.index0 | times: 80 }}"
             data-category-key="{{ key }}">

            <span class="card-label" data-category-label="{{ key }}">{{ value.title }}</span>
            <h3 class="card-title" data-category-title="{{ key }}">{{ value.title }}</h3>
            <p class="card-summary" data-category-description="{{ key }}">{{ value.description }}</p>

            <div class="card-meta">
              <span class="card-meta-tag">
                <span data-count="{{ value.tools.size }}">{{ value.tools.size }}</span>
                <span data-i18n="tools.count">tools</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </a>
        {% endfor %}
      {% endif %}
    </div>

  </div>
</section>

<section class="section" style="background: var(--bg-soft); border-block: 1px solid var(--border-soft);">
  <div class="container">

    <header class="section-head">
      <div class="section-head-text">
        <h2 class="section-title" data-i18n="section.notes">Recent notes</h2>
        <p class="section-subtitle" data-i18n="section.notes.subtitle">
          Short, original notes on methodology, reproducibility
          and the practice of computational research.
        </p>
      </div>
      <a href="{{ '/notes/' | relative_url }}" class="section-link">
        <span data-i18n="section.notes.link">All notes</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </header>

    <div class="grid grid-3">
      {% for post in site.posts limit:3 %}
        <a href="{{ post.url | relative_url }}"
           class="card fade-up"
           data-reveal
           data-reveal-delay="{{ forloop.index0 | times: 100 }}">

          {% if post.category %}
            <span class="card-label">{{ post.category }}</span>
          {% endif %}

          <h3 class="card-title">{{ post.title }}</h3>

          <p class="card-summary">
            {{ post.excerpt | strip_html | truncatewords: 26 }}
          </p>

          <div class="card-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}" class="card-meta-tag">
              {{ post.date | date: "%b %-d, %Y" }}
            </time>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </a>
      {% endfor %}
    </div>

  </div>
</section>

<section class="section">
  <div class="container">

    <header class="section-head">
      <div class="section-head-text">
        <h2 class="section-title" data-i18n="section.datasets">Public datasets</h2>
        <p class="section-subtitle" data-i18n="section.datasets.subtitle">
          A short list of openly available datasets frequently used
          in computational biology — with organism, type and access.
        </p>
      </div>
      <a href="{{ '/datasets/' | relative_url }}" class="section-link">
        <span data-i18n="section.datasets.link">Browse datasets</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </header>

    <div class="dataset-table-wrap" data-reveal>
      <table class="dataset-table">
        <thead>
          <tr>
            <th data-i18n="datasets.col.name">Dataset</th>
            <th data-i18n="datasets.col.organism">Organism</th>
            <th data-i18n="datasets.col.type">Data type</th>
            <th data-i18n="datasets.col.access">Access</th>
          </tr>
        </thead>
        <tbody>
          {% for ds in site.data.datasets limit:5 %}
            <tr>
              <td>{{ ds.name }}</td>
              <td>{{ ds.organism }}</td>
              <td>{{ ds.type }}</td>
              <td>{{ ds.access }}</td>
            </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>

  </div>
</section>

<section class="section" style="background: var(--bg-soft); border-block: 1px solid var(--border-soft);">
  <div class="container">

    <header class="section-head">
      <div class="section-head-text">
        <h2 class="section-title" data-i18n="section.tutorials">Tutorials</h2>
        <p class="section-subtitle" data-i18n="section.tutorials.subtitle">
          Step-by-step guides for common workflows in computational
          biology — from raw data to interpretable results.
        </p>
      </div>
      <a href="{{ '/tutorials/' | relative_url }}" class="section-link">
        <span data-i18n="section.tutorials.link">View all tutorials</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </header>

    <div class="grid grid-3">
      {% assign tutorials = site.tutorials %}
      {% if tutorials.size > 0 %}
        {% for tut in tutorials limit:3 %}
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
          <p data-i18n="section.tutorials.empty">Tutorials are being prepared. The first set will cover single-cell quality control, RNA-seq alignment and spatial integration.</p>
        </div>
      {% endif %}
    </div>

  </div>
</section>

<section class="section">
  <div class="container container-md">
    <div class="prose" data-reveal style="text-align: center;">

      <h2 data-i18n="home.closing.title">A concise starting point</h2>

      <p data-i18n="home.closing.body">
        CompBio Brief brings together practical knowledge that is often
        scattered across papers, documentation and notebooks — so that
        researchers, students and computational scientists have a clear
        place to begin.
      </p>

      <p style="margin-top: 2em;">
        <a href="{{ '/about/' | relative_url }}" class="section-link" style="display: inline-flex;">
          <span data-i18n="home.closing.link">Read more about this project</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </p>

    </div>
  </div>
</section>

<style>
.empty-state {
  grid-column: 1 / -1;
  padding: 50px 40px;
  text-align: center;
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: var(--r-md);
  color: var(--text-muted);
  font-size: .95rem;
  line-height: 1.7;
}
</style>
