import { CategoryForm } from "@/components/categories/category-form";
import { CategoryList } from "@/components/categories/category-list";
import { OnboardingCard } from "@/components/dashboard/onboarding-card";
import type { Category } from "@/lib/transactions";

type CategoryManagementProps = {
  categories: Category[];
};

export function CategoryManagement({ categories }: CategoryManagementProps) {
  return (
    <section id="categories" className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight">Categories</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage income and expense categories used by transactions.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <OnboardingCard
            ctaHref="#create-category"
            ctaLabel="Create First Category"
            description="Categories help FiJo understand whether money is coming in or going out. Create a simple income or expense category first, then each transaction can be recorded in the right place."
            eyebrow="Start here"
            title="Set up your first category."
          />
          <div id="create-category">
            <CategoryForm />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div id="create-category">
            <CategoryForm />
          </div>
          <CategoryList categories={categories} />
        </div>
      )}
    </section>
  );
}
