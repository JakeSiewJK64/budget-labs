import { ExpenseSchema, ExpenseStatsSchema } from "@/types/expense";
import { PaginatedResponseSchema } from "@/types/global";
import getAxiosInstance from "@/utils/axiosInstance";
import { z } from "zod";

const ExpenseResponseSchema = PaginatedResponseSchema(ExpenseSchema);

export async function useGetExpenseStatsByUserId(args: {
  user_id: number;
  date: Date;
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

export async function useGetExpenseById(args: {
  user_id: number;
  page_size: number;
  page: number;
}): Promise<z.output<typeof ExpenseResponseSchema>> {
  const axios = getAxiosInstance();
  const res = await axios
    .get("/expenses", {
      params: args,
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });

  return ExpenseResponseSchema.parseAsync(res.data);
}
