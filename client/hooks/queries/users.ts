import { z } from "zod";
import { UserSchema } from "@/types/user";
import { PaginatedResponseSchema } from "../../types/global";
import getAxiosInstance from "@/utils/axiosInstance";

const UserResponseSchema = PaginatedResponseSchema(UserSchema);

export async function useGetAllUsers(): Promise<
  z.output<typeof UserResponseSchema>
> {
  const axios = getAxiosInstance();
  const res = await axios.get("/users").catch((err) => {
    throw new Error(err.response.data.message);
  });

  return UserResponseSchema.parseAsync(res.data);
}

export async function useGetCurrentUser(): Promise<
  z.output<typeof UserSchema>
> {
  const axios = getAxiosInstance();
  const res = await axios.get("/users/getCurrentUser").catch((err) => {
    throw new Error(err.response.data.message);
  });

  return UserSchema.parseAsync(res.data);
}
