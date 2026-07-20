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
      label: "Highest Expense Category",
      value: insights.highestExpenseCategory
        ? insights.highestExpenseCategory.name
        : "No expenses yet",
      detail: insights.highestExpenseCategory
        ? formatCurrency(
            insights.highestExpenseCategory.total,
            insights.currency
          )
        : "Record an expense to see this insight.",
    },
    {
      label: "Highest Income Category",
      value: insights.highestIncomeCategory
        ? insights.highestIncomeCategory.name
        : "No income yet",
      detail: insights.highestIncomeCategory
        ? formatCurrency(insights.highestIncomeCategory.total, insights.currency)
        : "Record income to see this insight.",
    },
    {
      label: "Total Transactions This Month",
      value: String(insights.totalTransactionsThisMonth),
      detail:
        insights.totalTransactionsThisMonth === 0
          ? "No transactions recorded this month."
          : "Transactions recorded in the current month.",
    },
    {
      label: "Average Expense Transaction",
      value:
        insights.averageExpenseTransaction === null
          ? "No expenses yet"
          : formatCurrency(insights.averageExpenseTransaction, insights.currency),
      detail:
        insights.averageExpenseTransaction === null
          ? "Record an expense to calculate the average."
          : "Average amount across expense transactions.",
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight">
          FiJo Insights
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A quick read on your recorded transaction patterns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-3 break-words text-xl font-semibold">
              {card.value}
            </p>
            <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
              {card.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
