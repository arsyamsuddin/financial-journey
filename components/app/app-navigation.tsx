"use client";

import { Compass } from "lucide-react";

export function AppBreadcrumb({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
      <Compass className="size-3.5 text-primary" />
      {label}
    </div>
  );
}
