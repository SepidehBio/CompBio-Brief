---
layout: post
title: "Single-Cell Quality Control: What Filters Actually Remove"
date: 2026-10-08
category: "Methods"
tags: [single-cell, quality-control, scanpy]
description: "Quality control is often treated as a preprocessing step. It is better understood as the first interpretive decision of any single-cell analysis."
excerpt: "Quality control in single-cell analysis is usually presented as a preprocessing step: filter cells with too few genes, remove those with high mitochondrial content, discard doublets. But every filter is a decision about what counts as a cell worth studying."
---

Quality control in single-cell analysis is usually presented as a
preprocessing step: filter cells with too few genes, remove those with
high mitochondrial content, discard doublets. It appears on workflows
as a box to be checked before the interesting work begins.

But every filter is a decision about what counts as a cell worth
studying. And those decisions shape everything that follows.

## What the standard filters do

The three filters seen most often in practice are gene count,
mitochondrial percentage and total counts per cell.

- **Gene count** removes cells with very few detected genes. These are
  often empty droplets or cells whose RNA has degraded.
- **Mitochondrial percentage** removes cells with a high fraction of
  reads mapping to mitochondrial genes — a sign of stressed or dying
  cells.
- **Total counts** removes outliers on either side: cells with
  implausibly low or high library sizes.

Each of these thresholds is a judgement, not a fact. Common values
(fewer than 200 genes, more than 20% mitochondrial) work well on some
tissues and poorly on others. Cardiac and muscle tissue, for example,
naturally have higher mitochondrial content and require different
thresholds.

## The interpretive layer

What is less often discussed is that quality control is already an
interpretive act. Excluding cells with high mitochondrial content
removes dying cells — but it also removes a real biological population,
if the question concerns cell death or stress response. Excluding
doublets removes technical artefacts — but a rare population of
genuinely fused cells would also be removed.

A defensible approach is to visualise distributions before and after
filtering, and to ask whether the removed cells differ from the kept
ones in ways that matter for the question being asked. If they do,
the filter is not preprocessing — it is a hypothesis.

## Documentation over defaults

There is no universal threshold. What matters is that the choice is
made deliberately and documented. A reader of the final analysis
should be able to see what was filtered, on what basis, and what was
lost.

In practice, this means keeping the unfiltered data. It means recording
the thresholds in the same place as the code. And it means treating
quality control as the first interpretive decision of the analysis,
rather than the last technical one.
