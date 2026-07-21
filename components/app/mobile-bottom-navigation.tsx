import { NavigationLink } from "@/components/app/navigation-link";
import { primaryNavigationItems } from "@/components/app/navigation-config";

export function MobileBottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-2 py-2 backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-md gap-1">
        {primaryNavigationItems.map((item) => (
          <NavigationLink key={item.href} item={item} layout="bottom" />
        ))}
      </div>
    </nav>
  );
}

