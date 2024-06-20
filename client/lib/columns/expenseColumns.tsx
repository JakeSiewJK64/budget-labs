"use client";

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseSchema } from "@/types/expense";
import { buttonVariants } from "@/components/ui/button";

export const expenseColumns: ColumnDef<z.infer<typeof ExpenseSchema>>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    header: "",
    accessorKey: "id",
    cell: (info) => (
      <a className={buttonVariants()} href={`/expenses/${info.getValue()}`}>
        View Details
      </a>
    ),
  },
];
