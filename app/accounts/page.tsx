import { AppBreadcrumb } from "@/components/app/app-navigation";
import { AppShell } from "@/components/app/app-shell";
import { AccountsWorkspace } from "@/components/accounts/accounts-workspace";
import { getAuthenticatedFinancialData } from "@/lib/dashboard-data";

export default async function AccountsPage() {
  const { totals, transactions } = await getAuthenticatedFinancialData();

  return (
    <AppShell>
      <AppBreadcrumb label="Accounts" />
      <AccountsWorkspace totals={totals} transactions={transactions} />
    </AppShell>
  );
}
