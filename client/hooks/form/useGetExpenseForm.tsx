import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const expenseFormSchema = z.object({
  description: z.string().min(1, {
    message: "Description cannot be empty.",
  }),
  amount: z.string(),
  date: z.date(),
});

const useExpenseForm = () => {
  const loginForm = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: "0",
      date: dayjs().toDate(),
      description: "",
    },
  });

  return loginForm;
};

export { useExpenseForm, expenseFormSchema };
