import {
  BadgeAlert,
  CircleDollarSign,
  ReceiptText,
  TrendingUp,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { InsightCard } from "@/components/insights/insight-card";
import {
  formatCurrency,
  type FinancialInsights as FinancialInsightsData,
} from "@/lib/transactions";

type FinancialInsightsProps = {
  insights: FinancialInsightsData;
};

export function FinancialInsights({ insights }: FinancialInsightsProps) {
  const cards = [
    {
      description: insights.highestExpenseCategory
        ? insights.highestExpenseCategory.name
        : "Record an expense to see where your money is going.",
      icon: BadgeAlert,
      label: "Spending Alert",
      title: insights.highestExpenseCategory
        ? formatCurrency(
            insights.highestExpenseCategory.total,
            insights.currency
          )
        : "No expenses yet",
      tone: "rose" as const,
    },
    {
      description: insights.highestIncomeCategory
        ? insights.highestIncomeCategory.name
        : "Record income to understand your strongest inflow.",
      icon: TrendingUp,
      label: "Income Growth",
      title: insights.highestIncomeCategory
        ? formatCurrency(insights.highestIncomeCategory.total, insights.currency)
        : "No income yet",
      tone: "emerald" as const,
    },
    {
      description:
        insights.totalTransactionsThisMonth === 0
          ? "No transactions recorded this month."
          : "Your records are building a clearer monthly picture.",
      icon: ReceiptText,
      label: "Monthly Summary",
      title: `${insights.totalTransactionsThisMonth} transactions`,
      tone: "sky" as const,
    },
    {
      description:
        insights.averageExpenseTransaction === null
          ? "Record an expense to calculate your baseline."
          : "Use this as a quick reference before adding a new expense.",
      icon: CircleDollarSign,
      label: "Spending Baseline",
      title:
        insights.averageExpenseTransaction === null
          ? "No expenses yet"
          : formatCurrency(
              insights.averageExpenseTransaction,
              insights.currency
            ),
      tone: "amber" as const,
    },
  ];

  return (
    <section className="space-y-4">
      <SectionHeader
        description="Clear signals that turn your records into financial awareness."
        eyebrow="Smart Insights"
        title="FiJo Insights"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <InsightCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}
