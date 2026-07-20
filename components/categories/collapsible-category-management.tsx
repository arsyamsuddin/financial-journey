"use client";

import { useState } from "react";

import { CategoryManagement } from "@/components/categories/category-management";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/transactions";

type CollapsibleCategoryManagementProps = {
  categories: Category[];
};

export function CollapsibleCategoryManagement({
  categories,
}: CollapsibleCategoryManagementProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="categories" className="mt-6">
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Manage Categories
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add or edit the categories used by transactions.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            aria-expanded={isOpen}
            className="h-10 w-full sm:w-auto"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? "Hide Categories" : "Manage Categories"}
          </Button>
        </div>
      </div>

      {isOpen ? <CategoryManagement categories={categories} /> : null}
    </section>
  );
}
