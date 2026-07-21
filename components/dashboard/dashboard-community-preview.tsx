import { BarChart3 } from "lucide-react";
import Link from "next/link";

import { CommunityInsightCard } from "@/components/dashboard/community-insight-card";

export function DashboardCommunityPreview() {
  return (
    <section className="min-w-[320px] space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Community preview
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Anonymous pattern
          </h2>
        </div>
        <Link href="/community" className="text-sm font-medium text-emerald-700">
          View community
        </Link>
      </div>
      <CommunityInsightCard
        description="Anonymous spending patterns often cluster around everyday essentials before lifestyle categories."
        icon={BarChart3}
        label="Category patterns"
        value="42% essentials"
      />
    </section>
  );
}
