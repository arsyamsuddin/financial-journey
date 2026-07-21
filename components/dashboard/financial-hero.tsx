import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  formatCurrency,
  type DashboardTotals,
  type Transaction,
} from "@/lib/transactions";

type FinancialHeroProps = {
  totals: DashboardTotals;
  transactions: Transaction[];
};

export function FinancialHero({ totals, transactions }: FinancialHeroProps) {
  const monthly = getMonthlySnapshot(transactions, totals.currency);
  const isPositive = monthly.difference >= 0;
  const healthScore = getHealthScore(totals, transactions, monthly);
  const isHealthy = healthScore >= 70;

  return (
    <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:p-6 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-stretch">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-emerald-200">
              Financial snapshot
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                isHealthy
                  ? "bg-emerald-400/15 text-emerald-100"
                  : "bg-amber-400/15 text-amber-100"
              }`}
            >
              {isHealthy ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <CircleAlert className="size-3.5" />
              )}
              Health {healthScore}
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {formatCurrency(totals.balance, totals.currency)}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            {isPositive
              ? "You are keeping more money in than out this month."
              : "Expenses are ahead of income this month. Review the flow below."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">Financial health</p>
                <p className="mt-2 text-3xl font-semibold">{healthScore}</p>
              </div>
              <span
                className={`flex size-10 items-center justify-center rounded-full ${
                  isHealthy
                    ? "bg-emerald-400/15 text-emerald-200"
                    : "bg-amber-400/15 text-amber-200"
                }`}
              >
                {isHealthy ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <CircleAlert className="size-5" />
                )}
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${
                  isHealthy ? "bg-emerald-300" : "bg-amber-300"
                }`}
                style={{ width: `${healthScore}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-400">
              {isHealthy ? "Stable condition" : "Needs attention"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">Monthly difference</p>
                <p
                  className={`mt-2 text-2xl font-semibold ${
                    isPositive ? "text-emerald-200" : "text-rose-200"
                  }`}
                >
                  {isPositive ? "+" : "-"}
                  {formatCurrency(
                    Math.abs(monthly.difference),
                    monthly.currency
                  )}
                </p>
              </div>
            <span
              className={`flex size-11 items-center justify-center rounded-full ${
                isPositive
                  ? "bg-emerald-400/15 text-emerald-200"
                  : "bg-rose-400/15 text-rose-200"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="size-5" />
              ) : (
                <ArrowDownRight className="size-5" />
              )}
            </span>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Monthly change: {monthly.changePercent}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <HeroMetric
          icon={<ArrowUpRight className="size-4" />}
          label="Monthly Income"
          tone="income"
          value={formatCurrency(monthly.income, monthly.currency)}
        />
        <HeroMetric
          icon={<ArrowDownRight className="size-4" />}
          label="Monthly Expense"
          tone="expense"
          value={formatCurrency(monthly.expense, monthly.currency)}
        />
        <HeroMetric
          icon={<TrendingUp className="size-4" />}
          label="Savings"
          tone={monthly.savings >= 0 ? "income" : "expense"}
          value={formatCurrency(monthly.savings, monthly.currency)}
        />
      </div>
    </section>
  );
}

function HeroMetric({
  icon,
  label,
  tone,
  value,
}: {
  icon: ReactNode;
  label: string;
  tone: "expense" | "income";
  value: string;
}) {
  const toneClass =
    tone === "income"
      ? "text-emerald-200"
      : "text-rose-200";

  return (
    <article className="rounded-2xl bg-white/7 p-4 ring-1 ring-white/10">
      <div className={`mb-4 flex size-9 items-center justify-center rounded-full bg-white/10 ${toneClass}`}>
        {icon}
      </div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 break-words text-lg font-semibold">{value}</p>
    </article>
  );
}

function getMonthlySnapshot(transactions: Transaction[], fallbackCurrency: string) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  let income = 0;
  let expense = 0;
  let previousDifference = 0;
  const currency = transactions[0]?.currency ?? fallbackCurrency;

  for (const transaction of transactions) {
    const date = new Date(`${transaction.transactionDate}T00:00:00`);
    const signedAmount =
      transaction.category.type === "income"
        ? transaction.amount
        : -transaction.amount;

    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      if (transaction.category.type === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    }

    if (
      date.getMonth() === previousMonth &&
      date.getFullYear() === previousYear
    ) {
      previousDifference += signedAmount;
    }
  }

  const difference = income - expense;
  const change =
    previousDifference === 0
      ? null
      : ((difference - previousDifference) / Math.abs(previousDifference)) * 100;
  const healthPercentage =
    income === 0 ? 0 : Math.min(Math.max((difference / income) * 100, 0), 100);

  return {
    changePercent: change === null ? "No previous month yet" : `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
    currency,
    difference,
    expense,
    healthPercentage,
    income,
    savings: difference,
  };
}

function getHealthScore(
  totals: DashboardTotals,
  transactions: Transaction[],
  monthly: ReturnType<typeof getMonthlySnapshot>
) {
  const savingsRate =
    monthly.income === 0 ? 0 : monthly.difference / monthly.income;

  return Math.max(
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
}
