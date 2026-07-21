import {
  CalendarClock,
  Flag,
  Goal,
  LineChart,
  Radar,
  Repeat,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";

const modules = [
  { icon: Goal, label: "Budget" },
  { icon: Flag, label: "Goals" },
  { icon: LineChart, label: "Reports" },
  { icon: Repeat, label: "Recurring" },
  { icon: CalendarClock, label: "Subscriptions" },
  { icon: Radar, label: "Net Worth" },
];

export function FutureModules() {
  return (
    <section className="space-y-4">
      <SectionHeader
        description="A quiet place for upcoming finance tools without reshaping the dashboard later."
        eyebrow="Future Ready"
        title="Next modules"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <article
              key={module.label}
              className="flex min-h-24 items-center gap-3 rounded-3xl bg-white/55 p-4 text-slate-500 shadow-[0_12px_35px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{module.label}</p>
                <p className="mt-1 text-xs">Planned</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
