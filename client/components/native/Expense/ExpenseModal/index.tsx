"use client";

import { useRouter } from "next/navigation";
import { ExpenseForm } from "@/components/form/ExpenseForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export const ExpenseModal = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const onSuccessCallback = () => {
    toast({
      title: "Success",
      description: "Successfully saved expense",
    });

    document.getElementById("toggleExpenseModal")?.click();
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="toggleExpenseModal">New Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Expense</DialogTitle>
          <DialogDescription>
            Add a new expense to document your spending.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ExpenseForm userId={userId} onSuccessCallback={onSuccessCallback} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
