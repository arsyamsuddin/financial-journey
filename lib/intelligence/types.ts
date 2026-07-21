import type { DashboardTotals, Transaction } from "@/lib/transactions";

export type IntelligenceInput = {
  totals: DashboardTotals;
  transactions: Transaction[];
};

export type MonthlySnapshot = {
  changePercent: string;
  currency: string;
  difference: number;
  expense: number;
  income: number;
  previousDifference: number;
  savings: number;
  savingsRate: number;
};

export type HealthScoreResult = {
  monthly: MonthlySnapshot;
  score: number;
};

export type HealthStatusName =
  | "Critical"
  | "Weak"
  | "Recovering"
  | "Healthy"
  | "Excellent";

export type HealthStatusResult = {
  explanation: string;
  nextPriority: string;
  status: HealthStatusName;
};

export type WealthStageName =
  | "Starter"
  | "Builder"
  | "Stabilizer"
  | "Accumulator"
  | "Independent";

export type WealthStageResult = {
  description: string;
  stage: WealthStageName;
};

export type RecommendationPriority = "critical" | "high" | "medium" | "low";

export type RecommendationCategory =
  | "cash-flow"
  | "habit"
  | "income"
  | "savings"
  | "spending";

export type Recommendation = {
  category: RecommendationCategory;
  description: string;
  priority: RecommendationPriority;
  title: string;
};

export type NextMilestone = {
  description: string;
  title: string;
};

export type FinancialIntelligence = {
  healthScore: HealthScoreResult;
  healthStatus: HealthStatusResult;
  nextMilestone: NextMilestone;
  primaryRecommendation: Recommendation;
  recommendations: Recommendation[];
  wealthStage: WealthStageResult;
};
