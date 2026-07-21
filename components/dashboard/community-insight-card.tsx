import type { LucideIcon } from "lucide-react";

type CommunityInsightCardProps = {
  description: string;
  icon: LucideIcon;
  label: string;
  value: string;
};

export function CommunityInsightCard({
  description,
  icon: Icon,
  label,
  value,
}: CommunityInsightCardProps) {
  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">
            {label}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
