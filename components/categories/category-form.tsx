"use client";

import { useActionState, useMemo, useState } from "react";

import {
  createCategory,
  updateCategory,
  type CategoryFormState,
} from "@/app/categories/actions";
import { CategoryIcon } from "@/components/categories/category-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CUSTOM_CATEGORY_DEFAULTS,
  CUSTOM_CATEGORY_KEY,
  getCategoryPresetByKey,
  getCategoryPresetsByType,
  getMatchingCategoryPreset,
} from "@/lib/category-presets";
import type { Category, CategoryType } from "@/lib/transactions";

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
  const matchedPreset = category ? getMatchingCategoryPreset(category) : null;
  const initialType = category?.type ?? "expense";
  const initialPresetKey =
    matchedPreset?.key ??
    (category
      ? CUSTOM_CATEGORY_KEY
      : (getCategoryPresetsByType(initialType)[0]?.key ?? CUSTOM_CATEGORY_KEY));
  const [type, setType] = useState<CategoryType>(initialType);
  const [presetKey, setPresetKey] = useState(
    initialPresetKey
  );
  const action = mode === "edit" ? updateCategory : createCategory;
  const [state, formAction, pending] = useActionState(action, initialState);

  const presets = useMemo(() => getCategoryPresetsByType(type), [type]);
  const selectedPreset =
    presetKey === CUSTOM_CATEGORY_KEY
      ? null
      : getCategoryPresetByKey(presetKey);
  const isCustom = !selectedPreset;
  const customDefaults = CUSTOM_CATEGORY_DEFAULTS[type];
  const selectedName = selectedPreset?.name ?? category?.name ?? "";
  const selectedIcon = selectedPreset?.icon ?? customDefaults.icon;
  const selectedColor = selectedPreset?.color ?? customDefaults.color;

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
          Choose a built-in category or create a custom one.
        </p>
      </div>

      {category ? <input type="hidden" name="id" value={category.id} /> : null}
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="icon" value={selectedIcon} />
      <input type="hidden" name="color" value={selectedColor} />
      {!isCustom ? (
        <input type="hidden" name="name" value={selectedName} />
      ) : null}

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-category-type`}>Type</Label>
          <select
            id={`${mode}-category-type`}
            value={type}
            onChange={(event) => {
              const nextType = event.target.value as CategoryType;
              setType(nextType);
              setPresetKey(
                getCategoryPresetsByType(nextType)[0]?.key ??
                  CUSTOM_CATEGORY_KEY
              );
            }}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-category-preset`}>Category</Label>
          <select
            id={`${mode}-category-preset`}
            value={presetKey}
            onChange={(event) => setPresetKey(event.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {presets.map((preset) => (
              <option key={preset.key} value={preset.key}>
                {preset.name}
              </option>
            ))}
            <option value={CUSTOM_CATEGORY_KEY}>+ Custom Category</option>
          </select>
        </div>

        {isCustom ? (
          <div className="space-y-2">
            <Label htmlFor={`${mode}-category-name`}>Name</Label>
            <Input
              id={`${mode}-category-name`}
              name="name"
              defaultValue={category && !matchedPreset ? category.name : ""}
              placeholder="Category name"
              required
            />
          </div>
        ) : null}

        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/35 p-3">
          <CategoryIcon color={selectedColor} icon={selectedIcon} />
          <div className="min-w-0">
            <p className="break-words text-sm font-medium">
              {isCustom ? "Custom Category" : selectedName}
            </p>
            <p className="text-xs text-muted-foreground">
              Icon and color are set automatically.
            </p>
          </div>
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
