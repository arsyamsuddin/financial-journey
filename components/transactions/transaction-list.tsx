"use client";

import { useState } from "react";

import { deleteTransaction } from "@/app/transactions/actions";
import { CategoryIcon } from "@/components/categories/category-icon";
import { OnboardingCard } from "@/components/dashboard/onboarding-card";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transactions/transaction-form";
import {
  formatCurrency,
  type Category,
  type Transaction,
} from "@/lib/transactions";

type TransactionListProps = {
  categories: Category[];
  transactions: Transaction[];
};

export function TransactionList({
  categories,
  transactions,
}: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (transactions.length === 0) {
    return (
      <OnboardingCard
        ctaHref="#quick-add-transaction"
        ctaLabel="Add First Transaction"
        description="Record your first income or expense to turn the dashboard into a useful picture of your financial condition. FiJo will update income, expenses, and balance as soon as transactions are added."
        eyebrow="Next step"
        title="Record your first transaction."
      />
    );
  }

  return (
    <div className="min-w-0 rounded-3xl bg-white/80 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5">
      <div className="px-4 pb-2 pt-3">
        <h3 className="text-base font-semibold">Timeline</h3>
        {successMessage ? (
          <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        {transactions.map((transaction) => {
          const isEditing = editingId === transaction.id;
          const isIncome = transaction.category.type === "income";

          return (
            <article key={transaction.id} className="rounded-2xl p-3 transition-colors hover:bg-slate-50/80">
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
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="flex min-w-0 gap-3">
                    <CategoryIcon
                      color={transaction.category.color}
                      icon={transaction.category.icon}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="min-w-0 break-words font-medium">
                          {transaction.category.name}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            isIncome
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {isIncome ? "Income" : "Expense"}
                        </span>
                      </div>
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {transaction.description || "No description"}
                      </p>
                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        {transaction.transactionDate}
                      </p>
                    </div>
                  </div>

                  <div className="grid min-w-0 gap-3 md:justify-items-end">
                    <p
                      className={`break-words text-lg font-semibold tracking-tight ${
                        isIncome ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                    <div className="grid gap-2 sm:flex sm:justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setSuccessMessage(null);
                          setEditingId(transaction.id);
                        }}
                      >
                        Edit
                      </Button>
                      <form action={deleteTransaction}>
                        <input type="hidden" name="id" value={transaction.id} />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
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
  );
}
