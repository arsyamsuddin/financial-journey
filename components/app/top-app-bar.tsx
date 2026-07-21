import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";
import { NavigationLink } from "@/components/app/navigation-link";
import { settingsNavigationItem } from "@/components/app/navigation-config";

export function TopAppBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="min-w-0 md:hidden">
          <span className="block text-base font-semibold leading-none tracking-tight">
            FiJo
          </span>
          <span className="mt-1 block text-xs leading-none text-muted-foreground">
            Financial Journey
          </span>
        </Link>

        <div className="hidden min-w-0 md:block">
          <p className="text-sm font-medium text-foreground">
            Financial awareness before financial advice.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <NavigationLink item={settingsNavigationItem} layout="topbar" />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

