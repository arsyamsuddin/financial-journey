import { expenseCatalog } from "@/lib/catalog";
import type {
  CategoryKnowledge,
  CategoryKnowledgeMetadata,
} from "@/lib/knowledge/types";

const defaultExpenseKnowledge = {
  budgetPriority: "Medium",
  debtRelated: false,
  essential: false,
  healthWeight: "Medium",
  irregularIncome: false,
  investment: false,
  luxury: false,
  needs: false,
  positiveBehavior: false,
  primaryIncome: false,
  recurring: false,
  stableIncome: false,
  trackMarketPrice: false,
  variableIncome: false,
} satisfies CategoryKnowledgeMetadata;

const rootKnowledge = {
  "expense-education": {
    budgetPriority: "High",
    essential: true,
    healthWeight: "High",
    needs: true,
    recurring: true,
  },
  "expense-entertainment": {
    budgetPriority: "Low",
    healthWeight: "Low",
    luxury: true,
  },
  "expense-financial": {
    budgetPriority: "High",
    healthWeight: "High",
    recurring: true,
  },
  "expense-food": {
    budgetPriority: "High",
    essential: true,
    healthWeight: "High",
    needs: true,
    recurring: true,
    trackMarketPrice: true,
  },
  "expense-health": {
    budgetPriority: "High",
    essential: true,
    healthWeight: "High",
    needs: true,
    recurring: true,
  },
  "expense-housing": {
    budgetPriority: "VeryHigh",
    essential: true,
    healthWeight: "VeryHigh",
    needs: true,
    recurring: true,
  },
  "expense-others": {
    budgetPriority: "Medium",
    healthWeight: "Medium",
  },
  "expense-shopping": {
    budgetPriority: "Low",
    healthWeight: "Low",
    luxury: true,
  },
  "expense-transportation": {
    budgetPriority: "High",
    essential: true,
    healthWeight: "High",
    needs: true,
    recurring: true,
  },
} satisfies Record<string, Partial<CategoryKnowledgeMetadata>>;
const rootKnowledgeByCategoryId: Record<
  string,
  Partial<CategoryKnowledgeMetadata>
> = rootKnowledge;

const categoryOverrides = {
  "expense-entertainment-movies": {
    budgetPriority: "Low",
    essential: false,
    healthWeight: "Low",
    luxury: true,
    needs: false,
  },
  "expense-financial-investments": {
    healthWeight: "VeryHigh",
    investment: true,
    positiveBehavior: true,
  },
  "expense-financial-loan-payment": {
    debtRelated: true,
    recurring: true,
  },
  "expense-financial-savings": {
    healthWeight: "VeryHigh",
    investment: true,
    positiveBehavior: true,
  },
  "expense-transportation-fuel": {
    essential: true,
    needs: true,
    recurring: true,
    trackMarketPrice: true,
  },
} satisfies Record<string, Partial<CategoryKnowledgeMetadata>>;
const categoryOverridesByCategoryId: Record<
  string,
  Partial<CategoryKnowledgeMetadata>
> = categoryOverrides;

export const expenseKnowledge = expenseCatalog.map((category) => {
  const rootCategoryId = category.parentId ?? category.id;

  return {
    ...defaultExpenseKnowledge,
    ...rootKnowledgeByCategoryId[rootCategoryId],
    ...categoryOverridesByCategoryId[category.id],
    categoryId: category.id,
    kind: category.kind,
  };
}) satisfies CategoryKnowledge[];
