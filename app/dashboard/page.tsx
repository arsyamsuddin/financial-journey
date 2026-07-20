import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { CategoryManagement } from "@/components/categories/category-management";
import { SummaryCards } from "@/components/transactions/summary-cards";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  calculateDashboardTotals,
  type Category,
  type Transaction,
} from "@/lib/transactions";

type TransactionRow = {
  id: string;
  category_id: string;
  amount: number | string;
  currency: string;
  description: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  categories: Category | Category[] | null;
};

function normalizeTransaction(row: TransactionRow): Transaction | null {
  const category = Array.isArray(row.categories)
    ? row.categories[0]
    : row.categories;

  if (!category) {
    return null;
  }

  return {
    id: row.id,
    categoryId: row.category_id,
    amount: Number(row.amount),
    currency: row.currency,
    description: row.description,
    transactionDate: row.transaction_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    category,
  };
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: categoriesData }, { data: transactionsData }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id, name, icon, color, type")
        .order("type", { ascending: true })
        .order("name", { ascending: true }),
      supabase
        .from("transactions")
        .select(
          `
          id,
          category_id,
          amount,
          currency,
          description,
          transaction_date,
          created_at,
          updated_at,
          categories!inner (
            id,
            name,
            icon,
            color,
            type
          )
        `
        )
        .order("transaction_date", { ascending: false })
        .order("created_at", { ascending: false }),
    ]);

  const categories = (categoriesData ?? []) as Category[];
  const transactions = ((transactionsData ?? []) as TransactionRow[])
    .map(normalizeTransaction)
    .filter((transaction): transaction is Transaction => Boolean(transaction));
  const totals = calculateDashboardTotals(transactions);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <p className="min-w-0 text-base font-semibold tracking-tight">
            Financial Journey
          </p>
          <LogoutButton />
        </nav>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-sm font-medium text-emerald-700">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Welcome back.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Track your income, expenses, and current balance from your recorded
          transactions.
        </p>

        <div className="mt-8">
          <SummaryCards totals={totals} />
        </div>

        <CategoryManagement categories={categories} />

        {categories.length > 0 ? (
          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight">
                Transactions
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Record income and expenses as they happen.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div id="add-transaction">
                <TransactionForm categories={categories} />
              </div>
              <TransactionList
                categories={categories}
                transactions={transactions}
              />
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
