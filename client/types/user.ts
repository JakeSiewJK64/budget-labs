import { z } from "zod";

export const UserSchema = z.object({
  income: z.number().default(0),
  first_name: z.string().default(""),
  last_name: z.string().default(""),
  email: z.string(),
  id: z.number(),
});
