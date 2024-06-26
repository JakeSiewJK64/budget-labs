"use client";

import { updateUserExpenseDetails } from "@/actions/settings";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  DefaultExpenseSettingsValues,
  useExpenseSettingsForm,
} from "@/hooks/form/useExpenseSettingsForm";
import { useToast } from "../ui/use-toast";

export const UserExpenseSettingsForm = ({
  defaultValues,
  userId,
}: {
  userId: string;
  defaultValues: DefaultExpenseSettingsValues;
}) => {
  const form = useExpenseSettingsForm({ defaultValues });
  const { toast } = useToast();

  return (
    <form
      onSubmit={form.handleSubmit((e) => {
        updateUserExpenseDetails({ args: e, userId })
          .then((res) => {
            toast({
              title: "Success",
              description: "Successfully saved expense settings",
            });
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: err.data.message,
            });
          });
      })}
      className="flex flex-col gap-2"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income</FormLabel>
              <FormControl>
                <Input placeholder="Income" {...field} type="number" min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button className="ml-auto">Save</Button>
    </form>
  );
};
