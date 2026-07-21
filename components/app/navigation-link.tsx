"use client";

import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type {
  NavigationIcon,
  NavigationItem,
} from "@/components/app/navigation-config";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  item: NavigationItem;
  layout: "bottom" | "collapsed" | "sidebar" | "topbar";
};

const iconMap: Record<NavigationIcon, LucideIcon> = {
  accounts: CreditCard,
  community: Users,
  dashboard: LayoutDashboard,
  insights: BarChart3,
  settings: Settings,
  transactions: WalletCards,
};

export function NavigationLink({ item, layout }: NavigationLinkProps) {
  const pathname = usePathname();
  const Icon = iconMap[item.icon];
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  if (layout === "bottom") {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="size-4" />
        <span className="max-w-full truncate">{item.label}</span>
      </Link>
    );
  }

  if (layout === "collapsed") {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        aria-label={item.label}
        title={item.label}
        className={cn(
          "flex size-12 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="size-5" />
      </Link>
    );
  }

  if (layout === "topbar") {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        aria-label={item.label}
        title={item.label}
        className={cn(
          "flex size-11 items-center justify-center rounded-xl border border-border transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="size-5" />
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="size-5" />
      <span>{item.label}</span>
    </Link>
  );
}
