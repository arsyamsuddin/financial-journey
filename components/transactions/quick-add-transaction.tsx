"use client";

import { useState } from "react";

import { TransactionForm } from "@/components/transactions/transaction-form";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/transactions";

type QuickAddTransactionProps = {
  categories: Category[];
};

export function QuickAddTransaction({ categories }: QuickAddTransactionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="quick-add-transaction" className="mt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Quick Add Transaction
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Record a transaction when it happens.
          </p>
        </div>
        <Button
          type="button"
          aria-expanded={isOpen}
          className="h-10 w-full sm:w-auto"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "Close" : "+ Add Transaction"}
        </Button>
      </div>

      {isOpen ? (
        <div id="add-transaction">
          <TransactionForm categories={categories} />
        </div>
      ) : null}
    </section>
  );
}
