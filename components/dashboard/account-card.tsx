import {
  CreditCard,
  Landmark,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import {
  formatCurrency,
  type DashboardTotals,
  type Transaction,
} from "@/lib/transactions";

type AccountSummaryProps = {
  totals: DashboardTotals;
  transactions: Transaction[];
};

const accountTemplates = [
  { icon: Wallet, label: "Cash", tone: "bg-emerald-50 text-emerald-700" },
  { icon: Landmark, label: "Bank", tone: "bg-sky-50 text-sky-700" },
  { icon: Smartphone, label: "E-Wallet", tone: "bg-violet-50 text-violet-700" },
  { icon: CreditCard, label: "Credit Card", tone: "bg-rose-50 text-rose-700" },
];

export function AccountSummary({ totals, transactions }: AccountSummaryProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        description="Prepared for multiple account types as FiJo grows."
        eyebrow="Accounts"
        title="Account summary"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {accountTemplates.map((account, index) => (
          <AccountCard
            key={account.label}
            balance={index === 0 ? totals.balance : 0}
            currency={totals.currency}
            icon={account.icon}
            label={account.label}
            tone={account.tone}
            transactionCount={index === 0 ? transactions.length : 0}
          />
        ))}
      </div>
    </section>
  );
}

type AccountCardProps = {
  balance: number;
  currency: string;
  icon: LucideIcon;
  label: string;
  tone: string;
  transactionCount: number;
};

export function AccountCard({
  balance,
  currency,
  icon: Icon,
  label,
  tone,
  transactionCount,
}: AccountCardProps) {
  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex size-10 items-center justify-center rounded-2xl ${tone}`}
        >
          <Icon className="size-5" />
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {transactionCount} tx
        </span>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-xl font-semibold tracking-tight">
        {formatCurrency(balance, currency)}
      </p>
    </article>
  );
}
