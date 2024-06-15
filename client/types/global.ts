import { z } from "zod";

export type PaginationURLParam = {
  page_size?: number;
  page?: number;
};

export const PaginationRequestSchema = z.object({
  page: z.string().transform((value) => {
    if (value === undefined || value === null) return 0;
    if (Number.isNaN(value)) return 0;
    return Number.parseInt(value);
  }),
  page_size: z.string().transform((value) => {
    if (value === undefined || value === null) return 10;
    return Number.parseInt(value);
  }),
});

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
