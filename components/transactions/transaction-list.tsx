"use client";

import { useState } from "react";

import { deleteTransaction } from "@/app/transactions/actions";
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
    <div className="min-w-0 rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5">
        <h2 className="text-base font-semibold">Transaction List</h2>
        {successMessage ? (
          <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}
      </div>

      <div className="divide-y divide-border">
        {transactions.map((transaction) => {
          const isEditing = editingId === transaction.id;
          const isIncome = transaction.category.type === "income";

          return (
            <article key={transaction.id} className="p-5">
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
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          isIncome
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {isIncome ? "Income" : "Expense"}
                      </span>
                      <h3 className="min-w-0 break-words font-medium">
                        {transaction.category.name}
                      </h3>
                    </div>
                    {transaction.description ? (
                      <p className="mt-2 break-words text-sm text-muted-foreground">
                        {transaction.description}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {transaction.transactionDate}
                    </p>
                  </div>

                  <div className="grid min-w-0 gap-3 md:grid-cols-[1fr_auto] md:items-center lg:flex lg:flex-row">
                    <p
                      className={`break-words text-lg font-semibold ${
                        isIncome ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                    <div className="grid gap-2 sm:flex sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
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
                          variant="destructive"
                          size="sm"
                          className="w-full sm:w-auto"
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
