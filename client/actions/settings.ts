"use server";

import { DefaultUserValues } from "@/hooks/form/useUserSettingsForm";
import { getAxiosInstance } from "@/utils";

export async function updateUserDetailsSettings(args: DefaultUserValues) {
  const axios = getAxiosInstance();
  const res = await axios
    .patch("/settings/updateUserDetails", args)
    .catch((err) => {
      const errorMessage = err.response.data.message;
      return { data: errorMessage, status: 403 };
    });
  return res.data;
}

export async function updateUserExpenseDetails({
  userId,
  args,
}: {
  args: { income: number };
  userId: string;
}) {
  const axios = getAxiosInstance();
  const res = await axios
    .patch("/settings/updateUserExpenseDetails", args, {
      params: {
        userId,
      },
    })
    .catch((err) => {
      const errorMessage = err.response.data.message;
      return { data: errorMessage, status: 403 };
    });
  return res.data;
}
