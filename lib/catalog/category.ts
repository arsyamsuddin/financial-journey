import { expenseCatalog } from "@/lib/catalog/expense";
import { incomeCatalog } from "@/lib/catalog/income";
import type {
  CanonicalCategory,
  CatalogKind,
} from "@/lib/catalog/types";

const catalog = [...expenseCatalog, ...incomeCatalog] as const;
const fallbackCategoryIds = {
  expense: "expense-others-miscellaneous",
  income: "income-others",
} as const satisfies Record<CatalogKind, string>;
const legacyCategoryMap = {
  expense: {
    Bills: "expense-housing-household-supplies",
    Education: "expense-education-school-supplies",
    Entertainment: "expense-entertainment-hobbies",
    Food: "expense-food-snacks",
    Health: "expense-health-medicine",
    Shopping: "expense-shopping-personal-care",
    Transport: "expense-transportation-public-transport",
    Transportation: "expense-transportation-public-transport",
    Travel: "expense-transportation-public-transport",
  },
  income: {
    Bonus: "income-bonus",
    Freelance: "income-freelance",
    Gift: "income-gift",
    Investment: "income-investment",
    Salary: "income-salary",
  },
} as const;
const legacyCategoryAliases: Record<CatalogKind, Record<string, string>> =
  legacyCategoryMap;

export function findCategoryById(id: string) {
  return catalog.find((category) => category.id === id) ?? null;
}

export function findCategoryByName(name: string, kind?: CatalogKind) {
  const normalizedName = name.trim().toLowerCase();

  return (
    catalog.find(
      (category) =>
        category.name.toLowerCase() === normalizedName &&
        (!kind || category.kind === kind)
    ) ?? null
  );
}

export function getChildren(parentId: string) {
  return catalog.filter((category) => category.parentId === parentId);
}

export function getRootCategories(kind?: CatalogKind) {
  return catalog.filter(
    (category) => category.parentId === null && (!kind || category.kind === kind)
  );
}

export function isLeafCategory(category: CanonicalCategory) {
  return category.isLeaf;
}

export function getLeafCategories(kind?: CatalogKind) {
  return catalog.filter(
    (category) => category.isLeaf && (!kind || category.kind === kind)
  );
}

export function getFallbackCategory(kind: CatalogKind) {
  return findCategoryById(fallbackCategoryIds[kind])!;
}

export function resolveCanonicalCategory({
  id,
  kind,
  name,
}: {
  id?: string | null;
  kind: CatalogKind;
  name?: string | null;
}) {
  const categoryById = id ? findCategoryById(id) : null;

  if (categoryById?.kind === kind && categoryById.isLeaf) {
    return categoryById;
  }

  const normalizedName = name?.trim();
  const legacyId = normalizedName
    ? legacyCategoryAliases[kind][normalizedName]
    : null;
  const legacyCategory = legacyId ? findCategoryById(legacyId) : null;

  if (legacyCategory?.kind === kind && legacyCategory.isLeaf) {
    return legacyCategory;
  }

  const categoryByName = normalizedName
    ? findCategoryByName(normalizedName, kind)
    : null;

  if (categoryByName?.isLeaf) {
    return categoryByName;
  }

  if (categoryByName && !categoryByName.isLeaf) {
    return getChildren(categoryByName.id).find(isLeafCategory) ?? getFallbackCategory(kind);
  }

  return getFallbackCategory(kind);
}
