import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { CollapsibleCategoryManagement } from "@/components/categories/collapsible-category-management";
import { FinancialInsights } from "@/components/insights/financial-insights";
import { QuickAddTransaction } from "@/components/transactions/quick-add-transaction";
import { SummaryCards } from "@/components/transactions/summary-cards";
import { TransactionList } from "@/components/transactions/transaction-list";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  calculateDashboardTotals,
  calculateFinancialInsights,
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
  const insights = calculateFinancialInsights(transactions);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-base font-semibold leading-none tracking-tight">
              FiJo
            </p>
            <p className="mt-1 text-xs leading-none text-muted-foreground">
              Financial Journey
            </p>
          </div>
          <LogoutButton />
        </nav>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section>
          <p className="text-sm font-medium text-emerald-700">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome to FiJo
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Financial awareness before financial advice.
          </p>
        </section>

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Financial Snapshot
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              See your current financial position at a glance.
            </p>
          </div>
          <SummaryCards totals={totals} />
        </section>

        {categories.length > 0 ? (
          <>
            <QuickAddTransaction categories={categories} />

            <section className="mt-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold tracking-tight">
                  Recent Transactions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review your latest recorded activity.
                </p>
              </div>
              <TransactionList
                categories={categories}
                transactions={transactions}
              />
            </section>
          </>
        ) : null}

        <FinancialInsights insights={insights} />

        <CollapsibleCategoryManagement categories={categories} />
      </section>
    </main>
  );
}
