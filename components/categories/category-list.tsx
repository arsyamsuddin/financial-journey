"use client";

import { useState } from "react";

import { CategoryForm } from "@/components/categories/category-form";
import { CategoryIcon } from "@/components/categories/category-icon";
import { DeleteCategoryButton } from "@/components/categories/delete-category-button";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/transactions";

type CategoryListProps = {
  categories: Category[];
};

export function CategoryList({ categories }: CategoryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (categories.length === 0) {
    return (
      <div className="min-w-0 rounded-2xl bg-white/70 p-6 text-center ring-1 ring-slate-900/5">
        <h2 className="text-base font-semibold">No categories yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create categories before recording transactions.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 rounded-2xl bg-white/80 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5">
      <div className="px-4 pb-2 pt-3">
        <h2 className="text-base font-semibold">Category List</h2>
      </div>

      <div className="space-y-2">
        {categories.map((category) => {
          const isEditing = editingId === category.id;
          const isIncome = category.type === "income";

          return (
            <article
              key={category.id}
              className="rounded-2xl p-3 transition-colors hover:bg-slate-50/80"
            >
              {isEditing ? (
                <CategoryForm
                  category={category}
                  mode="edit"
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <CategoryIcon
                        color={category.color}
                        icon={category.icon}
                      />
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
                            {category.name}
                          </h3>
                        </div>
                        <p className="mt-2 break-words text-sm text-muted-foreground">
                          {category.icon
                            ? "Icon and color are preset."
                            : "Custom category"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:flex sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full bg-white/70 sm:w-auto"
                      onClick={() => setEditingId(category.id)}
                    >
                      Edit
                    </Button>
                    <DeleteCategoryButton categoryId={category.id} />
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
