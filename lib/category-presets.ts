import type { Category, CategoryType } from "@/lib/transactions";

export type CategoryPreset = {
  color: CategoryColor;
  icon: CategoryIcon;
  key: string;
  name: string;
  type: CategoryType;
};

export type CategoryColor =
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "rose"
  | "sky"
  | "slate"
  | "teal"
  | "violet";

export type CategoryIcon =
  | "badge-dollar-sign"
  | "briefcase"
  | "bus"
  | "film"
  | "gift"
  | "graduation-cap"
  | "heart-pulse"
  | "laptop"
  | "plane"
  | "receipt"
  | "shopping-bag"
  | "tag"
  | "trending-up"
  | "utensils";

export const CUSTOM_CATEGORY_KEY = "custom";

export const CUSTOM_CATEGORY_DEFAULTS: Record<
  CategoryType,
  Pick<CategoryPreset, "color" | "icon">
> = {
  income: {
    color: "teal",
    icon: "tag",
  },
  expense: {
    color: "slate",
    icon: "tag",
  },
};

export const CATEGORY_PRESETS: CategoryPreset[] = [
  {
    color: "emerald",
    icon: "briefcase",
    key: "income-salary",
    name: "Salary",
    type: "income",
  },
  {
    color: "sky",
    icon: "laptop",
    key: "income-freelance",
    name: "Freelance",
    type: "income",
  },
  {
    color: "amber",
    icon: "badge-dollar-sign",
    key: "income-bonus",
    name: "Bonus",
    type: "income",
  },
  {
    color: "violet",
    icon: "trending-up",
    key: "income-investment",
    name: "Investment",
    type: "income",
  },
  {
    color: "pink",
    icon: "gift",
    key: "income-gift",
    name: "Gift",
    type: "income",
  },
  {
    color: "orange",
    icon: "utensils",
    key: "expense-food",
    name: "Food",
    type: "expense",
  },
  {
    color: "blue",
    icon: "bus",
    key: "expense-transport",
    name: "Transport",
    type: "expense",
  },
  {
    color: "fuchsia",
    icon: "shopping-bag",
    key: "expense-shopping",
    name: "Shopping",
    type: "expense",
  },
  {
    color: "rose",
    icon: "heart-pulse",
    key: "expense-health",
    name: "Health",
    type: "expense",
  },
  {
    color: "slate",
    icon: "receipt",
    key: "expense-bills",
    name: "Bills",
    type: "expense",
  },
  {
    color: "indigo",
    icon: "film",
    key: "expense-entertainment",
    name: "Entertainment",
    type: "expense",
  },
  {
    color: "lime",
    icon: "graduation-cap",
    key: "expense-education",
    name: "Education",
    type: "expense",
  },
  {
    color: "cyan",
    icon: "plane",
    key: "expense-travel",
    name: "Travel",
    type: "expense",
  },
];

export function getCategoryPresetByKey(key: string) {
  return CATEGORY_PRESETS.find((preset) => preset.key === key) ?? null;
}

export function getCategoryPresetsByType(type: CategoryType) {
  return CATEGORY_PRESETS.filter((preset) => preset.type === type);
}

export function getMatchingCategoryPreset(category: Category) {
  return (
    CATEGORY_PRESETS.find(
      (preset) =>
        preset.type === category.type &&
        preset.name === category.name &&
        preset.icon === category.icon &&
        preset.color === category.color
    ) ?? null
  );
}
