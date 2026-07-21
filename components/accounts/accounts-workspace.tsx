import { CreditCard, Landmark, Pencil, Smartphone, Trash2, Wallet } from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  type DashboardTotals,
  type Transaction,
} from "@/lib/transactions";

type AccountsWorkspaceProps = {
  totals: DashboardTotals;
  transactions: Transaction[];
};

const accounts = [
  { icon: Wallet, label: "Cash", tone: "bg-emerald-50 text-emerald-700" },
  { icon: Landmark, label: "Bank", tone: "bg-sky-50 text-sky-700" },
  { icon: Smartphone, label: "E-Wallet", tone: "bg-violet-50 text-violet-700" },
  { icon: CreditCard, label: "Credit Card", tone: "bg-rose-50 text-rose-700" },
];

export function AccountsWorkspace({
  totals,
  transactions,
}: AccountsWorkspaceProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
        <SectionHeader
          description="Account support is prepared at the UI layer. Cash reflects the current transaction ledger."
          eyebrow="Accounts"
          title="Money containers"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {accounts.map((account, index) => {
            const Icon = account.icon;
            const balance = index === 0 ? totals.balance : 0;
            const transactionCount = index === 0 ? transactions.length : 0;

            return (
              <article
                key={account.label}
                className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-900/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex size-11 items-center justify-center rounded-2xl ${account.tone}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                    {transactionCount} tx
                  </span>
                </div>
                <h2 className="mt-5 text-lg font-semibold">{account.label}</h2>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {formatCurrency(balance, totals.currency)}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Button disabled variant="outline" size="sm" className="gap-2">
                    <Pencil className="size-3.5" />
                    Edit
                  </Button>
                  <Button disabled variant="ghost" size="sm" className="gap-2 text-destructive">
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <InfoPanel
          description="Cash currently contains all recorded transactions because account tables have not been introduced."
          label="Transactions"
          value={`${transactions.length} records`}
        />
        <InfoPanel
          description="Transfers are shown in the new transaction flow, but are not persisted until account storage exists."
          label="Transfer History"
          value="No saved transfers"
        />
      </section>
    </div>
  );
}

function InfoPanel({
  description,
  label,
  value,
}: {
  description: string;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[1.75rem] bg-white/75 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
        {label}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">{value}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
