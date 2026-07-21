import { AppBreadcrumb } from "@/components/app/app-navigation";
import { AppShell } from "@/components/app/app-shell";
import { AccountCarousel } from "@/components/dashboard/account-carousel";
import { DashboardCommunityPreview } from "@/components/dashboard/dashboard-community-preview";
import { DashboardInsightPreview } from "@/components/dashboard/dashboard-insight-preview";
import { FinancialHero } from "@/components/dashboard/financial-hero";
import { getAuthenticatedFinancialData } from "@/lib/dashboard-data";
import { generateFinancialIntelligence } from "@/lib/intelligence/recommendation-engine";

export default async function DashboardPage() {
  const { totals, transactions } =
    await getAuthenticatedFinancialData();
  const intelligence = generateFinancialIntelligence({
    totals,
    transactions,
  });

  return (
    <AppShell>
      <div className="flex flex-col gap-3">
        <AppBreadcrumb label="Overview" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            A focused view of your current financial condition.
          </p>
        </div>
      </div>

      <section>
        <FinancialHero
          intelligence={intelligence}
          totals={totals}
          transactions={transactions}
        />
      </section>

      <section>
        <AccountCarousel totals={totals} transactions={transactions} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
          <DashboardInsightPreview intelligence={intelligence} />
        <DashboardCommunityPreview />
      </section>
    </AppShell>
  );
}
