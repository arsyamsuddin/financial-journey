import type { DashboardTotals, Transaction } from "@/lib/transactions";
import type { HealthScoreResult, MonthlySnapshot } from "@/lib/intelligence/types";

export function calculateHealthScore(
  totals: DashboardTotals,
  transactions: Transaction[]
): HealthScoreResult {
  const monthly = calculateMonthlySnapshot(transactions, totals.currency);
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        55 +
          (totals.balance >= 0 ? 15 : -15) +
          Math.max(-20, Math.min(25, monthly.savingsRate * 100)) +
          Math.min(10, transactions.length)
      )
    )
  );

  return { monthly, score };
}

function calculateMonthlySnapshot(
  transactions: Transaction[],
  fallbackCurrency: string
): MonthlySnapshot {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  let income = 0;
  let expense = 0;
  let previousDifference = 0;
  const currency = transactions[0]?.currency ?? fallbackCurrency;

  for (const transaction of transactions) {
    const date = new Date(`${transaction.transactionDate}T00:00:00`);
    const signedAmount =
      transaction.categoryKind === "income"
        ? transaction.amount
        : -transaction.amount;

    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      if (transaction.categoryKind === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    }

    if (
      date.getMonth() === previousMonth &&
      date.getFullYear() === previousYear
    ) {
      previousDifference += signedAmount;
    }
  }

  const difference = income - expense;
  const change =
    previousDifference === 0
      ? null
      : ((difference - previousDifference) / Math.abs(previousDifference)) * 100;

  return {
    changePercent:
      change === null
        ? "No previous month yet"
        : `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
    currency,
    difference,
    expense,
    income,
    previousDifference,
    savings: difference,
    savingsRate: income === 0 ? 0 : difference / income,
  };
}
