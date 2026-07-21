import { SectionHeader } from "@/components/dashboard/section-header";
import { formatCurrency, type Transaction } from "@/lib/transactions";

type CashFlowChartProps = {
  transactions: Transaction[];
};

export function CashFlowChart({ transactions }: CashFlowChartProps) {
  const currency = transactions[0]?.currency ?? "IDR";
  const buckets = getLastSixMonths(transactions);
  const maxValue = Math.max(
    1,
    ...buckets.flatMap((bucket) => [bucket.income, bucket.expense])
  );

  return (
    <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
      <SectionHeader
        eyebrow="Cash Flow"
        meta="Last 6 months"
        title="Income vs expense"
      />

      <div className="mt-6 flex h-56 items-end gap-3 overflow-hidden">
        {buckets.map((bucket) => (
          <div key={bucket.label} className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex h-40 items-end justify-center gap-1.5">
              <span
                className="w-full rounded-t-xl bg-emerald-400/80 transition-all hover:bg-emerald-500"
                title={`Income ${formatCurrency(bucket.income, currency)}`}
                style={{ height: `${Math.max((bucket.income / maxValue) * 100, 4)}%` }}
              />
              <span
                className="w-full rounded-t-xl bg-rose-300/90 transition-all hover:bg-rose-400"
                title={`Expense ${formatCurrency(bucket.expense, currency)}`}
                style={{ height: `${Math.max((bucket.expense / maxValue) * 100, 4)}%` }}
              />
            </div>
            <p className="truncate text-center text-xs font-medium text-muted-foreground">
              {bucket.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-emerald-400" />
          Income
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-300" />
          Expense
        </span>
      </div>
    </section>
  );
}

function getLastSixMonths(transactions: Transaction[]) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const bucket = {
      expense: 0,
      income: 0,
      label: formatter.format(date),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    for (const transaction of transactions) {
      const transactionDate = new Date(`${transaction.transactionDate}T00:00:00`);

      if (
        transactionDate.getMonth() === bucket.month &&
        transactionDate.getFullYear() === bucket.year
      ) {
        if (transaction.category.type === "income") {
          bucket.income += transaction.amount;
        } else {
          bucket.expense += transaction.amount;
        }
      }
    }

    return bucket;
  });
}
