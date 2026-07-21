export type NavigationIcon =
  | "accounts"
  | "community"
  | "dashboard"
  | "insights"
  | "settings"
  | "transactions";

export type NavigationItem = {
  href: string;
  icon: NavigationIcon;
  label: string;
};

export const primaryNavigationItems: NavigationItem[] = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/transactions", icon: "transactions", label: "Transactions" },
  { href: "/accounts", icon: "accounts", label: "Accounts" },
  { href: "/insights", icon: "insights", label: "Insights" },
  { href: "/community", icon: "community", label: "Community" },
];

export const settingsNavigationItem: NavigationItem = {
  href: "/settings",
  icon: "settings",
  label: "Settings",
};
