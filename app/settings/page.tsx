import { AppBreadcrumb } from "@/components/app/app-navigation";
import { AppShell } from "@/components/app/app-shell";
import { CategoryManagement } from "@/components/categories/category-management";
import { SectionHeader } from "@/components/dashboard/section-header";
import { getAuthenticatedFinancialData } from "@/lib/dashboard-data";

const settingsSections = [
  "Income Categories",
  "Expense Categories",
  "Accounts",
  "Profile",
  "Appearance",
  "Privacy",
];

export default async function SettingsPage() {
  const { categories } = await getAuthenticatedFinancialData();

  return (
    <AppShell>
      <AppBreadcrumb label="Settings" />
      <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
        <SectionHeader
          description="Configuration lives here so the rest of FiJo stays focused on awareness and action."
          eyebrow="Settings"
          title="Preferences and setup"
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {settingsSections.map((section) => (
            <div
              key={section}
              className="rounded-2xl bg-slate-50/80 p-4 text-sm font-medium text-slate-700 ring-1 ring-slate-900/5"
            >
              {section}
            </div>
          ))}
        </div>
      </section>

      <CategoryManagement categories={categories} />
    </AppShell>
  );
}
