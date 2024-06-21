"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteExpense } from "@/hooks/queries/expenses";
import { TrashIcon } from "lucide-react";

export const ExpenseColumnDeleteButton = ({
  expense_id,
}: {
  expense_id: string;
}) => {
  const { toast } = useToast();

  return (
    <form
      action={() => {
        useDeleteExpense({
          expense_id,
        })
          .then((res) => {
            if (res) {
              toast({
                title: "Success",
                description: "Successfully deleted expense.",
              });
            }
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: err.message,
            });
          });
      }}
    >
      <Button size="icon" variant="destructive">
        <TrashIcon />
      </Button>
    </form>
  );
};
