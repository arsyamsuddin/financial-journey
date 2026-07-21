import { AppBreadcrumb } from "@/components/app/app-navigation";
import { AppShell } from "@/components/app/app-shell";
import { CommunityInsights } from "@/components/dashboard/community-insights";
import { requireAuthenticatedUser } from "@/lib/dashboard-data";

export default async function CommunityPage() {
  await requireAuthenticatedUser();

  return (
    <AppShell>
      <AppBreadcrumb label="Community" />
      <section className="rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Community
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Community analytics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Anonymous patterns that support financial awareness without direct comparison.
        </p>
      </section>
      <CommunityInsights />
    </AppShell>
  );
}
