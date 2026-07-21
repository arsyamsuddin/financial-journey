import { BadgeAlert, TrendingUp } from "lucide-react";
import Link from "next/link";

import { InsightCard } from "@/components/insights/insight-card";
import {
  formatCurrency,
  type FinancialInsights,
} from "@/lib/transactions";

type DashboardInsightPreviewProps = {
  insights: FinancialInsights;
};

export function DashboardInsightPreview({
  insights,
}: DashboardInsightPreviewProps) {
  const hasExpense = Boolean(insights.highestExpenseCategory);
  const card = hasExpense
    ? {
        description: `${insights.highestExpenseCategory?.name} is your largest expense category so far.`,
        icon: BadgeAlert,
        label: "Primary insight",
        title: formatCurrency(
          insights.highestExpenseCategory?.total ?? 0,
          insights.currency
        ),
        tone: "rose" as const,
      }
    : {
        description: insights.highestIncomeCategory
          ? `${insights.highestIncomeCategory.name} is your strongest recorded income source.`
          : "Record income or expenses to unlock your first financial insight.",
        icon: TrendingUp,
        label: "Primary insight",
        title: insights.highestIncomeCategory
          ? formatCurrency(insights.highestIncomeCategory.total, insights.currency)
          : "No insight yet",
        tone: "emerald" as const,
      };

  return (
    <section className="min-w-[320px] space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Today&apos;s insight
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            What needs attention
          </h2>
        </div>
        <Link href="/insights" className="text-sm font-medium text-emerald-700">
          View details
        </Link>
      </div>
      <InsightCard {...card} />
    </section>
  );
}
