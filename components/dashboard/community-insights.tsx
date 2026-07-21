import { BarChart3, PiggyBank, ShieldCheck } from "lucide-react";

import { CommunityInsightCard } from "@/components/dashboard/community-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";

const communityInsights = [
  {
    description:
      "Anonymous spending patterns often cluster around everyday essentials before lifestyle categories.",
    icon: BarChart3,
    label: "Category patterns",
    value: "42% essentials",
  },
  {
    description:
      "People who review their records weekly tend to notice small leaks earlier in the month.",
    icon: PiggyBank,
    label: "Saving habits",
    value: "1x weekly",
  },
  {
    description:
      "Clear category names make monthly decisions easier without exposing any personal information.",
    icon: ShieldCheck,
    label: "Awareness rhythm",
    value: "8-12 categories",
  },
];

type CommunityInsightsProps = {
  limit?: number;
};

export function CommunityInsights({ limit }: CommunityInsightsProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        description="General guidance based on aggregated behavior, never individual data."
        eyebrow="Community Insights"
        title="Anonymous financial patterns"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {communityInsights.slice(0, limit).map((insight) => (
          <CommunityInsightCard key={insight.label} {...insight} />
        ))}
      </div>
    </section>
  );
}
