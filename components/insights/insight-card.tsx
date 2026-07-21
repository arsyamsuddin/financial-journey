import type { LucideIcon } from "lucide-react";

type InsightCardProps = {
  description: string;
  icon: LucideIcon;
  label: string;
  title: string;
  tone?: "emerald" | "rose" | "sky" | "amber";
};

const toneClasses = {
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
  rose: "bg-rose-50 text-rose-700",
  sky: "bg-sky-50 text-sky-700",
};

export function InsightCard({
  description,
  icon: Icon,
  label,
  title,
  tone = "emerald",
}: InsightCardProps) {
  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/5">
      <div className="flex items-start gap-4">
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <h3 className="mt-2 break-words text-lg font-semibold tracking-tight">
            {title}
          </h3>
          <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
