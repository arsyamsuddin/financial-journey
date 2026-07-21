# FiJo User Flow
Version: 1.0

---

# Principles

Every workflow must minimize user decisions.

Every workflow must have one clear objective.

Maximum steps to complete any primary task: 3.

The user should never be asked for unnecessary information.

The system should make intelligent defaults whenever possible.

---

# Authentication Flow

Launch Application

↓

Check Authentication

↓

Authenticated

↓

Dashboard

OR

Unauthenticated

↓

Login

↓

Dashboard

---

# Dashboard Flow

Open Dashboard

↓

Review Financial Health

↓

Review Current Balance

↓

Review Account Summary

↓

Review Today's Insights

↓

Choose Next Action

↓

Income
Expense
Transfer
Transactions
Accounts
Insights
Community

---

# Income Flow

Dashboard

↓

Income

↓

Enter Amount

↓

Select Account

↓

Select Income Category

↓

Optional Description

↓

Select Date

↓

Save

↓

Update Account Balance

↓

Update Dashboard

↓

Return to Dashboard

---

# Expense Flow

Dashboard

↓

Expense

↓

Enter Amount

↓

Select Account

↓

Select Expense Category

↓

Optional Description

↓

Select Date

↓

Save

↓

Update Account Balance

↓

Update Dashboard

↓

Return to Dashboard

---

# Transfer Flow

Dashboard

↓

Transfer

↓

Select Source Account

↓

Select Destination Account

↓

Enter Amount

↓

Optional Description

↓

Select Date

↓

Transfer

↓

Update Both Accounts

↓

Update Dashboard

↓

Return to Dashboard

---

# Transaction History Flow

Dashboard

↓

Transactions

↓

Timeline

↓

Search or Filter

↓

Select Transaction

↓

View Detail

↓

Edit

OR

Delete

↓

Return to Timeline

---

# Transaction Search Flow

Transactions

↓

Enter Keyword

↓

Filter Results

↓

Select Transaction

↓

View Detail

↓

Return

---

# Transaction Filter Flow

Transactions

↓

Choose Filter

Account

Category

Date

Income

Expense

↓

Apply

↓

Timeline Updates

↓

Clear Filter

---

# Account Flow

Dashboard

↓

View All Accounts

↓

Select Account

↓

View Balance

↓

View History

↓

Transfer

OR

Edit

↓

Return

---

# Add Account Flow

Accounts

↓

Add Account

↓

Account Name

↓

Account Type

↓

Opening Balance

↓

Save

↓

Account Created

↓

Return to Accounts

---

# Insight Flow

Dashboard

↓

View Insights

↓

Financial Health

↓

Cash Flow

↓

Income Analysis

↓

Expense Analysis

↓

Category Analysis

↓

Recommendations

↓

Return

---

# Community Flow

Dashboard

↓

View Community

↓

Category Trends

↓

Spending Trends

↓

Behavior Trends

↓

Financial Awareness Index

↓

Return

---

# Settings Flow

Dashboard

↓

Settings

↓

Choose Section

↓

Update Configuration

↓

Save

↓

Return

---

# Category Management Flow

Settings

↓

Categories

↓

Income Categories

OR

Expense Categories

↓

Create

Edit

Delete

↓

Save

↓

Return

---

# Empty State Flow

User Opens Empty Page

↓

Explain Current State

↓

Explain Why

↓

Display One Primary Action

↓

Complete Action

↓

Return

---

# Error Flow

Action Failed

↓

Explain Error

↓

Provide Recovery Action

↓

Retry

OR

Cancel

↓

Return

---

# Success Flow

Action Completed

↓

Display Success Feedback

↓

Refresh Related Data

↓

Return Automatically

---

# Navigation Rules

Dashboard is always the home screen.

Back navigation always returns to the previous page.

Every page has one primary action.

Every primary action is visible without scrolling.

Users never lose context after completing an action.

---

# Transaction Rules

Income only displays income categories.

Expense only displays expense categories.

Transfer never displays categories.

Transfer always requires a source account.

Transfer always requires a destination account.

Amount is always required.

Account is always required.

Date defaults to today.

Description is optional.

---

# Dashboard Rules

Dashboard never contains forms.

Dashboard never contains filters.

Dashboard never contains configuration.

Dashboard never contains management screens.

Dashboard summarizes.

Dashboard guides.

Dashboard redirects.

---

# Page Responsibilities

Dashboard

Understand financial condition.

Transactions

Record and review financial activity.

Accounts

Manage financial assets.

Insights

Analyze financial behavior.

Community

Understand anonymous community trends.

Settings

Configure the application.