import { expenseCatalog } from "@/lib/catalog/expense";
import { incomeCatalog } from "@/lib/catalog/income";

export { expenseCatalog } from "@/lib/catalog/expense";
export { incomeCatalog } from "@/lib/catalog/income";
export type {
  CanonicalCategory,
  CatalogKind,
} from "@/lib/catalog/types";
export {
  findCategoryById,
  findCategoryByName,
  getChildren,
  getFallbackCategory,
  getLeafCategories,
  getRootCategories,
  isLeafCategory,
  resolveCanonicalCategory,
} from "@/lib/catalog/category";

export const canonicalCatalog = [
  ...expenseCatalog,
  ...incomeCatalog,
] as const;
