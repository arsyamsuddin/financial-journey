import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { CollapsibleCategoryManagement } from "@/components/categories/collapsible-category-management";
import { AccountSummary } from "@/components/dashboard/account-card";
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { CommunityInsights } from "@/components/dashboard/community-insights";
import { FinancialHero } from "@/components/dashboard/financial-hero";
import { FutureModules } from "@/components/dashboard/future-modules";
import { QuickActionPanel } from "@/components/dashboard/quick-action-panel";
import { FinancialInsights } from "@/components/insights/financial-insights";
import { TransactionTimeline } from "@/components/transactions/transaction-timeline";
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef7f2_100%)] text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
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

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <FinancialHero totals={totals} transactions={transactions} />

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
          <div className="space-y-6">
            <QuickActionPanel categories={categories} />
            <CashFlowChart transactions={transactions} />
          </div>
          <AccountSummary totals={totals} transactions={transactions} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <CategoryBreakdown transactions={transactions} />
          <TransactionTimeline
            categories={categories}
            transactions={transactions}
          />
        </section>

        <FinancialInsights insights={insights} />

        <CommunityInsights />

        <FutureModules />

        <CollapsibleCategoryManagement categories={categories} />
      </section>
    </main>
  );
}
