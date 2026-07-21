import type { CatalogKind } from "@/lib/catalog";

export type BudgetPriority = "Low" | "Medium" | "High" | "VeryHigh";

export type HealthWeight = "Low" | "Medium" | "High" | "VeryHigh";

export type CategoryKnowledge = {
  categoryId: string;
  kind: CatalogKind;
  essential: boolean;
  needs: boolean;
  recurring: boolean;
  investment: boolean;
  luxury: boolean;
  trackMarketPrice: boolean;
  budgetPriority: BudgetPriority;
  healthWeight: HealthWeight;
  positiveBehavior: boolean;
  debtRelated: boolean;
  primaryIncome: boolean;
  stableIncome: boolean;
  variableIncome: boolean;
  irregularIncome: boolean;
};

export type CategoryKnowledgeMetadata = Omit<
  CategoryKnowledge,
  "categoryId" | "kind"
>;
