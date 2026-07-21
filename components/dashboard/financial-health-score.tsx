import { CheckCircle2, CircleAlert } from "lucide-react";

import {
  formatCurrency,
  type DashboardTotals,
  type Transaction,
} from "@/lib/transactions";

type FinancialHealthScoreProps = {
  totals: DashboardTotals;
  transactions: Transaction[];
};

export function FinancialHealthScore({
  totals,
  transactions,
}: FinancialHealthScoreProps) {
  const monthly = getMonthlyFlow(transactions);
  const savingsRate =
    monthly.income === 0 ? 0 : (monthly.income - monthly.expense) / monthly.income;
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        55 +
          (totals.balance >= 0 ? 15 : -15) +
          Math.max(-20, Math.min(25, savingsRate * 100)) +
          Math.min(10, transactions.length)
      )
    )
  );
  const isHealthy = score >= 70;

  return (
    <article className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Financial Health Score
          </p>
          <p className="mt-3 text-5xl font-semibold tracking-tight">
            {score}
          </p>
        </div>
        <span
          className={`flex size-12 items-center justify-center rounded-2xl ${
            isHealthy
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {isHealthy ? (
            <CheckCircle2 className="size-6" />
          ) : (
            <CircleAlert className="size-6" />
          )}
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${
            isHealthy ? "bg-emerald-500" : "bg-amber-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {isHealthy
          ? "Your records show a stable cash position this month."
          : "Your score will improve as savings and positive cash flow grow."}
      </p>
      <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
        This month: {formatCurrency(monthly.income - monthly.expense, totals.currency)}
      </p>
    </article>
  );
}

function getMonthlyFlow(transactions: Transaction[]) {
  const now = new Date();
  let income = 0;
  let expense = 0;

  for (const transaction of transactions) {
    const date = new Date(`${transaction.transactionDate}T00:00:00`);

    if (date.getMonth() !== now.getMonth() || date.getFullYear() !== now.getFullYear()) {
      continue;
    }

    if (transaction.categoryKind === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  }

  return { expense, income };
}
