import type { DashboardTotals, Transaction } from "@/lib/transactions";
import type {
  HealthScoreResult,
  WealthStageResult,
} from "@/lib/intelligence/types";

export function getWealthStage(
  totals: DashboardTotals,
  transactions: Transaction[],
  healthScore: HealthScoreResult
): WealthStageResult {
  const transactionCount = transactions.length;
  const monthlyIncome = healthScore.monthly.income;
  const balanceToIncome =
    monthlyIncome === 0 ? 0 : totals.balance / monthlyIncome;

  if (transactionCount === 0 || monthlyIncome === 0) {
    return {
      description:
        "You are building the first records needed to understand your finances.",
      stage: "Starter",
    };
  }

  if (healthScore.score < 60 || totals.balance <= 0) {
    return {
      description:
        "You are learning the patterns that shape your monthly cash flow.",
      stage: "Builder",
    };
  }

  if (balanceToIncome < 3) {
    return {
      description:
        "You are creating a more stable base from income, expenses, and savings.",
      stage: "Stabilizer",
    };
  }

  if (balanceToIncome < 12) {
    return {
      description:
        "You are accumulating surplus beyond short-term monthly needs.",
      stage: "Accumulator",
    };
  }

  return {
    description:
      "Your recorded position suggests strong independence from monthly volatility.",
    stage: "Independent",
  };
}
