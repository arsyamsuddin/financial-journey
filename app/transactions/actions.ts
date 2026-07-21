"use server";

import { revalidatePath } from "next/cache";

import {
  findCategoryById,
  isLeafCategory,
  type CanonicalCategory,
} from "@/lib/catalog";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CategoryType } from "@/lib/transactions";

export type TransactionFormState = {
  message?: string;
  success?: boolean;
};

type TransactionPayload = {
  amount: number;
  categoryId: string;
  currency: string;
  description: string | null;
  transactionDate: string;
  type: CategoryType;
};

function parseTransactionForm(formData: FormData):
  | { data: TransactionPayload }
  | { error: string } {
  const type = String(formData.get("type") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  const amount = Number(formData.get("amount"));
  const currency = String(formData.get("currency") ?? "IDR")
    .trim()
    .toUpperCase();
  const description = String(formData.get("description") ?? "").trim();
  const transactionDate = String(formData.get("transactionDate") ?? "");

  if (type !== "income" && type !== "expense") {
    return { error: "Choose income or expense." };
  }

  if (!categoryId) {
    return { error: "Choose a category." };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Amount must be greater than zero." };
  }

  if (!currency || currency.length > 10) {
    return { error: "Currency is required." };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(transactionDate)) {
    return { error: "Choose a valid transaction date." };
  }

  return {
    data: {
      amount,
      categoryId,
      currency,
      description: description || null,
      transactionDate,
      type,
    },
  };
}

async function getAuthenticatedUserId() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, userId: user?.id };
}

function getValidCanonicalCategory(categoryId: string, type: CategoryType) {
  const category = findCategoryById(categoryId);

  if (!category || category.kind !== type || !isLeafCategory(category)) {
    return null;
  }

  return category;
}

async function getStorageCategoryId({
  category,
  supabase,
  userId,
}: {
  category: CanonicalCategory;
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("categories")
    .upsert(
      {
        color: category.color,
        icon: category.icon,
        name: category.name,
        type: category.kind,
        user_id: userId,
      },
      { onConflict: "user_id,type,name" }
    )
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Unable to prepare category." };
  }

  return { id: data.id as string };
}

function revalidateFinancialRoutes() {
  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/insights");
}

export async function createTransaction(
  _state: TransactionFormState,
  formData: FormData
): Promise<TransactionFormState> {
  const parsed = parseTransactionForm(formData);

  if ("error" in parsed) {
    return { message: parsed.error };
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  if (!userId) {
    return { message: "You must be signed in." };
  }

  const canonicalCategory = getValidCanonicalCategory(
    parsed.data.categoryId,
    parsed.data.type
  );

  if (!canonicalCategory) {
    return { message: "Choose a valid category." };
  }

  const storageCategory = await getStorageCategoryId({
    category: canonicalCategory,
    supabase,
    userId,
  });

  if ("error" in storageCategory) {
    return { message: storageCategory.error };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: userId,
    category_id: storageCategory.id,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    description: parsed.data.description,
    transaction_date: parsed.data.transactionDate,
  });

  if (error) {
    return { message: error.message };
  }

  revalidateFinancialRoutes();
  return { message: "Transaction created.", success: true };
}

export async function updateTransaction(
  _state: TransactionFormState,
  formData: FormData
): Promise<TransactionFormState> {
  const id = String(formData.get("id") ?? "");
  const parsed = parseTransactionForm(formData);

  if (!id) {
    return { message: "Missing transaction." };
  }

  if ("error" in parsed) {
    return { message: parsed.error };
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  if (!userId) {
    return { message: "You must be signed in." };
  }

  const canonicalCategory = getValidCanonicalCategory(
    parsed.data.categoryId,
    parsed.data.type
  );

  if (!canonicalCategory) {
    return { message: "Choose a valid category." };
  }

  const storageCategory = await getStorageCategoryId({
    category: canonicalCategory,
    supabase,
    userId,
  });

  if ("error" in storageCategory) {
    return { message: storageCategory.error };
  }

  const { error } = await supabase
    .from("transactions")
    .update({
      category_id: storageCategory.id,
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      description: parsed.data.description,
      transaction_date: parsed.data.transactionDate,
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return { message: error.message };
  }

  revalidateFinancialRoutes();
  return { message: "Transaction updated.", success: true };
}

export async function deleteTransaction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  if (!userId) {
    return;
  }

  await supabase.from("transactions").delete().eq("id", id).eq("user_id", userId);

  revalidateFinancialRoutes();
}
