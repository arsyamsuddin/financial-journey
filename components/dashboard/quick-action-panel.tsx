"use client";

import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

import { TransactionForm } from "@/components/transactions/transaction-form";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category, CategoryType } from "@/lib/transactions";
import { cn } from "@/lib/utils";

type QuickActionPanelProps = {
  categories: Category[];
};

type ActionMode = CategoryType | "transfer" | null;

export function QuickActionPanel({ categories: _categories }: QuickActionPanelProps) {
  const [mode, setMode] = useState<ActionMode>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <section id="quick-add-transaction" className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <QuickAction
          icon={<ArrowUpRight className="size-5" />}
          label="Income"
          primary
          onClick={() => {
            setSuccessMessage(null);
            setMode("income");
          }}
        />
        <QuickAction
          icon={<ArrowDownRight className="size-5" />}
          label="Expense"
          onClick={() => {
            setSuccessMessage(null);
            setMode("expense");
          }}
        />
        <QuickAction
          icon={<ArrowLeftRight className="size-5" />}
          label="Transfer"
          onClick={() => {
            setSuccessMessage(null);
            setMode("transfer");
          }}
        />
        <Link
          href="/accounts"
          className="flex min-h-24 w-full flex-col items-start justify-between rounded-3xl bg-white/75 p-4 text-left text-slate-950 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-500/30"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <WalletCards className="size-5" />
          </span>
          <span className="mt-4 text-sm font-semibold">Manage Accounts</span>
        </Link>
      </div>

      {successMessage ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      {mode === "transfer" ? (
        <TransferForm />
      ) : mode ? (
        <TransactionForm
          key={mode}
          categories={_categories}
          initialType={mode}
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

function TransferForm() {
  return (
    <form className="min-w-0 rounded-2xl bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight">Transfer</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Transfers are prepared for account support and are not saved yet.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="transfer-from">From Account</Label>
          <Input id="transfer-from" className="h-11 rounded-xl" value="Cash" readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transfer-to">To Account</Label>
          <Input id="transfer-to" className="h-11 rounded-xl" placeholder="Bank, E-Wallet, or Credit Card" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transfer-amount">Amount</Label>
          <Input id="transfer-amount" className="h-11 rounded-xl" min="0.01" step="0.01" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transfer-date">Date</Label>
          <Input id="transfer-date" className="h-11 rounded-xl" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
        </div>
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="transfer-description">Description</Label>
          <Textarea id="transfer-description" className="rounded-xl" placeholder="Optional transfer note" />
        </div>
      </div>

      <button
        type="button"
        disabled
        className={cn(buttonVariants(), "mt-5 h-10 w-full sm:w-auto")}
      >
        Save Transfer
      </button>
    </form>
  );
}
