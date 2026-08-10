---
title: "Why the Frontend and Backend Need to Work Together"
date: "2026-08-12"
excerpt: "A portfolio works best when the UI and API speak the same language. That shared structure makes maintenance easier and the user experience smoother."
---

## The problem with disconnected frontend work

It is easy to build a portfolio by creating great-looking React components and then treating the actual data layer as an afterthought. But once the app starts to grow, that approach breaks down quickly.

When the frontend and backend do not share a clear contract, you end up with mismatched data, broken sections, and a lot of debugging around missing fields or stale content.

## The better pattern

The better pattern is to define the portfolio data model early, then let both the frontend and backend build around it.

For example:

- projects need a name, description, image, and link
- experience entries need a role, summary, and timeframe
- writings need a title, excerpt, date, and slug
- contact submissions need validation and delivery

Once those fields are clear, the application becomes easier to reason about and easier to extend.

## Why this matters in a portfolio

Personal projects often grow in stages. You begin with a single page, then add case studies, then a writing section, then contact handling, then analytics. Without a shared data structure, that growth becomes chaotic.

When the frontend calls a stable API, the UI can stay focused on layout and interaction while the backend handles data access and processing.

## The takeaway

The strongest portfolio is not just visually polished. It is also predictable, maintainable, and structured.

That is why this project separates its API and its UI. It gives the site a clearer architecture and makes future expansion much easier.
