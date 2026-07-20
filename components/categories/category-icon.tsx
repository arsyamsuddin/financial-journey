import {
  BadgeDollarSign,
  Briefcase,
  Bus,
  Film,
  Gift,
  GraduationCap,
  HeartPulse,
  Laptop,
  Plane,
  Receipt,
  ShoppingBag,
  Tag,
  TrendingUp,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import type { CategoryColor, CategoryIcon as CategoryIconName } from "@/lib/category-presets";

const iconMap: Record<CategoryIconName, LucideIcon> = {
  "badge-dollar-sign": BadgeDollarSign,
  briefcase: Briefcase,
  bus: Bus,
  film: Film,
  gift: Gift,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  laptop: Laptop,
  plane: Plane,
  receipt: Receipt,
  "shopping-bag": ShoppingBag,
  tag: Tag,
  "trending-up": TrendingUp,
  utensils: Utensils,
};

const colorClasses: Record<CategoryColor, string> = {
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  cyan: "bg-cyan-50 text-cyan-700",
  emerald: "bg-emerald-50 text-emerald-700",
  fuchsia: "bg-fuchsia-50 text-fuchsia-700",
  indigo: "bg-indigo-50 text-indigo-700",
  lime: "bg-lime-50 text-lime-700",
  orange: "bg-orange-50 text-orange-700",
  pink: "bg-pink-50 text-pink-700",
  rose: "bg-rose-50 text-rose-700",
  sky: "bg-sky-50 text-sky-700",
  slate: "bg-slate-50 text-slate-700",
  teal: "bg-teal-50 text-teal-700",
  violet: "bg-violet-50 text-violet-700",
};

type CategoryIconProps = {
  color: string | null;
  icon: string | null;
};

export function CategoryIcon({ color, icon }: CategoryIconProps) {
  const Icon = iconMap[(icon ?? "tag") as CategoryIconName] ?? Tag;
  const className =
    colorClasses[(color ?? "slate") as CategoryColor] ?? colorClasses.slate;

  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-md ${className}`}
    >
      <Icon className="size-4" />
    </span>
  );
}
