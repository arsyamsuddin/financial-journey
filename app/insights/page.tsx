import { AppBreadcrumb } from "@/components/app/app-navigation";
import { AppShell } from "@/components/app/app-shell";
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { FutureModules } from "@/components/dashboard/future-modules";
import { FinancialInsights } from "@/components/insights/financial-insights";
import { getAuthenticatedFinancialData } from "@/lib/dashboard-data";

export default async function InsightsPage() {
  const { insights, transactions } = await getAuthenticatedFinancialData();

  return (
    <AppShell>
      <AppBreadcrumb label="Insights" />
      <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Insights
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Financial analysis
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Advanced analytics live here so the dashboard can stay focused.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <CashFlowChart transactions={transactions} />
        <CategoryBreakdown transactions={transactions} />
      </section>
      <FinancialInsights insights={insights} />
      <FutureModules />
    </AppShell>
  );
}
