"use server";

import { z } from "zod";
import { GenericResponseType } from "@/types/global";
import { getAxiosInstance } from "@/utils";

const PostRequestSchema = z.object({
  user_id: z.string(),
  description: z.string().min(1, "Description cannot be blank."),
  date: z.date(),
  amount: z.string(),
  expense_id: z.string().optional().nullable(),
});

export async function submitExpenseAction(
  formData: z.infer<typeof PostRequestSchema>
): Promise<GenericResponseType> {
  const axios = getAxiosInstance();

  const data = await PostRequestSchema.parseAsync(formData);
  const res = await axios.post("/expenses", data).catch((err) => {
    const errorMessage = err.response.data.message;
    return { data: errorMessage, status: 403 };
  });

  return { data: res.data, status: res.status };
}
