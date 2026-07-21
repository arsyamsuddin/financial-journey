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
    <div className="grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
      <article className="min-w-0 overflow-hidden rounded-3xl bg-emerald-950 p-7 text-white shadow-[0_24px_70px_rgba(4,120,87,0.22)]">
        <p className="text-sm font-medium text-emerald-100/80">
          Current Balance
        </p>
        <p
          className={`mt-4 break-words text-5xl font-semibold tracking-tight ${
            totals.balance >= 0 ? "text-white" : "text-rose-200"
          }`}
        >
          {formatCurrency(totals.balance, totals.currency)}
        </p>
        <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50/75">
          Your clearest view of what remains after recorded income and expenses.
        </p>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {secondaryCards.map((card) => (
          <article
            key={card.label}
            className="min-w-0 rounded-2xl bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p
              className={`mt-3 break-words text-3xl font-semibold tracking-tight ${card.tone}`}
            >
              {card.value}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
