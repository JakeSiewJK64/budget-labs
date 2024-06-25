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
