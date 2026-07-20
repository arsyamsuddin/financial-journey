export type CategoryType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  type: CategoryType;
};

export type Transaction = {
  id: string;
  categoryId: string;
  amount: number;
  currency: string;
  description: string | null;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type DashboardTotals = {
  income: number;
  expense: number;
  balance: number;
  currency: string;
};

export function calculateDashboardTotals(
  transactions: Transaction[]
): DashboardTotals {
  const currency = transactions[0]?.currency ?? "IDR";

  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.category.type === "income") {
        totals.income += transaction.amount;
      } else {
        totals.expense += transaction.amount;
      }

      totals.balance = totals.income - totals.expense;
      return totals;
    },
    { income: 0, expense: 0, balance: 0, currency }
  );
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
