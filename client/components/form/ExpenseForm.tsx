"use client";

import { submitExpenseAction } from "@/actions/expense";
import { useExpenseForm } from "@/hooks/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export const ExpenseForm = ({ userId }: { userId: string }) => {
  const form = useExpenseForm();
  const { toast } = useToast();

  return (
    <form
      action={(formData) => {
        formData.set("user_id", userId);

        submitExpenseAction(formData).then((res) => {
          if (res.status) {
            toast({
              title: "Success",
              description: "Successfully saved expense",
            });
            document.getElementById('toggleExpenseModal')?.click();
          }
        });
      }}
    >
      <Form {...form}>
        <div className="flex flex-col gap-[1rem]">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Input name="date" type="date" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save Expense
          </Button>
        </div>
      </Form>
    </form>
  );
};
