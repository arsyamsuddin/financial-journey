import type { CatalogKind } from "@/lib/catalog";

export type CategoryType = CatalogKind;

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
  categoryKind: CategoryType;
  categoryName: string;
  categoryIcon: string | null;
  categoryColor: string | null;
  storageCategoryId: string;
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

export type FinancialInsights = {
  averageExpenseTransaction: number | null;
  currency: string;
  highestExpenseCategory: {
    name: string;
    total: number;
  } | null;
  highestIncomeCategory: {
    name: string;
    total: number;
  } | null;
  totalTransactionsThisMonth: number;
};

export function calculateDashboardTotals(
  transactions: Transaction[]
): DashboardTotals {
  const currency = transactions[0]?.currency ?? "IDR";

  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.categoryKind === "income") {
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

export function calculateFinancialInsights(
  transactions: Transaction[],
  now = new Date()
): FinancialInsights {
  const currency = transactions[0]?.currency ?? "IDR";
  const expenseTotals = new Map<string, { name: string; total: number }>();
  const incomeTotals = new Map<string, { name: string; total: number }>();
  let expenseTransactionCount = 0;
  let expenseTransactionTotal = 0;
  let totalTransactionsThisMonth = 0;
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  for (const transaction of transactions) {
    const transactionDate = new Date(`${transaction.transactionDate}T00:00:00`);

    if (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    ) {
      totalTransactionsThisMonth += 1;
    }

    const categoryTotals =
      transaction.categoryKind === "income" ? incomeTotals : expenseTotals;
    const current = categoryTotals.get(transaction.categoryId) ?? {
      name: transaction.categoryName,
      total: 0,
    };

    current.total += transaction.amount;
    categoryTotals.set(transaction.categoryId, current);

    if (transaction.categoryKind === "expense") {
      expenseTransactionCount += 1;
      expenseTransactionTotal += transaction.amount;
    }
  }

  return {
    averageExpenseTransaction:
      expenseTransactionCount > 0
        ? expenseTransactionTotal / expenseTransactionCount
        : null,
    currency,
    highestExpenseCategory: getHighestCategoryTotal(expenseTotals),
    highestIncomeCategory: getHighestCategoryTotal(incomeTotals),
    totalTransactionsThisMonth,
  };
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getHighestCategoryTotal(
  categoryTotals: Map<string, { name: string; total: number }>
) {
  return Array.from(categoryTotals.values()).reduce<
    { name: string; total: number } | null
  >((highest, categoryTotal) => {
    if (!highest || categoryTotal.total > highest.total) {
      return categoryTotal;
    }

    return highest;
  }, null);
}
