---
layout: default
title: Research Notes
description: Short essays and working notes on methodology, reproducibility and the practice of computational research.
permalink: /notes/
---

<header class="page-header">
  <div class="container container-sm">
    <div class="page-header-eyebrow" data-i18n="notes.notebook">Notebook</div>
    <h1 class="page-header-title" data-i18n="notes.title">Research Notes</h1>
    <p class="page-header-subtitle" data-i18n="notes.subtitle">
      Short essays and working notes on methodology, reproducibility
      and the practice of computational research.
    </p>
  </div>
</header>

<article class="container">

  {% if site.posts.size > 0 %}
    <div class="notes-list">
      {% for post in site.posts %}
        <a href="{{ post.url | relative_url }}"
           class="note-row"
           data-reveal
           data-reveal-delay="{{ forloop.index0 | times: 40 }}">

          <time class="note-date" datetime="{{ post.date | date_to_xmlschema }}">
            <span class="note-day">{{ post.date | date: "%d" }}</span>
            <span class="note-month">{{ post.date | date: "%b %Y" }}</span>
          </time>

          <div class="note-body">
            <h3 class="note-title">{{ post.title }}</h3>
            <p class="note-excerpt">
              {{ post.excerpt | strip_html | truncatewords: 32 }}
            </p>
            {% if post.tags.size > 0 %}
              <div class="note-tags">
                {% for tag in post.tags %}<span>{{ tag }}</span>{% endfor %}
              </div>
            {% endif %}
          </div>

          <span class="note-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>

        </a>
      {% endfor %}
    </div>
  {% else %}
    <div class="empty-state">
      <p data-i18n="notes.empty">Notes are being written. The first pieces will cover data leakage in biomedical machine learning, and reproducible pipelines for single-cell analysis.</p>
    </div>
  {% endif %}

</article>

<style>
.notes-list { border-top: 1px solid var(--border); }
.note-row {
  display: grid;
  grid-template-columns: 110px 1fr 40px;
  align-items: center;
  gap: 32px;
  padding: 32px 8px;
  border-bottom: 1px solid var(--border-soft);
  transition: all var(--dur) var(--ease);
  position: relative;
}
.note-row::before {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 2px;
  background: var(--gold);
  transform: scaleY(0);
  transition: transform var(--dur) var(--ease);
}
.note-row:hover {
  padding-inline-start: 20px;
  background: var(--surface-2);
}
.note-row:hover::before { transform: scaleY(1); }
.note-row:hover .note-arrow { color: var(--gold); transform: translateX(4px); }
html[dir="rtl"] .note-row:hover .note-arrow { transform: translateX(-4px); }

.note-date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.note-day {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1;
  color: var(--text);
  letter-spacing: -.5px;
}
.note-month {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.note-body { min-width: 0; }
.note-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -.3px;
  line-height: 1.3;
  margin-bottom: 8px;
  color: var(--text);
}
html[lang="fa"] .note-title { font-family: var(--font-fa); font-weight: 700; }
.note-excerpt {
  font-size: .95rem;
  line-height: 1.65;
  color: var(--text-soft);
  max-width: 62ch;
}
.note-tags {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.note-tags span {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  padding: 2px 8px;
  background: var(--surface-3);
  border-radius: var(--r-xs);
}
.note-arrow {
  color: var(--text-muted);
  transition: all var(--dur) var(--ease);
}

@media (max-width: 640px) {
  .note-row {
    grid-template-columns: 70px 1fr;
    gap: 18px;
    padding: 24px 4px;
  }
  .note-arrow { display: none; }
  .note-day { font-size: 1.8rem; }
  .note-title { font-size: 1.15rem; }
}
</style>
