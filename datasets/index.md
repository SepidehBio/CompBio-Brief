---
layout: default
title: Datasets
description: A short list of open datasets commonly used in computational biology and biomedical data analysis.
permalink: /datasets/
---

<header class="page-header">
  <div class="container container-sm">
    <div class="page-header-eyebrow">Catalogue</div>
    <h1 class="page-header-title" data-i18n="section.datasets">Public datasets</h1>
    <p class="page-header-subtitle">
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
          <th>Dataset</th>
          <th>Organism</th>
          <th>Data type</th>
          <th>Samples</th>
          <th>Access</th>
          <th>Use cases</th>
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
            <td>{{ ds.samples }}</td>
            <td>{{ ds.access }}</td>
            <td>{{ ds.use_cases }}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>

  <div class="prose" style="margin-top: 60px;">
    <h2>On using public data</h2>

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
