"use client";

import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
  Plus,
  WalletCards,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { TransactionForm } from "@/components/transactions/transaction-form";
import { buttonVariants } from "@/components/ui/button";
import type { Category, CategoryType } from "@/lib/transactions";
import { cn } from "@/lib/utils";

type QuickActionPanelProps = {
  categories: Category[];
};

type ActionMode = "quick" | CategoryType | null;

export function QuickActionPanel({ categories }: QuickActionPanelProps) {
  const [mode, setMode] = useState<ActionMode>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const hasCategories = categories.length > 0;

  return (
    <section id="quick-add-transaction" className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <QuickAction
          icon={<Plus className="size-5" />}
          label="Quick Add Transaction"
          primary
          onClick={() => {
            setSuccessMessage(null);
            setMode((current) => (current ? null : "quick"));
          }}
        />
        <QuickAction
          icon={<ArrowUpRight className="size-5" />}
          label="Add Income"
          onClick={() => {
            setSuccessMessage(null);
            setMode("income");
          }}
        />
        <QuickAction
          icon={<ArrowDownRight className="size-5" />}
          label="Add Expense"
          onClick={() => {
            setSuccessMessage(null);
            setMode("expense");
          }}
        />
        <QuickAction
          disabled
          icon={<ArrowLeftRight className="size-5" />}
          label="Transfer"
        />
        <QuickAction
          disabled
          icon={<WalletCards className="size-5" />}
          label="Manage Accounts"
        />
      </div>

      {successMessage ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      {!hasCategories ? (
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5">
          <p className="text-base font-semibold">Create categories first</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Categories turn each transaction into useful awareness. Add one
            income or expense category before recording activity.
          </p>
          <a
            href="#categories"
            className={cn(buttonVariants(), "mt-5 h-10 w-full sm:w-auto")}
          >
            Create First Category
          </a>
        </div>
      ) : mode ? (
        <TransactionForm
          categories={categories}
          initialType={mode === "quick" ? undefined : mode}
          onSuccess={(message) => {
            setSuccessMessage(message ?? "Transaction created.");
            setMode(null);
          }}
        />
      ) : null}
    </section>
  );
}

function QuickAction({
  disabled = false,
  icon,
  label,
  onClick,
  primary = false,
}: {
  disabled?: boolean;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-24 w-full flex-col items-start justify-between rounded-3xl p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${
        primary
          ? "bg-emerald-600 text-white shadow-[0_16px_35px_rgba(5,150,105,0.24)] hover:bg-emerald-700"
          : "bg-white/75 text-slate-950 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5 hover:-translate-y-0.5 hover:bg-white"
      }`}
    >
      <span
        className={`flex size-10 items-center justify-center rounded-2xl ${
          primary ? "bg-white/15" : "bg-slate-100 text-slate-700"
        }`}
      >
        {icon}
      </span>
      <span className="mt-4 text-sm font-semibold">{label}</span>
      {disabled ? (
        <span className="mt-1 text-xs text-muted-foreground">Coming soon</span>
      ) : null}
    </button>
  );
}
