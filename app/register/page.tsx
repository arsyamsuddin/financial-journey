import { redirect } from "next/navigation";

import { register } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth/auth-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function RegisterPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/35 px-4 py-12">
      <AuthForm
        action={register}
        alternateHref="/login"
        alternateLabel="Login"
        alternateText="Already have an account?"
        passwordAutoComplete="new-password"
        submitLabel="Register"
        title="Create your account"
      />
    </main>
  );
}
