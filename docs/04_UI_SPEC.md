# FiJo UI Specification
Version: 1.0

---

# Design Philosophy

FiJo is a premium personal finance application.

The interface prioritizes clarity, trust, calmness, and confidence.

Every screen should help users understand their financial condition within seconds.

Visual restraint is preferred over visual decoration.

---

# Design Principles

Information before interaction.

One primary action per screen.

Reduce cognitive load.

Prioritize whitespace over density.

Every component has a clear purpose.

Every animation communicates feedback.

Consistency is mandatory.

---

# Layout

## Desktop

Maximum content width: 1280px

Left Sidebar

Top App Bar

Scrollable Content Area

Sticky Sidebar

Sticky Top Bar

---

## Tablet

Collapsed Sidebar

Top App Bar

Scrollable Content Area

---

## Mobile

Top App Bar

Bottom Navigation

Floating Action Button

Single Column Layout

---

# Grid

Desktop

12 Columns

Tablet

6 Columns

Mobile

1 Column

---

# Spacing

Use an 8-point spacing system.

Allowed spacing values:

4

8

12

16

24

32

40

48

64

80

96

Do not use arbitrary spacing.

---

# Border Radius

Small

8px

Medium

12px

Large

16px

Extra Large

24px

Cards use 16px.

Buttons use 12px.

Inputs use 12px.

Dialogs use 24px.

---

# Elevation

Use minimal elevation.

Default components rely on borders.

Shadows are reserved for overlays.

Do not stack multiple shadows.

---

# Typography

Maximum three font sizes visible within one section.

Use clear visual hierarchy.

Numbers receive higher emphasis than labels.

Avoid uppercase paragraphs.

Prefer sentence case.

Left align all content except numerical summaries where center alignment improves readability.

---

# Color System

Neutral surfaces.

High contrast text.

Single primary accent.

Semantic colors only for financial meaning.

Income

Positive

Expense

Negative

Warning

Neutral warning

Error

Critical

Success

Confirmation

Avoid decorative gradients.

Avoid neon colors.

---

# Icons

Use one icon family.

Outline style.

Consistent stroke width.

Icons support content.

Icons never replace labels.

---

# Buttons

Primary

Highest priority action.

Filled.

Only one primary button per screen.

Secondary

Outlined.

Supporting actions.

Ghost

Low emphasis.

Text only.

Danger

Reserved for destructive actions.

---

# Floating Action Button

Desktop

Bottom Right

Mobile

Bottom Center

Opens:

Income

Expense

Transfer

No other floating actions.

---

# Cards

Cards group related information.

Cards never become containers for unrelated content.

Maximum one hierarchy level inside a card.

Avoid nested cards.

---

# Forms

Display only required fields.

Optional fields remain visually secondary.

Validate inline.

Never clear user input after validation errors.

Primary action remains visible.

---

# Inputs

Consistent height.

Visible focus state.

Clear labels.

Support helper text.

Avoid placeholder-only labels.

---

# Navigation

Desktop

Left Sidebar

Tablet

Collapsed Sidebar

Mobile

Bottom Navigation

Maximum five navigation items.

Current page always highlighted.

---

# Dashboard

Designed for scanning.

Users understand financial condition within 10 seconds.

Contains only summaries.

Never contains management interfaces.

Never contains configuration.

---

# Transactions

Timeline layout.

Newest first.

Grouping by date.

Quick access to edit.

Quick access to delete.

Search always visible.

Filters remain accessible.

---

# Accounts

Wallet-style presentation.

Each account displays:

Name

Balance

Type

Last Updated

Selecting an account opens details.

---

# Insights

Prioritize explanation over visualization.

Every chart includes context.

Every recommendation includes reasoning.

Avoid decorative analytics.

---

# Community

Anonymous.

Aggregated.

No personal information.

No social interactions.

No comments.

No likes.

No rankings.

---

# Empty States

Explain current state.

Explain value.

Provide one clear action.

Never blame the user.

---

# Loading States

Skeleton loading.

Maintain layout stability.

Avoid layout shifting.

---

# Error States

Explain what happened.

Explain what users can do next.

Provide Retry.

Avoid technical language.

---

# Success States

Short confirmation.

Automatic dismissal.

Refresh affected data.

Maintain user context.

---

# Motion

Purposeful only.

Motion confirms actions.

Motion guides attention.

Motion never delays interaction.

Avoid excessive animation.

---

# Accessibility

Keyboard accessible.

Screen reader friendly.

Visible focus indicators.

Sufficient color contrast.

Touch targets minimum 44×44 px.

Do not rely on color alone.

---

# Responsive Rules

Desktop first.

Graceful adaptation.

No horizontal scrolling.

Content order remains consistent across devices.

Primary action always reachable.

---

# Performance

Avoid unnecessary re-renders.

Lazy load heavy components.

Optimize images.

Minimize layout shift.

Maintain responsive interactions.

---

# Premium Experience Checklist

Minimal visual noise.

Generous whitespace.

Consistent spacing.

Consistent typography.

Fast interactions.

Smooth transitions.

Clear financial hierarchy.

Readable numbers.

Predictable navigation.

High perceived quality.

Every screen reinforces the product promise:

Financial awareness before financial advice.