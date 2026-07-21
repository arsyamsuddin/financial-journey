import Link from "next/link";

import { NavigationLink } from "@/components/app/navigation-link";
import {
  primaryNavigationItems,
  settingsNavigationItem,
} from "@/components/app/navigation-config";

export function TabletSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 border-r border-border bg-background md:flex md:flex-col lg:hidden">
      <div className="flex h-16 items-center justify-center">
        <Link
          href="/dashboard"
          aria-label="FiJo dashboard"
          className="flex size-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          FJ
        </Link>
      </div>

      <nav
        aria-label="Primary"
        className="flex flex-1 flex-col items-center gap-2 py-6"
      >
        {primaryNavigationItems.map((item) => (
          <NavigationLink key={item.href} item={item} layout="collapsed" />
        ))}
      </nav>

      <div className="flex justify-center border-t border-border py-4">
        <NavigationLink item={settingsNavigationItem} layout="collapsed" />
      </div>
    </aside>
  );
}

