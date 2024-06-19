import { ZodType, z } from "zod";

export type GenericResponseType = {
  data: unknown;
  status: number;
};

export type PaginationURLParam = {
  page_size?: number;
  page?: number;
};

export type DateRangeURLParam = {
  start_date?: string;
  end_date?: string;
};

export const PaginationRequestSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined || value === null || Number.isNaN(value)) {
        return 0;
      }
      return Number.parseInt(value);
    }),
  page_size: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined || value === null || value === "0") return 10;
      return Number.parseInt(value);
    }),
});

export const PaginatedResponseSchema = <T extends ZodType>(contentSchema: T) =>
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
    totalPages: z.number(),
    totalElements: z.number(),
    empty: z.boolean(),
  });
