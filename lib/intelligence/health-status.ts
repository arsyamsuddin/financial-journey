import type {
  HealthScoreResult,
  HealthStatusResult,
} from "@/lib/intelligence/types";

export function getHealthStatus({
  monthly,
  score,
}: HealthScoreResult): HealthStatusResult {
  if (score < 35) {
    return {
      explanation:
        "Your recorded expenses are putting strong pressure on your current balance.",
      nextPriority: "Reduce non-essential spending and protect cash flow.",
      status: "Critical",
    };
  }

  if (score < 55) {
    return {
      explanation:
        "Your financial position needs attention before it can become stable.",
      nextPriority: "Focus on keeping monthly expenses below income.",
      status: "Weak",
    };
  }

  if (score < 70) {
    return {
      explanation:
        "Your records show early progress, but consistency is still developing.",
      nextPriority: "Improve savings consistency this month.",
      status: "Recovering",
    };
  }

  if (score < 85) {
    return {
      explanation: monthly.difference >= 0
        ? "Your records show a stable cash position this month."
        : "Your overall position is stable, but this month needs attention.",
      nextPriority: "Maintain positive monthly cash flow.",
      status: "Healthy",
    };
  }

  return {
    explanation:
      "Your current records show strong balance, cash flow, and consistency.",
    nextPriority: "Maintain current performance.",
    status: "Excellent",
  };
}
