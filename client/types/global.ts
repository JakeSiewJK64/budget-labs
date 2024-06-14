import { z } from "zod";

export const PaginatedResponseSchema = <T>(contentSchema: z.ZodType<T>) =>
  z.object({
    content: z.array(contentSchema),
    pageable: z.object({
      pageNumber: z.number(),
      pageSize: z.number(),
    }),
    last: z.boolean(),
    first: z.boolean(),
    number: z.number(),
    size: z.number(),
    numberOfElements: z.number(),
    empty: z.boolean(),
  });
