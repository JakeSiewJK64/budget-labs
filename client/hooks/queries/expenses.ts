import dayjs from "dayjs";
import getAxiosInstance from "@/utils/axiosInstance";
import { z } from "zod";
import { ExpenseSchema, ExpenseStatsSchema } from "@/types/expense";
import { PaginatedResponseSchema } from "@/types/global";

const ExpenseResponseSchema = PaginatedResponseSchema(ExpenseSchema);

export async function useGetExpenseStatsByUserId(args: {
  user_id: number;
  target_date: string;
}): Promise<z.infer<typeof ExpenseStatsSchema>> {
  const axios = getAxiosInstance();
  const res = await axios
    .get("/expenses/getExpenseStatsByUserId", {
      params: args,
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });

  return ExpenseStatsSchema.parseAsync(res.data);
}

export async function useGetAllExpensesById(args: {
  user_id: number;
  page_size: number;
  page: number;
  start_date?: string;
  end_date?: string;
}): Promise<z.output<typeof ExpenseResponseSchema>> {
  const axios = getAxiosInstance();
  const res = await axios
    .get("/expenses", {
      params: {
        ...args,
        ...(!args.start_date && {
          start_date: dayjs().startOf("month").format("YYYY-MM-DD"),
        }),
        ...(!args.end_date && {
          end_date: dayjs().endOf("month").format("YYYY-MM-DD"),
        }),
      },
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });

  return ExpenseResponseSchema.parseAsync(res.data);
}
