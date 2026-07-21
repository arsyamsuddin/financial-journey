import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveCanonicalCategory } from "@/lib/catalog";
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

  const canonicalCategory = resolveCanonicalCategory({
    id: row.category_id,
    kind: category.type,
    name: category.name,
  });
  const displayCategory = {
    color: canonicalCategory.color,
    icon: canonicalCategory.icon,
    id: canonicalCategory.id,
    name: canonicalCategory.name,
    type: canonicalCategory.kind,
  };

  return {
    id: row.id,
    categoryId: canonicalCategory.id,
    categoryKind: canonicalCategory.kind,
    categoryName: canonicalCategory.name,
    categoryIcon: canonicalCategory.icon,
    categoryColor: canonicalCategory.color,
    storageCategoryId: row.category_id,
    amount: Number(row.amount),
    currency: row.currency,
    description: row.description,
    transactionDate: row.transaction_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    category: displayCategory,
  };
}

export async function getAuthenticatedFinancialData() {
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

  return { categories, insights, totals, transactions, user };
}

export async function requireAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
