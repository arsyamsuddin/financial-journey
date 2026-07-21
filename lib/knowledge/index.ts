import { expenseKnowledge } from "@/lib/knowledge/expense-knowledge";
import { incomeKnowledge } from "@/lib/knowledge/income-knowledge";
import type {
  BudgetPriority,
  CategoryKnowledge,
  HealthWeight,
} from "@/lib/knowledge/types";

export { expenseKnowledge } from "@/lib/knowledge/expense-knowledge";
export { incomeKnowledge } from "@/lib/knowledge/income-knowledge";
export type {
  BudgetPriority,
  CategoryKnowledge,
  CategoryKnowledgeMetadata,
  HealthWeight,
} from "@/lib/knowledge/types";

export const financialKnowledge = [
  ...expenseKnowledge,
  ...incomeKnowledge,
] satisfies CategoryKnowledge[];

const financialKnowledgeByCategoryId = new Map<string, CategoryKnowledge>(
  financialKnowledge.map((knowledge) => [knowledge.categoryId, knowledge])
);

export function getKnowledge(categoryId: string) {
  return financialKnowledgeByCategoryId.get(categoryId) ?? null;
}

export function isEssential(categoryId: string) {
  return getKnowledge(categoryId)?.essential ?? false;
}

export function isInvestment(categoryId: string) {
  return getKnowledge(categoryId)?.investment ?? false;
}

export function isLuxury(categoryId: string) {
  return getKnowledge(categoryId)?.luxury ?? false;
}

export function tracksMarketPrice(categoryId: string) {
  return getKnowledge(categoryId)?.trackMarketPrice ?? false;
}

export function budgetPriority(categoryId: string): BudgetPriority | null {
  return getKnowledge(categoryId)?.budgetPriority ?? null;
}

export function healthWeight(categoryId: string): HealthWeight | null {
  return getKnowledge(categoryId)?.healthWeight ?? null;
}
