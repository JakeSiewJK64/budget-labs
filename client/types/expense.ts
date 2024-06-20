import dayjs from "dayjs";
import { z } from "zod";

export const ExpenseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  user_id: z.string(),
  date: z.string().transform((value) => dayjs(value).format("YYYY-DD-MM")),
  description: z
    .string()
    .nullable()
    .optional()
    .transform((value) => {
      if (value === null || value === undefined || value.length === 0) {
        return "Not Provided";
      }
      return value;
    }),
});

export const ExpenseStatsSchema = z.object({
  total_expense: z.number(),
  current_month_highest: z.number(),
  current_day_highest: z.number(),
  current_day_total: z.number(),
});
