import { incomeCatalog } from "@/lib/catalog";
import type {
  CategoryKnowledge,
  CategoryKnowledgeMetadata,
} from "@/lib/knowledge/types";

const defaultIncomeKnowledge = {
  budgetPriority: "Medium",
  debtRelated: false,
  essential: false,
  healthWeight: "Medium",
  irregularIncome: false,
  investment: false,
  luxury: false,
  needs: false,
  positiveBehavior: true,
  primaryIncome: false,
  recurring: false,
  stableIncome: false,
  trackMarketPrice: false,
  variableIncome: false,
} satisfies CategoryKnowledgeMetadata;

const categoryKnowledge = {
  "income-bonus": {
    irregularIncome: true,
    variableIncome: true,
  },
  "income-business": {
    healthWeight: "High",
    primaryIncome: true,
    recurring: true,
    variableIncome: true,
  },
  "income-freelance": {
    healthWeight: "High",
    primaryIncome: true,
    variableIncome: true,
  },
  "income-gift": {
    irregularIncome: true,
  },
  "income-investment": {
    healthWeight: "High",
    investment: true,
    recurring: true,
    variableIncome: true,
  },
  "income-others": {
    irregularIncome: true,
  },
  "income-refund": {
    irregularIncome: true,
  },
  "income-salary": {
    healthWeight: "VeryHigh",
    primaryIncome: true,
    recurring: true,
    stableIncome: true,
  },
} satisfies Record<string, Partial<CategoryKnowledgeMetadata>>;
const categoryKnowledgeByCategoryId: Record<
  string,
  Partial<CategoryKnowledgeMetadata>
> = categoryKnowledge;

export const incomeKnowledge = incomeCatalog.map((category) => ({
  ...defaultIncomeKnowledge,
  ...categoryKnowledgeByCategoryId[category.id],
  categoryId: category.id,
  kind: category.kind,
})) satisfies CategoryKnowledge[];
