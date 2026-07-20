"use server";

import { revalidatePath } from "next/cache";

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

async function categoryBelongsToUser(
  categoryId: string,
  type: CategoryType,
  userId: string
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("id", categoryId)
    .eq("user_id", userId)
    .eq("type", type)
    .single();

  return !error && Boolean(data);
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

  const validCategory = await categoryBelongsToUser(
    parsed.data.categoryId,
    parsed.data.type,
    userId
  );

  if (!validCategory) {
    return { message: "Choose one of your categories." };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: userId,
    category_id: parsed.data.categoryId,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    description: parsed.data.description,
    transaction_date: parsed.data.transactionDate,
  });

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
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

  const validCategory = await categoryBelongsToUser(
    parsed.data.categoryId,
    parsed.data.type,
    userId
  );

  if (!validCategory) {
    return { message: "Choose one of your categories." };
  }

  const { error } = await supabase
    .from("transactions")
    .update({
      category_id: parsed.data.categoryId,
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

  revalidatePath("/dashboard");
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

  revalidatePath("/dashboard");
}
