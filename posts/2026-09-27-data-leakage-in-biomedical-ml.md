---
layout: post
title: "Data Leakage in Biomedical Machine Learning: A Quiet Failure"
date: 2026-09-27
category: "Methodology"
tags: [machine-learning, reproducibility, methodology]
description: "Data leakage rarely announces itself. The model performs well on paper, then fails silently when it encounters new data."
excerpt: "Data leakage is one of the most common — and least discussed — failure modes in applied machine learning for biomedical data. It rarely announces itself. The model performs well on paper, the validation metrics look convincing, and then it fails, silently, when it encounters new data."
---

Data leakage is one of the most common — and least discussed — failure
modes in applied machine learning for biomedical data. It rarely
announces itself. The model performs well on paper, the validation
metrics look convincing, and then it fails, silently, when it
encounters new data.

The problem is not a lack of tools. `scikit-learn` provides pipelines,
cross-validation utilities and clear documentation on proper evaluation.
The problem is that leakage is often *conceptual*, not technical. It
happens when information that would not be available at prediction time
accidentally enters the training process.

## A familiar example

Standardising features using statistics computed from the entire dataset
before splitting into training and test sets. The test set's distribution
has influenced the model's preprocessing. The model has seen the future.

This is a small mistake, but its consequences are not. A model trained
in this way will report validation metrics that cannot be reproduced on
truly held-out data.

## Subtler cases in biomedical work

In biomedical applications, leakage can take forms that are harder to
notice. Patient-level metadata — age, sex, batch, admission date — may
encode information that correlates with the outcome in ways that are not
clinically meaningful. A model trained on such data may learn to predict
the metadata, not the biology.

Similarly, in single-cell work, if cells from the same donor appear in
both training and test sets, the model may learn donor-specific
signatures rather than cell-type differences. The correct split is by
donor, not by cell.

## What to do about it

This is not a reason to avoid machine learning. It is a reason to be
deliberate.

Document your splits. Justify your features. Ask what information would
be available at the moment a prediction is needed, and ensure your
training setup respects that boundary.

The literature is increasingly clear on this: reproducibility in
computational biology depends as much on methodological discipline as
on algorithmic sophistication.
