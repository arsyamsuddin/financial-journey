import { BadgeAlert } from "lucide-react";
import Link from "next/link";

import { InsightCard } from "@/components/insights/insight-card";
import type { FinancialIntelligence } from "@/lib/intelligence/types";

type DashboardInsightPreviewProps = {
  intelligence: FinancialIntelligence;
};

export function DashboardInsightPreview({
  intelligence,
}: DashboardInsightPreviewProps) {
  const recommendation = intelligence.primaryRecommendation;
  const tone = recommendation.priority === "critical" || recommendation.priority === "high"
    ? "rose"
    : recommendation.priority === "medium"
      ? "amber"
      : "emerald";

  return (
    <section className="min-w-[320px] space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Today&apos;s insight
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            What needs attention
          </h2>
        </div>
        <Link href="/insights" className="text-sm font-medium text-emerald-700">
          View details
        </Link>
      </div>
      <InsightCard
        description={recommendation.description}
        icon={BadgeAlert}
        label={`${recommendation.priority} priority`}
        title={recommendation.title}
        tone={tone}
      />
    </section>
  );
}
