"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { QuickActionPanel } from "@/components/dashboard/quick-action-panel";
import { TransactionTimeline } from "@/components/transactions/transaction-timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLeafCategories } from "@/lib/catalog";
import type { Category, Transaction } from "@/lib/transactions";

type TransactionsWorkspaceProps = {
  categories: Category[];
  transactions: Transaction[];
};

export function TransactionsWorkspace({
  categories,
  transactions,
}: TransactionsWorkspaceProps) {
  const [showComposer, setShowComposer] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [account, setAccount] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const searchable = [
          transaction.categoryName,
          transaction.description ?? "",
          transaction.currency,
          String(transaction.amount),
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = searchable.includes(query.toLowerCase().trim());
        const matchesCategory =
          categoryId === "all" || transaction.categoryId === categoryId;
        const matchesAccount = account === "all" || account === "cash";
        const matchesFrom =
          !fromDate || transaction.transactionDate >= fromDate;
        const matchesTo = !toDate || transaction.transactionDate <= toDate;

        return (
          matchesQuery &&
          matchesCategory &&
          matchesAccount &&
          matchesFrom &&
          matchesTo
        );
      }),
    [account, categoryId, fromDate, query, toDate, transactions]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Transactions
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Activity workspace
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Search, filter, add, edit, and delete transaction records.
            </p>
          </div>
          <Button
            type="button"
            className="h-11 w-full gap-2 sm:w-auto"
            onClick={() => setShowComposer((current) => !current)}
          >
            <Plus className="size-4" />
            New Transaction
          </Button>
        </div>

        {showComposer ? (
          <div className="mt-6">
            <QuickActionPanel categories={categories} />
          </div>
        ) : null}
      </section>

      <section className="rounded-[1.75rem] bg-white/70 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="space-y-2">
            <Label htmlFor="transaction-search">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="transaction-search"
                className="h-11 rounded-xl pl-9"
                placeholder="Category, description, amount"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          <FilterSelect
            label="Category"
            value={categoryId}
            onChange={setCategoryId}
            options={[
              { label: "All Categories", value: "all" },
              ...getLeafCategories().map((category) => ({
                label: category.name,
                value: category.id,
              })),
            ]}
          />
          <FilterSelect
            label="Account"
            value={account}
            onChange={setAccount}
            options={[
              { label: "All Accounts", value: "all" },
              { label: "Cash", value: "cash" },
            ]}
          />
          <DateFilter label="From" value={fromDate} onChange={setFromDate} />
          <DateFilter label="To" value={toDate} onChange={setToDate} />
        </div>
      </section>

      <TransactionTimeline
        categories={categories}
        transactions={filteredTransactions}
      />
    </div>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DateFilter({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        className="h-11 rounded-xl"
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
