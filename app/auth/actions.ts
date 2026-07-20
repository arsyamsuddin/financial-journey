"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthFormState = {
  message?: string;
};

function getCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  return { email, password };
}

function getRedirectPath(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "");

  if (redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
    return redirectTo;
  }

  return "/dashboard";
}

export async function login(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const credentials = getCredentials(formData);

  if ("error" in credentials) {
    return { message: credentials.error };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  redirect(getRedirectPath(formData));
}

export async function register(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const credentials = getCredentials(formData);

  if ("error" in credentials) {
    return { message: credentials.error };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp(credentials);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
  redirect(getRedirectPath(formData));
}

export async function logout() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
