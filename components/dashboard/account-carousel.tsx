import {
  CreditCard,
  Landmark,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/dashboard/section-header";
import {
  formatCurrency,
  type DashboardTotals,
  type Transaction,
} from "@/lib/transactions";

type AccountCarouselProps = {
  totals: DashboardTotals;
  transactions: Transaction[];
};

const accounts: Array<{
  icon: LucideIcon;
  label: string;
  tone: string;
  type: string;
}> = [
  {
    icon: Wallet,
    label: "Cash",
    tone: "bg-emerald-50 text-emerald-700",
    type: "Primary",
  },
  {
    icon: Landmark,
    label: "Bank",
    tone: "bg-sky-50 text-sky-700",
    type: "Account",
  },
  {
    icon: Smartphone,
    label: "E-Wallet",
    tone: "bg-violet-50 text-violet-700",
    type: "Wallet",
  },
  {
    icon: CreditCard,
    label: "Credit Card",
    tone: "bg-rose-50 text-rose-700",
    type: "Credit",
  },
];

export function AccountCarousel({
  totals,
  transactions,
}: AccountCarouselProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        eyebrow="Accounts"
        meta={
          <Link href="/accounts" className="text-emerald-700 hover:text-emerald-800">
            View All
          </Link>
        }
        title="Account summary"
      />

      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {accounts.map((account, index) => (
          <AccountSlide
            key={account.label}
            balance={index === 0 ? totals.balance : 0}
            currency={totals.currency}
            icon={account.icon}
            label={account.label}
            tone={account.tone}
            transactionCount={index === 0 ? transactions.length : 0}
            type={account.type}
          />
        ))}
      </div>
    </section>
  );
}

function AccountSlide({
  balance,
  currency,
  icon: Icon,
  label,
  tone,
  transactionCount,
  type,
}: {
  balance: number;
  currency: string;
  icon: LucideIcon;
  label: string;
  tone: string;
  transactionCount: number;
  type: string;
}) {
  return (
    <article className="min-w-[320px] snap-start rounded-2xl bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon className="size-5" />
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {transactionCount} tx
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{type}</p>
      <h3 className="mt-1 text-base font-semibold">{label}</h3>
      <p className="mt-3 break-words text-2xl font-semibold tracking-tight">
        {formatCurrency(balance, currency)}
      </p>
    </article>
  );
}
