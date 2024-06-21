"use client";

import { Button } from "@/components/ui/button";
import { useDeleteExpense } from "@/hooks/queries/expenses";
import { TrashIcon } from "lucide-react";

export const ExpenseColumnDeleteButton = ({
  expense_id,
}: {
  expense_id: string;
}) => {
  return (
    <form
      action={() => {
        useDeleteExpense({
          expense_id,
        });
      }}
    >
      <Button size="icon" variant="destructive">
        <TrashIcon />
      </Button>
    </form>
  );
};
