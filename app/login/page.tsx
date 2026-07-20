import { redirect } from "next/navigation";

import { login } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth/auth-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const { redirectTo } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/35 px-4 py-12">
      <AuthForm
        action={login}
        alternateHref="/register"
        alternateLabel="Create an account"
        alternateText="New to FiJo?"
        redirectTo={redirectTo}
        submitLabel="Login"
        title="Login"
      />
    </main>
  );
}
