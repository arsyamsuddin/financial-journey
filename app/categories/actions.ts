"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CategoryType } from "@/lib/transactions";

export type CategoryFormState = {
  message?: string;
  success?: boolean;
};

type CategoryPayload = {
  color: string | null;
  icon: string | null;
  name: string;
  type: CategoryType;
};

function parseCategoryForm(formData: FormData):
  | { data: CategoryPayload }
  | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "");
  const icon = String(formData.get("icon") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();

  if (!name) {
    return { error: "Category name is required." };
  }

  if (type !== "income" && type !== "expense") {
    return { error: "Choose income or expense." };
  }

  if (icon.length > 50) {
    return { error: "Icon name must be 50 characters or fewer." };
  }

  if (color.length > 20) {
    return { error: "Color must be 20 characters or fewer." };
  }

  return {
    data: {
      color: color || null,
      icon: icon || null,
      name,
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

export async function createCategory(
  _state: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const parsed = parseCategoryForm(formData);

  if ("error" in parsed) {
    return { message: parsed.error };
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  if (!userId) {
    return { message: "You must be signed in." };
  }

  const { error } = await supabase.from("categories").insert({
    user_id: userId,
    name: parsed.data.name,
    type: parsed.data.type,
    icon: parsed.data.icon,
    color: parsed.data.color,
  });

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  return { message: "Category created.", success: true };
}

export async function updateCategory(
  _state: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const id = String(formData.get("id") ?? "");
  const parsed = parseCategoryForm(formData);

  if (!id) {
    return { message: "Missing category." };
  }

  if ("error" in parsed) {
    return { message: parsed.error };
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  if (!userId) {
    return { message: "You must be signed in." };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name: parsed.data.name,
      type: parsed.data.type,
      icon: parsed.data.icon,
      color: parsed.data.color,
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  return { message: "Category updated.", success: true };
}

export async function deleteCategory(
  _state: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return { message: "Missing category." };
  }

  const { supabase, userId } = await getAuthenticatedUserId();

  if (!userId) {
    return { message: "You must be signed in." };
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  return { message: "Category deleted.", success: true };
}
