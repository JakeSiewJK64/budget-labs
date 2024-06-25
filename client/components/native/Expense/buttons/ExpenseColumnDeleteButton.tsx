"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteExpense } from "@/hooks/queries/expenses";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const ExpenseColumnDeleteButton = ({
  expense_id,
}: {
  expense_id: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

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

              router.refresh();
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
      <Button
        size="sm"
        variant="ghost"
        className="text-[#ef4444] hover:text-[white] hover:bg-[#ef4444]"
      >
        <TrashIcon />
      </Button>
    </form>
  );
};
