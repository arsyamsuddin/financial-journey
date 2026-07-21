import type { ReactNode } from "react";

import { DesktopSidebar } from "@/components/app/desktop-sidebar";
import { MobileBottomNavigation } from "@/components/app/mobile-bottom-navigation";
import { TabletSidebar } from "@/components/app/tablet-sidebar";
import { TopAppBar } from "@/components/app/top-app-bar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DesktopSidebar />
      <TabletSidebar />

      <div className="min-h-screen md:pl-20 lg:pl-64">
        <TopAppBar />
        <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 pb-24 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      <MobileBottomNavigation />
    </div>
  );
}
