"use server";

import dayjs from "dayjs";
import { z } from "zod";
import { GenericResponseType } from "@/types/global";
import getAxiosInstance from "@/utils/axiosInstance";

const PostRequestSchema = z.object({
  user_id: z.preprocess((val) => Number(val), z.number()),
  description: z.string().default(""),
  date: z.string().default(dayjs().toISOString()),
  amount: z.preprocess((val) => Number(val), z.number()),
});

export async function submitExpenseAction(
  formData: FormData
): Promise<GenericResponseType> {
  const axios = getAxiosInstance();
  const data = await PostRequestSchema.parseAsync(Object.fromEntries(formData));

  try {
    const res = await axios.post("/expenses", data).catch((err) => {
      throw new Error(err.response.data.message);
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    throw error;
  }
}
