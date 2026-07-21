import { calculateHealthScore } from "@/lib/intelligence/health-score";
import { getHealthStatus } from "@/lib/intelligence/health-status";
import { getWealthStage } from "@/lib/intelligence/wealth-stage";
import type {
  FinancialIntelligence,
  IntelligenceInput,
  NextMilestone,
  Recommendation,
  RecommendationPriority,
} from "@/lib/intelligence/types";

const priorityWeight: Record<RecommendationPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function generateFinancialIntelligence({
  totals,
  transactions,
}: IntelligenceInput): FinancialIntelligence {
  const healthScore = calculateHealthScore(totals, transactions);
  const healthStatus = getHealthStatus(healthScore);
  const wealthStage = getWealthStage(totals, transactions, healthScore);
  const recommendations = generateRecommendations({
    totals,
    transactions,
  });
  const primaryRecommendation = getPrimaryRecommendation(recommendations);
  const nextMilestone = getNextMilestone(healthScore.score, healthScore.monthly);

  return {
    healthScore,
    healthStatus,
    nextMilestone,
    primaryRecommendation,
    recommendations,
    wealthStage,
  };
}

export function generateRecommendations({
  totals,
  transactions,
}: IntelligenceInput): Recommendation[] {
  const healthScore = calculateHealthScore(totals, transactions);
  const { monthly } = healthScore;
  const expenseRatio = monthly.income === 0 ? 0 : monthly.expense / monthly.income;
  const recommendations: Recommendation[] = [];

  if (transactions.length === 0) {
    recommendations.push({
      category: "habit",
      description:
        "Start by recording one income or expense so FiJo can calculate your first pattern.",
      priority: "high",
      title: "Create your first financial record",
    });
  }

  if (totals.balance < 0) {
    recommendations.push({
      category: "cash-flow",
      description:
        "Your recorded expenses are higher than income. Focus on returning balance above zero.",
      priority: "critical",
      title: "Recover your current balance",
    });
  }

  if (monthly.income === 0 && transactions.length > 0) {
    recommendations.push({
      category: "income",
      description:
        "Add income records so FiJo can compare money coming in with money going out.",
      priority: "high",
      title: "Record income consistently",
    });
  }

  if (monthly.income > 0 && expenseRatio > 0.85) {
    recommendations.push({
      category: "spending",
      description:
        "Expenses are using most of this month's income. Review flexible spending first.",
      priority: "high",
      title: "Reduce monthly expense pressure",
    });
  }

  if (monthly.income > 0 && monthly.savingsRate < 0.1) {
    recommendations.push({
      category: "savings",
      description:
        "Your current savings margin is thin. Aim to keep at least 10% of income unspent.",
      priority: "medium",
      title: "Improve savings consistency",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      category: "habit",
      description:
        "Your current records look stable. Keep recording activity to maintain awareness.",
      priority: "low",
      title: "Maintain current performance",
    });
  }

  return recommendations.sort(
    (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
  );
}

export function getPrimaryRecommendation(
  recommendations: Recommendation[]
): Recommendation {
  return recommendations[0];
}

function getNextMilestone(
  score: number,
  monthly: { income: number; savingsRate: number }
): NextMilestone {
  if (score < 55) {
    return {
      description: "Reduce spending pressure before adding more goals.",
      title: "Reduce discretionary spending",
    };
  }

  if (monthly.income === 0) {
    return {
      description: "Record income so cash flow can be measured accurately.",
      title: "Build income visibility",
    };
  }

  if (monthly.savingsRate < 0.1) {
    return {
      description: "Create a wider gap between income and expenses.",
      title: "Improve savings consistency",
    };
  }

  if (monthly.savingsRate < 0.25) {
    return {
      description: "Use the current surplus to strengthen short-term resilience.",
      title: "Increase emergency fund",
    };
  }

  return {
    description: "Keep current recording habits and preserve positive cash flow.",
    title: "Maintain current performance",
  };
}
