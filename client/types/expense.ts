import dayjs from "dayjs";
import { z } from "zod";

export const ExpenseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().transform((value) => dayjs(value).format("YYYY-DD-MM")),
});
