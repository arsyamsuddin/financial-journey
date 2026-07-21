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
    <section
      id="quick-add-transaction"
      className="mt-7 rounded-3xl bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Primary Action
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Add a transaction
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Capture income or spending while it is still fresh.
          </p>
        </div>
        <Button
          type="button"
          aria-expanded={isOpen}
          className="h-11 w-full px-5 sm:w-auto"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "Close" : "+ Add Transaction"}
        </Button>
      </div>

      {isOpen ? (
        <div id="add-transaction" className="mt-5">
          <TransactionForm categories={categories} />
        </div>
      ) : null}
    </section>
  );
}
