import { AppBreadcrumb } from "@/components/app/app-navigation";
import { AppShell } from "@/components/app/app-shell";
import { TransactionsWorkspace } from "@/components/transactions/transactions-workspace";
import { getAuthenticatedFinancialData } from "@/lib/dashboard-data";

export default async function TransactionsPage() {
  const { categories, transactions } = await getAuthenticatedFinancialData();

  return (
    <AppShell>
      <AppBreadcrumb label="Transactions" />
      <TransactionsWorkspace
        categories={categories}
        transactions={transactions}
      />
    </AppShell>
  );
}
