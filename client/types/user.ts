import { z } from "zod";

export const UserSchema = z.object({
  first_name: z.string().default(""),
  last_name: z.string().default(""),
  email: z.string(),
  id: z.number(),
});
