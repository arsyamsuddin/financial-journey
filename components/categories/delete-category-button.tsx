"use client";

import { useActionState } from "react";

import {
  deleteCategory,
  type CategoryFormState,
} from "@/app/categories/actions";
import { Button } from "@/components/ui/button";

const initialState: CategoryFormState = {};

export function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const [state, formAction, pending] = useActionState(
    deleteCategory,
    initialState
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="id" value={categoryId} />
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        className="w-full sm:w-auto"
        disabled={pending}
      >
        {pending ? "Deleting..." : "Delete"}
      </Button>
      {"message" in state && state.message ? (
        <p className="text-xs text-destructive">{state.message}</p>
      ) : null}
    </form>
  );
}
