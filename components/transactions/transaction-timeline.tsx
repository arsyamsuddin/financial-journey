"use client";

import { Clock } from "lucide-react";
import { useMemo, useState } from "react";

import { deleteTransaction } from "@/app/transactions/actions";
import { CategoryIcon } from "@/components/categories/category-icon";
import { OnboardingCard } from "@/components/dashboard/onboarding-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  type Category,
  type Transaction,
} from "@/lib/transactions";

type TransactionTimelineProps = {
  categories: Category[];
  transactions: Transaction[];
};

export function TransactionTimeline({
  categories,
  transactions,
}: TransactionTimelineProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const groups = useMemo(() => groupTransactions(transactions), [transactions]);

  if (transactions.length === 0) {
    return (
      <OnboardingCard
        ctaHref="#quick-add-transaction"
        ctaLabel="Add First Transaction"
        description="Record your first income or expense to see your timeline, cash flow, and category patterns come alive."
        eyebrow="Recent Activity"
        title="Your timeline is ready."
      />
    );
  }

  return (
    <section className="rounded-[1.75rem] bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
      <SectionHeader
        eyebrow="Recent Activity"
        meta={`${transactions.length} records`}
        title="Transaction timeline"
      />

      {successMessage ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      <div className="mt-6 space-y-7">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.label}
              </p>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="space-y-3">
              {group.transactions.map((transaction) => {
                const isEditing = editingId === transaction.id;
                const isIncome = transaction.categoryKind === "income";

                return (
                  <article
                    key={transaction.id}
                    className="rounded-3xl bg-slate-50/80 p-3 transition-colors hover:bg-slate-100/80 sm:p-4"
                  >
                    {isEditing ? (
                      <TransactionForm
                        categories={categories}
                        mode="edit"
                        transaction={transaction}
                        onCancel={() => setEditingId(null)}
                        onSuccess={(message) => {
                          setSuccessMessage(message ?? "Transaction updated.");
                          setEditingId(null);
                        }}
                      />
                    ) : (
                      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div className="flex min-w-0 gap-3">
                          <CategoryIcon
                            color={transaction.categoryColor}
                            icon={transaction.categoryIcon}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="break-words text-base font-semibold">
                                {transaction.categoryName}
                              </h3>
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                  isIncome
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700"
                                }`}
                              >
                                {isIncome ? "Income" : "Expense"}
                              </span>
                            </div>
                            <p className="mt-1 break-words text-sm text-muted-foreground">
                              {transaction.description || "No description"}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span>{formatDate(transaction.transactionDate)}</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="size-3.5" />
                                {formatTime(transaction.createdAt)}
                              </span>
                              <span>FiJo Cash</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-[auto_auto] sm:items-center lg:justify-items-end">
                          <p
                            className={`break-words text-xl font-semibold tracking-tight ${
                              isIncome ? "text-emerald-700" : "text-rose-700"
                            }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(
                              transaction.amount,
                              transaction.currency
                            )}
                          </p>
                          <div className="grid grid-cols-2 gap-2 sm:flex">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-9 w-full sm:w-auto"
                              onClick={() => {
                                setSuccessMessage(null);
                                setEditingId(transaction.id);
                              }}
                            >
                              Edit
                            </Button>
                            <form action={deleteTransaction}>
                              <input
                                type="hidden"
                                name="id"
                                value={transaction.id}
                              />
                              <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                                className="h-9 w-full text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
                              >
                                Delete
                              </Button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function groupTransactions(transactions: Transaction[]) {
  const groups = [
    { label: "Today", transactions: [] as Transaction[] },
    { label: "Yesterday", transactions: [] as Transaction[] },
    { label: "This Week", transactions: [] as Transaction[] },
    { label: "Earlier", transactions: [] as Transaction[] },
  ];
  const today = startOfDay(new Date());

  for (const transaction of transactions) {
    const transactionDate = startOfDay(
      new Date(`${transaction.transactionDate}T00:00:00`)
    );
    const daysAgo = Math.round(
      (today.getTime() - transactionDate.getTime()) / 86_400_000
    );

    if (daysAgo === 0) {
      groups[0].transactions.push(transaction);
    } else if (daysAgo === 1) {
      groups[1].transactions.push(transaction);
    } else if (daysAgo >= 0 && daysAgo <= 7) {
      groups[2].transactions.push(transaction);
    } else {
      groups[3].transactions.push(transaction);
    }
  }

  return groups.filter((group) => group.transactions.length > 0);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
