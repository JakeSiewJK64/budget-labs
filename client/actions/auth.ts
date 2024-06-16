"use server";

import { setCookie, removeCookie } from "@/utils/cookiesUtils";
import { getAxiosInstance } from "@/utils";
import { redirect } from "next/navigation";
import { GenericResponseType } from "@/types/global";

export const logoutAction = async () => {
  removeCookie("token");
};

export const loginFormAction = async (
  formData: FormData
): Promise<GenericResponseType> => {
  const axios = getAxiosInstance();
  const requestObject = Object.fromEntries(formData);
  const res = await axios
    .post("/auth/authenticate", requestObject)
    .catch((err) => {
      const errorMessage = err.response.data.message;
      return { data: errorMessage, status: 403 };
    });

  if (res.status === 200) {
    const data: { token: string; email: string } = await res.data;

    setCookie({ key: "token", value: data.token });
    redirect("/dashboard");
  }

  return res;
};

export const registerFormAction = async (formData: FormData) => {
  const axios = getAxiosInstance();
  const requestObject = Object.fromEntries(formData);
  const res = await axios.post("/auth/register", requestObject).catch((err) => {
    const errorMessage = err.response.data.message;
    return { data: errorMessage, status: 403 };
  });

  if (res.status === 200) {
    const data: { token: string; email: string } = await res.data;

    setCookie({ key: "token", value: data.token });
    redirect("/dashboard");
  }

  return res;
};

export const getIsTokenExpired = async (token?: string) => {
  if (token) {
    const axios = getAxiosInstance();
    const res = await axios
      .post("/auth/verify", { token: token })
      .then((res) => res.data);
    return res;
  }

  return false;
};
