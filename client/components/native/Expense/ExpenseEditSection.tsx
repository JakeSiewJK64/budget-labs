"use client";

import { ExpenseForm } from "@/components/form";
import { useToast } from "@/components/ui/use-toast";
import { ExpenseSchema } from "@/types/expense";
import { z } from "zod";

export const ExpenseEditSection = ({
  defaultValues,
  userId,
}: {
  userId: string;
  defaultValues: z.output<typeof ExpenseSchema>;
}) => {
  const { toast } = useToast();

  return (
    <ExpenseForm
      userId={userId}
      defaultValues={defaultValues}
      onSuccessCallback={() => {
        toast({
          title: "Success",
          description: "Successfully updated expense.",
        });
      }}
    />
  );
};
