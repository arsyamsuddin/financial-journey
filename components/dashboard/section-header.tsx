import type { ReactNode } from "react";

type SectionHeaderProps = {
  description?: string;
  eyebrow: string;
  meta?: ReactNode;
  title: string;
};

export function SectionHeader({
  description,
  eyebrow,
  meta,
  title,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {meta ? (
        <div className="shrink-0 text-sm font-medium text-muted-foreground">
          {meta}
        </div>
      ) : null}
    </div>
  );
}
