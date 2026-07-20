"use client";

import { useActionState } from "react";

import {
  createCategory,
  updateCategory,
  type CategoryFormState,
} from "@/app/categories/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/lib/transactions";

type CategoryFormProps = {
  category?: Category;
  mode?: "create" | "edit";
  onCancel?: () => void;
};

const initialState: CategoryFormState = {};

export function CategoryForm({
  category,
  mode = "create",
  onCancel,
}: CategoryFormProps) {
  const action = mode === "edit" ? updateCategory : createCategory;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-base font-semibold">
          {mode === "edit" ? "Edit Category" : "Create Category"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Group transactions by income or expense category.
        </p>
      </div>

      {category ? <input type="hidden" name="id" value={category.id} /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor={`${mode}-category-name`}>Name</Label>
          <Input
            id={`${mode}-category-name`}
            name="name"
            defaultValue={category?.name}
            placeholder="Salary, Food, Transport"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-category-type`}>Type</Label>
          <select
            id={`${mode}-category-type`}
            name="type"
            defaultValue={category?.type ?? "expense"}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-category-icon`}>Icon</Label>
          <Input
            id={`${mode}-category-icon`}
            name="icon"
            defaultValue={category?.icon ?? ""}
            maxLength={50}
            placeholder="wallet"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor={`${mode}-category-color`}>Color</Label>
          <Input
            id={`${mode}-category-color`}
            name="color"
            defaultValue={category?.color ?? ""}
            maxLength={20}
            placeholder="emerald"
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
              : "Create Category"}
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
