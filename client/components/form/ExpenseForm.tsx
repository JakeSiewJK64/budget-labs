"use client";

import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { submitExpenseAction } from "@/actions/expense";
import { useExpenseForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { z } from "zod";
import { ExpenseSchema } from "@/types/expense";

export const ExpenseForm = ({
  userId,
  defaultValues,
  onSuccessCallback = () => {},
}: {
  userId: string;
  defaultValues?: z.infer<typeof ExpenseSchema>;
  onSuccessCallback?: () => void;
}) => {
  const form = useExpenseForm({ defaultValues: defaultValues });
  const { toast } = useToast();

  return (
    <form
      onSubmit={form.handleSubmit((value) => {
        const formValues = {
          ...value,
          ...(defaultValues && { id: defaultValues.id }),
          ...(userId && { user_id: userId }),
        };

        submitExpenseAction(formValues).then((res) => {
          if (res.status === 200) {
            onSuccessCallback();
          } else {
            toast({
              title: "Error",
              description: String(res.data),
            });
          }
        });
      })}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format("YYYY-MM-DD")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
