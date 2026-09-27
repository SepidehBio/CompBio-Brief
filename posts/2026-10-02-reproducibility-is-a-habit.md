---
layout: post
title: "Reproducibility Is a Habit, Not a Checkbox"
date: 2026-10-02
category: "Practice"
tags: [reproducibility, workflows, open-science]
description: "Reproducibility is not something added at the end of a project. It is built into the way work is done from the first day."
excerpt: "There is a particular kind of disappointment that comes from returning to your own analysis six months later and finding it does not run. Not because the science was wrong, but because the trail has gone cold."
---

There is a particular kind of disappointment that comes from returning
to your own analysis six months later and finding it does not run. Not
because the science was wrong, but because the trail has gone cold. A
package has been updated. A file path has changed. An intermediate step
was performed in a notebook that no longer exists.

The common response is to treat reproducibility as a task to be completed
at the end of a project: document the code, clean the repository, write
a README. This is better than nothing, but it misses the point. By the
time the project is finished, the details that made it reproducible have
already been forgotten.

## Habits rather than checklists

A more durable approach is to treat reproducibility as a habit — a set
of small choices made every day, not a checklist applied at the end.

Some of the habits that have made the biggest difference in practice:

- Writing scripts as if someone else will run them tomorrow, because
  tomorrow that someone will be you.
- Recording the environment (versions, dependencies) at the moment a
  result is produced, not later.
- Treating every intermediate file as something that should be
  regenerable from raw data and code.
- Committing often, with messages that explain *why* rather than *what*.

None of these require special tools. They require attention.

## The slow version is the fast version

It is tempting to skip documentation when a deadline is close. The
deadline will pass; the analysis may not. The time saved today becomes
time lost next month, when the same work has to be reconstructed
from memory.

Reproducibility is not a burden placed on research by outside pressure.
It is the natural state of work that is understood well enough to be
explained. When it is missing, it is usually a sign that something
else has been left unclear.

## A quiet standard

The standard is not that every project must be perfect. The standard
is that someone else — including a future version of yourself — could
follow the trail and arrive at the same place.

That is achievable. It does not require institutional infrastructure
or large budgets. It requires only that the habit is formed early and
kept.
