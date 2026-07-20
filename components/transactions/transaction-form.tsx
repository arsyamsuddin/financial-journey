"use client";

import { useEffect, useMemo, useState, useActionState } from "react";

import {
  createTransaction,
  updateTransaction,
  type TransactionFormState,
} from "@/app/transactions/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Category, CategoryType, Transaction } from "@/lib/transactions";

type TransactionFormProps = {
  categories: Category[];
  mode?: "create" | "edit";
  onCancel?: () => void;
  onSuccess?: (message?: string) => void;
  transaction?: Transaction;
};

const initialState: TransactionFormState = {};

export function TransactionForm({
  categories,
  mode = "create",
  onCancel,
  onSuccess,
  transaction,
}: TransactionFormProps) {
  const initialType = transaction?.category.type ?? categories[0]?.type ?? "expense";
  const [type, setType] = useState<CategoryType>(initialType);
  const action = mode === "edit" ? updateTransaction : createTransaction;
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (mode === "edit" && state.success) {
      onSuccess?.(state.message);
    }
  }, [mode, onSuccess, state.message, state.success]);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === type),
    [categories, type]
  );

  const defaultCategoryId =
    transaction?.categoryId ??
    filteredCategories[0]?.id ??
    "";

  if (categories.length === 0) {
    return (
      <div className="min-w-0 rounded-lg border border-dashed border-border bg-card p-5">
        <h2 className="text-base font-semibold">Add Transaction</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Create at least one category before recording transactions.
        </p>
        <a
          href="#categories"
          className={cn(buttonVariants(), "mt-5 h-10 w-full sm:w-auto")}
        >
          Create First Category
        </a>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-base font-semibold">
          {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Record income and expenses with the category that best describes them.
        </p>
      </div>

      {transaction ? <input type="hidden" name="id" value={transaction.id} /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-type`}>Type</Label>
          <select
            id={`${mode}-type`}
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value as CategoryType)}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-category`}>Category</Label>
          <select
            key={type}
            id={`${mode}-category`}
            name="categoryId"
            defaultValue={defaultCategoryId}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            required
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">No {type} categories</option>
            )}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-amount`}>Amount</Label>
          <Input
            id={`${mode}-amount`}
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            defaultValue={transaction?.amount}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-currency`}>Currency</Label>
          <Input
            id={`${mode}-currency`}
            name="currency"
            defaultValue={transaction?.currency ?? "IDR"}
            maxLength={10}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-date`}>Transaction Date</Label>
          <Input
            id={`${mode}-date`}
            name="transactionDate"
            type="date"
            defaultValue={
              transaction?.transactionDate ?? new Date().toISOString().slice(0, 10)
            }
            required
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor={`${mode}-description`}>Description</Label>
          <Textarea
            id={`${mode}-description`}
            name="description"
            defaultValue={transaction?.description ?? ""}
            placeholder="Optional details"
          />
        </div>
      </div>

      {state.message ? (
        <p
          className={`mt-4 rounded-md px-3 py-2 text-sm ${
            state.success
              ? "bg-emerald-50 text-emerald-700"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          className="h-10 w-full sm:w-auto"
          disabled={pending}
        >
          {pending
            ? "Saving..."
            : mode === "edit"
              ? "Save Changes"
              : "Add Transaction"}
        </Button>
        {onCancel ? (
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full sm:w-auto"
            onClick={onCancel}
          >
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
