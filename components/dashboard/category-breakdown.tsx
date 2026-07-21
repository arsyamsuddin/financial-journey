import { CategoryIcon } from "@/components/categories/category-icon";
import { SectionHeader } from "@/components/dashboard/section-header";
import { formatCurrency, type Transaction } from "@/lib/transactions";

type CategoryBreakdownProps = {
  transactions: Transaction[];
};

export function CategoryBreakdown({ transactions }: CategoryBreakdownProps) {
  const currency = transactions[0]?.currency ?? "IDR";
  const expenseCategories = getCategoryTotals(transactions, "expense");
  const incomeCategories = getCategoryTotals(transactions, "income");
  const largestExpense = expenseCategories[0];
  const largestIncome = incomeCategories[0];
  const expenseTotal = expenseCategories.reduce(
    (total, category) => total + category.total,
    0
  );
  const donutStops = buildDonutStops(expenseCategories, expenseTotal);

  return (
    <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
      <SectionHeader
        description="See where expenses concentrate and which income source leads."
        eyebrow="Spending Analysis"
        title="Category breakdown"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="mx-auto flex size-48 items-center justify-center rounded-full p-5 shadow-inner ring-1 ring-slate-900/5">
          <div
            className="flex size-full items-center justify-center rounded-full"
            style={{
              background:
                expenseTotal > 0
                  ? `conic-gradient(${donutStops})`
                  : "conic-gradient(#e2e8f0 0deg 360deg)",
            }}
          >
            <div className="flex size-28 flex-col items-center justify-center rounded-full bg-white text-center">
              <span className="text-xs text-muted-foreground">Expenses</span>
              <span className="mt-1 text-lg font-semibold">
                {formatCurrency(expenseTotal, currency)}
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <CategorySummary
              label="Largest Expense"
              transaction={largestExpense}
              fallback="No expenses yet"
              currency={currency}
            />
            <CategorySummary
              label="Largest Income"
              transaction={largestIncome}
              fallback="No income yet"
              currency={currency}
            />
          </div>

          <div className="space-y-3">
            {expenseCategories.length > 0 ? (
              expenseCategories.slice(0, 5).map((category) => {
                const percentage =
                  expenseTotal === 0 ? 0 : (category.total / expenseTotal) * 100;

                return (
                  <div key={category.id}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <CategoryIcon color={category.color} icon={category.icon} />
                        <span className="truncate text-sm font-medium">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${Math.max(percentage, 4)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-muted-foreground">
                Add expenses to see which categories shape your spending.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySummary({
  currency,
  fallback,
  label,
  transaction,
}: {
  currency: string;
  fallback: string;
  label: string;
  transaction?: CategoryTotal;
}) {
  return (
    <article className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 truncate text-base font-semibold">
        {transaction?.name ?? fallback}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {transaction ? formatCurrency(transaction.total, currency) : "Start recording"}
      </p>
    </article>
  );
}

type CategoryTotal = {
  color: string | null;
  icon: string | null;
  id: string;
  name: string;
  total: number;
};

function getCategoryTotals(
  transactions: Transaction[],
  type: "expense" | "income"
) {
  const totals = new Map<string, CategoryTotal>();

  for (const transaction of transactions) {
    if (transaction.category.type !== type) {
      continue;
    }

    const current = totals.get(transaction.categoryId) ?? {
      color: transaction.category.color,
      icon: transaction.category.icon,
      id: transaction.categoryId,
      name: transaction.category.name,
      total: 0,
    };

    current.total += transaction.amount;
    totals.set(transaction.categoryId, current);
  }

  return Array.from(totals.values()).sort((a, b) => b.total - a.total);
}

function buildDonutStops(categories: CategoryTotal[], total: number) {
  const colors = ["#10b981", "#0f172a", "#38bdf8", "#f59e0b", "#f43f5e"];
  let cursor = 0;

  return categories
    .slice(0, 5)
    .map((category, index) => {
      const start = cursor;
      const end = cursor + (category.total / total) * 360;
      cursor = end;
      return `${colors[index]} ${start}deg ${end}deg`;
    })
    .join(", ");
}
