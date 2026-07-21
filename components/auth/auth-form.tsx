"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { AuthFormState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  action: (
    state: AuthFormState,
    formData: FormData
  ) => Promise<AuthFormState>;
  alternateHref: string;
  alternateLabel: string;
  alternateText: string;
  passwordAutoComplete?: string;
  redirectTo?: string;
  submitLabel: string;
  title: string;
};

const initialState: AuthFormState = {};

export function AuthForm({
  action,
  alternateHref,
  alternateLabel,
  alternateText,
  passwordAutoComplete = "current-password",
  redirectTo,
  submitLabel,
  title,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/5">
      <div className="mb-6">
        <Link href="/" className="inline-block">
          <span className="block text-sm font-semibold leading-none tracking-tight">
            FiJo
          </span>
          <span className="mt-1 block text-xs leading-none text-muted-foreground">
            Financial Journey
          </span>
        </Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h1>
      </div>

      <form action={formAction} className="space-y-4">
        {redirectTo ? (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="h-11 rounded-xl"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="h-11 rounded-xl"
            autoComplete={passwordAutoComplete}
            required
          />
        </div>

        {state.message ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.message}
          </p>
        ) : null}

        <Button type="submit" className="h-10 w-full" disabled={pending}>
          {pending ? "Please wait..." : submitLabel}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {alternateText}{" "}
        <Link href={alternateHref} className="font-medium text-foreground">
          {alternateLabel}
        </Link>
      </p>
    </div>
  );
}
