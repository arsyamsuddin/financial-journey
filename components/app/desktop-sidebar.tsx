import Link from "next/link";

import { NavigationLink } from "@/components/app/navigation-link";
import {
  primaryNavigationItems,
  settingsNavigationItem,
} from "@/components/app/navigation-config";

export function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="min-w-0">
          <span className="block text-base font-semibold leading-none tracking-tight">
            FiJo
          </span>
          <span className="mt-1 block text-xs leading-none text-muted-foreground">
            Financial Journey
          </span>
        </Link>
      </div>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-2 px-4 py-6">
        {primaryNavigationItems.map((item) => (
          <NavigationLink key={item.href} item={item} layout="sidebar" />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <NavigationLink item={settingsNavigationItem} layout="sidebar" />
      </div>
    </aside>
  );
}

