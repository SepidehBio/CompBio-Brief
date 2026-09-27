---
layout: default
title: Datasets
description: A short list of open datasets commonly used in computational biology and biomedical data analysis.
permalink: /datasets/
---

<header class="page-header">
  <div class="container container-sm">
    <div class="page-header-eyebrow" data-i18n="datasets.catalogue">Catalogue</div>
    <h1 class="page-header-title" data-i18n="datasets.title">Datasets</h1>
    <p class="page-header-subtitle" data-i18n="datasets.subtitle">
      A short, working list of openly available datasets used in
      computational biology and biomedical data analysis.
    </p>
  </div>
</header>

<article class="container">

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
        {% for ds in site.data.datasets %}
          <tr>
            <td>
              {% if ds.url %}
                <a href="{{ ds.url }}" target="_blank" rel="noopener">{{ ds.name }}</a>
              {% else %}
                {{ ds.name }}
              {% endif %}
            </td>
            <td>{{ ds.organism }}</td>
            <td>{{ ds.type }}</td>
            <td>{{ ds.access }}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>

  <div class="prose" style="margin-top: 60px;">
    <h2 data-i18n="datasets.h.using">On using public data</h2>

    <p>
      Public datasets are the backbone of reproducible computational
      biology. But availability does not remove responsibility: every
      dataset has a provenance, a licence and a set of conditions that
      should be read before it is used.
    </p>

    <p>
      Where a dataset requires credentialed access — such as MIMIC-IV
      or controlled-access genomic archives — the honest approach is
      to document the exact version, the date of access and the
      processing steps applied. Reanalysis is only as trustworthy
      as the trail it leaves behind.
    </p>

    <p>
      This list is not exhaustive. It reflects datasets that appear
      regularly in the author's own work, and it is updated as new
      ones are tried.
    </p>
  </div>

</article>
