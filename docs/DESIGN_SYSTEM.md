# FiJo Design System
Version: 1.0

This document defines the visual language, interaction principles, and UI standards for FiJo.

Every UI implementation must follow this document.

If a prompt conflicts with this document, this document takes precedence unless the prompt explicitly states an override.

---

# Product Identity

Primary Brand

FiJo

Secondary Brand

Financial Journey

Tagline

Financial awareness before financial advice.

---

# Product Philosophy

FiJo is not a bookkeeping application.

FiJo is not an accounting application.

FiJo helps users understand their financial behavior before making financial decisions.

Every screen should reinforce awareness rather than administration.

The interface must reduce cognitive load.

The interface must reduce unnecessary decisions.

The interface must feel calm.

The interface must never feel overwhelming.

---

# Design Personality

FiJo must feel:

- Calm
- Trustworthy
- Modern
- Minimal
- Human
- Premium

FiJo must never feel:

- Corporate
- Technical
- Administrative
- Dashboard-heavy
- Gaming
- Crypto
- Neon
- Futuristic

---

# Visual Hierarchy

Every screen follows this priority.

1. Current financial situation

2. Primary action

3. Recent activity

4. Insights

5. Configuration

Configuration must never dominate the interface.

---

# Dashboard Hierarchy

Dashboard order is fixed.

1.
Header

2.
Financial Snapshot

3.
Primary Action

4.
Recent Transactions

5.
FiJo Insights

6.
Community Insights

7.
Manage Categories

---

# Layout

Maximum content width

1280px

Horizontal padding

Desktop

32px

Tablet

24px

Mobile

16px

Vertical rhythm

32px

Cards never touch each other.

Every section has breathing room.

---

# Typography

Font

Geist

Only four font sizes are used.

Display

Page Title

Section Title

Body

Do not introduce additional font scales.

Titles must be short.

Descriptions must be one sentence whenever possible.

Avoid paragraphs.

---

# Colors

Primary

Emerald

Income

Emerald

Expense

Rose

Balance

Blue

Insight

Amber

Information

Slate

Background

Neutral

Cards

White

Borders

Very light gray

Avoid saturated colors.

Never use gradients unless specifically approved.

---

# Cards

Cards define content groups.

Rules

Rounded corners

Large internal padding

Soft border

Minimal shadow

Consistent spacing

Cards must never feel dense.

---

# Buttons

Primary

Filled

Secondary

Outline

Tertiary

Ghost

Danger

Destructive

Only one primary button is allowed per visible section.

---

# Icons

Use Lucide only.

Never mix icon libraries.

Icons support content.

Icons never replace labels.

Icons must remain visually consistent.

---

# Navigation

Navigation must remain minimal.

Users should immediately understand where they are.

Maximum navigation depth:

2

---

# Forms

Forms ask for the minimum amount of information.

Every field must justify its existence.

If a field can be derived automatically,
do not ask the user.

Never ask users to choose colors.

Never ask users to choose icons.

Prefer presets.

Advanced options remain hidden until requested.

---

# Transactions

Transactions are the primary activity.

Transaction creation must require as few decisions as possible.

Recent transactions must always remain visible.

Transaction history is chronological.

Income is visually positive.

Expense is visually negative.

Amounts receive the strongest emphasis.

Descriptions receive secondary emphasis.

Dates receive tertiary emphasis.

---

# Categories

Categories are configuration.

Categories are not the primary workflow.

Category management must stay visually separated from daily activity.

Preset categories are preferred.

Custom categories remain optional.

---

# Financial Snapshot

Current Balance receives highest emphasis.

Income receives secondary emphasis.

Expense receives secondary emphasis.

Balance is always displayed first.

---

# Insights

Insights explain.

Insights do not merely display statistics.

Every insight answers a question.

Insights should help users understand behavior.

Avoid technical wording.

Use natural language.

---

# Community Insights

Community Insights only display anonymized aggregated information.

No personally identifiable information is ever shown.

No individual financial information is ever shown.

Community Insights exist to provide context, not comparison.

---

# Empty States

Every empty state answers:

What happened.

Why it happened.

What the user should do next.

Every empty state contains exactly one primary action.

---

# Feedback

Every successful action provides immediate confirmation.

Every failed action explains why.

Error messages explain the problem.

Error messages never blame the user.

---

# Responsive Design

Mobile-first.

Desktop expands naturally.

No horizontal scrolling.

Buttons remain reachable.

Touch targets are at least 44px.

---

# Accessibility

Keyboard navigation must work.

Focus states remain visible.

Color alone must never communicate meaning.

Every icon must have a text equivalent.

---

# Motion

Motion supports understanding.

Motion never exists purely for decoration.

Animations remain subtle.

Avoid unnecessary transitions.

---

# Performance

UI must feel immediate.

Avoid unnecessary re-renders.

Avoid heavy client-side JavaScript.

Prefer server components whenever practical.

---

# Information Density

Show only what users need now.

Hide configuration until needed.

Hide advanced controls until requested.

Reduce visual noise whenever possible.

---

# Component Reusability

Every repeated pattern becomes a reusable component.

Avoid duplicate implementations.

Avoid one-off UI.

---

# Naming

Use consistent terminology.

Always use:

FiJo

Financial Snapshot

Recent Transactions

FiJo Insights

Community Insights

Manage Categories

Never introduce alternative labels for the same concept.

---

# AI Integration

AI must never become the primary interface.

AI explains.

AI summarizes.

AI recommends.

AI never replaces financial data.

Users always see the underlying data first.

---

# Future Features

Every future feature must answer three questions before implementation.

Does it improve financial awareness?

Does it reduce user effort?

Does it remain consistent with the FiJo philosophy?

If any answer is "No", the feature must not be implemented.

---

# Final Rule

When multiple implementation choices exist:

Choose the solution that reduces user decisions.

Choose the solution that improves clarity.

Choose the solution that feels calmer.

Never optimize for showing more features.

Always optimize for making better financial decisions.