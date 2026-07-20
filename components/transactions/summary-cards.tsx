import { formatCurrency, type DashboardTotals } from "@/lib/transactions";

type SummaryCardsProps = {
  totals: DashboardTotals;
};

export function SummaryCards({ totals }: SummaryCardsProps) {
  const cards = [
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
    {
      label: "Current Balance",
      value: formatCurrency(totals.balance, totals.currency),
      tone: totals.balance >= 0 ? "text-foreground" : "text-rose-700",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className={`mt-3 break-words text-2xl font-semibold ${card.tone}`}>
            {card.value}
          </p>
        </article>
      ))}
    </div>
  );
}
