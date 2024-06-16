"use client";

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

const ExpenseModal = ({ userId }: { userId: string }) => {
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
          <ExpenseForm userId={userId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
