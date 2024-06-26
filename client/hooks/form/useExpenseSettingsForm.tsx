import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type DefaultExpenseSettingsValues = {
  income: number;
};

const expenseSettingsFormSchema = z.object({
  income: z.coerce.number().min(0, {
    message: "Cannot have negative income.",
  }),
});

const useExpenseSettingsForm = ({
  defaultValues,
}: {
  defaultValues: DefaultExpenseSettingsValues;
}) => {
  return useForm<z.infer<typeof expenseSettingsFormSchema>>({
    resolver: zodResolver(expenseSettingsFormSchema),
    defaultValues,
  });
};

export { useExpenseSettingsForm };
