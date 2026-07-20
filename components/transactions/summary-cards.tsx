import { formatCurrency, type DashboardTotals } from "@/lib/transactions";

type SummaryCardsProps = {
  totals: DashboardTotals;
};

export function SummaryCards({ totals }: SummaryCardsProps) {
  const secondaryCards = [
    {
      label: "Total Income",
      value: formatCurrency(totals.income, totals.currency),
      tone: "text-emerald-700",
    },
    {
      label: "Total Expense",
      value: formatCurrency(totals.expense, totals.currency),
      tone: "text-rose-700",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
      <article className="min-w-0 rounded-lg border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-emerald-700">Current Balance</p>
        <p
          className={`mt-3 break-words text-4xl font-semibold tracking-tight ${
            totals.balance >= 0 ? "text-emerald-950" : "text-rose-700"
          }`}
        >
          {formatCurrency(totals.balance, totals.currency)}
        </p>
        <p className="mt-3 text-sm leading-6 text-emerald-800">
          Your balance is calculated from recorded income and expenses.
        </p>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {secondaryCards.map((card) => (
          <article
            key={card.label}
            className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p
              className={`mt-3 break-words text-2xl font-semibold ${card.tone}`}
            >
              {card.value}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
